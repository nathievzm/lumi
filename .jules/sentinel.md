## 2026-05-12 - Fix Missing Input Length Limits (DoS Risk)

**Vulnerability:** Denial of Service (DoS) vulnerability via resource exhaustion caused by unconstrained width and
height parameters during image resizing with Sharp.

**Learning:** Tools handling image processing can easily be abused to consume excessive memory if user-provided
dimensions are unchecked, potentially crashing the Node.js/Bun process.

**Prevention:** Implement strict length and dimension validation boundaries for all user input governing asset
generation, catching errors gracefully without leaking system details.

## 2026-05-14 - Fix Path Traversal in Image Output

**Vulnerability:** A path traversal vulnerability existed in `src/lib/image.ts`. The output file path was constructed by
blindly concatenating user input (`cli.format` passed as `extension`) using `join`. An attacker could pass a format
string like `/../../../tmp/evil.png` to write files to arbitrary locations outside the intended output directory.

**Learning:** We must not blindly trust user input that influences file paths, especially file extensions or format
modifiers. When working with Node.js `path.join`, it resolves relative segments, which can escape the current directory.

**Prevention:** Always validate constructed file paths. Before performing any file operation, resolve the final output
path and check if it strictly starts with the resolved target directory path to prevent path traversals.

## 2026-05-18 - [Path Traversal in Input Resolution]

**Vulnerability:** The application was vulnerable to path traversal because it resolved the input image path via
`join(input, image)` and passed it directly to `sharp` without validation.

**Learning:** Even though the `outputPath` was properly guarded against path traversal, the missing guard on `inputPath`
could allow an attacker to read arbitrary files off the filesystem by specifying a malicious `image` filename with `../`
sequences.

**Prevention:** Always sanitize and guard both input and output paths to ensure they strictly reside within the intended
boundaries.

## 2026-05-19 - [Null Byte Injection in Path Resolution]

**Vulnerability:** The `guard` function used to prevent path traversal was relying on `node:path`'s `resolve` and
`startsWith` to verify paths. However, strings containing null bytes (`\0`) could cause `resolve` to behave unexpectedly
or terminate strings prematurely in underlying C++ extensions or certain filesystem API scenarios, effectively bypassing
the `startsWith` validation check.

**Learning:** Node's built-in path module does not inherently protect against null byte injection, and combining strings
with null bytes can lead to bypassing directory containment checks.

**Prevention:** Always explicitly check for and reject null bytes (`\0`) in user-supplied paths before using them in
file system operations or path resolutions.

## 2026-05-20 - [Null Byte Injection in Folder Parameter]

**Vulnerability:** While the `guard` function previously checked for null bytes (`\0`) in the `path` parameter, it
neglected to perform the same check on the `folder` parameter. This inconsistency left a potential path traversal bypass
vector open if the base folder path itself originated from untrusted input.

**Learning:** Null byte injection protections must be consistently applied to all path components involved in a security
boundary check, not just the immediately obvious file path.

**Prevention:** Ensure comprehensive null byte validation (`\0`) on all path inputs (both base directories and target
paths) prior to resolving them with `node:path` functions.

## 2024-05-22 - [Add null byte checks to CLI inputs]

**Vulnerability:** Path Traversal via Null Byte Injection in CLI Input (`getInput` / `getOutput`). **Learning:**
Although `guard` protected output resolution, raw input/output strings derived from the CLI or env could contain
injected null bytes (`\0`) early in the pipeline. This could be used to truncate resolved paths and bypass security
mechanisms later in execution. **Prevention:** Explicitly validate all user-supplied paths early in the function logic
(`getInput`, `getOutput`) and reject strings containing null characters (`\0`) to prevent evasion techniques.
