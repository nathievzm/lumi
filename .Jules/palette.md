## 2024-05-18 - Friendly CLI Errors

**Learning:** Raw stack traces from unhandled Promise rejections (like `readdir` on a non-existent directory) are
intimidating for CLI users. **Action:** Always wrap file I/O operations in `try...catch` blocks and use UI logging tools
(like `@clack/prompts`) to provide actionable, human-readable error messages before gracefully exiting.
