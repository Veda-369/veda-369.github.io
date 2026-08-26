# Veda Bharghav Portfolio V7

## What changed
- New split entry experience: animated data-system side + animated photography/viewfinder side.
- Veda Bharghav remains centered until the visitor taps the shutter.
- The shutter triggers a synthesized mirrorless-style sound, a flash, focus-ring effect, and split-screen reveal.
- The homepage hero no longer shows the Clutchpoint title above “BUILDING TRUSTED DATA.”
- New museum-white / graphite / stone / muted-garnet visual system and animated lens-style background art.
- Photography expanded to 38 images with automatic portrait/landscape detection.

## Photography filenames
The site expects exactly:

`photos/photo1.jpg`
`photos/photo2.jpg`
...
`photos/photo38.jpg`

You do **not** need to crop or resize them to a preset frame. JavaScript reads each image's real width and height. Portrait photos render as portrait; landscape photos render as landscape; very wide photos are treated as panoramas. The masonry layout reflows automatically.

If Windows currently named your files things such as `photo 26 (1).jpg`, rename them into the final `photo1.jpg` → `photo38.jpg` sequence before uploading.

## Captions currently included
- photo1 — Milky Way — Zion National Park, Utah
- photo3 — Great Smoky Mountains — Tennessee
- photo12 — Mount Washington — Pittsburgh, Pennsylvania
- photo14 — Bryce Canyon National Park — Utah
- photo17 — Grand Canyon National Park — Arizona
- photo21 — Bubble Rock — Acadia National Park, Maine
- photo24 — Bryce Canyon National Park — Utah
- photo31 — Bear Rock Shadow *(tentative mapping from your `photo 26(5)` note)*
- photo32 — Tuckaleechee Caverns, Tennessee *(tentative mapping from your `photo 26(6)` note)*

If `photo 26(5)` and `photo 26(6)` end up with different final numbers after you rename the files, update those two entries in `assets/portfolio-v7.js` or tell ChatGPT the final numbers and regenerate the site.

## Photography categories
The page includes filters for:
- Portraits
- Nature
- Landscapes
- Canids
- Astro
- Street + Travel
- All

Photos with location/category information already supplied have been tagged. Other photos remain visible in **All** until categories are assigned.

## Deploy
Copy everything inside this folder into the root of the `veda-369.github.io` repository, commit, and push.
