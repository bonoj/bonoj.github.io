# ASTRA — START HERE
**Single entry point for the first Living Institute run.**
**Workspace:** `bonoj/bonoj.github.io` → `jit/chaos/`
**Canonical runtime:** https://bonoj.github.io/jit/chaos/
**Verified starting runtime:** `6f63b78b27de03be5ffe644eb52a6c7751ae2c88` (user observed ~60.53 FPS, no shader errors). Later commits to documentation do **not** establish a newer live runtime.

## Read in this exact order
1. **This file** — operating contract and map.
2. **`README.md`** — verified state, recovery checkpoint, constraints, and handoff. Read the newest cold-handoff and view-authority sections; earlier CPU BB-clipping notes are obsolete and explicitly superseded.
3. **`ASTRA_LIVING_INSTITUTE_SPEC.md`** — the **entire** engineering charter, including sections 16–19. Do not stop after the early roadmap: sections 16 (existing-system integration), 17 (rich BB ecosystems and monumental anatomy), 18 (cybernetic biomechanical design), and 19 (monolith packaging with internal composability) are mandatory.
4. **`index.html`** — actual source of truth for executable behavior. It is the existing frozen monolith; inspect the named functions and their call sites rather than rebuilding from upstream.
5. **`build.json`** if present — deployment identity evidence, not a replacement for user-observed executing SHA.

## Find the machinery without leaving Chaos
Search `index.html` for:
- `createEntropy` — composition root, scheduling, wiring, inspection.
- `createTerrainEntityContract` — authored structures, BB lattice, anchors, fragment-level visibility.
- `worldView`, `terrain.setOffset`, `createWanderer` — presentation offsets and current legacy tracking. **No world machinery may require a Wanderer.**
- `createHermeticon` — shell, interior radius, viewport presentation.
- `createTerrain`, `createTerrainSurfaceQuery` — signed terrain, supports, contact, material, impacts.
- `createBeadDebris` — authoritative loose BB simulation, vessel wall and secondary capture behavior, collision, emission, ownership telemetry.
- `createMaterialSurvey` — existing inventory/inspection path; currently `populations:[]`, entity counts appended in `createEntropy`.
- `createGravitySystem`, `uniformGravity`, `createTerrainContact`, `createConnectedLimbs`, `createKineticBody` — physical mechanics; some trials disabled.
- `createCinderfall`, `createImpactDispatcher` — meteor and force propagation.
- `createObservationLens`, `createTerrainNavigation` — visual treatments and tap handling.
These are existing functions in the frozen Chaos artifact, **not instructions to copy new modules from other repositories**.

## Non-negotiable build contract
- Build directly in `jit/chaos/index.html` and keep a **single deployable monolith**. Internally preserve factory/capability boundaries, injected dependencies, explicit update and inspect methods. `createEntropy` composes; it does not become a god object.
- Keep the physical world independent of Hermeticon and Wanderer; the Hermeticon defines an aperture into the world, not the existence of matter. No whole-cluster popping. Distinguish physical BB ownership from GPU visibility.
- Reuse existing BB debris, capture, terrain, gravity, contact, impact, and rendering systems. If extending them, first inspect their implementation and describe the precise reuse boundary.
- Material conservation is real: structure → debris → recovery → new structure is a ledgered ownership transfer, not cosmetic particles.
- Build cybernetic biomechanical architecture and ecology at the **user's supplied reference-image level of richness**: dense BB anatomy, segmented creatures, branching life, articulated mechanics, meaningful sensing, large focal instruments, striking silhouette and negative space. The image descriptions and acceptance requirements are in spec §17–18. The actual image attachments live in the originating conversation, not this repository; if unavailable, use the detailed descriptions rather than claiming to have viewed them.
- Phone-first, target 60 FPS; profile actual costs, do not hide material by silently capping BBs. Preserve existing shader and terrain-only hybrid treatment unless a measured change justifies modification.
- Do not touch the protected root site, Abyss, Hermeticon, Arcana, other JIT experiments, or the pinned `chaos-seed-v1` recovery branch. Do not regenerate `index.html` from upstream.
- Git commit/read-back, Pages deployment, and live browser observation are distinct verification stages. Never say live merely because a commit succeeded.

## Known sharp edges to investigate
- `createBeadDebris` signature accepts `abiogenesis`; `createEntropy` call site currently passes `abioentropy`. Investigate and test secondary capture before relying on it.
- `botanicalOffset` still reads Wanderer state and feeds debris and meteor; migrate these dependencies to `worldView` before claiming a no-Wanderer world.
- Current entity presentation applies view offsets in addition to terrain transforms. Check coordinate-frame arithmetic for double offset; instrument physical and presented coordinates separately.
- GPU-fragment clipping makes exact visible BB count unavailable without readback; `null` is intentional. Do not fabricate counts.
- Existing practice entities total 253 BBs; they are contract fixtures, not the final Institute.
- Old README sections describe rejected per-BB CPU clipping; current shader fragment aperture supersedes them.

## How to work
1. Read the complete charter and inspect the real code. State a compact architecture map and immediate first vertical slice.
2. Begin **implementing**, not just planning. Phase 0/1 should establish observer-independent world view and a reliable test path without breaking the existing running build. Then build material conservation and a genuinely working biomechanical slice.
3. After each substantive change: read back source, perform available syntax/static checks, check deployment, and request runtime JSON or user visual confirmation if browser execution cannot be verified directly.
4. Maintain `COMPONENT_CATALOG.md` (component boundaries, inputs/outputs, ownership, extraction readiness) and `ASTRA_PROGRESS.md` (commits, tested claims, failures, next step) inside `jit/chaos/`. Create these as you begin work.
5. Deliver end-to-end causal behaviors, not isolated scaffolding. Follow the charter's acceptance experiments and mark each **observed**, **source-verified**, or **unverified**.
6. Keep the live-working baseline recoverable. If blocked by GitHub writes, inspect existing repository recovery paths; do not repeatedly brute-force identical failing writes or abandon the task.

## What a successful first session looks like
Astra has read the entire spec, inspected the existing engine, documented a component map and phase plan, committed a small meaningful functional improvement within Chaos, verified the source read-back, and clearly identified what still needs deployment/browser evidence. Continue autonomously through subsequent slices as the environment permits.

**Mission:** Make the Living Institute astonishing, materially honest, biomechanically alive, observer-independent, and architecturally composable — **inside the monolith**.
