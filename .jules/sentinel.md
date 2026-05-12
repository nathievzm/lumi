## 2023-10-27 - Fix Missing Input Length Limits (DoS Risk)
**Vulnerability:** Denial of Service (DoS) vulnerability via resource exhaustion caused by unconstrained width and height parameters during image resizing with Sharp.
**Learning:** Tools handling image processing can easily be abused to consume excessive memory if user-provided dimensions are unchecked, potentially crashing the Node.js/Bun process.
**Prevention:** Implement strict length and dimension validation boundaries for all user input governing asset generation, catching errors gracefully without leaking system details.
