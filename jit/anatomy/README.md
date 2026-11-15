# Anatomy — Procedural Humanoid Geometry Laboratory

Live: https://bonoj.github.io/jit/anatomy/

## Objective

Investigate whether continuous, pleasant humanoid surfaces comparable in visual quality to authored character meshes can be constructed procedurally from a compact anatomical description.

## Experiment 001 — Continuous Arm

- Single indexed quad strip, 100 longitudinal segments × 32 radial segments (6,400 triangles), spanning shoulder to wrist.
- Cross-sectional radius profile with shoulder, biceps, elbow and forearm volumes; adjustable fullness and ellipticity.
- Elbow flexion bends the integrated centerline with a smooth transition, then generates an orthogonal ring frame along the curve.
- Geometry is rebuilt in-place as flexion changes, with computed vertex normals.
- Interactive: flexion, transition width, muscle fullness, cross-section eccentricity, animated flex, wireframe, cross-section rings, orbit and pinch zoom.
- Dependencies: Three.js 0.160.1 via esm.sh; no Xbot mesh copied.
- Limitations: this is a continuous swept tube, not a fully anatomical arm. Ends are open, shoulder integration is absent, deformation may pinch at extreme flexion, no skinning or subdivision, no physically validated anatomy. The shape is not claimed to match Xbot yet.

## Next investigations

1. Inspect reference Xbot geometry quantitatively (vertex count, topology, curvature, normals, silhouette).
2. Add explicit anatomical landmarks and asymmetric radial cross-sections.
3. Evaluate elbow folds and volume preservation during flexion.
4. Compare subdivision vs swept rings and consider a full shoulder/torso junction.

## Verification

GitHub source write/readback is separate from GitHub Pages publication and mobile WebGL execution. Browser behavior must be tested independently.

## Experiment 002 — Full Figure (2026-11-14)

- Source: [`figure/index.html`](./figure/index.html)
- Live: https://bonoj.github.io/jit/anatomy/figure/
- Procedurally generated torso, pelvis, neck, head, arms, legs and feet using cross-section surfaces and ellipsoidal junctions.
- Idle, walk, run and arms-out motion; wireframe and touch camera controls.
- Limitation: segments are separately articulated and overlap at joints; not watertight, not skinned, and locomotion is illustrative rather than biomechanically grounded. Browser runtime not independently verified.

## Experiment 003 — Continuous Skin (2026-11-15)

- Source: [`skin/index.html`](./skin/index.html)
- Live: https://bonoj.github.io/jit/anatomy/skin/
- One extracted isosurface from smoothly united anatomical signed-distance volumes (torso, pelvis, neck, head, arms, legs, hands, feet).
- Pose sliders: arm elevation, elbow flexion, knee flexion; adjustable smooth-union width, wireframe and orbit.
- Polygonization uses marching tetrahedra over a bounded voxel grid, followed by shared-vertex welding and computed normals. Source committed and read back; live WebGL performance not independently verified.
- Caveat: topology can change as pose changes; smooth unions can produce bulbous junctions, and this is not a persistent skinned rig. Geometry is regenerated on pose change, not every animation frame.
