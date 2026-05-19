## 2026-05-19 - [Null Byte Injection in Path Resolution]
**Vulnerability:** The `guard` function used to prevent path traversal was relying on `node:path`'s `resolve` and `startsWith` to verify paths. However, strings containing null bytes (`\0`) could cause `resolve` to behave unexpectedly or terminate strings prematurely in underlying C++ extensions or certain filesystem API scenarios, effectively bypassing the `startsWith` validation check.
**Learning:** Node's built-in path module does not inherently protect against null byte injection, and combining strings with null bytes can lead to bypassing directory containment checks.
**Prevention:** Always explicitly check for and reject null bytes (`\0`) in user-supplied paths before using them in file system operations or path resolutions.
