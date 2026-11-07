# Golden Standard™

## Approved photography — implementation specification

All three image selections are **approved** as of 2026-11-06. This specification supersedes the previous golden-liquid hero selection. All three approved images were integrated into `index.html` in commit `78c76a0b8d3442ed69024cb99f62d8180120c36a`; GitHub Pages deployment may lag the source commit.

| Slot | Selection | Source image URL |
| --- | --- | --- |
| 1. Hero | Sophie's Orchard — apples growing in orchard (previous list, link 2) | https://static.wixstatic.com/media/da7361_4a44dac348204cafa40a79162704fdb4~mv2.jpg |
| 2. Apple juice / beverages | Sophie's Orchard — apple cider with apple slice (previous list, link 3) | https://static.wixstatic.com/media/da7361_3763ed1e22ad4bb6935b03961df05bde~mv2.jpg |
| 3. Clinical diagnostics | Previously approved specimen cup photograph | https://static.wixstatic.com/media/dbedb7_149a6885fdfe47de8d389263e4280db4~mv2.jpg/v1/fill/w_1200%2Ch_800%2Cal_c/dbedb7_149a6885fdfe47de8d389263e4280db4~mv2.jpg |

### Placement and behavior

- **Hero:** Use the orchard photograph as the primary full-bleed or responsive hero visual. Keep headline and controls readable on mobile and desktop; avoid cropping away the apples or important orchard composition. No text baked into imagery.
- **Beverages:** Use the cider-and-slice photograph for the apple juice division, keeping the glass and apple slice visible at narrow widths.
- **Clinical:** Use the specimen cup photograph for the clinical urinalysis division, preserving its pale clinical visual language.
- Preserve image aspect ratios and use responsive sizing/cropping with mobile and desktop inspection. Avoid branding, watermarks, or text overlays within the photos.
- Use the **exact approved URLs** above as the source references. Do not silently replace them with stock alternatives, generated images, or the former golden-liquid image.
- Before deployment, check that each remote asset resolves and that embedding/reuse rights and reliability are appropriate. The direct Wix CDN URLs have not been independently verified in this pass. If a check fails, report it rather than silently swapping the image.

### Superseded selection

The previously approved flowing-golden-liquid hero from Essence of Argan is **replaced** by Sophie's Orchard link 2; do not use it in the hero:
https://essenceofargan.com/cdn/shop/files/iStock-oil.jpg?v=1616838276&width=4050

### Implementation status

**Implemented in source.** Full-bleed responsive orchard hero (following JIT Air's overlay architecture) and two photographic division cards. Await GitHub Pages publication and visual verification.
