# Veda Bharghav Portfolio V8

## Deploy
Copy everything inside this folder into the root of the `veda-369.github.io` repository, commit to `main`, and push.

## Photography filenames
V8 expects the visible naming convention you showed:

- `photos/photo 0.jpg`
- `photos/photo 1.jpg`
- `photos/photo 2.jpg`
- and so on.

The included placeholder set runs from `photo 0.jpg` through `photo 37.jpg` for 38 total images.

The gallery reads each image's real dimensions in the browser. Portrait photographs stay portrait, landscapes stay landscape, and very wide images are treated as panoramas automatically.

The loader is also tolerant of older naming. It will try `photo1.jpg` style names and, for later images, Windows duplicate-style names such as `photo 26(1).jpg` if a sequential file is not present.

## Known photo captions currently wired in
- Photo 1 — Milky Way — Zion National Park, Utah
- Photo 3 — Great Smoky Mountains — Tennessee
- Photo 12 — Mount Washington — Pittsburgh, Pennsylvania
- Photo 14 — Bryce Canyon National Park — Utah
- Photo 17 — Grand Canyon National Park — Arizona
- Photo 21 — Bubble Rock — Acadia National Park, Maine
- Photo 24 — Bryce Canyon National Park — Utah
- Photo 31 — Bear Rock Shadow
- Photo 32 — Tuckaleechee Caverns — Tennessee

## Navigation / animation notes
- Root `index.html` opens with the half-data / half-photography shutter intro.
- The intro contains only the name, the tap instruction, and the shutter button.
- Entering Photography uses a camera-flash transition.
- Returning from Photography uses a data-pipeline loading animation and bypasses the home shutter gate.
- Experience uses a blue accent, Projects red, Skills green, and Contact blue.
