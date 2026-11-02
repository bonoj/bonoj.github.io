# Material Forge — Composable 3D Worlds Specification
Status: DESIGN SPECIFICATION ONLY — 2026-11-02
Authority: jit/materials/README.md governs existing forge behavior. This spec proposes a future layer; it does not authorize replacing the specimen or rewriting the forge.

## Thesis
Create a distinctive, generative 3D visual language in which geometry, topology, material response, lighting, and accumulated world history compose into a coherent aesthetic. Do not require handcrafted models or downloaded textures for the core vocabulary. One world should support radically different interpretations without changing its underlying semantic structure.

## Visual references
Two user-supplied strategy-map screenshots: (A) a dense illustrated campaign diorama with organic contours, inked outlines, atmospheric layering, warm color and ornamental detail; (B) a spare low-poly territorial diorama with hard region borders, flat facets, limited palette, simple trees, and long directional shadows. These are reference poles, not assets to copy. Aim for an original style spanning both.

## Existing baseline — do not regress
- jit/materials/ has a fixed irregular icosahedron specimen, 37 indexed shader treatments, stable recipe IDs, orbit/pinch/zoom, population stress field, Copy recipe and Eye JSON.
- Object-space procedural fields avoid UV seams; preserve the radial relief seam correction.
- Substance (granite, oak, ice) is distinct from treatment (frosted, wet, cracked, weathered).
- Existing atmosphere and water are surface approximations, not volumetric scattering or physical refraction.
- jit/materials/fusion/ is a separate SDF experiment, not a replacement for the forge.
- README is the operating contract; CHRONICLE is history; index.html is executable truth.

## Semantic geometry vocabulary
1. MASS: tapered prisms, extruded polygons, faceted clusters, shells, strata. Mountains, cliffs, towers, bodies.
2. SURFACE: terrain patches, paths, membranes, ribbons, exposed layers. Continuous and deformable where needed.
3. BRANCH: hierarchical trunks, roots, roads, rivers, veins, structural braces. Connectivity is first-class data.
4. FIELD: temperature, moisture, light, wind, influence, magic, stress. Spatial signals drive appearance and change.
5. ASSEMBLY: constrained connected components, anchors, joints, load paths, structural and semantic roles. Buildings, settlements, machines, creatures.

These are semantic objects, not just mesh factory functions. Geometry exposes local position, height, slope, orientation, curvature or approximations, topology, material region, structural role, and relevant history where available. Do not claim unavailable attributes are automatically known.

## Rendering layers
- Base substance: intrinsic color/scale/grain, anisotropy, roughness, specular response.
- Treatment overlays: snow, moss, soot, wetness, fracture, wear, corrosion, heat.
- Stylization: quantized light bands, palette remapping, faceted shading, selective outlines, curvature tint, edge wear, atmospheric perspective.
- Environmental response: world-space height/slope masks, exposure/shelter, wind, moisture, temperature, local field intensity.
- History: accumulated deposition, scorching, cracking, growth, repair and exposed interiors. Persistent state is distinct from transient visual effects.
- Presentation: orthographic/perspective camera, shadow direction, ambient fill, fog, contrast, contour strength, detail density.

Prefer continuous 3D procedural coordinates and geometry-derived masks over imported image textures. Explicitly label approximations (e.g., shader glow versus actual light emission onto nearby geometry).

## Style space, not style switch
Expose independent controls for facet emphasis, ink contours, lighting quantization/contrast, palette, weathering, atmospheric depth, and detail density. Style presets may establish coherent combinations, but each axis can vary. One unchanged scene must support at least three visibly different recipes: illustrated diorama, geometric diorama, and a novel hybrid. A material recipe should not own world topology.

## Composition contracts (proposed)
- Substance + ordered treatments + stylization + environment + history -> resolved surface appearance.
- Define blend priority and conflict rules before stacking arbitrary shaders; masks and layers must be inspectable.
- Shared global palette/light uniforms plus local semantic attributes; avoid one-off bespoke shaders for every object.
- Recipes have stable IDs, versioned schema, documented inputs, defaults, limitations, and serialization.
- Example conceptual schema (not executable API):
  material: {substance:'basalt', treatments:[{id:'snow', mask:'upward-exposure'}], style:'ink-facet', history:['fractured']}
- Shader composition need not be built until concrete scenes expose its necessity. Preserve existing forge recipe format.

## World consequences as rendering inputs
A growing forest changes shelter, light and snow deposition. A rotating gear settlement changes relative gravity and structural loads; when buildings fracture, connected parts detach according to anchors and constraints, interiors expose new material, dust inherits local palette, and damage persists. This requires actual simulation/topological state; visual shaders alone do not supply physics, fracture, or structural integrity. Never silently substitute disconnected floating blocks for coherent structures.

## First proving scene
One genuinely 3D, orbitable, pinch-zoomable floating island containing a mountain, forest, tower and winding path. All core forms generated procedurally. The same exact geometry and semantic scene graph render in three visual treatments. No image textures or imported models required. Include controls for style dimensions and an Eye diagnostic export. Keep this as a separate satellite scene or future experiment; do not replace the fixed-specimen forge.

## Acceptance tests
1. Orbit visibly reveals real depth, occlusion, backfaces and grounded object relationships; no 2D canvas pretending to be 3D.
2. Three styles use identical topology and object placement; only rendering/style parameters change.
3. Rock, wood, foliage, snow and soil remain recognizable through material response, not color alone.
4. No conspicuous UV/projection seams; no face-boundary cracks from displacement.
5. Branches and assemblies remain connected when transformed; deliberate fracture is explicit and observable.
6. At least one field visibly affects two different material families coherently.
7. At least one history event leaves persistent visual evidence after the transient animation ends.
8. Mobile touch orbit/pinch remains usable; measured diagnostics distinguish frame interval from GPU time.
9. Recipe IDs, provenance, limitations, source SHA, and runtime observation status are inspectable.
10. Existing Material Forge controls and 37 recipes are unchanged unless separately authorized.

## Implementation sequence — hypothesis, not a mandate
A. Inspect current forge shader architecture and catalog; document reusable material interfaces.
B. Build the separate single-island scene with semantic MASS/SURFACE/BRANCH/ASSEMBLY objects.
C. Apply three presets over the exact same geometry; compare screenshots and phone observations.
D. Add environmental FIELD response and one persistent history event.
E. Only then extract a reusable composition API if the actual scene demonstrates the need.

## Operational rules
Read current source and CHRONICLE before edits. Keep JIT isolated; never modify protected root site or Hermeticon incidentally. Preserve rollback, source readback, cache-busted Pages links, and explicit distinctions among committed, deployed, and browser-verified. Protect the play: prioritize aesthetic discovery and visible consequence over infrastructure or premature optimization.

## Guiding proposition
The world does not merely wear a style. Its form, forces, history, and material behavior produce that style.
