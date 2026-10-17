# Living Institute — progress

## Evidence and recovery
Last user-observed working runtime: `6f63b78b27de03be5ffe644eb52a6c7751ae2c88` (~60.53 FPS).
Starting source: `aca07e2040603da2193923231b4f556d9ecd53bd`.
Read complete Conjoiner, README, charter §§0–19, North Star and viewed repository triptych.
Only `jit/chaos/` may change. Recovery branch stays untouched.

## Phase plan
1. Correct observer dependencies and presentation transform; test actual factory without Wanderer.
2. Finite-stock sensing/assembly/repair machine using entity contract and existing debris engine.
3. Expand functional anatomy, ecology and supported Crown/Seam/Underside circulation after causal gates.

## Slice 1 — sovereign view
- Fixed demonstrated double offset: terrain.group already translates; child entity root no longer translates again. Removed compensating offset from frame-error measurement.
- Offsets now supplied by WorldView; optional `?observer=none` skips Wanderer construction. Navigation becomes an explicitly disabled client.
- Corrected `abioentropy` argument to `abiogenesis`; existing secondary capture now receives its intended fixture.
- Public `Chaos` handle exposes inspection and `setViewOffset` for independent testing.
- Tested actual createEntropy factory with real Three.js 0.180.0 under Node (rendering excluded): no-Wanderer boot/update/inspect; (3,4) view shift yields exactly (-3,0,-4) presentation shift and unchanged terrain positions/253 BB inventory; frame error zero.
- Syntax check passed. Browser installer failed (truncated archive); preexisting browser binary also truncated and crashed. No browser/shader/FPS claims from Node tests.
- Secondary capture is wired, not yet behavior-verified. Live deployment/executing build verification pending.

## Risk register
- Legacy loose-BB vessel/capture physics remains view-coupled by explicit legacy policy; general physical view invariance is NOT yet proved for loose matter.
- Single-sample practice supports and scripted surveyor are fixtures, not mechanical realism.
- Actual GPU-visible counts remain unknown; no CPU clipping reinstated.
- Browser/mobile performance and fragment-boundary visual regression require separate evidence.

## Slice 1 publication evidence
- Remote source commit `78bda27208d38fe302c2c8d15048b2784ca57dc3`; full read-back exactly matched intended HTML (blob `5d1f9b6376cdb496a599c79b8c924f2a08992af0`).
- Pages workflow `39031291440` completed successfully for that SHA. Cloud browser loaded displayed `78bda272`.
- That browser cannot create WebGL: `GL_VENDOR = Disabled, GL_RENDERER = Disabled`. A later mount error masked the original graphics failure. Slice 2 preserves the original exception and stops mounting a half-initialized host. This is NOT evidence of successful rendering or a phone regression.
- Local `git push` had no configured credentials (`could not read Username for https://github.com`). No authentication/authorization denial was returned by GitHub. Used the already connected GitHub app's supported blob/tree/commit/ref operations; remote expected-head lease and exact read-back succeeded. Local commit `d490e0a` was never pushed; remote `78bda272` is authoritative.

## Slice 2 — Mnemonic Loom (implemented)
A first working machine, not the completed civilization:
- 2,437 owned BBs: 253 retained practice BBs, 2,084 additional structural/optic/carrier/tendon fixtures, and 100 finite-stock working BBs.
- Ribbed foundry, independently sampled terrain footings, dorsal gantry, 816-BB constrained sensing iris, 180-BB segmented carrier, finite stockpile and staged 100-BB span. Existing contract renderer and unchanged aperture GLSL are reused.
- Capacity-eight carrier actually changes inventory and position. Survey precedes loading; delivery precedes assembly. Simplified support/load rules close the span when a footing fails. This is not FEA or a dynamic cable solver.
- Sensor connection controls operation; aiming actuator has angle/rate limits and energy cost. Explicit abstract ambient source supplies six work-energy units/second into a 180-unit store; powered movement/fabrication can stall on shortage. No thermodynamic calibration is claimed.
- Guided single failure sheds 16 owned span beads into the existing debris engine. Carrier follows actual loose positions, contacts/reclaims them, returns finite stock, and rebuilds. Afterward it operates until another disturbance. ⚡ requests local span damage; ☄️ retains meteor/terrain disturbance.
- Four independent footing heights shape the lower columns; loss of contact is detected. Salvage workspace and tendon reach are explicit; unreachable matter is retained and reported, not deleted.
- 60 Hz fixed simulation; bounded eight-step catch-up records dropped time. Pause/resume UI, single-step API, frame interval percentiles and CPU step timings.
- Loom checkpoint every five seconds and on page hide, preserving ledger, machine state and its physical debris. Tested reload reconstruction through multiple incomplete salvage states. **Scope is Loom only:** terrain edits, legacy observers/cradle and meteor flight are not persisted. Unsupported terrain inhibits checkpoint overwrite. Full-world persistence remains open.

### Reuse decisions and changed boundaries
- Entity contract now accepts point recipes and constrained poses; dynamic part count is physical assembly inventory, never view culling. Existing practice inventory and fragment aperture remain.
- Extracted existing aperture GLSL into `applyChaosAperture`; shared by contract and debris. Removed loose-BB center culling, keeping continuous fragment visibility. GPU compilation remains unverified here.
- Debris remains the sole loose physics engine. Added public tagged-batch locate/collect/checkpoint APIs. Collection validates/commits a ledger transfer before removal. Tags distinguish Institute world-space matter from legacy vessel/capture fixtures. Institute beads do not change physical ownership when viewport/observer moves. Untagged legacy capture behavior remains, with a tested secondary fixture.
- One ledger governs all contract/Institute beads; renderer counts follow balances. Terrain lattice and unrelated loose material remain separately reported, not falsely reconciled into this scope.
- `createEntropy` composes narrow factories and clock; anatomy recipes, ledger, rendering, machine controller and physics remain separate internal boundaries.

### Automated evidence
`acceptance.mjs` extracts the actual factories from the monolith and runs against official Three.js 0.180.0. `ACCEPTANCE_RESULTS.json` pins the tested source SHA-256.
Passed: no-observer boot; conservation every one of 9,000 ticks; assembly → damage → contact salvage → repair; exact full machine-state replay under view shifts; 30/120 Hz frame cadence equivalence; checkpoint replay at ticks 750/3600/3700/4200; malformed checkpoint rejection; sensor/transport fault recovery; power starvation/recovery; invalid transfer rejection; secondary capture; uneven footing/support-loss test.
Baseline completed first span around tick 3,300; completed repair before tick 4,561 (~76 simulation seconds). At tick 9,000: fixtures 2,337, span 100, stock/carrier/debris zero; total 2,437; ledger checksum `56000a11`.
Syntax check passed. These are executed non-WebGL tests, not merely source inspection. They do not establish shader compilation, visual quality, browser storage behavior, mobile FPS, or load realism.

### Next executable work
1. Obtain rendering evidence on WebGL-capable browser/phone: loaded SHA, shader errors, Loom states, support contacts, visible stock/cargo/assembly and boundary sweep. Do not change rendering spec in response to this cloud browser's disabled GPU.
2. Complete whole-world persistence: terrain signed field, pending disturbances, remaining physical entities, versioned schema and migration/reset UI. Current checkpoint must not be described as a saved entire world.
3. Strengthen load-bearing span and tendon mechanics; support-specific damage and repaired foundations; make flow sensors observe independent ports.
4. Grow Crown/Seam/Underside anatomy through conserved recipes and actual traversable openings. The present Loom is a rich first mechanism, not the North Star's full civilization.
5. Profile actual phone render/update distributions before increasing density. Never silently cap material.

## Current source checkpoint
- Executable source: `4ec4995acd9ffc704ffd1bcea8371290a14ada95` (Mnemonic Loom).
- All six changed files read back byte-for-byte; HTML blob `b50db33cf0e95261bc64e31db1eca903e8e890a1`.
- Git comparison confirmed every changed path stays under `jit/chaos/`; protected root and recovery branch untouched.
- Default-Wanderer run also matched the no-Wanderer machine state at 9,000 ticks.
- Deployment of this new slice is pending at this record's write time; check latest `Promote stable world` run and canonical `build.json`. Later documentation-only commits do not change this executable source blob, though the publisher stamps their deployment commit.
- Browser verification still blocked by this cloud environment's disabled WebGL; request phone 👁 report before claiming visual/60 FPS acceptance.
