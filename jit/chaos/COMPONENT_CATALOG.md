# Living Institute — internal component catalog

All deployable code stays in index.html. `acceptance.mjs` is an external test harness, not a runtime module. None of these boundaries has been extracted into another project.

| Capability | Inputs → outputs | Owned state / cadence | Invariants and known debt |
|---|---|---|---|
| WorldView adapter | finite offset → terrain presentation | offset, center, radius; on request | terrain.group translates entities once; legacy untagged capture remains view-coupled |
| applyChaosAperture | material, view → shader hooks | no physical state; shader compilation | same baseline GLSL; fragment clipping does not alter ownership; GPU regression pending |
| createTerrainEntityContract | Three, terrain, surface, view → compose, setPartCount, setPose, partPose, partPoints, update, inspect | recipes, identities, instanced geometry; fixed-step pose changes | dynamic part count means physical assembly only; unknown fragment visibility stays null; practice fixtures retain legacy scripted motion |
| createChaosLedger | initial balances → transfer, record, count, inspect, validate/restore | integer owners, fixed total, 128-event history, cumulative checksum; transactions | no negative balances/missing destination; all contract fixtures + Loom included; terrain lattice and unrelated debris explicitly outside scope |
| createLoomAnatomy | footing-height function → material-group point recipes | stateless | finite bill of materials; independently resolved lower feet; reusable recipes, not a physics solver |
| createMnemonicLoom | entities, terrain surface, debris → update, damage, command, blast, inspect, snapshot/restore | phase, carrier pose, sensor/controller/actuator, energy, ledger; 60Hz control / 5Hz support sense | capacity eight; 100 working BBs; four supports; finite power; geometry follows material receipts; explicit kinematic carrier/tendon and simplified load rules |
| createBeadDebris | terrain, offset, capture fixtures, view → emit, impulses, update, locateBatch, collectBatch, snapshot/restore, inspect | sole loose-BB collection and growing instancing; fixed-step integration | tagged Institute material stays world-space; legacy captures preserved; contact recovery removes beads only after accepted receipt; shader-visible count unknown |
| createChaosClock | step callback, dt, catch-up budget → update, step, pause, inspect | tick, accumulator, dropped time, bounded timing sample; 60Hz | same fixed steps independent of frame cadence; dropped wall time explicit; not offline progression |
| createTerrainSurfaceQuery | signed field → top surface/null | stateless | underside supports still need dedicated signed-field query |
| createImpactDispatcher | receiver arrays/debris/terrain → dispatch/inspect | last impact | existing meteor pipeline calls Loom.blast; crater support consequences follow surface query |
| createMaterialSurvey | populations, debris → snapshot | observational | composition root includes actual contract inventory; ledger total and survey total can be compared |
| Browser checkpoint adapter | localStorage, Loom public snapshot/restore → five-second/page-hide save | key chaos.mnemonic-loom.v1, status/error | Loom-only persistence; unsupported support changes retain previous checkpoint; future incompatible recipes must bump schema/key |

## Extraction-readiness review
Ledger, anatomy, clock, aperture and Loom factories depend only on arguments and local helpers; each can move to a file without behavioral changes. Do not actually extract in this experiment. The composition-root view adapter and browser UI/storage code remain explicit integration debt. No capability reaches into another component's private bead array.

## Public testing controls
`Chaos.inspect()`, `Chaos.pause(boolean)`, `Chaos.step()`, `Chaos.setViewOffset(x,z)`, `Chaos.disturb()`, `Chaos.loomCommand('sensorConnected'|'powerConnected'|'transportConnected',boolean)`, `Chaos.loomSnapshot()`, `Chaos.restoreLoom(snapshot)`.
Use `?observer=none` for no-Wanderer boot. The `Chaos` handle exists only after successful host initialization. Normal UI retains inspection/copy report, navigation and meteor; ⏸ pauses/resumes; ⚡ damages the Loom span.
