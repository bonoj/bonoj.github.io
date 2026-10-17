# Living Institute — internal component catalog

All components remain in index.html. No extraction in this experiment.

| Capability | Inputs / output | State / cadence / invariants | Debt |
|---|---|---|---|
| WorldView (composition-root adapter) | finite x,z offset → terrain presentation | offset and aperture; on request; no ownership changes | extractable factory later; legacy capture physics uses offsets |
| createTerrainEntityContract | Three, terrain, surface query, view → update/inspect | entity identities, recipes, instanced BBs; terrain.group translates exactly once | primitive geometry; single anchor support; no transfer yet |
| createBeadDebris | terrain, view offset, physical capture fixtures → emit/forces/update/inspect | sole loose-BB authority; pooled growing instancing; no hidden population cap | no recovery interface yet; physical capture vs presentation needs separate testing |
| createTerrainSurfaceQuery | terrain signed field → top surface height/null | stateless; sample on demand | top only; underside anchors need signed-field query |
| createImpactDispatcher | debris, receiver arrays, terrain → dispatch/inspect | meteor force propagation and terrain crater | Institute receiver not yet registered |
| createMaterialSurvey | populations, debris → snapshot | survey only, not transactional authority | entity inventory appended by composition root |

Reuse decision: preserve existing terrain, aperture shader, debris integrator, material survey and impact dispatcher. Correct concrete wiring faults first. Extend debris with public recovery/transfer operations only when the first causal machine needs them. Do not add a competing particle simulator.
