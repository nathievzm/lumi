## 2026-05-12 - [Optimizing Array & Set Operations]

- **Learning:** In hot paths handling large numbers of files, using chained array methods like `.flatMap()`,
  `new Set()`, spread operators, and `.filter()` creates unnecessary intermediate arrays and memory allocations.
  Furthermore, repeatedly creating static Sets inside functions adds unnecessary O(N) overhead per call.
- **Action:** When iterating over potentially large lists (like file paths), favor a single-pass `for...of` loop over
  chained array methods to minimize memory footprint. Always pull static Set creation outside of function scopes to
  initialize them once at the module level.

## 2026-05-15 - [Avoid Caching in Run-Once CLI Apps]

- **Learning:** Implementing in-memory caching (like storing `sharp.format` values in a module-scoped variable) is
  ineffective and adds unnecessary complexity in a CLI application that has a strictly 'run-once-and-exit' lifecycle.
  The cache is built but never reused because the process terminates immediately after its primary task.
- **Action:** Always consider the application's lifecycle (e.g., long-running server vs. short-lived CLI script) before
  introducing caching or memoization. Prefer pure functions, readability, and KISS/YAGNI principles over
  micro-optimizations that create global mutable state without a measurable benefit in the specific execution context.
## 2025-05-16 - [Linter Restrictions]
**Learning:** The linter (`oxlint`) enforce `unicorn(no-null)` rule which strictly forbids the use of `null` literals.
**Action:** Use `undefined` instead of `null` when initializing unset variables or caches to avoid lint errors.
