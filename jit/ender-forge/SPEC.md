# 🧠 Ender Forge — working specification

*Current runtime contract and next implementation frontier · 19 October 2026*

## Purpose
Introduce a sixth, initially resource-less participant into the mature Tiffany civilization. Ender is a situated, externally interpreted intelligence: each encounter yields local evidence, a choice, an observable consequence, and recoverable knowledge. No fictional continuous consciousness, omniscience, predetermined personality, or prescribed tech tree.

**Identity:** 🧠 brain-in-a-vat, **Rose `#FF82B5`**. Alternative considered: 👣 Midnight `#303C91`; brain preferred. Keep the icon/color separate from the future physical tower's appearance. The existing five land colors and symbols remain unchanged.


## Current runtime

### Bounded cognition and diary (19 October 2026)
The running Ender now samples its **own local observation every ~3 simulation seconds** (not merely on tap). It maintains a bounded, lossy landmark map (maximum 36 entries, aging by last sighting and repeat count), up to eight significant recent observation changes, and five goal transitions. Familiar stationary structures are identified by kind and quantized world position; workers/creeps are not falsely assigned stable identities. It selects a nearby previously seen landmark to revisit after an absence, or explores when no candidate qualifies; heading steers toward selected landmarks while retaining ordinary movement and collision constraints. This is **heuristic curiosity**, not an embedded LLM, introspective reasoning, or learned causal theory.

A single 🧠 tap now copies a compact **first-person field diary plus structured `ender-mind/v1` evidence** in one clipboard payload. Diary summarizes present entities with in-world emojis, recent changes, landmarks, current goal and goal transitions. Structured section retains precise local sightings, timestamps and evidence for audit. A single `ENDER_COGNITION_ENABLED` switch disables the memory/goal behavior and returns the original local JSON on tap. The world and Tiffany remain otherwise unchanged. Memory is in-page and resets with the world; no durable save/restore or external model invocation. Source parsing is not browser-runtime verification.


## Perception and safety invariants

- Ender sees only its local 125-unit radius; the global Tiffany observer is privileged and unavailable to Ender.
- Ender has no tower, territory, inventory, workers, harvesting, combat, or access to Tiffany's resources.
- Preserve existing tower avoidance, physical movement, touch priority, mobile one-page UI, and single 🧠 clipboard copy.
- Ender's cognition is a heuristic mechanism, not an embedded model or a claim of subjective experience.
- Memory is currently session-only; reset clears it. Human tower relocation is a known confound in the live observations.
- Edit only `jit/ender-forge/`; never `jit/evermore-2/`. Parse inline scripts, verify source readback, and distinguish commit/deploy/browser verification.
- [README](./README.md) is the entrypoint; [CHRONICLE](./CHRONICLE.md) holds experiment history and earlier design; this file is the active behavior specification.

## Event attention, commitment, and closure — first implemented slice (19 October 2026)

**Evidence motivating this slice:** Live reports at T+13/41/71/83/109 (see [CHRONICLE](./CHRONICLE.md)) demonstrate local sampling, repeated landmark recognition, and self-selected revisit goals. They also show cargo-bearing 🐝/🪱 workers within view, changing 🌋 stage and resource distributions, and rapid goal changes (scarab → bee → scarab; scarab → moth → 🌳) without recorded outcomes. The human deliberately moves towers during this experiment; do not infer autonomous navigation success or stationary world state from the resulting geography.

### Behavioral contract

1. **Detect locally witnessed changes, not merely counts.** Compare consecutive bounded observations. Distinguish `newly visible`, `no longer visible`, `cargo observed`, `cargo state changed`, `terrain stage changed`, and `structure position changed or identity uncertain`. Never infer a delivery, death, or causal event from an entity merely leaving the 125-unit sensing radius. Workers lack stable IDs; aggregate carrying counts by kind/region until real identity evidence exists. Terrain/structure identity must be conservative under human relocation.
2. **Let questions emerge from evidence.** Derive investigation candidates from novelty, recurrence, unresolved change, and prediction mismatch; do not script a task list such as “collect mushrooms.” A candidate retains `subject`, `question`, `evidence`, `expected observation`, `priority`, `expiry`. Nearby cargo activity may compete with distant landmark revisits. All scores must be auditable heuristics; never fabricate internal thoughts.
3. **Commit, with meaningful interruption.** Keep an active investigation until a witnessed outcome or explicit stopping condition: `observed`, `arrived`, `answered`, `unreachable`, `stale`, or `interrupted`. A new candidate should not preempt merely because it is marginally higher-scoring; require an explicit priority margin or a substantial unexpected event. Add timeout/progress checks so Ender cannot endlessly pursue unreachable targets. Preserve physical movement, collision and avoidance; no teleportation or new powers.
4. **Record outcomes and revise.** On closure, record the original question, compact supporting/contradicting evidence, result and remaining uncertainty. Allow `unknown` as a valid result. A revisited depot is not evidence that a worker delivered cargo. Suppress immediate repetition of just-closed questions unless new evidence warrants reopening.
5. **Compact by relevance.** Recent changes remain specific; older repeats collapse into counts/patterns; retain surprising contradictions and completed investigations longer than routine sightings. Hard-cap all collections and the exported report. Prefer loss of low-value detail over unbounded growth. Avoid misleading precision or anthropomorphic claims.

### One 🧠 clipboard contract

Keep the existing tap footprint and one-copy workflow, with **human-readable emoji diary first**, followed by a machine-readable structured section. No new HUD, cards, modal or control. Use existing in-world glyphs where available, otherwise plain kind names; never invent emojis for unsupported types.

Target diary: a handful of short lines, normally below ~250 words, showing `Now`, `Changed`, `? question`, `→ action + reason`, `✓ / × / ? outcome`, and a compressed `Remember` only when useful. Do not claim subjective experience. Structured data should retain current local evidence, bounded recent event records, active investigation and decision/outcome trail, timestamps, source observation IDs, uncertainty and compaction counts. Schema is now `ender-mind/v2`; maintain one consistent source of truth between prose and data. Sampling-time and tap-time observations may differ; label them rather than implying simultaneous measurements.

### Acceptance / regression tests

- Controlled local change produces an event with source evidence; identical repeated samples do not flood the journal.
- Worker carrying is reported without inventing worker identity, pickup or delivery; loss of visibility remains unknown.
- A changing 🌋 stage is detected only for conservatively matched landmarks; moving towers do not silently masquerade as stationary or newly constructed ones.
- A goal persists through ordinary new sightings, can be interrupted by sufficiently important evidence, and eventually closes with an honest outcome.
- Completed investigations alter future candidate selection; closed goals do not immediately thrash/reopen.
- A long synthetic observation run respects all memory and clipboard bounds, with readable lossy compaction.
- Cognitive switch off restores the original wandering/local-observation behavior.
- Tiffany's economy, five towers, interactions, simulation cadence and existing instrumentation remain untouched.
- Parse all inline JS scripts before commit; verify GitHub readback and deployment separately from actual mobile/browser runtime. On regression, restore the last verified working Ender build before investigating.

**Implementation status:** Source implements bounded local cargo-count and terrain-stage event records, committed investigation goals, timeout/arrival/interruption outcomes, cooldowns and `ender-mind/v2` clipboard. Worker identity, deliveries, moving-structure identity, causal learning and robust completion inference remain unsolved. Source parse/readback verified; browser behavior awaits human observation. Build as a small, isolated Ender subsystem. Preserve the existing 🧠 diary and structured export, and use the next live reports to evaluate whether attention and closure actually affect behavior.

## Next frontier — situated semantic behavior telemetry (specified, NOT implemented)

**Intent.** Extend Ender's observations beyond transforms, proximity and aggregate cargo counts by allowing the *existing civilization's behavior systems* to emit factual, bounded events. Worms, bees, ants, crabs, scarabs, scorpions, beetles, and other actors should reveal what they **actually did**, not what an observer guesses from a position delta. This is an additive sensor/evidence layer, not a new AI, worker FSM, game mechanic or HUD. Preserve every preceding specification and existing behavior.

### Authoritative emission and local reception

1. **Instrument existing transition sites, not a parallel simulation.** Find the actual shared worker FSM and specialized actor/combat/resource branches. Emit only after an existing action/transition is confirmed: target acquired, harvest/pickup, cargo gained/lost, delivery credited, attack attempted, hit/damage applied, armor broken, actor killed, resource consumed, construction material deposited, structure built/destroyed. Prioritize a small verified vertical slice spanning **worm harvest/delivery, bee harvest/delivery, and scorpion-versus-scarab combat/damage/death** where those interactions really exist. Do not invent a scorpion killing a beetle if the game does not support it.
2. **Common compact envelope.** Each event includes monotonically ordered simulation time/sequence, a stable event type from a small vocabulary, actor kind and ephemeral runtime identity where actually available, local world position, optional target kind/identity, measured outcome and physical resource/quantity only if authoritative. Separate `attempt`, `hit`, `damage`, `kill`, `pickup`, `deposit` so a failed attack or proximity cannot masquerade as success. No private goal/intent, hidden inventory, remote worker route, or unearned causal inference.
3. **Perceptual boundary.** Ender receives an event only when its occurrence is within the existing **125-unit local radius at event time**; use the event's position and Ender's then-current position. Do not deliver old remote events later when Ender approaches. No global event history, remote query, privileged Tiffany observer access or future knowledge. If identity is missing or visibility insufficient, explicitly mark uncertainty. Local audible effects or other modalities are deferred until independently specified.
4. **Small bounded stream.** Use a hard-capped in-memory event ring with deterministic ordering, compact payloads and bounded per-tick emission. Avoid per-frame idle/movement spam, unlimited actor history, quadratic scans, and heavy serialization in hot loops. Events are append-only observations, not gameplay triggers. Preserve ordinary movement, collision, spawn/recovery, claims, material transfers, combat, and frame rate. One switch must disable the new instrumentation without disabling Tiffany's game or Ender's existing cognition.
5. **Observer integration.** Feed received events into the existing Ender local observation/evidence path and the single 🧠 diary/JSON export, with source, timestamp, type, actor, outcome and uncertainty. Keep original transforms/cargo observations alongside them. The learned shadow may receive a bounded event summary as *input* only after feature-contract compatibility is checked; do not silently alter checkpoint dimensionality, retrain, assign reward, or grant learned steering. `ender-mind/v2` remains usable; version an event sub-schema separately if necessary.
6. **Truthful semantics.** An event proves the instrumented transition occurred; it does not prove Ender understood it, witnessed all preceding causes, or learned from it. Worker identity is valid only if the simulation actually supplies a stable lifetime ID; otherwise avoid joining observations across actors. A delivered item must be backed by the actual resource-credit operation; a death by the actual death transition.

### Acceptance and regression

- Deterministic fixture exercises worm pickup → carrying → actual depot delivery and bee pickup → actual depot delivery; events fire exactly at corresponding authoritative transitions, with no duplicate resource credits or phantom deliveries.
- Existing scorpion/scarab combat fixture distinguishes attempted attack, damage/armor loss, and actual death, including misses and survival. Test only behaviors present in source.
- Same event inside radius is delivered once; outside radius is never delivered; crossing the radius later does not replay it. Time/sequence order remains stable.
- Repeated idle updates do not flood the ring; ring, diary, and export remain bounded over long synthetic runs. Disable switch yields zero semantic events with otherwise identical game mechanics.
- Existing local-snapshot, passive evidence, read-only shadow, landmark, tower, worker, combat, economy and UI behavior regressions remain green. Check scripts parse, read back committed source and distinguish deploy from browser observation.
- Scope strictly to `jit/ender-forge/`. **Never modify `jit/evermore-2/`.** No new UI, tower, inventory, Ender power, scripted learning outcome, or remote model call.

**Delivery plan:** one implementation pass to inspect the actual execution paths and wire a minimal shared event emitter + local subscription + tests; one verification pass to run regressions, correct integration, and record actual findings in [CHRONICLE](./CHRONICLE.md). This section is a specification until commits and runtime evidence demonstrate otherwise.
