## 2026-05-12 - Added error output for failed images

**Learning:** Users need to know exactly which images failed during batch processing. An overall error message is not
actionable. **Action:** Always output detailed errors for individual batch items when a batch process fails, even if it
adds to terminal noise, because the user needs to correct specific items.
