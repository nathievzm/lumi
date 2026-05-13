## 2024-05-13 - [Denial of Service via Image Dimensions]
**Vulnerability:** Resource Exhaustion / Denial of Service
**Learning:** Image manipulation libraries like Sharp can consume massive amounts of memory if instructed to generate or resize images to extremely large dimensions.
**Prevention:** Always validate and enforce maximum sensible limits (e.g., 16383x16383) on user-provided width and height dimensions before passing them to image processing libraries.
