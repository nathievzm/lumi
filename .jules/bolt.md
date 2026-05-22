## 2026-05-12 - [Optimizing Array & Set Operations]

**Learning:** In hot paths handling large numbers of files, using chained array methods like `.flatMap()`, `new Set()`,
spread operators, and `.filter()` creates unnecessary intermediate arrays and memory allocations. Furthermore,
repeatedly creating static Sets inside functions adds unnecessary O(N) overhead per call.

**Action:** When iterating over potentially large lists (like file paths), favor a single-pass `for...of` loop over
chained array methods to minimize memory footprint. Always pull static Set creation outside of function scopes to
initialize them once at the module level.

## 2026-05-15 - [Avoid Caching in Run-Once CLI Apps]

**Learning:** Implementing in-memory caching (like storing `sharp.format` values in a module-scoped variable) is
ineffective and adds unnecessary complexity in a CLI application that has a strictly 'run-once-and-exit' lifecycle. The
cache is built but never reused because the process terminates immediately after its primary task.

**Action:** Always consider the application's lifecycle (e.g., long-running server vs. short-lived CLI script) before
introducing caching or memoization. Prefer pure functions, readability, and KISS/YAGNI principles over
micro-optimizations that create global mutable state without a measurable benefit in the specific execution context.

## 2024-05-18 - [Replace Heavy Polyfills with Native APIs]

**Learning:** Using heavy polyfills like `@js-temporal/polyfill` solely for simple duration measurement introduces
significant (~90ms) startup overhead, which is detrimental to CLI performance.

**Action:** Always prefer native APIs like `performance.now()` for simple duration tracking to avoid the overhead of
parsing and instantiating large external libraries.

## 2024-05-19 - [Avoid Awaiting Dynamic Imports in Critical Path]

**Learning:** Using \`await import(...)\` for a heavy module during the synchronous CLI startup phase blocks execution,
failing to deliver the intended performance benefit of a dynamic import (it just shifts the penalty to a different
point).

**Action:** If deferring a heavy module for a non-critical side effect (like update checking), use promise chaining
(\`.then().catch()\`) without \`await\` to allow the main execution thread to continue immediately.

## 2025-02-14 - [Dynamic Import of Heavy Modules in CLI]

**Learning:** `sharp` is a heavyweight module that blocks execution for >130ms on import. This severely impacts the
startup time of the CLI, making `lumi --help` and error reporting feel slow.

**Action:** Used dynamic imports (`await import('sharp')`) to lazily load the library only when image processing methods
(`resize` and `getSharpFormats`) are called. This avoids importing `sharp` during the synchronous CLI startup path.

## 2024-05-22 - Caching dynamic import promises for concurrent processing

**Learning:** When dynamically importing heavy modules (like 'sharp') for concurrent processing (e.g., inside 'p-limit'
loops), the repeated resolution of the dynamic import across concurrent threads incurs significant overhead. **Action:**
Cache the import promise at the module level (e.g., `let myImportPromise: Promise<unknown> | undefined`) to ensure the
module is resolved only once, drastically reducing overhead for concurrent operations.
