## 2026-05-12 - [Optimizing Array & Set Operations]

- **Learning:** In hot paths handling large numbers of files, using chained array methods like `.flatMap()`,
  `new Set()`, spread operators, and `.filter()` creates unnecessary intermediate arrays and memory allocations.
  Furthermore, repeatedly creating static Sets inside functions adds unnecessary O(N) overhead per call.
- **Action:** When iterating over potentially large lists (like file paths), favor a single-pass `for...of` loop over
  chained array methods to minimize memory footprint. Always pull static Set creation outside of function scopes to
  initialize them once at the module level.
## 2024-05-14 - [Static Caching in Modules]
**Learning:** Functions repeatedly evaluating static property arrays (like `Object.values(sharp.format)`) incur high performance overhead per-call. Chained methods like `.filter().map()` compound this by allocating multiple temporary arrays.
**Action:** Lift purely static computations out of function scopes (or lazily cache them at the module level). Use a single-pass `for...of` loop over large property arrays when constructing lists of options.
