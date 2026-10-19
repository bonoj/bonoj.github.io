# TIFFINITY SURVIVORS™
**EVERMORE GAMES™ · THERE'S ALWAYS MORE™**

[Play](https://bonoj.github.io/jit/evermore-2/) · [Game source](./index.html) · [Development chronicle](./CHRONICLE.md)

**Identity convention:** the project owner is **the human**, the collaborator is **the model**, and other real people are **test subjects**. Use these labels in documentation; fictional characters and technical identifiers retain their names.

## Icon progression — at a glance

| Land | Tier I | Tier II | Tier III | Tier IV | Tier V |
|---|---|---|---|---|---|
| ☀️ Plains | ✨️ | 👼 | 🪲 | TBD | 🐪 |
| 💧 Island | ⚡️ | 🪼 | 🐙 | TBD | 🐋 |
| 💀 Swamp | 🫧 | 👻 | 🐀 | TBD | 🪰 |
| 🔥 Mountain | ☄️ | 🐦‍🔥 | 🦂 | TBD | 🦟 |
| 🌳 Forest | 🌿 | 🦌 | 🦅 | TBD | 🐢 |

Tiers I–III are implemented purchase icons. Tier IV is intentionally undecided. Tier V is a **proposed** macro-scale lineup, not implemented: camel, whale, fly swarm, mosquito swarm, tortoise. This table is a design reference, **not** authorization to add shop UI or change gameplay.

**Runtime 👁 diagnostics:** Tap to copy a compact analytical digest (current state, event totals, numeric trajectories and periodic checkpoints). Long-press for 650 ms to download the full JSON flight recorder with all retained five-second samples. Both derive from the same recorder; no separate simulation or extra UI. Browser/device interaction verification pending.

## The game

One mobile viewport, one HTML/CSS/Canvas file. Tiffany 🧛‍♀️ survives converging enemies, casts spells, purchases automation, places towers and grows a living civilization. Five lands and their shared identities: ☀️ Plains/prism, 💧 Island/lightning, 💀 Swamp/poison, 🔥 Mountain/fire, 🌳 Forest/vines. Keep the discovery-driven, whimsical progression; do not invent tutorials, panels, or new UI without a request.

- **Economy and HUD:** five starting hearts; ordinary kills award 2 coins and every eighth kill a gem. Health is visible immediately; kills, coins, gems, wheat, wood, ice, herbs, stone and mushrooms appear only after first earned/delivered and remain discovered for that run. Fixed two-row HUD with reserved aligned slots, no wave indicator. The discreet top-left **executing-content fingerprint** is computed from the loaded page's inline scripts and styles, not fetched from the latest GitHub commit. It changes when delivered executable content changes, and can be tapped for development currency. It is **not a Git commit SHA**; a new GitHub commit alone cannot change this label on a stale page.
- **Drones and territory:** five distinct purchasable orbiting drones, one per land, radius 65, angular speed ±0.65 rad/s. Second drone doubles world area; five drones **or** five towers expands to 4× starting area, never twice. Drone engagement radius is half the visible horizontal world span: `w/(2*arenaScale)`.
- **Towers and Tiffany:** after two drones, Tiffany autocasts through land spells every 2 seconds independently of the player's selected tower-placement land. Tap arena to place or relocate one tower per land (five max); towers cast localized effects. At five towers, autocycle stops and tapping Tiffany toggles the five-icon Mission Command ring (currently stubs).
- **Armies and civilians:** five drones unlock the same shop slots for Cherubs, Auditors, Notaries, Phoenixes, Arborists. Each purchased division recruits up to eight one-hit combat units from its living matching tower, roughly every five seconds; recruits expire after 24 seconds and retain distinct attacks. Cherubs remain **combat-only**. Arborists additionally own 🛖/🐜 logging ants, Cherubs 🍯/🐝 wheat harvesters, Auditors 🐚/🦀 mountain miners, and Notaries ⚗️/🪱 mushroom harvesters. Each depot has up to three workers using shared FSM, claims, movement, and equipped-actor rig; materials are earned on delivery.
- **Ecology:** Plains and Forest towers plant sprouts; Island water matures wheat/trees; Swamp withers plants and killed enemies leave bones that decay to mushrooms; Mountain fire burns plants/mushrooms and spawns volcanoes. Water/Forest/Fire pulses drive mountain succession. Shared crop cap 100, geological cap 12. Keep all systems in the **same battlefield**, not separate interior games.
- **Destruction/recovery:** enemy contact consumes the attacker and destroys one-hit towers, civilian depots and workers without kill currency. Towers recover after five seconds at their current coordinates; depots recover after five seconds at a valid site relative to their associated tower's current position. Living depots replenish workers every 1.5 seconds up to three. No duplicate land purchases, no overlapping building fallback.

## Living causal chains — icon-first handoff

Arrows describe **actual world causes and transfers**, not new features. Use only game icons; use words for inventory, actions, and states without game icons.

- **Progression:** 🧛‍♀️ Tiffany → spells → kills → coins/gems → drones → towers → Tier II divisions → Tier III ecologies. Two drones expand area to 2×; five drones **or** five towers expand to 4×. No 8× expansion. Camera auto-fits; pinch/drag disabled.
- **Growth:** ☀️/🌳 → 🌱 sprouts/trees → 💧 water or 🌧️ rain → 🌾 wheat/mature trees → 🐝/🐜 harvest → home delivery → wheat/wood inventory.
- **Decay:** 💀 + defeated enemies → 🦴 bones → 🍄 mushrooms → 🪱 collection / 🐙 conversion / 🦂 meals. 🔥 burns vegetation and mushrooms.
- **Geology:** 🔥 → 🌋 wild mountains → 💧 cooling and succession → 🧊/🌿/🪨 strata → 🦀 mining → material inventory. Constructed Fire rim mountains retain distinct provenance.
- **Civilian labor:** 🛖 → 🐜🪓 → tree → 🪵 → 🛖 → wood inventory; 🍯 → 🐝 → 🌾 → 🍯 → wheat inventory; 🐚 → 🦀⛏️ → cooled mountains → 🐚 → ice/herbs/stone inventory; ⚗️ → 🪱🗡️ → 🍄 → ⚗️ → mushroom inventory; 🪦 → 🐀 → 🦴 → 🪦 → bone inventory.
- **Worm creation:** 🐚 → 🐙 → consumes 🍄 → new living 🪱 at mushroom location → ⚗️ harvesting workforce. No second shell or remote spawning.
- **Worm predation:** 🪹 → 🦅 → captures living 🪱 → visibly carries worm → 🪹 → worms inventory; captured worm leaves active workforce.
- **Irrigation:** 🪸 → 🦋 → uncovered 🌋 first, else 🌱 → 🌧️ cloud → 💧 cooling/growth and protection from 🔥 → cloud expires → moth can repeat. Each moth owns at most one 30-second cloud; ecological footprint stays fixed.
- **Scorpion reproduction:** 🗿 → 🦂 → one each 🍄 + 🦴 + living 🪱 (any order) → three 🪨 armor → consumes living 🐀 → rat inventory + new 🗿 and offspring 🦂. Combat removes armor into physical loose 🪨 and reopens the corresponding meal requirement. Orphaned scorpions can reproduce; only total Idol/scorpion extinction triggers founding-Idol recovery.
- **Sun construction:** ☀️ Tier III → 🛕 Reliquary → 🛡️🪲/🗡️🪲/🏹🪲 → local 🦂 combat knocks loose 🪨 → scarab carries 🪨 → 🏛️ (one stone each, five sites) → 👼 ascends → permanent ✨ defense. Scarabs detect scorpions locally (160 world units), never globally; carrying takes precedence over combat. Tower relocation → 🏛️ collapse → physical 🪨 returned → rebuild.
- **Fire construction:** 🔥 Tier III → 🦂 armor loss → loose 🪨 → 🗿 Idol collects and carries → three deliveries per site → 🌋 (five tower-relative sites) → 🐦‍🔥 claims → permanent 🔥 and defensive projectiles. Unbuilt blocked sites adapt position; shared construction destinations prevent cargo churn. Tower relocation → 🌋 collapse → physical 🪨 returned → rebuild. No separate volcanic ground creep-damage mechanic.
- **Recovery:** enemy contact → tower/depot/worker death → existing recovery/respawn and ordinary combat/labor resume. Preserve physical drops and exclusive resource claims, not magical resource credits.

**Observed lifecycle (19 October 2026, executing build `de2eb2af`):** five Fire volcanoes built, then all five collapsed after relocation and five rebuilt; all five current sites active and Phoenix-claimed. 10 builds, 5 collapses, 32 stone pickups, 30 deliveries, 2 drops, 9 cumulative claims, 146 projectiles, one site reposition, zero observer errors. Sun simultaneously held five built, inhabited monuments. `32 = 30 + 2` supports carried-stone accounting, not a formal whole-world conservation proof. Two Idols retained stale rock targets at saturation; cleanup remains open.

**Contract:** one mobile battlefield and existing shop; no new UI, invented resource icons, omniscient targeting, remote credits, free construction, duplicate resource claims, or parallel worker FSM. Source is executable truth. Historical exact specifications, superseded proposals, and implementation decisions are preserved verbatim in [the chronicle](./CHRONICLE.md).

## Cold-boot handoff

**Read this handoff and causal map first; consult [CHRONICLE.md](./CHRONICLE.md) for historical detail.** Repository `bonoj/bonoj.github.io`, branch `master`; game `jit/evermore-2/index.html`. Leave `jit/evermore/` untouched. Read latest source and blob SHA before changing it. Persist surgical changes, read back, and distinguish source commit, Pages deployment, and browser-executed code. Cache-bust when necessary. Do not claim tests or device verification that did not happen.


**Testing:** the old Playwright/Actions regression suite was retired after persistent red runs. Do not claim green CI or revive it without a working verified harness. Favor rapid experiments, direct observation, and early reversion when an experiment does not converge.

**Optimization disposition (18 October 2026):** old performance instrumentation retired; speculative performance work and emoji-to-SVG migration deferred. Keep the conservative targeting prefilter, retain emoji fidelity and all population/behavior, and revisit only against an observed problem or a specific creative asset objective. Detailed rationale, experiments, limitations, and reversal criteria are in the chronicle. The JIT Assets ant/axe/log study is an independent archived specimen, not a game dependency.

**Deferred roadmap — save and restore (not implemented):** Persistence is deliberately deferred while the game's durable vocabulary evolves rapidly. When revisited, first inspect `reset()`, startup, entity hydration, relationships and timers. Preserve **durable world truth**: towers/buildings and exact locations; cultivated crop/tree patches and ecology; geological features; economy, purchases and progression; civilian workers including their positions, cargo, home and journey/destination so long-distance crab marches are not erased. Reconstruct current FSM internals, claims/path caches and callbacks rather than freezing obsolete code. Enemy positions, projectiles and transient combat need not persist; combat recruits can be reconsidered. Prefer minimal versioned snapshots and forward-compatible defaults/migrations with recoverable originals, not exact build-SHA coupling. No save UI or Tiffany radial node is authorized. Tiffany's five-node command radial stays entirely in-world for discoverable gameplay, not an embedded settings menu. The top-left build-number tap remains the currency/gem development cheat until persistence actually replaces its utility. Avoid imposing schema migration/cognitive overhead on every rapid feature. Plan and obtain the human's approval before implementation; do not restore retired Runtime Eyes. See chronicle for reasoning.



**Remaining verification frontier:** Focused tests for cargo/stone conservation through arbitrary destruction and relocation, Sun tower movement and Reliquary recovery, cargo drop on death, and stale Idol rock claims. Keep scarabs' local 160-world-unit scorpion discovery radius; do not grant omniscient targeting. No new UI or mechanics are authorized by this status.

**Cadence:** Play → notice → invent → ship → verify → play again. ➡️ means advance from this state. Detailed development history, experiments, discarded directions and measurement results live in the [chronicle](./CHRONICLE.md).

