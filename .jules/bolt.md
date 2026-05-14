## 2026-05-12 - [Optimizing Array & Set Operations]

- **Learning:** In hot paths handling large numbers of files, using chained array methods like `.flatMap()`,
  `new Set()`, spread operators, and `.filter()` creates unnecessary intermediate arrays and memory allocations.
  Furthermore, repeatedly creating static Sets inside functions adds unnecessary O(N) overhead per call.
- **Action:** When iterating over potentially large lists (like file paths), favor a single-pass `for...of` loop over
  chained array methods to minimize memory footprint. Always pull static Set creation outside of function scopes to
  initialize them once at the module level.
