# TIFFINITY SURVIVORS™
**EVERMORE GAMES™ · THERE'S ALWAYS MORE™**

[Play](https://bonoj.github.io/jit/evermore-2/) · [Game source](./index.html) · [Development chronicle](./CHRONICLE.md)

## The game

One mobile viewport, one HTML/CSS/Canvas file. Tiffany 🧛‍♀️ survives converging enemies, casts spells, purchases automation, places towers and grows a living civilization. Five lands and their shared identities: ☀️ Plains/prism, 💧 Island/lightning, 💀 Swamp/poison, 🔥 Mountain/fire, 🌳 Forest/vines. Keep the discovery-driven, whimsical progression; do not invent tutorials, panels, or new UI without a request.

- **Economy and HUD:** five starting hearts; ordinary kills award 2 coins and every eighth kill a gem. Health is visible immediately; kills, coins, gems, wheat, wood, ice, herbs and stone appear only after first earned/delivered and remain discovered for that run. Fixed two-row HUD with reserved aligned slots, no wave indicator. The discreet top-left source SHA can be tapped for development currency; it is **not proof of the executing build**.
- **Drones and territory:** five distinct purchasable orbiting drones, one per land, radius 65, angular speed ±0.65 rad/s. Second drone doubles world area; five drones **or** five towers expands to 4× starting area, never twice. Drone engagement radius is half the visible horizontal world span: `w/(2*arenaScale)`.
- **Towers and Tiffany:** after two drones, Tiffany autocasts through land spells every 2 seconds independently of the player's selected tower-placement land. Tap arena to place or relocate one tower per land (five max); towers cast localized effects. At five towers, autocycle stops and tapping Tiffany toggles the five-icon Mission Command ring (currently stubs).
- **Armies and civilians:** five drones unlock the same shop slots for Cherubs, Auditors, Notaries, Phoenixes, Arborists. Each purchased division recruits up to eight one-hit combat units from its living matching tower, roughly every five seconds; recruits expire after 24 seconds and retain distinct attacks. Cherubs remain **combat-only**. Arborists additionally own 🛖/🐜 logging ants, Cherubs 🍯/🐝 wheat harvesters, and Auditors 🐚/🦀 mountain miners. Each depot has up to three workers using shared FSM, claims, movement, and equipped-actor rig; materials are earned on delivery.
- **Ecology:** Plains and Forest towers plant sprouts; Island water matures wheat/trees; Swamp withers plants and killed enemies leave bones that decay to mushrooms; Mountain fire burns plants/mushrooms and spawns volcanoes. Water/Forest/Fire pulses drive mountain succession. Shared crop cap 100, geological cap 12. Keep all systems in the **same battlefield**, not separate interior games.
- **Destruction/recovery:** enemy contact consumes the attacker and destroys one-hit towers, civilian depots and workers without kill currency. Towers recover after five seconds at their current coordinates; depots recover after five seconds at a valid site relative to their associated tower's current position. Living depots replenish workers every 1.5 seconds up to three. No duplicate land purchases, no overlapping building fallback.

## Cold-boot handoff

**Start here, then read [CHRONICLE.md](./CHRONICLE.md) only for historical detail.** Repository `bonoj/bonoj.github.io`, branch `master`; game `jit/evermore-2/index.html`. Leave `jit/evermore/` untouched. Read latest source and blob SHA before changing it. Persist surgical changes, read back, and distinguish source commit, Pages deployment, and browser-executed code. Cache-bust when necessary. Do not claim tests or device verification that did not happen.

**Runtime Eyes switch:** `RUNTIME_EYES_ENABLED` near the top of `index.html` is the single binary entrypoint. `true` enables 👁 fixture, Canvas call counters, timing, observers and history; `false` hides 👁 and disables all instrumentation hooks/recording while leaving normal gameplay intact. Say **👁** or **fix instrumentation** to work on this isolated system. No extra UI or profiling machinery without a demonstrated need. The switch is currently `true` for development; set `false` for an uninstrumented build.

**Current diagnostic:** top-right 👁 is a two-step *destructive-to-current-run* mature-state fixture. First tap resets the unsaved game and constructs a populated late-game civilization (five towers/drones/armies, workers, ecology, 55 enemies); second and subsequent taps copy live JSON diagnostics without a checkmark or dashboard. User verified initialization and clipboard reports on Android Chrome, build `53416919`. This is a **proto state-hydration mechanism, not persistent saving**. CPU-side timing is excellent on that phone; GPU/thermal costs and lag on a different phone remain unresolved. The fixture's initial enemy/army density diminishes as the game runs.

**Testing:** the old Playwright/Actions regression suite was retired after persistent red runs. Do not claim green CI or revive it without a working verified harness. Favor rapid experiments, direct observation, and early reversion when an experiment does not converge.

**Active frontier:** enjoy and extend the emergent civilization; retain its mechanics and discovery. Save/load persistence is a natural next capability built from state hydration, but is **not implemented**. Performance optimization should follow actual evidence, preserving behavior and visual fidelity; do not add process or speculative systems.

**Cadence:** Play → notice → invent → ship → verify → play again. ➡️ means advance from this state. Detailed development history, experiments, discarded directions and measurement results live in the [chronicle](./CHRONICLE.md).
