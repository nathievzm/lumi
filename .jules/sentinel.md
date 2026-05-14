## 2026-05-13 - [Denial of Service via Image Dimensions]

- **Vulnerability:** Resource Exhaustion / Denial of Service
- **Learning:** Image manipulation libraries like Sharp can consume massive amounts of memory if instructed to generate
  or resize images to extremely large dimensions.
- **Prevention:** Always validate and enforce maximum sensible limits (e.g., 16383x16383) on user-provided width and
  height dimensions before passing them to image processing libraries.

## 2026-05-12 - Fix Missing Input Length Limits (DoS Risk)

- **Vulnerability:** Denial of Service (DoS) vulnerability via resource exhaustion caused by unconstrained width and
  height parameters during image resizing with Sharp.
- **Learning:** Tools handling image processing can easily be abused to consume excessive memory if user-provided
  dimensions are unchecked, potentially crashing the Node.js/Bun process.
- **Prevention:** Implement strict length and dimension validation boundaries for all user input governing asset
  generation, catching errors gracefully without leaking system details.
