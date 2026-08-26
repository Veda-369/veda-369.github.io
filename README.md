# Veda Bharghav Portfolio V9.5

## Photography: add as many photos as you want

The deployed Photography page now reads the public GitHub repository's `/photos` folder dynamically. You do **not** need to edit the JavaScript photo count when you add more images.

Supported extensions:
- `.jpg` / `.jpeg`
- `.png`
- `.webp`

You can continue names such as `photo 38.jpg`, `photo 39.jpeg`, etc. Existing Windows-style names such as `photo 26 (5).jpeg` are also discovered because the gallery reads actual filenames from GitHub.

Known landmark captions remain mapped in the JavaScript. If you want a caption/location on a newly added photograph, add its metadata or ask ChatGPT to update it.

The gallery automatically detects portrait, landscape, and panoramic orientation after each image loads.

- replaced the healthcare wait-time case with a defensible Breast Cancer Survival + Clinical Pattern Analysis Tableau project
- added stronger iOS long-press / touch-callout blocking for photography images (best-effort; OS screenshots cannot be blocked by a website)
