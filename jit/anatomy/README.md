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

## Experiment 003 — Skinned Figure (2026-11-15)

- Source: [`skin/index.html`](./skin/index.html)
- Live: https://bonoj.github.io/jit/anatomy/skin/
- Replaces the earlier pose-slider-only implicit experiment. The rest-pose implicit surface is extracted once, welded and given persistent skin indices/weights.
- The surface is bound as a Three.js `SkinnedMesh` to a 13-bone hierarchy corresponding to Anatomy 002's articulated torso, shoulders, elbows, hips, knees and ankles.
- Idle, walk, run and arms-out controls use Anatomy 002's animation equations and timing; speed, wireframe, orbit and pinch are retained.
- Limitations: approximate skin weights, no anatomically authored edge loops, no guaranteed absence of pinch at extreme poses. A single skinned mesh with fixed topology is not proof of anatomically correct deformation. GitHub source readback only; live browser performance and deformation unverified.
