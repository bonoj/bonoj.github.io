# ASTRA — CONJOINER
**Permanent entrypoint and operating contract for the Living Institute.**
**Workspace:** `bonoj/bonoj.github.io` → `jit/chaos/`
**Canonical runtime:** https://bonoj.github.io/jit/chaos/
**Verified starting runtime:** `6f63b78b27de03be5ffe644eb52a6c7751ae2c88` (user observed ~60.53 FPS, no shader errors). Later commits to documentation do **not** establish a newer live runtime.

## Read in this exact order
1. **This file** — operating contract and map.
2. **`README.md`** — verified state, recovery checkpoint, constraints, and handoff. Read the newest cold-handoff and view-authority sections; earlier CPU BB-clipping notes are obsolete and explicitly superseded.
3. **`ASTRA_LIVING_INSTITUTE_SPEC.md`** — the **entire** engineering charter, including sections 16–19. Do not stop after the early roadmap: sections 16 (existing-system integration), 17 (rich BB ecosystems and monumental anatomy), 18 (cybernetic biomechanical design), and 19 (monolith packaging with internal composability) are mandatory.
4. **`ASTRA_NORTHSTAR.md`** (with [`ASTRA_NORTHSTAR.png`](./ASTRA_NORTHSTAR.png)) — the Crown / Seam / Underside visual and functional north star. Aspirational guidance; executable geometry and charter invariants take precedence.
5. **`index.html`** — actual source of truth for executable behavior. It is the existing frozen monolith; inspect the named functions and their call sites rather than rebuilding from upstream.
6. **`build.json`** if present — deployment identity evidence, not a replacement for user-observed executing SHA.

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

## Self-contained GitHub write recovery (no Gate or Sanctum dependency)

This protocol is part of Chaos's own handoff. GitHub tool names below describe capabilities, not guaranteed permissions or guaranteed successful writes. Discover available tool signatures before calling them. **Never interpret a safety/policy refusal as a transient API error or attempt to bypass it.** For ordinary transport errors, diagnose once and switch to a legitimate supported method.

### Normal path — small edits
1. Fetch the target file and record its current blob SHA.
2. Edit only the intended source section, preserving all other content.
3. Update the file using its current blob SHA and an explanatory commit message.
4. Fetch the file again and compare exact content, record the resulting commit SHA.
5. If the SHA is stale (409/conflict), re-fetch and merge the intended change against the new version; do not blindly overwrite concurrent work.
6. Check the resulting commit and Pages state independently; only browser-executing build evidence proves what is live.

### Large frozen monolith — transport alternatives
The full `jit/chaos/index.html` may exceed comfortable contents-update limits. **Do not repeatedly send the same oversized payload.** If the available GitHub API supports it and the failure is a size/transport limit rather than an authorization or policy denial, use Git's native tree/commit/ref path:
1. Fetch the current branch ref/head and parent tree (inspect the precise tool signatures).
2. Create a blob for the intended full file content using `create_blob`, within that tool's size limits.
3. Create a tree based on the current tree, replacing **only** `jit/chaos/index.html` (and any separately intended Chaos documentation files). Preserve every unrelated path.
4. Create a commit pointing to the new tree and current head as parent.
5. Update the intended branch ref with the new commit, without force-pushing.
6. Re-fetch the exact target path and commit to verify content and ancestry.

**If blob creation itself rejects the payload:** Stop that path. Check whether the environment offers an authorized local checkout + `git` push, or a documented chunk-transport/assembly mechanism with independent integrity checks. Use only available, authorized tools. Never claim chunk transport exists merely because another project once had one. If no supported method is available, preserve the exact patch and report the blocker; do not fabricate success or corrupt the monolith.

### Failure classification and next action
- **Stale SHA / ref moved / conflict:** re-fetch latest head and rebase or merge the specific change; do not force.
- **Payload too large / timeout / truncation:** switch from contents update to blob/tree/commit/ref, or a supported local Git workflow. Verify full bytes/hashes.
- **Rate limit / temporary 5xx:** back off, preserve the patch and retry sparingly; do not loop.
- **401/403 permissions or authentication:** stop writes, identify required authorization; do not switch tools to evade a restriction.
- **Policy or safety refusal:** stop the refused action and report it accurately. Do not relabel as a transport problem.
- **Unexpected content / malformed result:** inspect current remote state before any further write. Never assume a failed response means no commit occurred.
- **Successful commit but stale Pages:** verify workflow/build/deployment status, then inspect canonical URL and executing SHA; do not destroy browser state or change cache-busting conventions without evidence.
- **Broken live runtime:** record failing SHA and error, restore the last verified working artifact through a new, verified commit only when necessary; preserve diagnostics and document the rollback.

### Persistence and cold restart
Maintain `ASTRA_PROGRESS.md` with: last verified working runtime SHA, current source commit, completed/failed changes, exact blocker and tool response, next intended patch, acceptance evidence, and what remains unverified. Maintain `COMPONENT_CATALOG.md` for reusable boundaries. If a session ends mid-write, **re-read remote state first** and resume from the last verified commit rather than trusting a prior attempt.

### Verification ladder
1. **Prepared** — patch exists.
2. **Committed** — GitHub returned a commit SHA.
3. **Read-back verified** — fetched source matches the intended change.
4. **Deployed** — Pages/deployment evidence references the expected commit.
5. **Executing** — runtime observation or browser instrumentation confirms the actual loaded build.
6. **Behavior verified** — acceptance instrumentation and user-visible behavior match the requirement.

Never collapse these stages into the word "live". The existing Chaos README and full charter provide the project-specific invariants; this section provides the complete **local recovery decision tree** without requiring Gate, Sanctum, or another repository.

## How to work
1. Read the complete charter and inspect the real code. State a compact architecture map and immediate first vertical slice.
2. Begin **implementing**, not just planning. Phase 0/1 should establish observer-independent world view and a reliable test path without breaking the existing running build. Then build material conservation and a genuinely working biomechanical slice.
3. After each substantive change: read back source, perform available syntax/static checks, check deployment, and request runtime JSON or user visual confirmation if browser execution cannot be verified directly.
4. Maintain `COMPONENT_CATALOG.md` (component boundaries, inputs/outputs, ownership, extraction readiness) and `ASTRA_PROGRESS.md` (commits, tested claims, failures, next step) inside `jit/chaos/`. Create these as you begin work.
5. Deliver end-to-end causal behaviors, not isolated scaffolding. Follow the charter's acceptance experiments and mark each **observed**, **source-verified**, or **unverified**.
6. Keep the live-working baseline recoverable. If GitHub writes fail, follow the **self-contained GitHub write recovery** protocol above. Do not depend on Gate or Sanctum, repeat a blocked operation, or abandon a preserved patch.

## What a successful first session looks like
Astra has read the entire spec, inspected the existing engine, documented a component map and phase plan, committed a small meaningful functional improvement within Chaos, verified the source read-back, and clearly identified what still needs deployment/browser evidence. Continue autonomously through subsequent slices as the environment permits.

**Mission:** Make the Living Institute astonishing, materially honest, biomechanically alive, observer-independent, and architecturally composable — **inside the monolith**.
