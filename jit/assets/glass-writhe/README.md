# The Glass Writhe

Morphology 001 — translucent gelatinous skin around a writhing internal articulated organism.

## Entrypoint

[index.html](./index.html) · [Live page](https://bonoj.github.io/jit/assets/glass-writhe/)

## Current baseline

- Canvas2D software-projected 3D, no external dependencies.
- 24 internal kinematic actors; axial and cross-links; 14 longitudinal membrane intervals and 20 radial subdivisions.
- Translucent membrane follows the moving chain; convulse, rearrange, skin toggle, pause, orbit and zoom.
- Surface is kinematically generated rather than independently elastic. Bonds are illustrative topology, not a physical constraint solver.
- Browser runtime not independently verified.

## Direction

Keep working **in this folder**. Preserve this first specimen as a recoverable baseline while exploring a genuinely deformable, translucent skin stretched over internal structures that can rearrange, break, and reconnect. Do not confuse rendered membrane facets with material actors or bonds. Visual quality matters: avoid exposed voxel faces. Use source inspection and readback verification for changes.

## Morphology 002 — Decapod

- [Source](./decapod.html) · [Live page](https://bonoj.github.io/jit/assets/glass-writhe/decapod.html)
- Ten independently phased and oscillating tentacles emerge from one head; all contribute to a single smooth-union implicit surface.
- WebGL ray marching, surface normals, Fresnel-style shading, orbit, pinch zoom, agitation, calming, interior hint and pause.
- The surface is an implicit union, not an independently simulated elastic membrane. Shading suggests translucency but is not true volumetric transparency.
- Preserved separately from Morphology 001. Source committed 2026-11-03; browser runtime unverified.
