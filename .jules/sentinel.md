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
