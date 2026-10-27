# Architecture / Bearings — working specification

**2026-10-26 · JIT Geometry · exploratory, not a claim of physical accuracy**

## Why this experiment exists

The first `architecture/index.html` proved a narrow property: connected nodes could be moved while dependent walkways regenerated. It did **not** produce convincing architecture. Its treads followed an interpolated 3D segment, causing inappropriate rotations; its platforms were mostly disconnected-looking boxes despite graph connectivity.

The next experiment asks a different question: **can small material elements, their contacts and load paths produce continuous, coherent architectural forms that respond meaningfully to gravity?**

“Bearings” is our working term for the **load-bearing relationships** between pieces: contact patches, supports, compression, tension, shear, moments, and the paths by which loads reach the ground. This is not primarily a drag-to-build editor. It is an inhabited-looking structure whose integrity can be observed and perturbed.

## Reference image: five candidate representations

The supplied comparison image depicts five approaches to a bridge spanning a gap. Treat it as a **conceptual visual taxonomy**, not validated benchmark data or evidence that any depicted failure is physically correct:

1. **Bonded particles:** discrete beads with explicit bonds; local stretch, shear, bending, and bond failure. Attractive for masonry, cracking, and visible fracture paths.
2. **FleX-style clustered particles:** particles grouped by shape-matching constraints; coherent rigid/soft deformation. “FleX-style” denotes a family resemblance, not an NVIDIA FleX implementation.
3. **Position-based dynamics / XPBD:** distance, bending, volume, and attachment constraints; tunable compliance and breakage. Attractive for an inexpensive interactive first experiment.
4. **Material point method (MPM):** material-carrying particles coupled to a background grid; suited to continuum deformation, granular flows, and large topology changes, but considerably more machinery.
5. **Particle-to-surface reconstruction:** particles carry material state while a separate continuous mesh/field provides the visible skin. **This is a rendering/reconstruction layer, not by itself a structural solver**; it can accompany approaches 1–4.

Do not collapse these into five interchangeable physics engines. In particular, option 5 addresses appearance, and MPM uses a grid as well as particles.

## Core hypothesis

**A few explicitly modeled bearing relationships will create more convincing architecture than many individually placed meshes.** Geometry should emerge from material organization and supported surfaces, not from rods connecting arbitrary points.

Start with a **single stone arch bridge between two rock shelves**. It is a useful falsifiable scene because the arch should channel compression into abutments; removing a key bearing or moving an abutment should change the structure, not merely redraw a connector.

A secondary comparison scene may use a **suspension bridge** to reveal a contrasting tension-dominated load path. Do not conflate these behaviors.

## The first executable

Keep `architecture/index.html` intact as the connectivity proof. Build the next toy separately, e.g. `architecture/bearings/index.html`, within the existing mobile-first, standalone Three.js JIT conventions. No shared engine or new deployment system.

### Material and structure

- Two fixed rock shelves, separated by a visible void.
- A discretized arch ring assembled from wedge-shaped voussoirs or similarly coherent masonry units, with a deck and abutments.
- Explicit local contact/bearing relationships between adjacent pieces and with foundations; distinguish **compression-only contact** from any artificial cohesion or tensile bond.
- Gravity, mass, and reaction forces, with deterministic fixed-step updates and a stable starting arrangement.
- If the chosen first solver cannot support frictional, unilateral contact and meaningful arch thrust, **do not label the result a physically faithful stone arch**. Use a bonded test bridge instead and identify the simplification.

### Rendering

- The visual form should read as one designed bridge, not a string of beads or floating boxes.
- Generate a continuous-looking silhouette from the underlying structural units; preserve visible joints where informative.
- Restrained stone/ochre palette, strong directional light, carefully composed camera, scale cues, and a meaningful void.
- Optional diagnostic overlay: material particles, contacts, force arrows, and stressed/broken bonds. **Diagnostics are secondary to the world.**
- No requirement to recreate the reference image's polished render or copy its artwork.

### Interaction

- Primary: tap a support or bearing to inspect its role; tap again or use one deliberate gesture to release/remove it.
- Observe settlement, load redistribution, fracture, and falling material where the solver supports them.
- Reset deterministically. Camera movement must not accidentally mutate the structure.
- Prefer a beautiful initial scene with one meaningful intervention over a generic construction interface.

## Solver selection: staged evidence, not dogma

**Phase A — contact and load-path proof:** build a minimal 2D or 2.5D mechanical model first (fixed timestep, gravity, contact detection, penetration correction, damping, friction approximation). Validate the arch under its own weight and a removed bearing. If stable compression-only contacts prove too expensive or fragile, pivot to a clearly labeled bonded-particle truss/bridge rather than silently faking masonry behavior.

**Phase B — visible architecture:** extrude the mechanical cross-section into 3D masonry, derive joints/surface geometry from the mechanical state, add a composed view. Keep simulation data independent of the renderer.

**Phase C — comparison:** contrast a bonded bridge or XPBD cable suspension bridge with the masonry arch. Only consider MPM or more advanced surface reconstruction when a specific failure mode requires them.

XPBD may be a practical first choice for bonds and cables, but XPBD distance constraints alone do not reproduce frictional masonry contacts, buckling, or realistic fracture. Break thresholds and damping are approximations until validated.

## Minimal evidence to capture

- Seed/build identifier, fixed `dt`, number of bodies/constraints/contacts, and solver iteration count.
- Initial settle behavior: drift, maximum penetration, kinetic energy trend, whether supports remain fixed.
- Intervention: which contact/support was removed, when, and resulting motion/bond failures.
- Frame rate and device/browser, plus whether the scene actually rendered on a phone.
- A concise diagnostic export (JSON), without substituting logs for visual observation.

## Acceptance tests

1. The initial view reads unmistakably as a bridge with a believable load path and coherent silhouette.
2. Its parts share real geometric contacts; no arbitrary rotating stair segments or disconnected ornament.
3. A support perturbation produces a consistent, explainable response, rather than a scripted collapse.
4. Reset reproduces the same state.
5. Diagnostics can explain what bears the load and what failed.
6. The mobile browser runs it without a parent scroll or mandatory controls panel.

## Non-goals

No full CAD editor, generalized world engine, city generator, high-fidelity finite-element claims, production structural analysis, or premature unified material simulator. The visual reference is inspiration; the actual experiment is whether **bearings and material continuity** give us the coherence missing from the first architecture toy.

## Next turn

Implement the smallest falsifiable contact/load-path scene. **Do not begin with more drag handles.** First make one structure worth looking at, then make its bearings observable.
