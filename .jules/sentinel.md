## 2026-05-12 - Fix Missing Input Length Limits (DoS Risk)

- **Vulnerability:** Denial of Service (DoS) vulnerability via resource exhaustion caused by unconstrained width and
  height parameters during image resizing with Sharp.
- **Learning:** Tools handling image processing can easily be abused to consume excessive memory if user-provided
  dimensions are unchecked, potentially crashing the Node.js/Bun process.
- **Prevention:** Implement strict length and dimension validation boundaries for all user input governing asset
  generation, catching errors gracefully without leaking system details.

## 2024-05-14 - Fix Path Traversal in Image Output

- **Vulnerability:** A path traversal vulnerability existed in `src/lib/image.ts`. The output file path was constructed
  by blindly concatenating user input (`cli.format` passed as `extension`) using `join`. An attacker could pass a format
  string like `/../../../tmp/evil.png` to write files to arbitrary locations outside the intended output directory.
- **Learning:** We must not blindly trust user input that influences file paths, especially file extensions or format
  modifiers. When working with Node.js `path.join`, it resolves relative segments, which can escape the current
  directory.
- **Prevention:** Always validate constructed file paths. Before performing any file operation, resolve the final output
  path and check if it strictly starts with the resolved target directory path to prevent path traversals.

## 2024-05-18 - Fix Unconstrained Dimension DoS Risk in Missing Bound Logic

- **Vulnerability:** Denial of Service (DoS) vulnerability via resource exhaustion caused by unconstrained width and
  height parameters when ONLY ONE dimension is invalidly passed. The previous logic only reverted to safe prompting if
  BOTH were missing/invalid, meaning passing `--width=100 --height=-1` would crash Sharp due to negative or NaN values
  bypassing the bounds checks.
- **Learning:** Bounds checks that test `if (A > max || B > max)` but miss checking if _one_ of them is `<= 0` while the
  _other_ is valid can create loopholes leading to app crashes when interacting with underlying C/C++ dependencies like
  Sharp that require strict input types.
- **Prevention:** Always validate all boundaries (min and max) strictly, and when resolving optional/missing parameters,
  ensure that derived parameters undergo the exact same bounds checks.
