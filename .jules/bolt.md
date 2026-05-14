## 2026-05-13 - [Optimize Array Operations]
**Learning:** In codeblocks that process loops (like getExtensions mapping flatMap over a dataset, and creating Sets in getImages repeatedly), using traditional loops and pulling out static Sets to module level scope reduces memory allocations significantly and speeds up node executions.
**Action:** When seeing '.flatMap' -> 'new Set' -> spread chains, consider replacing them with simple 'for...of' loops with direct Set.add operations. Module level caching for static sets reduces repetitive instantiations.
