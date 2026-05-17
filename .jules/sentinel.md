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

## 2024-05-17 - [Path Traversal & Structure Preservation Bug]
**Vulnerability:** Output file path was created by extracting `basename(image)` and losing the recursive directory structure. Consequently, `lumi` wrote files directly in the root output folder. This opened up the application to structured issues where different folders' files collided, and could pose structural risks.
**Learning:** `basename(path)` completely discards directories. In a recursive operation returning partial paths, you must preserve `dirname(image)` and concatenate it with the output folder safely.
**Prevention:** Always maintain intermediate directories by using `dirname` + `mkdir({ recursive: true })` before converting or saving recursive files, and run path containment tests to verify that outputs remain within designated areas without collision.
