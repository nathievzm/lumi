## 2025-02-23 - Use initialValue instead of defaultValue for CLI text prompts

**Learning:** In CLI text prompts (like @clack/prompts), it is significantly better UX to use `initialValue` instead of
`defaultValue` when a logical default exists. Using `initialValue` pre-fills the input so the user can see it and edit
it, which reduces friction. In contrast, `defaultValue` can unexpectedly mask placeholder text or descriptive options
without explicitly showing the user what is being selected. **Action:** Always set an `initialValue` in CLI text prompts
where a logical default exists, to ensure the default is visible and editable.
