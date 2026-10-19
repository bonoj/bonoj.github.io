# ⚙️ ENDER FORGE — independent JIT

**Canonical:** https://bonoj.github.io/jit/ender-forge/  
**Source:** `jit/ender-forge/index.html`  
**Working docs:** [Ender specification](./ENDER.md) · [Development chronicle](./CHRONICLE.md)  
**Boundary:** Never modify `jit/evermore-2/` when working on Ender Forge. Its files are the immutable source baseline, not a development target. CHRONICLE.md is Ender Forge's compact genesis record; the complete ancestral Evermore II history remains linked there. Record new Forge experiments in its own Chronicle. The underlying Tiffany game mechanics remain cloned by design.

**Publication:** The visible 8-character identifier is the SHA-256 fingerprint of the executing main inline script when no deployment stamp has replaced `BUILD = "pending"`. It is *not* necessarily the Git commit SHA. Verify published HTML and actual browser execution separately. No external assets or browser storage are used by this cloned single-file runtime. Shared repository deployment infrastructure remains shared; source paths are isolated.

## Cold handoff — Ender frontier (19 October 2026)

**Reading order:** [Sanctum Conjoiner](https://github.com/bonoj/Sanctum/blob/main/CONJOINER.md) → [Sanctum Contract](https://github.com/bonoj/Sanctum/blob/main/CONTRACT.md) → this README → [Ender specification](./ENDER.md) → [Forge Chronicle](./CHRONICLE.md) as needed → current [executable source](./index.html). The Chronicle holds the rationale and experiments; this README holds current constraints and the next decision. Do not treat a proposal as implemented behavior.

**Current checkpoint:** Forge is an isolated clone of Evermore II. Commit `22b62baa` introduced reversible tower selection: tap a land UI card again to deselect; tap an existing battlefield tower to select/deselect; with no land selected, an empty-field tap does not place or relocate a tower. This makes a neutral battlefield interaction possible. The human tested the interaction and accepted its current overlap tradeoff. GitHub source was read back; do not infer that Pages or the executing browser build was independently verified from that alone.

**Ender frontier:** See [ENDER.md](./ENDER.md) for the active 🧠 Rose wandering-locus, local-perception and expedition-loop design. No Ender runtime exists yet; eventual tower construction is deferred. Record experimental evidence in the [Chronicle](./CHRONICLE.md).

**Delivery discipline:** Inspect latest source and branch before changes; keep edits scoped to Forge, verify source read-back, distinguish commit from deployment and actual browser execution, and log durable experimental discoveries in the Chronicle. Do not ask the human to operate the toolchain.

---

# TIFFINITY SURVIVORS™
**EVERMORE GAMES™ · THERE'S ALWAYS MORE™**

[Play](https://bonoj.github.io/jit/ender-forge/) · [Source](./index.html) · [Chronicle](./CHRONICLE.md)

## Identity and entrypoint

One mobile viewport, one HTML/CSS/Canvas battlefield. 🧛‍♀️ Tiffany survives, casts spells, buys drones/divisions, places towers and grows five interdependent ecologies. **The human** owns and tests the world; **the model** collaborates on engineering; other real people are **test subjects**. Preserve those labels in docs.

**Cold boot:** repo `bonoj/bonoj.github.io`, branch `master`, executable `jit/ender-forge/index.html`. Do not touch `jit/evermore/`. Read this contract and latest source before editing; fetch current blob SHA → surgical commit → read back → distinguish Git source, Pages publication and browser-executed content. The top-left fingerprint hashes executing inline content, **not** the Git commit SHA; tapping it grants development currency. No claim of live verification from syntax checks or a Git commit.

**👁 Observation:** tap to copy compact nondestructive digest; long-press (650 ms) for full JSON recorder with five-second history. `WORLD_OBSERVER_ENABLED` controls instrumentation. Observer reports are evidence, not a separate simulation. No verified green CI suite: the old Playwright/Actions suite was retired.

## World map — progression and causal chains

| Land | Tier I | Tier II | Tier III | Tier IV | Tier V (proposed) |
|---|---|---|---|---|---|
| ☀️ Plains | ✨️ | 👼 | 🪲 | TBD | 🐪 |
| 💧 Island | ⚡️ | 🪼 | 🐙 | TBD | 🐋 |
| 💀 Swamp | 🫧 | 👻 | 🐀 | TBD | 🪰 |
| 🔥 Mountain | ☄️ | 🐦‍🔥 | 🦂 | TBD | 🦟 |
| 🌳 Forest | 🌿 | 🦌 | 🦅 | TBD | 🐢 |

Tier I–III purchase icons are live; Tier IV undecided and Tier V **only proposed**. No new purchase UI is authorized. Tiffany starts with five hearts; ordinary kills grant two coins, every eighth kill one gem. Discovered currencies/materials remain visible in the two-row HUD. After two drones Tiffany cycles spells every two seconds independently of tower selection; five towers stop autocycle and enable her five-node in-world Mission Command ring (currently stubs). Five orbiting drones (radius 65, speed ±0.65) or towers unlock territory: second drone → 2× area; five drones **or** five towers → 4×; no 8×. Camera auto-fits; pinch/drag disabled. Drone engagement radius `w/(2*arenaScale)`. Tier II divisions recruit up to eight one-hit combat units per tower, roughly every five seconds, expiring after 24 seconds; recruitment continues after construction/ascension.

### Causal chains

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

## Invariants — laws of the world

- **Real matter:** actual source object → exclusive claim → travel → harvest/pickup → visible cargo → physical delivery/drop → inventory or construction. No duplicated claims, remote credits, free materials, or unearned construction. Scorpion stone armor and Sun/Fire structures transfer physical stone. Shared crop cap 100; geological cap 12.
- **Autonomy and locality:** preserve existing shared worker FSM, equipped-actor pivots, target-claim cleanup, local encounters and competing ecological interests. Scarabs detect scorpions only within 160 world units; no omniscient agents. A carrying scarab finishes delivery; multiple Idols can deliver to one unfinished rim site.
- **Recovery and continuity:** enemies consume themselves when destroying one-hit towers, workers and depots, without kill currency. Towers recover after five seconds at their positions; depots after five seconds at valid tower-relative sites; living depots replenish up to three workers at roughly 1.5-second intervals. Ordinary combat recruitment continues after monuments and rims are occupied.
- **Interaction:** land UI cards and existing battlefield towers toggle selection; tapping the selected one again clears it. With no land selected, empty-field taps cannot place or move towers. Deselecting does not disable Tiffany's spellcasting. Preserve existing hit-testing and command-ring priority.
- **Presentation:** existing one-page mobile battlefield and shop only; preserve emoji legibility, current land icons and discoverable HUD. Use **in-game icons only** in causal diagrams; otherwise words. No new UI, invented inventory icons, duplicate depots, parallel worker machinery or unrequested mechanics.
- **Verification:** distinguish source parse, deployed Pages and observed runtime. Prefer direct 👁 evidence; don't resurrect retired red CI or destructive performance instrumentation. Preserve conservative targeting prefilter and emoji rather than speculative SVG/performance rewrites.

## Frontier — verified, unresolved, deferred

**Verified in human-supplied runtime observation (`de2eb2af`, 19 October 2026):** five Sun monuments built and inhabited; Fire constructed five volcanoes, collapsed them on relocation and rebuilt five, all Phoenix-claimed. The full event ledger and causal/debugging analysis live in the [chronicle](./CHRONICLE.md). This is strong observed lifecycle evidence, **not** a formal global material-conservation proof.

**Open checks:** stone conservation across destruction/relocation; Sun blocked-site arrival/credit, tower movement and Reliquary recovery; cargo drop on death; scorpion meal/armor edge cases; two Idols observed retaining stale rock targets after the rim was complete. Do not interpret open checks as permission to add features.

**Deferred:** save/restore remains unimplemented. Preserve durable world truth (progression, positions, ecology, geology, inventory, workers/cargo/journeys) and reconstruct ephemeral claims/timers when a future design is authorized. No save UI or radial-command node is approved. Retired optimization experiments stay retired. The [chronicle](./CHRONICLE.md) preserves the full original specifications, save/restore design reasoning, rejected proposals and development evidence; source remains executable truth.

**Cadence:** Play → notice → invent → ship → verify → play again. `➡️` means advance; `Dracarys` means authorized fix/implement/deploy. Read the chronicle selectively when a causal decision needs archaeology.
