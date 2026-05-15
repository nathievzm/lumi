## 2026-05-12 - [Optimizing Array & Set Operations]

- **Learning:** In hot paths handling large numbers of files, using chained array methods like `.flatMap()`,
  `new Set()`, spread operators, and `.filter()` creates unnecessary intermediate arrays and memory allocations.
  Furthermore, repeatedly creating static Sets inside functions adds unnecessary O(N) overhead per call.
- **Action:** When iterating over potentially large lists (like file paths), favor a single-pass `for...of` loop over
  chained array methods to minimize memory footprint. Always pull static Set creation outside of function scopes to
  initialize them once at the module level.

## 2026-05-15 - [Cache Static Library Properties vs Array Micro-optimizations]

**Learning:** Caching static library properties (like `sharp.format`) at the module level provides a measurable speedup
compared to re-processing them inside heavily-called functions. However, rewriting standard `.map()` and `.filter()`
calls to `for...of` loops for array operations (especially in I/O bound contexts) is a micro-optimization that reduces
code readability for zero measurable performance impact and should be avoided. **Action:** Focus performance efforts on
caching expensive, redundant computations and avoid converting standard array methods into imperative loops unless
profiling explicitly shows they are a critical CPU bottleneck.
