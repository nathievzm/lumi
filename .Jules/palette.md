## 2025-02-23 - Use placeholder instead of initialValue for CLI text prompts with descriptive help

**Learning:** In CLI text prompts (like @clack/prompts), `initialValue` fills the text field, which hides any
descriptive `placeholder` text that would otherwise provide helpful instructions to the user. Using no `initialValue`
(or `defaultValue`) ensures the `placeholder` remains visible, guiding the user on the expected input format without
them needing to clear the field first. **Action:** Avoid setting an `initialValue` in CLI text prompts when a
descriptive `placeholder` is present, to ensure the helpful placeholder text remains visible to the user.
