# TIFFINITY SURVIVORS™
**EVERMORE GAMES™ · THERE'S ALWAYS MORE™**

[Play](https://bonoj.github.io/jit/evermore-2/) · [Source](./index.html) · [Original Evermore](../evermore/)

## Features and invariants — quick reference

A mobile-first, single-file HTML/CSS/Canvas survival game. Tiffany 🧛‍♀️ stands at the center while enemies approach in increasingly frequent waves. Tap her to cast, earn currency, automate combat, establish towers, and recruit a little civilization.

- **Five lands, five identities:** ☀️ Plains (judgment/prisms), 💧 Island (repulsion/lightning), 💀 Swamp (poison/leech), 🔥 Mountain (explosions/rockets), 🌳 Forest (growth/vines). These identities recur across manual spells, drones, towers, and recruits.
- **Combat and economy:** five starting hearts; enemies converge on Tiffany; each kill awards **2 coins**, every **eighth kill 1 gem**. Purchased automation contributes kills and therefore revenue. An internal reset function clears the run; the visible Restart footer control has been removed.
- **First shop tier — five drones:** Prism (25 coins), Chain (40), Leech (65 + 1 gem), Rocket (90 + 2 gems), Vines (120 + 3 gems). Each is purchased once and remains active, orbiting Tiffany and attacking automatically.
- **Expansion milestones:** starting arena = **1× area**; second drone = **2× area**; **five placed towers OR five purchased drones** = **4× area**. Camera zooms out rather than enlarging the phone viewport. Reaching both five-of-five conditions must not expand again.
- **Two-drone unlock:** Tiffany's **casting spell** rotates independently every **2 seconds**. Tapping Tiffany casts her current spell. The **selected land** stays fixed until the player chooses another land; it controls tower placement, not the autocycle. The existing cycling bubble communicates Tiffany's current casting spell; no separate icon above her head is needed.
- **Towers:** once two drones are owned, tapping the arena away from Tiffany places a tower of the selected land. Maximum **one per land**, **five total**. Placing the same land again **moves** its tower, rather than creating a duplicate. Towers periodically fire localized land spells, nominally every **2 seconds**; their positions survive camera expansion.
- **Second shop tier — five army divisions:** after all five drones are purchased, the **same five shop slots** become Cherubs (180 coins + 2 gems), Auditors (240 + 3), Notaries (320 + 5), Phoenixes (420 + 7), Arborists (550 + 10). Buying a division does **not** replace or remove its drone.
- **Recruits:** a purchased division spawns units from its matching tower approximately every **5 seconds** (only after that tower exists), with at most **eight active recruits per land**. Units pursue nearby enemies, periodically attack with their own effects, live at most **24 seconds**, and are removed on their **first enemy collision**. They are not invulnerable permanent turrets.
- **Distinct recruit effects:** Cherubs fire a prismatic beam and splash nearby enemies; Auditors establish slowing audit zones; Notaries poison nearby enemies; Phoenixes launch explosive projectiles; Arborists damage and entangle enemy groups.
- **Tone and interface:** mobile-first, direct taps, no long-press; rhyming Tiffany corporate couplets last **7.2 seconds**, with new non-forced verse events dropped while one is showing. UI state should reflect actual purchases and spell/land separation.
- **State invariants:** no duplicate drone, tower, or division for a land; a relocated tower retains its identity; recruits belong to a land and originate from its tower; kills are accounted for by the common hit/kill mechanism; expansion is derived from acquired milestones; the internal reset function returns all progress, entities, and scale to baseline.
- **Delivery invariant:** a successful GitHub write and read-back proves **source persistence**, not that GitHub Pages has deployed or that the browser is executing the new code. Never call runtime behavior verified without exercising it.

## Cold-boot handoff — resume here

**Entry:** This README is the single source of truth for TIFFINITY SURVIVORS™. Read **Features and invariants**, then **this handoff** before modifying the game. [CHRONICLE.md](./CHRONICLE.md) preserves development history; it is not an implementation specification. Do not restart the project or create another handoff file.

**Repository and execution:** `bonoj/bonoj.github.io`, branch `master`, game at `jit/evermore-2/index.html`; public URL [bonoj.github.io/jit/evermore-2/](https://bonoj.github.io/jit/evermore-2/). The game is currently a standalone, mobile-first HTML/CSS/Canvas/JavaScript file. This README sits beside it. Keep the original `jit/evermore/` game untouched. Fetch the latest file and blob SHA before edits; commit with GitHub's content update operation, then read back the changed source. A committed source change does **not** prove Pages deployment or live browser behavior. Confirm actual behavior when browser execution is available; otherwise report that limitation plainly.

**Current source state:** The active game has five lands, orbiting drones, manual spells, tower placement and autocycling, recruit divisions, battlefield vegetation, geological succession, and Swamp decomposition. **Cherubs are combat-only**: their recruitment, pursuit, attack, lifespan, and rendering code was compared directly with pre-agriculture commit `a9b23251` and found identical. The Cherub watering/harvesting/carrying/delivery experiment was fully removed. Preserve the existing ranged beam and splash damage. The upper-left SHA label is deliberately visually unobtrusive but tappable for development currency; it currently fetches the latest GitHub source SHA, **not** an independently verified executing-build SHA. The original `jit/evermore/` is untouched. 
### Civilian harvesting — shared FSM (source implemented; browser verification pending)

Purchasing Arborists spawns a 🛖 near Tiffany, in the direction of the Forest tower, with three 🐜 ants.

Ants gently pace around the hut, staying outside Tiffany's 75-unit exclusion radius, until mature 🌳 trees are available. They walk to trees, face them, and chop with a swinging 🪓 overlapping their bodies. The axe appears only while chopping.

Each ant carries one 🪵 on its back to the hut, unloads once, and repeats. A reusable in-file FSM kernel owns transitions, entry/exit hooks, state timeouts, and recovery. Ant states: idle → travel → chop → carry → unload → idle. Invalid/destroyed tree targets release claims. Future agents should reuse this kernel rather than inventing ad hoc state flags.

Do not invent or add any controls. Ants, axes, and logs must remain recognizable at maximum zoom-out without overwhelming Tiffany. The game occupies a single viewport without page scrolling; instructional hint rows are hidden. The HUD includes an empty, invisible second resource row for future resources. The entire bottom footer (land title, original Evermore link, Restart button) has been removed; the internal reset function remains for testing. Existing land and purchase controls are unchanged.

### Reusable oriented actor and equipment rig — implemented (visual verification pending)

`drawEquippedActor(actor, rig)` in `index.html` applies one actor-local facing transform to body, equipped tool, and cargo. `faceActor(actor, targetX)` updates horizontal heading toward the target. The rig accepts `body`, `bodyNativeFacing` (native emoji orientation), `bodySize`, `usingTool`, `tool` (icon, size, mount coordinates, local offset, swing angle), and `cargo` / `cargoSize`. Ants use a native-left 🐜 body with an axe mounted at the forward side; the axe rotates locally without independently flipping. Travel/carry heading comes from movement; chop heading comes from the claimed tree. Reuse this rig for bees and their tools, rather than writing a second independent sprite/axe renderer. The current horizontal-facing model does not implement full 2D heading; extend the shared rig if bees require it. Source and static regression assertions updated; live visual validation remains outstanding.

### Visual sizing contract — implemented

The Canvas renderer uses immutable `VISUAL_SIZE` tokens in logical world pixels, with the existing arena zoom transform applied once. Six tiers: `micro=12` (bones, Tiffany label), `small=19` (sprouts, mushrooms, rockets), `medium=24` (combat recruits, wheat, ant axes), `actor=27` (enemies, ants), `worldFeature=30` (hut, mountains, volcanoes, mature trees), `hero=49` (Tiffany). Named exceptions: `towerIcon=21`, `cargo=25`. The hut shrank 34→30, mature trees grew 29→30, mushrooms grew 16→19, axes shrank 27→24. Other entity sizes are preserved.

Ant chopping faces the claimed tree and draws an overlapping axe from a forward-of-center attachment, mirroring its attachment for left/right orientation. Travel faces the tree, carrying faces the hut, unloading faces the hut, and patrol faces travel direction. No changes to ant FSM state graph, economy, collision, chopping duration, UI, or scroll behavior. The latest source change has not yet been browser-verified; check both facing directions and mobile readability before declaring visual validation.

### Current frontier — one battlefield, interacting ecologies

**One battlefield is the contract.** Interior games, double-tap zoom, and alternate pages were explored and rejected. Keep all game action and the ecology in the existing arena. Don't substitute new UI for working controls.

**Vegetation and water (implemented):**
- ☀️ Plains tower spawns 🌱 about every **0.65 s**; 🌳 Forest tower spawns 🌱 about every **3.5 s**, at distances **25–115 world units** from their respective towers. Sprouts remember their source.
- 💧 Island tower pulses water nearby unwatered sprouts and start **one-time** random maturation timers: Plains → 🌾 wheat in **1.5–4 s**; Forest → 🌳 tree in **5–10 s**. Later pulses don't restart pending growth.
- 🌱 and 🌾 are trampled by enemies; 🌳 is not. Trees don't block paths. All crops share a **100-entity cap**, avoid the **65-unit Tiffany exclusion radius**, and visually sway. Existing cooled mountains do not prevent plant growth; do not invent new placement exclusions.
- 🔥 Mountain tower pulses schedule burns of 🌱🌾🌳 after **0.6–2.5 s** rather than deleting them immediately. Island and Fire effects remain spatial and independent.
- **Harvesting:** Arborists spawn three 🐜🪓 logging ants delivering 🪵 to 🛖; Cherubs spawn three flying 🐝🔱 golden harvesters delivering 🌾 to 🍯; Auditors spawn a 🐚 shell housing three scuttling 🦀⛏️ miners extracting 🧊 from 🏔️→⛰️, 🌿 from ⛰️→🗻, and 🪨 from 🗻→depleted, delivering to 🐚 shell. All three use one FSM (idle/travel/chop/carry/unload), shared claim/release, equipment rig and movement primitive. Flying is a reusable movement capability, currently visual hover/bob and increased speed; no separate pathfinding. Deliveries increment internal resource counts only, not HUD or purchasing. No new controls. User visually confirmed ant tool orientation before this refactor; new refactor not yet browser-verified.

**Geology (implemented):**
- 🔥 Mountain tower independently spawns 🌋 around every **16 s**, maximum **12 geological objects** across all stages, near the tower.
- Active 🌋 burns 🌱🌾🌳 and 🍄 within **36 world units** continuously. This is enforced by the volcano update; spawning is **not** forbidden near volcanoes. 🦴 bones are not burned.
- Succession via overlapping tower pulses, each with a **2–5 s** scheduled delay: 🌋 —💧→ 🗻 —🌳→ ⛰️ —💧→ 🏔️. 🔥 pulses can reactivate **any** cooled stage to 🌋. Pending transitions are not skipped/reset.
- Geological objects persist across tower relocation, aren't trampled, and don't block enemies. No ash or smoke system.

**Swamp decomposition (implemented):**
- A **killed** enemy within a placed 💀 Swamp tower's pulse radius (`min(w,h) × 0.23`) leaves 🦴 at its death coordinates, regardless of the killing weapon. An enemy that merely reaches Tiffany does not leave remains.
- Bones decay individually after **10–15 s** to 🍄 mushrooms; sizes **12 px bones / 19 px mushrooms**. No artificial remains cap. 🔥 tower pulses schedule mushroom burning in **0.6–2.5 s**; active volcanoes destroy mushrooms in their local 36-unit radius. Bones survive fire.
- Neither bones nor mushrooms are collected yet; no corpse-to-currency shortcut exists.

**Combat, armies, and economics (implemented):**
- Five orbiting **triangle-shaped** drones remain visually unchanged: Prism straight piercing beam (**2 damage**, ~**1.5 s**); Chain lightning up to **4 targets** (~**1.15 s**); Leech draining zone (~**2.2 s**); Rocket projectile (~**1.3 s**); Vines slowing beam/zone (~**1.3 s**). Proposed drone emoji identities 🪞⚡🧿🚀🦋 were **not** implemented; 💎 stays currency.
- Five recruit divisions unlock after buying all five drones. Each division recruits from its matching placed tower every **5 s**, at most **8 active** per land; recruits last **24 s** and die on first enemy contact.
- **Cherub 👼 authoritative behavior:** combat only, no tending. Moves toward nearest enemy within **230 units** at **26 units/s**; its beam targets an enemy within **170 units**, deals **1 damage** to that enemy and **1** to each other enemy within **42 units** of the target, with **1.7 s** cooldown. Beam visual life **0.28 s**. No sickle-chop strike emoji, crop reservations, watering, harvesting, carrying, wood, or delivery. Preserve this original ranged-beam behavior.
- Other recruits retain their distinct audit/slow, poison, projectile, and binding effects. Normal kills via `hit()` award **2 coins**, and every **8th kill** awards **1 gem**; enemy/recruit mutual-contact deaths bypass ordinary kill reward accounting and merit inspection if changed.
- **Developer shortcut:** tap the discreet upper-left **8-character SHA** to add **9,999 coins and 999 gems** per tap. It has no button-like styling. The label asynchronously fetches GitHub's most recent source SHA and may temporarily show a fallback value; **it does not prove the executing HTML is that revision**. This is session-only and the internal reset function clears currency.

**Verification discipline:** GitHub write + readback confirms persisted source only. The latest game code was source-verified; no end-to-end Pages/browser gameplay test is recorded. Do not describe a deployed build or runtime as verified without checking it. Follow the repository's existing deployment/recovery protocol rather than inventing one.

**Automated regression:** [Playwright tests](./tests/regression.spec.cjs) run in mobile-sized Chromium via [GitHub Actions](../../.github/workflows/evermore-2-regression.yml) on game/test pushes. They exercise purchases, tower placement/movement, five recruit divisions, attacks, ecology, remains, internal reset, and controls. For every new or changed behavior, add or update a regression test in the same change. The workflow runs automatically on game/test pushes, but test coverage does not grow automatically. Verify the Actions run is green before declaring a build regression-tested; a green run covers only its assertions, not untested visuals or behaviors. This is functional coverage, not a substitute for checking visual legibility and animation on a phone.

**Development logging:** After implementing a feature, update this README only if current behavior, invariants, or next steps change. Append the development record to [CHRONICLE.md](./CHRONICLE.md).

**Working cadence:** Play → notice → invent → ship → verify → play again. Favor surgical, composable changes that preserve established behavior. When the user says **➡️**, continue from this frontier without asking them to restate context.

---

Historical changes, rejected experiments, and build records: [Development chronicle](./CHRONICLE.md).


### Current implementation checkpoint (2026-10-18)

Shared `workerStates`, `professions`, `workerGroups`, `moveWorker` and `drawEquippedActor` now implement ant/bee/crab harvesting. Army purchase starts independent civilian groups. `resources` tracks delivered wood, wheat, ice, herbs and stone. Existing ant-facing tests should be adjusted to the generic target field; no user-facing resource strip yet. Keep ecological succession and combat recruits intact. Source commit `14dbb4ad`; tests committed separately. Browser execution and test-run green status have not been confirmed.

**Crab spawn ownership correction:** Auditors (Island / 💧) create the 🐚 shell and three miners; Phoenixes do not create miners. Active 🌋 cannot be mined. Source commit `c4006334`.

### Shared idle movement (2026-10-18)

All civilian ants, bees, crabs and all five combat recruit divisions use `lazyWander(actor, home, dt, speed, radius)` when idle: independently randomized destination, pauses, and heading near their hangout. Combat recruits wander around their matching tower until acquiring an enemy; they continue their original attacks and pursuits. Cherub, Auditor jellyfish, Notary ghost and Phoenix use the shared `unitMotion='fly'` bobbing; Arborist deer walk. Civilian bees fly; ants walk and crabs scuttle. No synchronized idle orbiting or new UI. Source commit `45085e18`; live browser behavior not verified.

### Swamp decomposition
Swamp tower pulses wither nearby sprouts, wheat, and trees over randomized 2–4 seconds into mushrooms. Withering stops maturation and releases worker claims; repeated pulses do not reset it. Enemy deaths near the swamp still create bones, but bones now take 25–30 seconds to become mushrooms. Plant decay produces mushrooms directly, never bones. Source `1ef3cc8f`; browser validation pending.

### Persistent building placement
Worker buildings 🛖 🍯 🐚 use `buildingSite(tower)` and `validBuildingSite(x,y)` to reserve a footprint (radius 19), building separation (61 center-to-center), tower separation (39), sanctuary exclusion (94), and arena margins. Deterministic expanding-ring placement with a grid fallback. Buildings do not follow tower moves; viewport resize translates them with the world. If no valid site exists, no building or workers are spawned; no overlapping fallback. Source `cdbddfea`; runtime verification pending.
