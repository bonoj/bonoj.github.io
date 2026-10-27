# Material Forge — Chronicle

> **Location:** `jit/materials/` · **Live:** https://bonoj.github.io/jit/materials/ · **Source:** https://github.com/bonoj/bonoj.github.io/blob/master/jit/materials/index.html
>
> **Purpose:** Preserve the actual conversational development of the forge, observations, decisions, and unbuilt directions for a cold boot. Source code is authoritative for implementation; this chronicle is the reasoning trail. GitHub commits and read-backs verify source writes, **not** live browser behavior.

## Birth — October 27, 2026

### 01 · Inspiration: Witcher signs as materials

**User:** “Let's look at the Witcher symbols. Curious to see if maybe you can make some seamless runtime materials for 3d geometry (must not look like square plane patterbs). We haven't explored materials, lighting, and shaders much at all.”

**Assistant:** Proposed five interpretations of the signs, each as a substance rather than a decal: **Aard** compressed air/pressure; **Igni** ember and glowing veins; **Yrden** purple enchanted crystal; **Quen** amber shield; **Axii** hypnotic green glass. Central idea: procedural object-space 3D fields, no UV square tiling; inspect material response on a shared irregular specimen. Physical effects and genuine lighting should be distinguished from decorative emission.

### 02 · Choose the deployment surface

**User:** “Do you want to build here in chat or right into a jit assets materials?”

**Assistant:** Preferred a real browser experiment over a chat-only preview, proposing a small material forge with five treatments, orbit, zoom, movable light, energy and relief controls, reusable material ideas.

**User:** “Let's just make the forge its own jit, separate from assets. We'll play it fast and loose.”

**Decision:** Standalone `jit/materials/`, **not** `jit/assets/materials/`. Keep it lightweight, iterative, and independent.

**Implementation:** Created `jit/materials/index.html` at commit `3924d36a`. Three.js loaded as a browser module; irregular icosahedron; five animated procedural fragment-shader branches; no image textures or UV maps; orbit/pinch/scroll; sliders for energy, relief, light angle. Shader glow is **emission color**, not light cast onto neighboring objects. Source fetched back and verified. No live browser smoke test by assistant.

### 03 · Relief seams discovered

**User:** “This is quite excellent. Relief currently allows the seams to become disconnected. Setting to zero closes all holes in the mesh. Not intended?”

**Assistant:** Diagnosed duplicated vertices on faceted icosahedron boundaries displaced along differing face normals, opening cracks. Changed vertex displacement direction from `normal` to `normalize(position)` so coincident vertices receive continuous radial displacement. Commit `627a2dca`, source read-back verified. Intended to preserve angular shading without splitting geometry. **The user did not explicitly confirm the fix visually afterward.**

### 04 · Computational cost and testing

**User:** “These materials are cheap as hell computationally?”

**Assistant:** Clarified that download/texture memory/CPU/draw-call overhead is small, but 3D procedural FBM noise per fragment is not necessarily GPU-cheap. Cost depends on screen coverage; suggested testing rather than premature optimization.

**User:** “Perfect. Go ahead and give me a particle field that I can slide from 1 to n in steps and add 👁 to copy diagnostics i can share with you. Can replace that dead jit link in top right.”

**Implementation:** Added an **instanced specimen field** (not a point-sprite particle system) with stepped counts `1, 10, 25, 50, 100, 250, 500, 1000`; reduced each specimen to 320 triangles; one instanced draw for specimens; top-right 👁 Copy JSON with clipboard/download fallback; frame interval percentiles, draw calls, triangles, viewport and user agent. Commit `b192d682`, source read-back verified. Build label `materials/02`. Camera backs away to fit growing populations: this mixes geometry throughput with changing pixel coverage.

**User-supplied runtime observation at 1,000 Aard specimens:**

```json
{
  "schema": "jit-materials-eye/v1",
  "build": "materials/02",
  "specimens": 1000,
  "material": "Aard",
  "energy": 1,
  "relief": 1,
  "lightAngle": -0.7,
  "viewport": {"width":384,"height":432,"pixelRatio":2},
  "geometry": {"trianglesPerSpecimen":320},
  "render": {"drawCalls":2,"triangles":321200},
  "frameMs": {"samples":240,"p50":16.7,"p95":16.9,"p99":17}
}
```

**Interpretation:** Very steady ~60 Hz browser frame cadence at this workload. Does **not** establish actual GPU execution time or headroom. A previous assistant suggested higher counts/fixed-camera tests, but user deliberately redirected away from preoptimization.

### 05 · An indexed catalog instead of preoptimization

**User:** “Let's skip the preoptimization. Let's begin creating an indexed materials catalog here in this jit, probably in the code itself, just a quick way to retrieve known happy materials/treatments for future experiments.”

**Assistant:** Proposed a small, source-embedded recipe index with stable IDs, shader branch, descriptive name, known-good parameters; selecting an entry restores it. Future JITs can reference known treatments without reconstructing them from conversation history.

**Implementation:** Added `MATERIALS` array directly in `index.html`, catalog dropdown, Copy recipe with `jit-material-recipe/v1` JSON and clipboard/download fallback; retained 👁 and stress test. Commit `ba03285e`, source read-back verified. Build label `materials/03`. Initial IDs:
- `aard-pressure` — Aard · Pressure stone
- `igni-ember` — Igni · Living ember
- `yrden-crystal` — Yrden · Arcane crystal
- `quen-amber` — Quen · Shield amber
- `axii-glass` — Axii · Hypnotic glass

**Limitation:** A recipe currently points to a shader mode defined inside the forge; it does **not** export a self-contained GLSL module or independent material package. Editing energy/relief/light and copying the recipe exports current settings, but catalog entries are fixed source-defined defaults.

### 06 · Natural-world material vocabulary — specification, NOT implementation

**User:** “Without changing the geometry let's explore a bunch of materials we need for living natural world. Various rocks, minerals, leaves, woods, clouds, liquids, sands, snows etc. Want to spec first?”

**Assistant:** “Yes—but a **small material vocabulary spec**, not an implementation plan.” Proposed **32 treatments in eight families**:

| Family | Four initial candidates | Phenomena |
|---|---|---|
| Stone | Granite, basalt, sandstone, slate | Mineral grains, inclusions, sedimentary bands, fractures, roughness |
| Minerals | Quartz, amethyst, malachite, pyrite | Crystal highlights, internal color, metallic response, translucency |
| Vegetation | Fresh leaf, autumn leaf, moss, lichen | Veins, chlorophyll variation, wax, scattering approximation |
| Wood | Oak, birch bark, pine bark, weathered wood | Directional grain, rings, fibers, fissures |
| Atmosphere | Cumulus, storm cloud, fog, smoke | Soft edges, density, light penetration, flow |
| Liquids | Clear water, seawater, muddy water, lava | Fresnel, waves, absorption, turbidity, emission |
| Earth | Desert sand, wet sand, volcanic sand, fertile soil | Grains, wind ripples, moisture, minerals |
| Frozen | Powder snow, packed snow, glacier ice, frost | Microfacets, crystalline scattering, blue absorption, sparkle |

**Proposed contract:**
1. **Geometry invariant:** Keep the existing specimen mesh and camera system. Material-specific normal perturbation is allowed; do not change mesh topology.
2. **Procedural by default:** No downloaded textures, UV tiling, or visible square projections. Prefer continuous 3D coordinates.
3. **Physical first:** Plausible albedo, roughness, specular response, transparency, and surface appearance. Magical effects stay a separate family.
4. **Honest rendering:** Cloud-like shading on opaque geometry is not volumetric clouds; water without refraction is not optically complete. Identify approximations.
5. **Indexed and reusable:** Stable ID, family, description, shader parameters, known limitations for each treatment.
6. **Eyes remain open:** Preserve the population stress test and 👁 diagnostics; avoid premature optimization.

**Important conceptual separation:** **Substance** (granite, oak, ice) versus **treatment** (wet, weathered, moss-covered, frosted, cracked, burning). Example future composition: **granite + wet + moss** on one specimen. **Do not build a layering/composition engine yet**; simply avoid choices that prevent it.

**Assistant recommendation:** Implement the 32 as selectable treatments on the same geometry, accept imperfect ones as useful diagnostic findings. **This recommendation is not an implementation authorization.** As of this chronicle, the 32 natural-world treatments have **not** been implemented.

### 07 · Chronicle requested

**User:** “Excellent. Let's create a chronicle.md and capture the birth of the materials forge and the turn by turn extension.”

**Action:** This document records the chronology, exact user requests where available, implementation commits, the supplied Eye observation, and the boundary between shipped work and proposed work.

## Current state / cold-boot handoff

- Canonical executable: `jit/materials/index.html` on `master`; current source was fetched immediately before authoring this chronicle.
- Existing: five sign-inspired shader treatments, catalog recipes, 1–1,000 instanced specimens, orbit/zoom, energy/relief/light controls, 👁 diagnostics.
- Proposed next creative direction: natural-world substances (32 candidates) on **unchanged geometry**. No need for an optimization detour.
- Preserve current code and behavior. Read the source before editing. Iterate fast, test on device, and use 👁 for grounded observations.
- Known caveats: no independently verified live-browser smoke test; no GPU timing; mobile browser may cache stale deployment; recipes are forge-local references; relief fix has not been explicitly user-confirmed visually.
- Avoid conflating **procedural material appearance** with physical transparency, true volumetrics, refraction, or emitted scene lighting.

**Guiding principle:** Build a growing cabinet of convincing, reusable material treatments through direct play. Capture what works. Let natural-world composition emerge from experiments rather than front-loading architecture.
