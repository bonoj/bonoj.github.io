# 🧠 Ender — working specification
*19 October 2026 · First runtime slice committed; browser verification pending*

## Purpose
Introduce a sixth, initially resource-less participant into the mature Tiffany civilization. Ender is a situated, externally interpreted intelligence: each encounter yields local evidence, a choice, an observable consequence, and recoverable knowledge. No fictional continuous consciousness, omniscience, predetermined personality, or prescribed tech tree.

**Identity:** 🧠 brain-in-a-vat, **Rose `#FF82B5`**. Alternative considered: 👣 Midnight `#303C91`; brain preferred. Keep the icon/color separate from the future physical tower's appearance. The existing five land colors and symbols remain unchanged.

## First vertical slice — the wandering locus

**Implemented in source (`256c1b46`):** immediate spawn, gentle autonomous wandering, avoidance of towers and Tiffany's center, Rose 🧠 with tower-sized hit target, tap-to-copy `ender-local-observation/v1` with 125-world-unit radius. Source commit is not proof of Pages/browser execution. Local snapshot currently includes towers, enemies, crops, remains, mountains, loose stone, scorpions, Idols, worker groups and their depots. Deliberate destination control, event history, durable memory and tower remain unimplemented.

- Spawn one visible, tappable 🧠 at a valid edge location in a mature world. No tower, territory, inventory, workers, privileged knowledge, or access to Tiffany's resources.
- Use approximately the same **tap footprint** as an existing tower for legibility and parity; this does **not** confer a tower's attack radius, defenses, territorial effects, or economy.
- A tap copies a **compact local JSON observation** without a new toolbar, modal, sixth shop card, or global observer privileges. It must not accidentally place or move a Tiffany tower. Preserve Tiffany's existing selection, spellcasting, and command-ring interactions.
- Ender can **wander between encounters**. Initially, the human shares the observation with the model; the model proposes a destination; the next world action moves Ender there through a bounded, explicit mechanism to be designed before implementation. No teleportation disguised as movement. Respect existing tower positions and physical space.
- No gathering, claiming, combat, harvesting, construction, or autonomous model API in the first slice. “Gather data” means observe, not acquire matter.

## Perception contract — local, bounded, honest
**Center:** Ender's current world position. **Radius:** choose a concrete game-space radius during implementation after inspecting existing tower scale; an attack-range-sized envelope is a *design analogy*, not a granted attack capability.

A snapshot should contain:
- **Self:** location, observation time/tick, and any actual Ender state (not invented health or abilities).
- **Nearby entities:** kind, relative position/distance, observable alive/moving/cargo/damage state where genuinely available.
- **Visible material and structures:** physical resources, towers, depots, constructions and affiliations in range, only to the extent represented by actual runtime state.
- **Local events:** actions witnessed within range during a bounded interval, if instrumentation can capture them without duplicating simulation logic.
- **Limits:** observation radius, sampling window, and unknowns. Never include remote inventories, unseen activity, global strategy, or privileged internal target state as if directly perceived.

Separate **current observation** from **memory**. A past eagle/worm encounter may remain recorded but must not imply that either is still present. Prefer small structured observations and append-only discoveries over raw world dumps. Reuse the existing 👁 observer machinery where practical without conflating its global developer instrumentation with Ender's local senses.

## Expedition loop
1. The human taps 🧠 and shares its local observation.
2. The model distinguishes evidence from hypotheses and chooses a plausible destination or a decision to stay.
3. Ender moves within world constraints; Tiffany's simulation continues independently.
4. A subsequent tap reveals what changed; useful findings are recorded externally.
5. Repeat, revising hypotheses from consequences rather than scripted lore.

**First question:** can Ender discover local ecological relationships (e.g. mushrooms → worms → eagles) through encounters rather than being given the causal graph?

## Eventual tower — explicitly deferred
Ender might earn a **physical tower** through legitimate world interactions and material transfers, not a free starting structure. Tentative parity: **1 HP**, vulnerable to ordinary creeps, with a recovery/respawn mechanism yet to be designed. Tower design, cost, actions, death, respawn, and access to any economy remain undecided. Do not build them as part of the perception slice.

## Engineering constraints and verification
- Work only in `jit/ender-forge/`; **never modify `jit/evermore-2/`**. Preserve existing ecological FSMs, material provenance, claims, cargo, tower recovery, and mobile one-page UX.
- Read [README](./README.md) for world invariants and delivery protocol; use [CHRONICLE](./CHRONICLE.md) for observations, decisions, failures, and revisions. This document is the **active Ender design**, not a duplicate game manual.
- Before coding, inspect current input priority, world/screen coordinate transforms, resize/camera behavior, entity draw and collision conventions, and existing observer serialization. Explicitly settle movement input and snapshot schema before shipping.
- Verify source read-back, Pages publication, and human/browser runtime separately. Do not label unimplemented designs as verified features.

**Next action:** inspect the relevant runtime paths and propose the smallest implementable tap-to-observe and movement contract; then build one vertical slice with the human's authorization.

## Cognitive diary — first implemented slice (19 October 2026)
The running Ender now samples its **own local observation every ~3 simulation seconds** (not merely on tap). It maintains a bounded, lossy landmark map (maximum 36 entries, aging by last sighting and repeat count), up to eight significant recent observation changes, and five goal transitions. Familiar stationary structures are identified by kind and quantized world position; workers/creeps are not falsely assigned stable identities. It selects a nearby previously seen landmark to revisit after an absence, or explores when no candidate qualifies; heading steers toward selected landmarks while retaining ordinary movement and collision constraints. This is **heuristic curiosity**, not an embedded LLM, introspective reasoning, or learned causal theory.

A single 🧠 tap now copies a compact **first-person field diary plus structured `ender-mind/v1` evidence** in one clipboard payload. Diary summarizes present entities with in-world emojis, recent changes, landmarks, current goal and goal transitions. Structured section retains precise local sightings, timestamps and evidence for audit. A single `ENDER_COGNITION_ENABLED` switch disables the memory/goal behavior and returns the original local JSON on tap. The world and Tiffany remain otherwise unchanged. Memory is in-page and resets with the world; no durable save/restore or external model invocation. Source parsing is not browser-runtime verification.
