# TIFFINITY SURVIVORS™
**EVERMORE GAMES™ · THERE'S ALWAYS MORE™**

[Play](https://bonoj.github.io/jit/evermore-2/) · [Game source](./index.html) · [Development chronicle](./CHRONICLE.md)

**Identity convention:** the project owner is **the human**, the collaborator is **the model**, and other real people are **test subjects**. Use these labels in documentation; fictional characters and technical identifiers retain their names.

## The game

One mobile viewport, one HTML/CSS/Canvas file. Tiffany 🧛‍♀️ survives converging enemies, casts spells, purchases automation, places towers and grows a living civilization. Five lands and their shared identities: ☀️ Plains/prism, 💧 Island/lightning, 💀 Swamp/poison, 🔥 Mountain/fire, 🌳 Forest/vines. Keep the discovery-driven, whimsical progression; do not invent tutorials, panels, or new UI without a request.

- **Economy and HUD:** five starting hearts; ordinary kills award 2 coins and every eighth kill a gem. Health is visible immediately; kills, coins, gems, wheat, wood, ice, herbs, stone and mushrooms appear only after first earned/delivered and remain discovered for that run. Fixed two-row HUD with reserved aligned slots, no wave indicator. The discreet top-left source SHA can be tapped for development currency; it is **not proof of the executing build**.
- **Drones and territory:** five distinct purchasable orbiting drones, one per land, radius 65, angular speed ±0.65 rad/s. Second drone doubles world area; five drones **or** five towers expands to 4× starting area, never twice. Drone engagement radius is half the visible horizontal world span: `w/(2*arenaScale)`.
- **Towers and Tiffany:** after two drones, Tiffany autocasts through land spells every 2 seconds independently of the player's selected tower-placement land. Tap arena to place or relocate one tower per land (five max); towers cast localized effects. At five towers, autocycle stops and tapping Tiffany toggles the five-icon Mission Command ring (currently stubs).
- **Armies and civilians:** five drones unlock the same shop slots for Cherubs, Auditors, Notaries, Phoenixes, Arborists. Each purchased division recruits up to eight one-hit combat units from its living matching tower, roughly every five seconds; recruits expire after 24 seconds and retain distinct attacks. Cherubs remain **combat-only**. Arborists additionally own 🛖/🐜 logging ants, Cherubs 🍯/🐝 wheat harvesters, Auditors 🐚/🦀 mountain miners, and Notaries ⚗️/🪱 mushroom harvesters. Each depot has up to three workers using shared FSM, claims, movement, and equipped-actor rig; materials are earned on delivery.
- **Ecology:** Plains and Forest towers plant sprouts; Island water matures wheat/trees; Swamp withers plants and killed enemies leave bones that decay to mushrooms; Mountain fire burns plants/mushrooms and spawns volcanoes. Water/Forest/Fire pulses drive mountain succession. Shared crop cap 100, geological cap 12. Keep all systems in the **same battlefield**, not separate interior games.
- **Destruction/recovery:** enemy contact consumes the attacker and destroys one-hit towers, civilian depots and workers without kill currency. Towers recover after five seconds at their current coordinates; depots recover after five seconds at a valid site relative to their associated tower's current position. Living depots replenish workers every 1.5 seconds up to three. No duplicate land purchases, no overlapping building fallback.

## Swamp alchemist — implemented

- **Building/depot:** ⚗️ alchemical cauldron, associated with the 💀 Swamp land. This is a **world building icon, not a shop/upgrade icon**. Do not change any existing land, Tier I, or Tier II purchase icons or add a purchase control as part of this specification.
- **Creature:** 🪱 worm. **Equipped tool:** 🗡️ dagger. **Harvest target/cargo:** 🍄 mushroom.
- **Behavior:** worms leave their cauldron, independently find and claim existing mushrooms, wriggle to the target, slash with their dagger to harvest, visibly carry the mushroom home, and unload it into the material ledger. The dagger's slash is a rotation around its grip using the existing equipped-actor rig; no custom artwork required. Keep creature, dagger, mushroom and cauldron legible at mobile size.
- **Implementation direction:** extend the existing shared civilian worker FSM (idle → travel → work → carry → unload), equipment orientation, exclusive target claims, valid-target recovery, persistent depot placement, worker replacement and depot destruction/recovery. Do not create a parallel worker system or spawn overlapping depots. Mushrooms are already produced by swamp decomposition; harvest those actual world objects, not synthetic resource ticks.
- **Economy:** mushroom inventory and its later spending use require separate design decisions; do not silently equate mushrooms with existing herbs or invent processing recipes. The cauldron and workers unlock with the existing **Tier II 💀 Notaries upgrade**; no new shop button. Preserve existing combat and controls.
- **Status:** implemented in `index.html` (source commit `5d67766e`). Device/browser gameplay verification is pending.

## Battlefield expansion and camera — implemented in source

- Battlefield area grows from 1× to 2× after the second Tier I drone, 4× after all five Tier I drones/towers, and remains at **4× after all five Tier II divisions**. The former 8× increase is temporarily disabled.
- **Pinch zoom and finger-drag camera movement are disabled for now.** The camera automatically fits the full unlocked battlefield at each expansion stage; preserve existing tap-to-cast, command-ring and tower-placement behavior. Do not reintroduce gesture handling without a new request.
- Source commits `6bf8a7cb`, `7aadd86b`. Physical-device verification pending.

## Tier III Swamp — grave rats

- 💀 Tier III (🪙250 + 🪨10) creates a 🪦 graveyard and three 🐀 shovel-equipped rats. They claim and harvest existing 🦴 bones before decay, return them to the graveyard and credit bone inventory. The graveyard uses existing depot placement, destruction, recovery and worker respawn mechanics.
- Tiffany's 🫧 Swamp drone **never** becomes a worker or leaves Tiffany's formation. Its original combat behavior is unchanged.

## Tier III Island — mycelial octopus

- 💧 Tier III (🪙250 + 🧊10) adds **one** 🐙 ground walker to the existing 🐚 crab shell, sharing its placement, destruction and recovery lifecycle. No second shell is built. No extra shop control.
- The octopus walks slowly (26 world units/s) toward the **nearest unclaimed 🍄 mushroom** anywhere on the map. It uses the existing `workerClaim` exclusivity shared with worms, releasing invalid claims.
- On arrival, it consumes the mushroom and spawns a **permanent 🪱 worm at that location**, immediately equipped with the ordinary worm harvesting FSM. No trip back to the shell; no mushroom-inventory cost or population cap.
- The octopus dies on a single enemy collision and respawns at the existing crab shell. If the shell is destroyed, crabs and octopus both stop and resume after its normal building recovery.
- Worm population target grows with reproduction; lost worms can replenish to that target. Source through `0a35a5f7`; physical-device verification pending.

## Tier III shop placeholders — implemented in source

- Once all five Tier II divisions are purchased, reuse the five existing shop buttons for **plain land-colored ● circles**. No creature icons or additional shop controls.
- Provisional two-resource prices, **no gems**: ☀️ Plains 🪙250 + 🌾10; 💧 Island 🪙250 + 🧊10; 💀 Swamp 🪙250 + 🪨10; 🔥 Mountain 🪙250 + 🌿10; 🌳 Forest 🪙250 + 🪵10. Coins are gold. Purchases deduct inventory and mark their Tier III slot owned.
- **Placeholder purchases do not yet activate Tier III drone behaviors or spawn Tier III structures/workers.** In particular, the proposed 🪦 graveyard / 🐀 rats are not implemented by this shop change. Preserve their separate design specification below.
- Source commit `ca3490ee`. Physical-device verification pending.

## Tier III bone collectors — proposed ecological chain (not implemented)

- **Identity:** 🐀 rat, equipped 🪏 shovel, based at a 🪦 graveyard. Graveyard is the proposed worker home/building, not an existing shop icon. The existing-style **Tier III 💀 Swamp advancement** unlocks and spawns the 🪦 graveyard near a living Swamp tower, together with its 🐀 bone collectors. No separate graveyard purchase or additional shop control. Use existing depot placement, destruction and recovery machinery.
- **Existing bone source:** Enemy deaths within the living 💀 Swamp tower's influence spawn actual 🦴 bones directly (`remains` objects with `stage:'bones'`). There is no intermediate corpse/remains stage. Bones naturally become 🍄 mushrooms after **25–30 seconds**.
- **Existing independent mushroom source:** 💀 Swamp withering turns 🌱 sprouts, 🌾 wheat, or 🌳 trees directly into 🍄 mushrooms after **2–4 seconds**; this pathway never passes through bones.
- **Existing mushroom consumer:** Tier II 🪱 worms with 🗡️ daggers harvest 🍄 mushrooms from either pathway and deliver them to ⚗️. Swamp vegetation supplies mushrooms independently of enemy deaths.
- **Proposed contested branch:** 🐀 rats with 🪏 shovels seek, exclusively claim, dig up, visibly carry and deliver **existing 🦴 bone objects** to 🪦 before their decay deadline. Claiming does **not** pause decay. Successful harvesting removes the bone and prevents its mushroom conversion; a missed deadline converts the same object to 🍄 and makes it available to worms. Bone inventory is a proposed new resource; no spending recipe or further economy is specified.
- **Implementation boundary:** Compose with the existing worker FSM, claim/revalidation, tool rig, delivery and depot lifecycle. Revalidate the bone stage at harvest; release stale claims after decomposition. Preserve existing land/Tier I/Tier II icons and mechanics. **Design only; do not treat this chain as implemented.**

## Coral moth irrigators — implemented

- **Unlock and home:** Existing 🔥 Tier II Phoenix purchase temporarily starts three 🦋 civilian moths at a distinct 🪸 coral nursery. No additional shop control. Preserve 🐚 crab depot. This unlock association is provisional.
- **Exclusive targeting:** Each moth claims exactly one eligible target at a time, preferring **uncovered, unclaimed active 🌋 volcanoes anywhere** over **uncovered, unclaimed 🌱 seedlings**. No fire-tower exclusion zone. Release stale claims when targets disappear or change; newly available volcanoes preempt seedlings.
- **One-cloud cycle:** A moth flies to its claimed target and deposits **at most one 🌧️ cloud**. It then returns to 🪸 and waits while that specific cloud exists. Only when its cloud expires may it claim another target. Three moths imply at most three concurrently owned clouds. Rain lasts **30 seconds**.
- **Movement and footprint:** Cloud *visuals* reuse the shared `lazyWander` flying/wandering grammar, constrained around their deployment point; do not invent separate sine-orbit flight. Their ecological footprint stays fixed at the deployment point (radius 58 game units), invisible—**no blue circle**. Visual movement does not drag the effect field.
- **Ecological consequences:** Rain invokes existing Island water growth and mountain-cooling transitions. While its footprint is active, 🔥 may not burn covered crops/trees or reactivate covered mountains, including delayed fire changes and volcano damage. Protection ends at expiration. Rain does not automatically protect mushrooms.
- **Shared architecture:** Retain one battlefield and existing tower, drone, division, worker and HUD icons. Moths are flying ecology workers, not combat units. Keep Runtime Eyes OFF unless requested.
- **Verification:** Source implemented through commit `996fbd19`; live device/browser verification not claimed. See [chronicle](./CHRONICLE.md) for the detailed targeting/cloud/flight corrections and the design reasoning.

## Cold-boot handoff

**Start here, then read [CHRONICLE.md](./CHRONICLE.md) only for historical detail.** Repository `bonoj/bonoj.github.io`, branch `master`; game `jit/evermore-2/index.html`. Leave `jit/evermore/` untouched. Read latest source and blob SHA before changing it. Persist surgical changes, read back, and distinguish source commit, Pages deployment, and browser-executed code. Cache-bust when necessary. Do not claim tests or device verification that did not happen.

**Runtime Eyes switch:** `RUNTIME_EYES_ENABLED` near the top of `index.html` is the single binary entrypoint. `true` enables 👁 fixture, Canvas call counters, timing, observers and history; `false` hides 👁 and disables all instrumentation hooks/recording while leaving normal gameplay intact. Say **👁** or **fix instrumentation** to work on this isolated system. No extra UI or profiling machinery without a demonstrated need. The switch is currently **`false` (OFF)** for ordinary gameplay. Turn it `true` only for a focused 👁 investigation, then return it to `false`. This is a runtime gate, not a build-time tree-shake; a few branch checks remain, but no sampling or Canvas interception runs while disabled.

**Dormant diagnostic (only when switch is ON):** top-right 👁 is a two-step *destructive-to-current-run* mature-state fixture. First tap resets the unsaved game and constructs a populated late-game civilization (five towers/drones/armies, workers, ecology, 55 enemies); second and subsequent taps copy live JSON diagnostics without a checkmark or dashboard. The human verified initialization and clipboard reports on Android Chrome, build `53416919`. This is a **proto state-hydration mechanism, not persistent saving**. CPU-side timing is excellent on that phone; GPU/thermal costs and lag on a different phone remain unresolved. The fixture's initial enemy/army density diminishes as the game runs.

**Testing:** the old Playwright/Actions regression suite was retired after persistent red runs. Do not claim green CI or revive it without a working verified harness. Favor rapid experiments, direct observation, and early reversion when an experiment does not converge.

**Optimization disposition (18 October 2026):** instrumentation OFF; speculative performance work and emoji-to-SVG migration deferred. Keep the conservative targeting prefilter, retain emoji fidelity and all population/behavior, and revisit only against an observed problem or a specific creative asset objective. Detailed rationale, experiments, limitations, and reversal criteria are in the chronicle. The JIT Assets ant/axe/log study is an independent archived specimen, not a game dependency.

**Deferred roadmap — save and restore (not implemented):** Persistence is deliberately deferred while the game's durable vocabulary evolves rapidly. When revisited, first inspect `reset()`, startup, `eyeMature()` hydration, entity relationships and timers. Preserve **durable world truth**: towers/buildings and exact locations; cultivated crop/tree patches and ecology; geological features; economy, purchases and progression; civilian workers including their positions, cargo, home and journey/destination so long-distance crab marches are not erased. Reconstruct current FSM internals, claims/path caches and callbacks rather than freezing obsolete code. Enemy positions, projectiles and transient combat need not persist; combat recruits can be reconsidered. Prefer minimal versioned snapshots and forward-compatible defaults/migrations with recoverable originals, not exact build-SHA coupling. No save UI or Tiffany radial node is authorized. Tiffany's five-node command radial stays entirely in-world for discoverable gameplay, not an embedded settings menu. The top-left build-number tap remains the currency/gem development cheat until persistence actually replaces its utility. Avoid imposing schema migration/cognitive overhead on every rapid feature. Plan and obtain the human's approval before implementation; keep Runtime Eyes OFF. See chronicle for reasoning.

**Active frontier:** enjoy and extend the emergent civilization; retain its mechanics and discovery. Save/load persistence is a natural next capability built from state hydration, but is **not implemented**. Performance optimization should follow actual evidence, preserving behavior and visual fidelity; do not add process or speculative systems.

**Cadence:** Play → notice → invent → ship → verify → play again. ➡️ means advance from this state. Detailed development history, experiments, discarded directions and measurement results live in the [chronicle](./CHRONICLE.md).
