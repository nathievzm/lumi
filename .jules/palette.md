## 2026-05-12 - Added error output for failed images

**Learning:** Users need to know exactly which images failed during batch processing. An overall error message is not
actionable.

**Action:** Always output detailed errors for individual batch items when a batch process fails, even if it adds to
terminal noise, because the user needs to correct specific items.

## 2026-05-13 - Friendly CLI Errors

**Learning:** Raw stack traces from unhandled Promise rejections (like `readdir` on a non-existent directory) are
intimidating for CLI users.

**Action:** Always wrap file I/O operations in `try...catch` blocks and use UI logging tools (like `@clack/prompts`) to
provide actionable, human-readable error messages before gracefully exiting.

## 2026-05-14 - Default CLI Prompt Values

**Learning:** When prompting users for repeated or common file conversions, failing to default to the original format
creates unnecessary friction. Users expect smart defaults that save keystrokes.

**Action:** Always set an `initialValue` in CLI selection prompts (`@clack/prompts`) where a logical default exists,
such as defaulting to a file's original extension during conversion options.

## 2026-05-18 - Rejected Default Value for Dimensions

**Learning:** Adding a strict `defaultValue` (e.g., '1080') to the dimensions prompt overrides the helpful `placeholder`
text visually in the UI, making the interface less descriptive and potentially confusing for users who need custom
sizes.

**Action:** Prioritize descriptive placeholders over hardcoded default values for free-text inputs where the user might
legitimately need a wide variety of formats (like dimensions).
