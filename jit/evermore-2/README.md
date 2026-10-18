# TIFFINITY SURVIVORS™
**EVERMORE GAMES™ · THERE'S ALWAYS MORE™**

[Play](https://bonoj.github.io/jit/evermore-2/) · [Source](./index.html) · [Original Evermore](../evermore/)

## Features and invariants — quick reference

A mobile-first, single-file HTML/CSS/Canvas survival game. Tiffany 🧛‍♀️ stands at the center while enemies approach in increasingly frequent waves. Tap her to cast, earn currency, automate combat, establish towers, and recruit a little civilization.

- **Five lands, five identities:** ☀️ Plains (judgment/prisms), 💧 Island (repulsion/lightning), 💀 Swamp (poison/leech), 🔥 Mountain (explosions/rockets), 🌳 Forest (growth/vines). These identities recur across manual spells, drones, towers, and recruits.
- **Combat and economy:** five starting hearts; enemies converge on Tiffany; each kill awards **2 coins**, every **eighth kill 1 gem**. Purchased automation contributes kills and therefore revenue. Restart resets the run.
- **First shop tier — five drones:** Prism (25 coins), Chain (40), Leech (65 + 1 gem), Rocket (90 + 2 gems), Vines (120 + 3 gems). Each is purchased once and remains active, orbiting Tiffany and attacking automatically.
- **Expansion milestones:** starting arena = **1× area**; second drone = **2× area**; **five placed towers OR five purchased drones** = **4× area**. Camera zooms out rather than enlarging the phone viewport. Reaching both five-of-five conditions must not expand again.
- **Two-drone unlock:** Tiffany's **casting spell** rotates independently every **2 seconds**. Tapping Tiffany casts her current spell. The **selected land** stays fixed until the player chooses another land; it controls tower placement, not the autocycle. The existing cycling bubble communicates Tiffany's current casting spell; no separate icon above her head is needed.
- **Towers:** once two drones are owned, tapping the arena away from Tiffany places a tower of the selected land. Maximum **one per land**, **five total**. Placing the same land again **moves** its tower, rather than creating a duplicate. Towers periodically fire localized land spells, nominally every **2 seconds**; their positions survive camera expansion.
- **Second shop tier — five army divisions:** after all five drones are purchased, the **same five shop slots** become Cherubs (180 coins + 2 gems), Auditors (240 + 3), Notaries (320 + 5), Phoenixes (420 + 7), Arborists (550 + 10). Buying a division does **not** replace or remove its drone.
- **Recruits:** a purchased division spawns units from its matching tower approximately every **5 seconds** (only after that tower exists), with at most **eight active recruits per land**. Units pursue nearby enemies, periodically attack with their own effects, live at most **24 seconds**, and are removed on their **first enemy collision**. They are not invulnerable permanent turrets.
- **Distinct recruit effects:** Cherubs fire a prismatic beam and splash nearby enemies; Auditors establish slowing audit zones; Notaries poison nearby enemies; Phoenixes launch explosive projectiles; Arborists damage and entangle enemy groups.
- **Tone and interface:** mobile-first, direct taps, no long-press; rhyming Tiffany corporate couplets last **7.2 seconds**, with new non-forced verse events dropped while one is showing. UI state should reflect actual purchases and spell/land separation.
- **State invariants:** no duplicate drone, tower, or division for a land; a relocated tower retains its identity; recruits belong to a land and originate from its tower; kills are accounted for by the common hit/kill mechanism; expansion is derived from acquired milestones; restart returns all progress, entities, and scale to baseline.
- **Delivery invariant:** a successful GitHub write and read-back proves **source persistence**, not that GitHub Pages has deployed or that the browser is executing the new code. Never call runtime behavior verified without exercising it.

## Cold-boot handoff — resume here

**Entry:** This README is the single source of truth for TIFFINITY SURVIVORS™. Read **Features and invariants**, then **this handoff** before modifying the game. The chronicle below provides historical context, not prerequisite instructions. Do not restart the project or create another handoff file.

**Repository and execution:** `bonoj/bonoj.github.io`, branch `master`, game at `jit/evermore-2/index.html`; public URL [bonoj.github.io/jit/evermore-2/](https://bonoj.github.io/jit/evermore-2/). The game is currently a standalone, mobile-first HTML/CSS/Canvas/JavaScript file. This README sits beside it. Keep the original `jit/evermore/` game untouched. Fetch the latest file and blob SHA before edits; commit with GitHub's content update operation, then read back the changed source. A committed source change does **not** prove Pages deployment or live browser behavior. Confirm actual behavior when browser execution is available; otherwise report that limitation plainly.

**Current source state (2026-10-17, source commit `3a8c8e98`; documentation `c5cda2f7` before this update):** The active game has five lands, orbiting drones, manual spells, tower placement and autocycling, recruit divisions, battlefield vegetation, geological succession, and Swamp decomposition. **Cherubs are combat-only**: their recruitment, pursuit, attack, lifespan, and rendering code was compared directly with pre-agriculture commit `a9b23251` and found identical. The Cherub watering/harvesting/carrying/delivery experiment was fully removed. Preserve the existing ranged beam and splash damage. The upper-left SHA label is deliberately visually unobtrusive but tappable for development currency; it currently fetches the latest GitHub source SHA, **not** an independently verified executing-build SHA. The original `jit/evermore/` is untouched. See the state snapshot below and the historical chronicle for context.
**Known verification limits:** A player previously reported being unable to place towers, although the source inspection showed a placement handler. No definitive live reproduction/resolution was recorded. Do not assume this is fixed merely because the handler exists. The latest spell-selection separation was source-verified; live gameplay still needs testing. Enemy/recruit collision currently removes both without necessarily using the normal kill-reward path; inspect currency accounting when working on unit combat. Avoid claiming live deployment based solely on a GitHub commit.

### Current frontier — one battlefield, interacting ecologies

**One battlefield is the contract.** Interior games, double-tap zoom, and alternate pages were explored and rejected. Keep all game action and the ecology in the existing arena. Don't substitute new UI for working controls.

**Vegetation and water (implemented):**
- ☀️ Plains tower spawns 🌱 about every **0.65 s**; 🌳 Forest tower spawns 🌱 about every **3.5 s**, at distances **25–115 world units** from their respective towers. Sprouts remember their source.
- 💧 Island tower pulses water nearby unwatered sprouts and start **one-time** random maturation timers: Plains → 🌾 wheat in **1.5–4 s**; Forest → 🌳 tree in **5–10 s**. Later pulses don't restart pending growth.
- 🌱 and 🌾 are trampled by enemies; 🌳 is not. Trees don't block paths. All crops share a **100-entity cap**, avoid the **65-unit Tiffany exclusion radius**, and visually sway. Existing cooled mountains do not prevent plant growth; do not invent new placement exclusions.
- 🔥 Mountain tower pulses schedule burns of 🌱🌾🌳 after **0.6–2.5 s** rather than deleting them immediately. Island and Fire effects remain spatial and independent.
- **No resource harvesting is active.** Wheat and trees are persistent environmental outcomes, not currently carried or converted into currency/wood. There is no wood ledger.

**Geology (implemented):**
- 🔥 Mountain tower independently spawns 🌋 around every **16 s**, maximum **12 geological objects** across all stages, near the tower.
- Active 🌋 burns 🌱🌾🌳 and 🍄 within **36 world units** continuously. This is enforced by the volcano update; spawning is **not** forbidden near volcanoes. 🦴 bones are not burned.
- Succession via overlapping tower pulses, each with a **2–5 s** scheduled delay: 🌋 —💧→ 🗻 —🌳→ ⛰️ —💧→ 🏔️. 🔥 pulses can reactivate **any** cooled stage to 🌋. Pending transitions are not skipped/reset.
- Geological objects persist across tower relocation, aren't trampled, and don't block enemies. No ash or smoke system.

**Swamp decomposition (implemented):**
- A **killed** enemy within a placed 💀 Swamp tower's pulse radius (`min(w,h) × 0.23`) leaves 🦴 at its death coordinates, regardless of the killing weapon. An enemy that merely reaches Tiffany does not leave remains.
- Bones decay individually after **10–15 s** to 🍄 mushrooms; sizes **12 px bones / 16 px mushrooms**. No artificial remains cap. 🔥 tower pulses schedule mushroom burning in **0.6–2.5 s**; active volcanoes destroy mushrooms in their local 36-unit radius. Bones survive fire.
- Neither bones nor mushrooms are collected yet; no corpse-to-currency shortcut exists.

**Combat, armies, and economics (implemented):**
- Five orbiting **triangle-shaped** drones remain visually unchanged: Prism straight piercing beam (**2 damage**, ~**1.5 s**); Chain lightning up to **4 targets** (~**1.15 s**); Leech draining zone (~**2.2 s**); Rocket projectile (~**1.3 s**); Vines slowing beam/zone (~**1.3 s**). Proposed drone emoji identities 🪞⚡🧿🚀🦋 were **not** implemented; 💎 stays currency.
- Five recruit divisions unlock after buying all five drones. Each division recruits from its matching placed tower every **5 s**, at most **8 active** per land; recruits last **24 s** and die on first enemy contact.
- **Cherub 👼 authoritative behavior:** combat only, no tending. Moves toward nearest enemy within **230 units** at **26 units/s**; its beam targets an enemy within **170 units**, deals **1 damage** to that enemy and **1** to each other enemy within **42 units** of the target, with **1.7 s** cooldown. Beam visual life **0.28 s**. No sickle-chop strike emoji, crop reservations, watering, harvesting, carrying, wood, or delivery. The Cherub code blocks (recruit, attack, unit update, drawing) were compared against pre-agriculture commit `a9b23251` and were **character-for-character identical** at source commit `3a8c8e98`.
- Other recruits retain their distinct audit/slow, poison, projectile, and binding effects. Normal kills via `hit()` award **2 coins**, and every **8th kill** awards **1 gem**; enemy/recruit mutual-contact deaths bypass ordinary kill reward accounting and merit inspection if changed.
- **Developer shortcut:** tap the discreet upper-left **8-character SHA** to add **9,999 coins and 999 gems** per tap. It has no button-like styling. The label asynchronously fetches GitHub's most recent source SHA and may temporarily show a fallback value; **it does not prove the executing HTML is that revision**. This is session-only and restart resets currency.

**Latest development sequence and regression lessons:**
1. Swamp bones/mushrooms and burn interactions implemented; emoji sizes refined to 12/16 px (`a9b23251`).
2. Dev currency shortcut added, but incorrectly replaced the SHA with a large styled `BUILD 20261017.4` button and removed the old verifier (`aa62d3f7`). Presentation subsequently reverted to a subtle SHA (`a4040705`), while retaining the tap shortcut. The current label's latest-source SHA is not a verified executing SHA.
3. Experimental Cherub farming introduced: crop claims, watering, wheat harvesting, carrying, delivery for 3 coins, threat interruption (`e40e74f8`). Watering removed and ranged beam mistakenly replaced with a close-range chop (`dc811a7d`). The user explicitly rejected both regressions.
4. **Current restored state:** all Cherub farming/chop code removed and original ranged beam combat reinstated (`3a8c8e98`). Direct historical comparison confirmed the four Cherub code blocks match the pre-experiment version. Preserve this unless the user explicitly asks for new behavior. Historical farming entries below are **experiments, not current features**.

**Open frontier / next tests:** Observe live Pages on a phone (tower placement, SHA presentation, developer currency tap, combat, crops, Swamp remains, volcano succession). There is no implemented collector or transport economy. If revisiting resource collection, design it as a separate, deliberate change rather than quietly changing Cherub weapons. Avoid new artificial caps, placement restrictions, or environmental byproducts without discussion.

**Verification discipline:** GitHub write + readback confirms persisted source only. The latest game code was source-verified; no end-to-end Pages/browser gameplay test is recorded. Do not describe a deployed build or runtime as verified without checking it. Follow the repository's existing deployment/recovery protocol rather than inventing one.

**Working cadence:** Play → notice → invent → ship → verify → play again. Favor surgical, composable changes that preserve established behavior. When the user says **➡️**, continue from this frontier without asking them to restate context.

---

## Development chronicle — conversational invention

### 1. A tiny game instead of another grand design

The premise was intentionally almost comically small: Tiffany, a stationary vampire, in an arena; five land-flavored spells; monsters moving toward her; a tap to cast. The game was placed in its own `jit/evermore-2/` directory, preserving the original, much larger EVERMORE experiment. The first useful design choice was **to make something playable immediately** rather than build an abstract game framework or comprehensive roadmap. A single HTML file with its own styles, Canvas drawing, and JavaScript loop kept iteration cheap.

The five land types were not just cosmetic buttons. Each suggested a family of effects: judgment and light, water and electricity, poison and decay, fire and explosive force, forest and binding growth. That shared vocabulary made later systems feel like elaborations of one world rather than arbitrary upgrades.

### 2. Drones turn combat into a feedback economy

Five purchasable autonomous drones were added, one per land, with distinct effects and escalating coin/gem prices. Unlike a mere damage multiplier, each drone created a new behavior to watch: a piercing prism lance, chained lightning, leech mines, a rocket, and vine harpoons. Because their kills earned the same coins and gems as manual attacks, the game acquired a feedback loop: **fight → earn → purchase automation → earn faster**.

This exposed the first emergent design pressure. Once the player had all five drones, currency accumulated without much left to buy. The solution was not simply to inflate enemy health or add a score counter; it was to invent new institutions for Tiffany's growing enterprise. The absurd corporate fiction—Royal Reserve Bank, factories, divisions, acquisitions—was already part of EVERMORE's broader identity and provided an unusually fertile vocabulary for progression.

### 3. Tiffany gets a voice

Short, rhyming corporate couplets gave feedback a personality. Tiffany comments on scarcity, wealth, fire, damage, acquisitions, and the five-drone milestone. The poem system deliberately holds a verse for **7.2 seconds** and drops ordinary incoming verse events while busy, rather than queueing a torrent of stale jokes. This was a small but consequential interface rule: the game could be busy without the character becoming unreadable.

The tone became an invariant: whimsical, esoteric, gleefully acquisitive, never an earnest tutorial voice. The fiction is not decoration added after gameplay; it is a machine for generating gameplay ideas.

### 4. Two drones buy physical space

The next proposal took one turn: **when two drones are owned, double the arena area**. The implementation zoomed the logical coordinate system out by `sqrt(2)` on each axis, preserving the physical mobile viewport and Tiffany's central position. Existing enemy and effect coordinates were shifted with the new center. This mattered because expansion felt like territorial growth, not a scene reload or a different page.

The first expansion also created an opportunity: more empty ground begged for structures. The feature was committed as `8883094a`. Source read-back succeeded, but that did not constitute live-browser verification.

### 5. The five towers: turning empty ground into agency

The user proposed a second layer: after the two-drone milestone, Tiffany cycles spells every two seconds, still casts when tapped, and can place **five persistent localized towers**, one for each land. Tapping the field places the currently selected type; tapping again with that type moves it. Towers cast automatically every two seconds. Crucially, this is **one tower per type**, not five disposable charges.

This was a leap from buying orbiting helpers to **authoring a spatial arrangement**. Towers could guard different parts of the field, and relocating one became a meaningful tactical action. The first implementation was committed as `154e0ec8`.

The player then reported that tower placement did not appear to work. Inspection found the pointer handler, unlock condition, tower renderer, and update loop present in GitHub source, but did **not** establish what code GitHub Pages had actually served to the player's browser. The investigation was therefore inconclusive about the reported live failure. A separate defect was found: a Forest tower's slowing zone was evaluated around Tiffany rather than the tower. This was corrected later. **Do not rewrite this incident as a confirmed cache bug or as an end-to-end test pass.**

### 6. Five towers *or* five drones: expansion becomes a progression rule

The user immediately extended the spatial grammar: when all five towers are placed **or** all five drones are purchased, expand again. The second zoom sets each logical axis to twice its original length, giving **four times the initial area**. The two alternative prerequisites share one milestone; satisfying both must not create a third expansion.

This also fixed the Forest zone origin to use the zone's own coordinates. Commit: `6ad4fac7`. A small, composable rule now linked economic progression and spatial progression: either investment in mobile automation or investment in territory can grow the world.

### 7. The shop mutates into a recruitment institution

The next turn introduced a second purchasing tier, unlocked only after all five drones were bought. Instead of adding more buttons to an already narrow mobile interface, the existing five shop slots **change purpose**. They now sell more expensive divisions that periodically produce units from their corresponding towers.

The five divisions deliberately do **not** merely duplicate their drones' attacks:

- **Cherubs:** beams and splash damage around the victim.
- **Liquid Auditors:** localized slowing audit zones.
- **Ghost Notaries:** group poison.
- **Phoenix Futures:** explosive projectiles.
- **Antlered Arborists:** damaging, binding hedgerows.

The division has to own its land's tower before it can recruit. Units move toward enemies, fire periodically, disappear after one enemy collision, and time out after 24 seconds. A cap of eight active units per land prevents unbounded recruitment. This created a hierarchy with actual dependencies: **drones finance expansion; towers claim space; divisions recruit from towers; recruits fight and generate revenue**. Commit: `25ff647a`.

An important implementation nuance: “survive one hit” was encoded as a unit being removed on its **first collision with an enemy**; there is not yet a general enemy-projectile-versus-unit health system. That distinction should be preserved when extending combat.

### 8. The autocycle exposed a state-model mistake

The player noticed that Tiffany's automatic spell rotation was also changing the **selected land**. This was not intended. The initial implementation had overloaded one `selected` variable to mean both *what the player selected for tower placement* and *what Tiffany will cast now*. Once a timer modified it, the UI and placement semantics drifted together.

The fix introduced a separate `castSpell` state. With fewer than two drones, casting follows manual selection; at the two-drone milestone, `castSpell` begins cycling independently every two seconds. The selected land remains stable and continues to determine tower placement and relocation. The cycling bubble already communicates the current spell; a redundant icon above Tiffany was briefly added, then removed at the player's request. Commit: `fce0779c`.

This is a compact example of an important engineering lesson: **different concepts deserve different state even when they initially share a value**. The player discovered the distinction by playing, not by reviewing a specification.

### 9. Why the development loop felt startlingly fast

The conversation explicitly recognized that the game had become *legitimately fun* and that the changes had happened in **a few turns**, not “a few hours.” That correction matters. The unit of iteration was no longer a work session, sprint, or code-review cycle. It was a conversational move:

**Play → notice a pressure or possibility → propose one rule → implement → persist → play again.**

Each move changed what could be imagined next. Drones made money accumulate; money suggested larger investments. Larger arenas suggested placeable defenses. Towers suggested territorial control. Territorial control suggested units and armies. A tiny ambiguity in spell selection suggested a more correct internal state model. The design was **discovered through use**, not dictated by a master plan.

This does not mean the cost of verification became zero. Fast source edits can still produce runtime bugs, UI ambiguity, deployment lag, and mistakes hidden by one-file complexity. The tower-placement report and autocycle correction are evidence of that. The appropriate response is not to slow invention to a crawl; it is to make the **observe → correct → verify** half of the loop as cheap as the **invent → ship** half.

### 10. What to preserve as Evermore grows

The strongest progression pattern is **play a mechanic → monetize it → automate it → watch it become an institution**. Every new purchase should ideally grant a *different kind of agency*, not merely bigger numbers. Space, placement, independent actors, and interdependent production all make the world richer.

Preserve the separation between **manual intent** (selected land), **automatic behavior** (Tiffany's cycling spell), **persistent infrastructure** (towers and purchased divisions), and **ephemeral agents** (recruits). Preserve one-per-land uniqueness and explicit milestones. Keep the mobile screen usable; repurposing five existing shop slots was more elegant than endlessly adding rows.

Most importantly, keep the game playful and inspectable. A fast iteration is only truly complete when the source is committed **and the intended behavior can be observed in the running artifact**. The source currently documents the intended implementation; the recorded GitHub read-backs are not a substitute for a live gameplay regression pass.

---

## Build and verification record

| Commit | Change | Verification recorded |
|---|---|---|
| `bfc4413b` | Tiffany's rhyming verse persistence/drop policy | Source commit |
| `8883094a` | Double arena area at two drones | GitHub source read-back |
| `154e0ec8` | Autocycle and five movable, periodic towers | GitHub source read-back; player later reported placement trouble |
| `6ad4fac7` | Second expansion at five towers or drones; Forest-zone correction | GitHub source read-back |
| `25ff647a` | Second-tier army purchases and tower-born recruits | GitHub source read-back |
| `fce0779c` | Separate selected land from autocycling cast spell | GitHub source read-back |
| `c5362dda` | Remove redundant spell icon above Tiffany; retain cycling bubble | GitHub source commit |

**Current reference:** `jit/evermore-2/index.html` on `master`, inspected after `c5362dda`. The application is a single-file prototype; this document describes its implemented rules and known verification limits, not a guarantee that every browser path has been tested.

## Battlefield ecology — 2026-10-17

The first Plains interior was reverted after breaking outer UI controls. The design breakthrough was keeping farming and geology in the **same battlefield**, without separate views, zoom changes, or shop replacements.

- **20261017.1:** ☀️ Plains spawns 🌱, 💧 Island instantly turns them into 🌾, enemies trample crops, plants sway, and the header shows a build number. Source commits f6c63a50 and 8300b80f.
- **20261017.2:** 🌳 Forest spawns slower 🌱; 💧 Island starts staggered, randomized timers yielding 🌾 from Plains or 🌳 from Forest. Trees resist trampling. Source commit f00a3fcc.
- **20261017.3:** 🔥 Mountain pulses incinerate plants, rarely spawn localized active 🌋, and environmental pulses advance geology through 🗻, ⛰️, 🏔️. Volcanoes have a 24-unit burn radius; cooled mountains are harmless. Source commit a81b5965.

**Ecology feature milestone:** 20261017.3; index.html blob 4250cee20e251fbe028594e3d69409fc0bf3854b at documentation time. Source committed, **live browser and public deployment not independently verified**.

## Build identity — automatic source SHA

The header no longer uses manually incremented `BUILD YYYYMMDD.N`. On load it fetches a cache-busted copy of the public page and the latest GitHub commit affecting `jit/evermore-2/index.html`. It compares the executing inline game script against the fetched public game script. When they match, the header shows `SHA XXXXXXXX` (first eight characters of that source commit); when they differ it shows `STALE BUILD`; if either lookup fails it shows `SHA unavailable`. This checks source-code correspondence, not full runtime correctness, and requires network access. Added in source commit `64a79017`. The displayed SHA changes automatically with future source commits without manual edits.

### Fire reactivation — 2026-10-17

Source commit `1a2ac35d`: Fire tower pulses schedule random 0.6–2.5-second destruction timers for nearby sprouts, wheat, and trees, instead of deleting vegetation immediately. Fire pulses also schedule any nearby cooled mountain (🗻 ⛰️ 🏔️) to return to 🌋 after 2–5 seconds. Pending geological transformations are not overwritten. Once reactivated, volcanoes resume their existing 24-unit localized vegetation burn. Original tower combat remains unchanged. Source was committed; live gameplay not yet independently verified.

### Swamp decomposition — 2026-10-17

Implemented in game source commit `9e1ac553`:

- Any enemy killed **within the placed Swamp tower's pulse radius** leaves a 🦴 at its death coordinates, regardless of which weapon dealt the killing blow. The kill is still accounted for by the existing combat path; recruit-contact kills also produce bones if within range. Enemies that simply reach Tiffany are not harvested as corpses.
- Every bone pile has its own **random 10–15-second decay timer**, after which it becomes 🍄. Both stages persist until transformed or destroyed. No arbitrary bones/mushroom cap was added.
- Bones and mushrooms share a small persistent resource collection, with positions updated when the arena recenters. Restart clears them. There are no collectors yet, so decay cannot currently be interrupted by harvesting.
- 🔥 Fire tower pulses schedule mushroom destruction after 0.6–2.5 seconds; active 🌋 volcanoes destroy mushrooms within their 36-unit radius. **Bones do not burn.** Existing vegetation and geology rules remain.
- Source commit and read-back verified; live Pages deployment and actual browser behavior **not verified**.

**Next frontier:** Design differentiated defender collectors that consume bones before decay or mushrooms afterward, with observable inventory and consequences. Do not silently make pickups cosmetic or invent resource caps.

### Developer funding shortcut — 2026-10-17

- Tappable upper-left `BUILD 20261017.4` badge (13px) adds **9,999 coins and 999 gems** per tap; HUD/shop refresh immediately. Repeatable, session-only, reset clears funds.
- Removed previous GitHub SHA display and asynchronous stale-build verifier. Badge is now a manual version label, not an authoritative deployed commit indicator.
- Source commit `aa62d3f7` verified by GitHub readback. Public Pages and browser behavior not independently verified.

### Cherub agriculture — 2026-10-17

Source commit `e40e74f8`. Cherubs (Plains army, existing 24s lifetime) now pursue unclaimed Plains sprouts/wheat when no enemy is within **95 units**. They move at **45 units/s** for tending, water unwatered sprouts after 0.5s within 18 units (using existing 1.5–4s maturation), and harvest wheat after 0.5s. Each carries at most **one wheat**, visually displayed beside the Cherub, and must physically reach Tiffany within 30 units to earn **3 coins**. Crops are claimed per Cherub to avoid duplicate harvesting; lost/destroyed crops are reacquired. Nearby enemies interrupt tending and preserve existing Cherub combat. On death or 24s expiry, carried wheat drops as a Plains wheat crop, and reservations are released. Restart resets Cherub identity sequence. Existing Island water pulses also mature crops independently.

**Test frontier:** Observe real device behavior for threat interruptions, long journeys, harvest/delivery rates, and corpse-contact deaths; tune values based on actual play. GitHub source write/readback verified, but public deployment and browser execution not yet verified.

### Cherub combat restoration — 2026-10-17

Source commit `3a8c8e98`: Cherubs are combat-only again. Removed their experimental watering, crop claiming, harvesting, carrying, delivery, and sickle-chop behavior and effects. Restored original ranged beam and nearby splash damage, enemy pursuit, 24-second lifetime, and 1.7-second cooldown. Prior agriculture notes above are historical, not current behavior. No other ecology rules changed. GitHub source readback verified; live Pages execution not independently verified.
