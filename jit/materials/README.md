# Material Forge — Operating Contract

**Live:** https://bonoj.github.io/jit/materials/  
**Source:** [index.html](./index.html) · **History and reasoning:** [CHRONICLE.md](./CHRONICLE.md)

## Purpose

A standalone, fast-moving JIT laboratory for **reusable procedural material treatments** on 3D geometry. Discover convincing substances by changing shader treatment, not by building a new mesh for every substance. Keep known-good treatments indexed and easy to retrieve in future experiments.

**README = invariants and cold-boot instructions. CHRONICLE = historical conversation, observations, and decisions. index.html = executable truth.**

## Non-negotiable invariants

1. **Geometry stays fixed during material exploration.** Preserve the existing irregular icosahedron specimen, its topology, and the camera/orbit interaction. No replacing it with a plane, sphere, leaf mesh, cloud volume, or alternate geometry to make an individual treatment look better. Normal/bump shading is allowed; avoid vertex displacement that opens seams.
2. **Seamless procedural coordinates.** Prefer continuous 3D object-space fields, without image texture downloads, UV square tiling, or obvious projection seams. The original relief-seam failure came from moving duplicated face-boundary vertices along divergent normals; the existing radial-displacement correction must be preserved.
3. **One forge, indexed recipes.** Keep a lightweight source-embedded catalog in `index.html` with stable IDs, human names, modes, known-good settings, and descriptions. Preserve the five existing Witcher-sign entries. When adding a new material, give it a stable discoverable ID. Don't silently repurpose existing IDs.
4. **Substances and treatments are different concepts.** Granite, oak, and ice are substances; wet, mossy, frosted, cracked, and weathered are treatments. Make future composition possible, but **do not build a composition framework before it is useful**.
5. **Rendering claims must be honest.** A cloud-colored opaque rock is not a volumetric cloud. Water shading is not necessarily refraction or physical transparency. Shader glow is not automatically light cast on other objects. Label approximations and limits.
6. **Preserve play and observability.** Keep the five sign selectors, catalog picker, Copy recipe, energy/relief/light controls, orbit/pinch/zoom, stepped specimen stress field, and top-right 👁 Copy diagnostics. The Eye must remain shareable as JSON with clipboard fallback to download.
7. **Do not preoptimize.** Explore appearance and useful material vocabulary first. Performance changes should be driven by actual observations, not speculation. Preserve a stable reference test for comparisons.
8. **Minimal machinery.** Standalone GitHub Pages JIT, self-contained HTML/CSS/JS except the existing Three.js module import. No backend, accounts, build system, or separate management interface merely to index materials.
9. **Read before write; verify after write.** Fetch the current GitHub source before changing it; use the returned SHA for updates; fetch again to verify the committed content. A source read-back is **not** a live browser test. Supply a cache-busted Pages URL after deployment; user/device feedback establishes actual runtime behavior.

## Current executable state

Path: `jit/materials/index.html` (GitHub Pages, `master`).

- **Thirty-seven implemented shader treatments:** `aard-pressure`, `igni-ember`, `yrden-crystal`, `quen-amber`, `axii-glass`.
- **Source catalog:** `MATERIALS` array with stable IDs, `name`, `mode`, `energy`, `relief`, `lightAngle`, `description`. Catalog selection restores a recipe. Copy recipe emits `jit-material-recipe/v1` JSON.
- **Stress field:** `THREE.InstancedMesh` of the same specimen; slider steps `1, 10, 25, 50, 100, 250, 500, 1000`. Each specimen is 320 triangles. Camera backs away as population grows; this is **not** a fixed-pixel-coverage GPU benchmark.
- **Eye:** `jit-materials-eye/v1`, build `materials/03`, with material/recipe, settings, count, viewport, draw calls, triangles, frame-interval percentiles and browser info. Frame intervals include browser scheduling and display synchronization, **not GPU time**.
- **Observed user-provided baseline:** 1,000 Aard specimens, 2 draw calls, 321,200 triangles, 384×432 viewport at pixel ratio 2; frame p50 16.7 ms, p95 16.9 ms, p99 17.0 ms over 240 samples. This demonstrates steady ~60 Hz presentation in that observation, **not** quantified GPU headroom.
- **Caveats:** The radial relief seam fix was committed and source-verified, but has not been explicitly confirmed by the user in a later visual report. The recipe export refers to shader modes in the forge; it is not standalone GLSL. No assistant-side live browser verification has been performed.

## Natural-world catalog — next exploration

**Status: FIRST-PASS IMPLEMENTED (build materials/04); VISUAL VALIDATION PENDING.** Keep the **same geometry** and explore **32 initial substances**, four per family:

| Family | Proposed materials |
|---|---|
| Stone | Granite, basalt, sandstone, slate |
| Minerals | Quartz, amethyst, malachite, pyrite |
| Vegetation | Fresh leaf, autumn leaf, moss, lichen |
| Wood | Oak, birch bark, pine bark, weathered wood |
| Atmosphere | Cumulus, storm cloud, fog, smoke |
| Liquids | Clear water, seawater, muddy water, lava |
| Earth | Desert sand, wet sand, volcanic sand, fertile soil |
| Frozen | Powder snow, packed snow, glacier ice, frost |

### Material-quality priorities

- Recognizable substance from **color, scale, grain, directional structure, roughness, specularity, motion, and light response**, not just a different tint.
- Keep visual fields seamless in 3D and avoid planar checkerboards.
- Treat optical phenomena honestly: approximated scattering, transparency, volume, and refraction should be named as approximations.
- Maintain stable catalog IDs, family, description, parameter defaults, and known limitations for every new entry.
- Prefer quickly testing materials on the existing specimen over constructing abstractions. A failed treatment is a useful result if recorded.

## Cold-boot procedure

1. Read **this README**, then [CHRONICLE.md](./CHRONICLE.md) for the user/assistant turn-by-turn development.
2. Fetch **current** `jit/materials/index.html` from `bonoj/bonoj.github.io` on `master`; don't rely on remembered code or cached Pages content.
3. Inspect `MATERIALS`, shader branches, geometry and Eye before modifying. Preserve existing material IDs and interactive controls.
4. Resume the user's requested creative work: **visually inspect and refine the 32 implemented first-pass natural-world materials without changing geometry**. No optimization detour and no composition engine unless subsequently requested.
5. Add new treatments incrementally to the source catalog, test on the user's phone, and use 👁 reports to distinguish observation from inference.
6. Commit changes, fetch the source back to verify, and provide `https://bonoj.github.io/jit/materials/?v=<commit-short-sha>` for cache busting. Do not claim live deployment verified without a live browser observation.
7. Update this README when invariants or cold-boot state change. Append meaningful decisions, observations, and new phases to the CHRONICLE.

## Historical commits

- `3924d36a` — initial standalone forge, five sign treatments
- `627a2dca` — radial relief seam repair
- `b192d682` — instanced specimen field and 👁 diagnostics
- `ba03285e` — indexed material recipes and Copy recipe
- `5ac10672` — CHRONICLE established

**Guiding rule:** The forge is a cabinet of reusable visual discoveries. Keep it beautiful, executable, indexed, and easy to extend.

## Natural World implementation update — October 27, 2026

- Commit `32d2366d`: 32 new source-indexed recipes, modes 5–36, grouped into eight material families. Build `materials/04`.
- Existing five modes 0–4, specimen topology, population control, and Eye retained. No new texture downloads or UV projection.
- Visual appearances are **first-pass approximations**, not validated by a browser observation. Atmosphere remains opaque surface shading; liquids do not implement physical refraction. User inspection is the next step, **not preoptimization**.

## Membrane Fusion satellite experiment — October 27, 2026

- **Live:** https://bonoj.github.io/jit/materials/fusion/
- **Source:** [fusion/index.html](./fusion/index.html)
- Separate raymarched WebGL signed-distance-field experiment: two spherical volumes, smooth-min envelope, orbital camera, assimilation scrub/play, blend radius, membrane rim glow, and interior density controls.
- **Not a recipe in the fixed-geometry forge**: preserve the 37 original indexed materials and specimen stress test. Linked via `◎ Fusion` in forge header.
- This is a visual membrane-fusion approximation, not physical osmosis, conserved volume, fluid dynamics, or true optical transmission. Source readback verified; phone runtime validation pending.
