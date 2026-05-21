## 2024-05-21 - [Optimize Sharp Concurrent Dynamic Import]

**Learning:** In a concurrent loop (e.g. `p-limit`), making multiple identical dynamic `import()` calls simultaneously
can introduce notable overhead, even if Node.js caches the module. The time spent resolving the promise and cache
lookups stacks up under concurrency. **Action:** When dynamically importing heavy modules that will be used inside
concurrent loops, cache the `import()` promise itself at the module level. This ensures all concurrent tasks await the
exact same promise without redundant resolution overhead. Avoid caching the resolved value after an `undefined` check,
as race conditions can still cause multiple `import()` invocations.
