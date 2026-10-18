# TIFFINITY SURVIVORS™ — Development chronicle

Historical development record. **Not the current game specification.**

**Identity convention:** the project owner is **the human**; the collaborator is **the model**; all other real people are **test subjects**. Keep personal names out of this chronicle. Game characters, project titles, code identifiers, and technical terms are unaffected. For current behavior, invariants, and the next task, read [README.md](./README.md). Earlier experiments, build-label implementations, verification claims, and proposed frontiers below may have been superseded; do not implement them from this history.

# The Aeon Chronicle

*TIFFINITY SURVIVORS™ — an executable history of accidental civilization*

This is a chronicle of **invention coinciding with implementation**. The commit is the fossil: an idea made executable. Dates below follow the historical record; linked commit identifiers anchor individual events. Exact clock times and elapsed-minute claims are deliberately omitted because the available commit metadata did not expose trustworthy timestamps during this revision. The detailed development record follows this narrative unchanged.

## Aeon I — The Vampire and the Void

First there was a vampire, stationary in the center of a tiny mobile arena, and monsters with the poor judgment to approach her. Tiffany could cast five land-flavored spells. There was no civilization, no geology, no industry, no need for a master plan. The entire world fit inside one HTML file. That was the first miracle of scale: an idea could become a playable rule in a conversational turn.

The five lands were already seeds of a larger cosmology. Light could judge; water could conduct; swamp could poison; fire could explode; forest could bind. Nothing required them to remain mere combat effects.

## Aeon II — The Age of Acquisition

Tiffany acquired five autonomous drones: prism, chain lightning, leech mines, rockets, and vines. They fought, earned currency, and financed more automation. The economy acquired its first self-reinforcing loop: **combat funded agency; agency funded combat**. The vampire acquired a voice, too—rhyming corporate pronouncements that made wealth and destruction sound like boardroom minutes.

Then came a revealing problem: money accumulated faster than purpose. Instead of making the numbers larger, the game began inventing things worth owning. Two drones doubled the battlefield's area (`8883094a`). Five placeable towers made territory programmable (`154e0ec8`). Five towers *or* five drones could expand it again (`6ad4fac7`). The player was no longer only surviving. The player was arranging a world.

## Aeon III — The Age of Institutions

The shop itself evolved. Its five slots became a second tier of military recruitment rather than expanding into another row of mobile controls. Cherubs, liquid auditors, ghost notaries, phoenix futures, and antlered arborists emerged from their corresponding towers (`25ff647a`). Drones, towers, divisions, and recruits became distinct levels of agency.

One tiny bug became a philosophical distinction: Tiffany's automatically cycling spell was not the player's selected land. Splitting those states (`fce0779c`) preserved independent intent and automation. The universe was teaching its builders what its concepts actually meant.

## Aeon IV — The Green Revolution · 17 October 2026

Then the five spells escaped their original purpose.

Plains sunlight made sprouts. Island water matured them into wheat. Forests planted slower-growing trees. Fire burned vegetation and raised volcanoes. Water cooled volcanic rock; forest and water advanced its geological stages. The battlefield did not become a farming minigame or a separate map. **The same space became an ecology.**

This was the crucial crossing. A spell was no longer only something done *to an enemy*. It was a force with consequences for everything nearby. The world could respond to combinations of actions its builders had never scripted as a single scene. Sources: `f6c63a50`, `f00a3fcc`, `a81b5965`.

Swamp completed the cycle. Enemies slain within its influence left bones, which decayed into mushrooms. Later, swamp pulses withered living vegetation directly into fungal growth, while bones were given longer to persist (`9e1ac553`, `1ef3cc8f`). Fire could interrupt that flourishing. The world now possessed not only growth and destruction, but **succession, decay, and return**.

## Aeon V — The First Workers · 17–18 October 2026

A forest full of trees asked an obvious question: who cuts them down?

The answer was not a magical income tick. Buying the Arborist division built a hut and brought three enormous, legible ants with axes. They claimed individual trees, walked to them, chopped, carried logs, and returned home to unload. An economy had acquired *labor*, *equipment*, *distance*, and *delivery*. The first ant implementation demanded corrections: explicit worker states, correct body-facing and axe pivots, and visible tools large enough to read on a phone (`6dbda05b`, `e7b77f63`, `2a6d9326`). Those corrections were not incidental; they made the worker a reusable actor instead of a special effect.

The next invention reused the grammar rather than duplicating it. Cherub purchases established beehives with flying, trident-bearing bees that harvested wheat. Auditor purchases established shells with crabs and pickaxes that mined successive cooled mountain strata: ice, vegetation, then stone. All three professions shared a finite-state working life—idle, travel, work, carry, unload—while retaining distinct bodies, tools, materials, and locomotion.

Meanwhile, combat recruits and workers learned to wander independently, with pauses and personal destinations. Their buildings acquired permanent, nonoverlapping sites (`cdbddfea`). The arena was no longer a backdrop populated by identical attack loops. It contained residents who had places to be.

## Aeon VI — The Age of Discovery · 18 October 2026

The civilization began producing wheat, wood, ice, herbs, and stone. But the interface would not announce resources merely because the code knew they existed.

Only Tiffany's health was visible at the beginning. Kills, coins, gems, and every material remained unknown until first earned. Materials appeared only when a worker successfully delivered them. A discovered counter remained visible even when its balance returned to zero. The first delivery unfolded a second HUD row without shifting the battlefield (`d845c3c0`).

This turned the interface into a memory of lived events. The player does not receive a catalog of the universe. **The universe discloses itself through consequences.**

## Aeon VII — The Unfinished World

The next frontier is not another decorative button. Five materials can become real costs for future tiers; workers can become more than suppliers; geology can become an economy; the same systems can interact in combinations that no one has individually storyboarded.

The development method has remained remarkably constant:

**Play → notice a pressure → invent a rule → make it executable → observe the consequences → invent again.**

This is why the chronicle matters. It is not the story of a predetermined game being completed. It is the record of a tiny world repeatedly becoming larger than the idea that preceded it.

---

# Development record — original chronicle

## Conversational invention

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

The human proposed a second layer: after the two-drone milestone, Tiffany cycles spells every two seconds, still casts when tapped, and can place **five persistent localized towers**, one for each land. Tapping the field places the currently selected type; tapping again with that type moves it. Towers cast automatically every two seconds. Crucially, this is **one tower per type**, not five disposable charges.

This was a leap from buying orbiting helpers to **authoring a spatial arrangement**. Towers could guard different parts of the field, and relocating one became a meaningful tactical action. The first implementation was committed as `154e0ec8`.

The player then reported that tower placement did not appear to work. Inspection found the pointer handler, unlock condition, tower renderer, and update loop present in GitHub source, but did **not** establish what code GitHub Pages had actually served to the player's browser. The investigation was therefore inconclusive about the reported live failure. A separate defect was found: a Forest tower's slowing zone was evaluated around Tiffany rather than the tower. This was corrected later. **Do not rewrite this incident as a confirmed cache bug or as an end-to-end test pass.**

### 6. Five towers *or* five drones: expansion becomes a progression rule

The human immediately extended the spatial grammar: when all five towers are placed **or** all five drones are purchased, expand again. The second zoom sets each logical axis to twice its original length, giving **four times the initial area**. The two alternative prerequisites share one milestone; satisfying both must not create a third expansion.

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

## Historical build and verification record

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

## Ecology development — 2026-10-17

The first Plains interior was reverted after breaking outer UI controls. The design breakthrough was keeping farming and geology in the **same battlefield**, without separate views, zoom changes, or shop replacements.

- **20261017.1:** ☀️ Plains spawns 🌱, 💧 Island instantly turns them into 🌾, enemies trample crops, plants sway, and the header shows a build number. Source commits f6c63a50 and 8300b80f.
- **20261017.2:** 🌳 Forest spawns slower 🌱; 💧 Island starts staggered, randomized timers yielding 🌾 from Plains or 🌳 from Forest. Trees resist trampling. Source commit f00a3fcc.
- **20261017.3:** 🔥 Mountain pulses incinerate plants, rarely spawn localized active 🌋, and environmental pulses advance geology through 🗻, ⛰️, 🏔️. Volcanoes have a 24-unit burn radius; cooled mountains are harmless. Source commit a81b5965.

**Ecology feature milestone:** 20261017.3; index.html blob 4250cee20e251fbe028594e3d69409fc0bf3854b at documentation time. Source committed, **live browser and public deployment not independently verified**.

## Historical build-identity experiment

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

**Historical proposed frontier (not current instruction):** Design differentiated defender collectors that consume bones before decay or mushrooms afterward, with observable inventory and consequences. Do not silently make pickups cosmetic or invent resource caps.

### Developer funding shortcut — 2026-10-17

- Tappable upper-left `BUILD 20261017.4` badge (13px) adds **9,999 coins and 999 gems** per tap; HUD/shop refresh immediately. Repeatable, session-only, reset clears funds.
- Removed previous GitHub SHA display and asynchronous stale-build verifier. Badge is now a manual version label, not an authoritative deployed commit indicator.
- Source commit `aa62d3f7` verified by GitHub readback. Public Pages and browser behavior not independently verified.

### Cherub agriculture — 2026-10-17

Source commit `e40e74f8`. Cherubs (Plains army, existing 24s lifetime) now pursue unclaimed Plains sprouts/wheat when no enemy is within **95 units**. They move at **45 units/s** for tending, water unwatered sprouts after 0.5s within 18 units (using existing 1.5–4s maturation), and harvest wheat after 0.5s. Each carries at most **one wheat**, visually displayed beside the Cherub, and must physically reach Tiffany within 30 units to earn **3 coins**. Crops are claimed per Cherub to avoid duplicate harvesting; lost/destroyed crops are reacquired. Nearby enemies interrupt tending and preserve existing Cherub combat. On death or 24s expiry, carried wheat drops as a Plains wheat crop, and reservations are released. Restart resets Cherub identity sequence. Existing Island water pulses also mature crops independently.

**Historical test notes:** Observe real device behavior for threat interruptions, long journeys, harvest/delivery rates, and corpse-contact deaths; tune values based on actual play. GitHub source write/readback verified, but public deployment and browser execution not yet verified.

### Cherub combat restoration — 2026-10-17

Source commit `3a8c8e98`: Cherubs are combat-only again. Removed their experimental watering, crop claiming, harvesting, carrying, delivery, and sickle-chop behavior and effects. Restored original ranged beam and nearby splash damage, enemy pursuit, 24-second lifetime, and 1.7-second cooldown. Prior agriculture notes above are historical, not current behavior. No other ecology rules changed. GitHub source readback verified; live Pages execution not independently verified.


### Ant lumberjacks — 2026-10-17

Source commit `6dbda05b`: Arborist purchase creates a hut and three autonomous ants. They claim mature Forest trees, approach, chop for two seconds with animated axes, remove harvested trees, carry logs back, and increment an internal delivery counter. Ants and tools are drawn large without additional UI. Recenter and reset are handled. Regression source added in `475816db`. GitHub source committed; Actions/browser execution and visual legibility have not yet been independently verified.

### Ant FSM, visual sizing, and oriented equipment — 2026-10-18

The original ant lumberjacks were reorganized around the reusable in-file FSM with explicit idle, travel, chop, carry, and unload transitions, tree claims and release, and recovery on invalidated targets (source `e7b77f63`). Visual sizes were centralized into `VISUAL_SIZE`: ant 27, axe 24, log 25, hut/tree 30 logical pixels (source `27146af4`). A subsequent one-line axe-only mirror (`214a982b`) did not solve the underlying orientation coupling. The renderer was then refactored to `drawEquippedActor` and `faceActor`: one shared native-left body orientation transform governs the ant, tool mount, and cargo, while the axe swings about its local pivot (source `2a6d9326`; test assertions `6f34c9c7`; README `d3da91e6`). This is the composable foundation for future tool-using bees. Source persisted; live visual correctness and Actions results were not confirmed.

### Footer removal — 2026-10-18

Removed the entire obsolete bottom footer containing the land title, Evermore 1.0 link, and Restart button, along with footer CSS, status assignment, and click binding (source `1f09db3d`). The internal `reset()` remains. Existing land and army controls, HUD, and battlefield were not deliberately modified. GitHub source read-back confirmed removal; public Pages behavior was not independently verified.


## 2026-10-18 — Three professions, one FSM

Refactored existing ant forestry into a configurable shared worker FSM and equipment rig. Added golden-trident flying bee wheat harvesters and pickaxe crab miners harvesting ice, herbs and stone from successive mountain stages. Delivered materials accumulate in an internal resource ledger; no UI or economic spending integration. Preserved army combat roles. Updated Playwright regression source; live browser results pending.

Auditor correction: crab miners and their 🐚 shell now spawn on Auditor purchase (Island), not Phoenix purchase (Mountain). Active volcanoes remain unmineable.

Shared lazy idle movement: all five combat recruit divisions and three civilian professions wander independently with random pauses and waypoints. Four combat divisions fly (cherub, jellyfish, ghost, phoenix), deer walk. Civilian bee flying preserved. Combat pursuit unchanged.

Swamp decomposition change (`1ef3cc8f`): wither sprouts, wheat and trees over 2–4s into mushrooms, releasing claims; bones now decay to mushrooms in 25–30s.

`cdbddfea`: deterministic permanent building placement, collision clearances for 🛖 🍯 🐚, expanding ring + grid fallback, no tower-following or overlapping fallback.

`d845c3c0`: discovery-driven HUD implemented, hidden counters until first earned, fixed-height two-row progression, WAVE removed.

Regression harness retired (2026-10-18): removed `.github/workflows/evermore-2-regression.yml`, `tests/regression.spec.cjs`, and `tests/package.json` after persistent red runs. Do not assume automated regression coverage or claim green checks. Game source unchanged. Future tests should be purpose-built and verified before enabling CI.

### The commander's accession — 18 October 2026
At five towers, Tiffany ceased automatic spell rotation and assumed mission command. Her drones retained their original circular orbits around Tiffany and their existing combat roles. A five-glyph radial command ring (🧭 🔭 📡 🗺️ ⚙️) appeared on tapping Tiffany, collapsible on a second tap, its affordances deliberately left as stubs for future invention. Source `6627ec3e`; live verification pending.

### Attrition, recovery, and the one-AU horizon — 18 October 2026

The little civilization acquired consequences: enemies can destroy towers, civilian depots, and individual workers on contact. Purchased infrastructure remains owned; towers recover after five seconds, depots rebuild after five seconds, and surviving depots replace lost workers at 1.5-second intervals up to three. Destroyed depots lose their workers and release outstanding resource claims. Combat recruits retain their existing one-hit losses and recruitment cycle. No new UI was introduced. Source `0242bbaf` and `556f1ded`.

An early recovery implementation restored depots to stale original coordinates. The corrected lifecycle reruns the existing site-selection logic against the associated tower's **current** position, excluding the recovering depot from its own clearance test and waiting when no valid site exists. Source `ecc6f36b` and `7b827a39`. Placement-aware respawning was subsequently observed working in-game by the player.

Drone acquisition range became a dynamic **one-AU radius within a two-AU-wide viewport**, computed as `w / (2 * arenaScale)`. Prism beam drawing and damage reach now share that cap; chain follow-up targeting respects the same maximum. Drone circular orbits were not changed. Source `60c4cff8`. Runtime verification of the new reach remains pending.

## Optimization frontier — plan recorded verbatim (18 October 2026)

The following is the optimization plan as proposed in the conversation, preserved without editorial rewriting. This is a *plan*, not a claim of implementation or measured improvement.

## TIFFINITY SURVIVORS™ — Extreme Optimization Plan 🐉

**Objective: radically reduce CPU work, allocations, and rendering overhead with zero loss of visual quality, simulation fidelity, or gameplay complexity.**

Not fewer mushrooms. Not fewer enemies. Not slower workers. Not reduced frame rates.

**The same living world, doing less unnecessary work.**

Our guiding principle should be:

> Compute when something changes. Reuse what hasn't. Never make every entity inspect the entire civilization unless it actually needs to.

I'd optimize in layers, beginning with the waste we already identified.

### The attack plan

| Priority | Optimization | Intended result |
|---|---|---|
| 1 | Spatial indexing | Stop scanning every plant, enemy, and structure for local interactions |
| 2 | Event-driven ecology | Stop repeatedly processing volcano damage and unchanged vegetation |
| 3 | Combat targeting | Avoid redundant enemy searches without changing targeting decisions |
| 4 | Allocation reduction | Reuse arrays and avoid repeated `filter()` allocations |
| 5 | Canvas rendering | Reduce draw-state changes, emoji layout overhead, and redundant operations |
| 6 | HUD updates | Only update changed counters and shop states |
| 7 | Simulation instrumentation | Measure frame time and subsystem costs without adding visible UI |

One important distinction: **zero performance loss** should mean zero degradation in gameplay or visual fidelity. The objective is substantially *better* runtime performance.

## What the code inspection tells us

There are two particularly promising targets.

**Ecology is our biggest obvious source of wasted work.** `cropTrample()` runs inside the enemy loop and filters the crop array each time. `mountainUpdate()` repeatedly filters crops and remains around every active volcano. These are good candidates for substantial reductions in work without changing the resulting world.

**Rendering is the biggest uncertainty.** Every plant uses Canvas `save()`, `translate()`, `rotate()`, emoji rendering, and `restore()` each frame. The model advised against eliminating their gentle animation; and proposed investigating cheaper ways to produce the same appearance.

For the extreme version, the model proposed introducing a lightweight spatial grid shared by vegetation, enemies, and structures. But we'd retain exact distance checks and current update ordering. A spatial grid must accelerate the existing rules, not quietly change them.

### How we'll know it worked

**PERFORMANCE TARGETS — NOT YET MEASURED**

- Frame budget at 60 FPS: **16.7 ms**
- Target visual fidelity: **100%**
- Entity / population caps: **Unchanged**
- Gameplay rule changes: **Zero**

The model proposed comparing a reproducible busy-world scenario before and after each optimization, measuring average frame time, worst-frame spikes, allocations, and entity counts. A test subject's phone then becomes our real-world validation.

**One important rule:** don't blindly move simulation to a lower update frequency. That can change collisions, timing, and worker behavior. First eliminate redundant work while preserving every simulation step.

The human and the model can keep this fast and playful: optimize a subsystem, check it, keep it if it works, revert if it doesn't. No architectural crusade.

Save-game persistence should remain as a separate next feature, so the test subject can return to their civilization.

**The goal isn't a smaller game. It's a world that can grow dramatically larger before the phone even notices.** 🍄🐉


---

## 18 October 2026 — Runtime eyes and mature-state hydration

Runtime Eyes I (d96bc606) measured frame costs, state, errors and history. II (3ae7123e) added Canvas counts, subsystem timings and RAF gap thresholds. III (b708df66) tried a synthetic offscreen rendering proxy; it was retired because it did not exercise actual game systems. IV (53416919) made the first 👁 tap replace the unsaved run with a real mature-world fixture and subsequent taps copy live JSON. The first live attempt executed stale HTML despite a current source SHA label; a cache-busted reload fixed it. The source SHA label is not proof of executing build identity.

Human-verified Android Chrome report for 53416919: the fixture instantiated 55 enemies, 93 crops, 24 remains, 9–11 mountains, five towers/drones/armies, 40 combat recruits, nine workers, and three depots. At 4.6 seconds average JavaScript frame work was 1.54ms, p99 5.2ms, maximum 6ms. After roughly 42 seconds of simulated play: rolling average 0.81ms, p99 1.4ms, simulation 0.2ms, Canvas command issuance 0.61ms. No JavaScript errors or long tasks. A 5.2-second RAF interruption corresponded to recorded browser hidden/visible events. JavaScript heap samples varied about 1.5–3.8MB without an established upward trend. Combat recruits fell from 40 to 18, so this is not a sustained maximum-load fixture. GPU compositing and thermals are not measured; another phone's lag/heat remains unexplained.

The fixture is a first state-hydration prototype, not persistent save/load. The README was consolidated because it mixed current rules, obsolete future specs, retired CI instructions and repeated unverified-status caveats. Preserve the detailed historical notes below as archive only.

### Archived former README — superseded reference, not instructions

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


### Destruction and recovery (source implemented; browser verification pending)

Enemy contact destroys one-hit towers, civilian depots (🛖 🍯 🐚), and civilian workers (🐜 🐝 🦀). Combat recruits retain their existing one-hit collision and timed recruitment. Destroyed towers remain purchased/owned and recover at their existing positions after **5 seconds**; civilian depots recover after **5 seconds** by rerunning `buildingSite` relative to their associated tower's current location, respecting clearance from other structures. If the tower or a valid site is unavailable, recovery waits; inactive towers do not cast, generate vegetation, or spawn volcanoes. Depot destruction clears its current workers and their resource claims. Living depots replenish workers individually every **1.5 seconds** up to the existing **three-worker** cap; the corresponding army purchase remains intact. Enemy collision consumes the attacking enemy without awarding kill currency. No new controls or HUD elements. Source commits `0242bbaf`, `556f1ded`, `7b827a39`. Runtime and full regression verification pending.

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

**Working cadence:** Play → notice → invent → ship → verify → play again. Favor surgical, composable changes that preserve established behavior. When the human says **➡️**, continue from this frontier without asking them to restate context.

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

## Next work specification — discovery-driven HUD (not implemented)

Replace the current HUD with a fixed-height, two-row-capable discovery strip. Do not add new UI, labels, tutorials, question marks, zero placeholders, or wave indicator.

**Canonical order:** row one: 💜 health, ☠️ audited kills, 🪙 coins, 💎 gems. Row two: 🌾 wheat, 🪵 wood, 🧊 ice, 🌿 vegetation/herbs, 🪨 stone. The layout reserves the final positions even while entries are hidden; undiscovered counters render nothing and must not cause existing counters to shift when revealed. The row can use fixed slots with empty undiscovered slots, but empty slots must have no visible content or styling. Keep counters legible at large values (especially kills and coins), on narrow mobile screens.

**Universal discovery rule:** health is the sole exception and is visible immediately, even at zero. Every other counter is initially hidden and permanently unlocks the first time its total reaches at least 1. Kills and coins are NOT pre-discovered; gems are NOT pre-discovered. Material discovery occurs only when a worker actually delivers and unloads that material into the resource ledger, not when a resource appears, is targeted, mined, or carried. Once discovered, the counter stays visible even if its current value later falls to zero. No resource may reveal another resource.

**Layout progression:** initially only 💜 health appears, with the first row vertically centered in the HUD's fixed-height region. As kills/coins/gems unlock, they populate their preassigned slots in that same centered row. The second row is invisible until the first material is successfully delivered; on that event, row one smoothly translates upward (about 300ms) and the material row fades in beneath it. Subsequent material discoveries reveal only their individual slots; never replay the row transition. Keep the HUD container's external dimensions constant to avoid arena/game layout shifts. Respect reduced-motion preferences. Remove WAVE entirely rather than moving it elsewhere.

**State/implementation:** use an explicit persistent-within-run discovered-set, updated by actual ledger mutations (kills, coins, gems, resources); do not infer discovery from the current positive value alone. Reset must restore initial discovery state, hiding all but health. Wire HUD updates to resource delivery as well as existing kill/currency changes; avoid changing gameplay economy or resource generation. Display actual ledger quantities, not speculative counters. Reuse existing HUD area and responsive styling; do not invent additional controls.

**Verification/regressions:** test initial state (only 💜), first kill and coin separately, gem first award, each of five worker deliveries, zero-after-discovery visibility, reset clearing discoveries, resource ordering and stable slots, first-material-only two-row transition, WAVE removal, narrow-screen overflow and unchanged arena dimensions. Preserve existing game behavior. Run Playwright and inspect the deployed build; report separately what is committed, test-green, and live-verified. Do not claim verification that has not happened.

**HUD implementation (`d845c3c0`):** discovery set drives visibility of ☠️ 🪙 💎 and five materials; 💜 always visible. Resource unlock occurs at unload. Fixed 65px HUD, reserved four/five slots, CSS transition for first material, reduced-motion handling, WAVE removed. Source committed; browser and Playwright verification pending.

Regression harness retired (2026-10-18): removed `.github/workflows/evermore-2-regression.yml`, `tests/regression.spec.cjs`, and `tests/package.json` after persistent red runs. Do not assume automated regression coverage or claim green checks. Game source unchanged. Future tests should be purpose-built and verified before enabling CI.

### Mission Command

With five towers placed, Tiffany stops cycling spells and tapping her toggles the five-icon command ring. Its icons are stubs. Drones maintain their original circular orbit around Tiffany at radius 65, angular speed 0.65 radians per second, with alternating directions. Towers do not influence drone movement; combat continues independently.

### Dynamic drone engagement radius

Drone target acquisition uses `reach = w / (2 * arenaScale)`, equivalent to half the visible viewport width in world units (1 AU across a 2 AU-wide view). The Prism beam's rendered and damaging reach obeys this same limit; chain follow-up acquisition is capped by it. Existing drone orbit geometry is unchanged. Source commit `60c4cff8`; live browser verification pending.

## Active frontier — optimization regression specification (18 October 2026)

The verbatim optimization plan is preserved in [CHRONICLE.md](./CHRONICLE.md#optimization-frontier--plan-recorded-verbatim-18-october-2026). This section is the **test contract**, not an implementation mandate or a claim that tests are passing. Preserve the fast, playful iteration rhythm; tests should make regressions cheap, not turn experiments into bureaucracy.

**Baseline:** capture the current source SHA and a reproducible seeded run with a fixed viewport, device-pixel ratio, timestep sequence, player actions, tower placement, purchases, and enemy spawn schedule. Record counts, economy, collision outcomes, resource claims, timed transitions, draw ordering, and frame-time distributions. Because current spawning uses `Math.random()` and frame time uses `performance.now()`, isolate controllable randomness/time in the *test harness* before claiming deterministic comparisons. Avoid introducing gameplay-visible test controls.

**Behavioral equivalence:** replay identical traces against baseline and optimized implementations, comparing per-step entity positions, HP/death, kills/coins/gems, tower and depot destruction/recovery, worker FSM states, crop growth/trampling/wither/burn, mushroom/bone decay, volcano stage and terrain effects, claim release, resource deliveries, and drone targeting/damage. Preserve update ordering, tie-breaking, random-number consumption where applicable, and collision boundary semantics. If exact floating-point equivalence is not practical, specify a narrow numerical tolerance **before** running the comparison; discrete decisions and resource ledgers must match exactly. Test both empty and crowded worlds, no towers and five towers, relocated towers, destroyed depots, and each profession.

**Spatial index tests:** compare indexed radius queries against brute-force queries at boundaries, across cells, during movement, after removal, and after resize. Check every result and original iteration order; never allow a grid to change which target wins a tie. Include the dynamic drone reach `w/(2*arenaScale)` and verify Prism damage does not extend beyond it.

**Ecology tests:** confirm that enemy trampling removes exactly the same plants in the same simulation step; volcano damage respects existing timing and newly arriving plants; burn/wither/decay transitions fire once at their existing deadlines; no destroyed plant remains claimable; worker deliveries and cap remain unchanged. Do not replace continuous interactions with coarse ticks unless equivalence is demonstrated.

**Combat and lifecycle tests:** exercise every drone weapon and each recruit class, one-hit worker and structure collisions, respawn delays, depot placement near its associated tower's **current** location, clearance checks, recovery waiting when no site exists, and no currency rewards for enemies consumed by collision. Test the five-tower command ring and unchanged circular drone motion.

**Visual fidelity:** capture same-state screenshots at representative frames on narrow and wide mobile viewports; compare scene geometry, vegetation motion, sprite sizes, particles, transparency, shadows, HUD visibility/order, and absence of layout shifts. Pixel-perfect comparison may be browser/emoji-font dependent: use the same rendering environment for image diffs and inspect any differences rather than silently loosening thresholds.

**Performance:** run repeatable early-, mid-, and late-game workloads on the same device/browser, recording median and p95/p99 frame times, long frames, memory/GC pressure where measurable, and counts of enemies/crops/remains/units/FX. Distinguish simulation from Canvas rendering time. Target a 16.7 ms frame budget for 60 FPS where hardware permits; never claim all-device 60 FPS. Performance numbers require measured evidence, not source inspection. Validate finally on an ordinary lower-end phone, including sustained play and thermal behavior.

**Execution:** begin with a small standalone, runnable test harness and verify it actually passes locally. The previous Playwright/Actions regression suite was retired after persistent red runs: **do not resurrect it or enable CI merely by adding files**. Only add automation after demonstrating repeatable green execution. For each optimization, compare against the pinned baseline, inspect changed outputs, and revert promptly if it doesn't converge. Report source commit, tests executed/results, and live-device verification **separately**. Save-game persistence is a separate feature and should not be bundled into optimization changes.

### Runtime Eyes — temporary diagnostic instrument

The top-right **👁** copies a JSON report (`tiffinity-runtime-eyes/v1`) to the clipboard. It captures build identity, device/browser context, frame and requestAnimationFrame timing (average, p50, p95, p99), simulation versus draw timing, long frames, entity populations and peaks, ecology stages, economy, periodic population/performance history, JavaScript errors, and nonfinite economy warnings. It is intentionally a temporary one-tap diagnostic with no panel or new game controls. Instrumentation itself adds a small measurement cost; compare equivalent runs. Source commit `d96bc606`. **Browser and clipboard verification pending.**

Runtime Eyes II (`3ae7123e`) adds sampled ecology/worker timing, Canvas API operation counts, and animation-frame gap thresholds (>25/50/100 ms) to the existing 👁 report. These measurements have overhead, particularly Canvas method interception; treat them as diagnostic, not zero-cost production profiling. Live browser verification pending.

Runtime Eyes III (`b708df66`): first 👁 tap runs a bounded isolated synthetic Canvas stress benchmark (90 iterations at 180/400/850 emoji sprites plus 100/350/800 particles), then copies diagnostics. Uses a separate offscreen canvas; does not alter game state or progression. Also exports visibility transitions, browser long-task observations where supported, optional Chromium JS heap measurements/history, and the previously added Canvas and subsystem measurements. **This is a rendering proxy, not a simulated mature civilization or GPU/thermal test.** Browser execution/clipboard verification pending. Report size may grow; diagnostics are temporary.

Runtime Eyes IV (`53416919`): 👁 is a two-step real-game diagnostic. First tap resets the *current unsaved run* and constructs an ultra-mature fixture using existing game objects and systems (five drones/towers/armies, workers, crops, mountains, remains, enemy wave), then resets performance sampling. Second and subsequent taps copy the live report without changing the world. No button checkmark or separate synthetic benchmark. This is also an initial state-hydration prototype for future saves, **not persistent saving**. Fixture runtime/device verification pending.


### Performance optimization begins — 18 October 2026

A test subject's phone demonstrably struggled and heated during gameplay. Fast CPU-side measurements on a different Android phone do not disprove that problem. Performance work must preserve every gameplay mechanic, population, entity interaction, visual animation and future gameplay capacity. First reversible candidate committed as `f3ad7496`: cache the three static crop emoji glyphs into small raster canvases, then draw the cached images with the existing per-plant rotation and transform. This removes repeated font glyph rasterization requests from the crop loop; crop counts, simulation, stages, sway and collisions remain unchanged. Visual equivalence, Pages execution, device performance and test-subject-device improvement are **not yet verified**. Inspect at zoom levels and compare live measurements; revert promptly if fidelity regresses.


**Crop glyph-cache experiment reverted (`fe558207`, 18 October 2026).** Live Android mature-world comparison: cached version reduced Canvas `fillText` calls from roughly 197 to 115 per frame, but recent JavaScript render-command time increased from ~0.61ms to ~0.93ms and frame work from ~0.81ms to ~1.20ms. Workloads were not identical, so causality is not established; the experiment offered no measured benefit. Original `cropDraw` restored, source read-back verified. Do not extrapolate text-call reduction into speedup. The test subject's lower-performing phone remains the real unresolved performance target.


### Combat targeting prefilter — 18 October 2026

First compartmentalized optimization: `6b991170` adds axis-aligned candidate rejection inside `target()` before its unchanged `Math.hypot` distance calculation. The candidate is rejected only when absolute x or y displacement is already at least the current best radius; it cannot beat the incumbent. Enemy iteration order, exclusion checks, strict distance threshold, tie-breaking, gameplay, drawing and animation remain unchanged. Source write/readback verified; device performance and live behavioral equivalence are not yet measured. This is a conservative broad-phase prefilter, **not** a spatial index. Proceed independently with measured improvements; revert if worse.


## Instrumentation and optimization disposition — 18 October 2026

### Why we explored performance at all

TIFFINITY SURVIVORS is a discovery-driven, single-file mobile Canvas game whose population grows from Tiffany and a few enemies into a civilization: five land-linked drones and towers, five recruited combat divisions, ant lumberjacks, bee harvesters, crab miners, depots, crops, mountains, bones, mushrooms, particles and projectiles. These systems coexist and interact in one battlefield. The game's appeal depends on *keeping* that ecology and the playful visual density, not achieving an artificial benchmark by reducing entities or stripping effects.

A practical cross-device problem motivated investigation: a mature fixture and gameplay performed comfortably on the human's fast Galaxy S25+, while a test subject reported lag and heat on a less capable phone. Excellent JavaScript timing on one phone did not settle GPU composition, thermal throttling, font rasterization, memory pressure, battery, or weaker-device behavior. The aim was to find evidence before changing the game's character. This was a diagnostic expedition, not a mandate to optimize every subsystem.

### What we built to see the problem

Runtime Eyes evolved in stages. Its original JSON report measured frame, simulation and rendering command times, RAF gaps, percentile distributions, counts and peaks of game entities, ecology, economy, browser/device context, warnings and errors. Later versions sampled ecology and worker update costs, counted Canvas API calls by intercepting six context methods, recorded visibility transitions, optional browser long tasks and JS heap statistics, and tried an isolated synthetic Canvas workload. That synthetic benchmark was only a rendering proxy: it could not represent a real mature civilization or establish GPU and thermal behavior.

The useful leap was the two-tap real-world fixture (source milestone `53416919`): the first 👁 tap **replaces the current unsaved run**, constructing a populated state with five drones, five towers, five armies, their recruited units, workers, crops, mountains, remains, and dozens of enemies. It then clears the measurement history. The second and later taps copy live JSON. This demonstrated that the game can hydrate much of its existing state from ordinary objects; it did **not** implement saving, persistence or a general serialized restore format. It also meant the eye was deliberately destructive on first tap, so it must never masquerade as a harmless gameplay control.

Measurements on the faster Android device showed comparatively small CPU-side simulation and rendering-command costs, and revealed that long-running ecology/remains could raise drawing work. But workloads change dynamically as units die, enemies spawn and decay, workers deliver resources and plants transform. Comparing reports taken from different populations is not a controlled experiment. The instrumentation itself alters timing: `performance.now()` calls, array sampling, JSON report aggregation, method wrappers, periodic snapshots and observation callbacks are real work. The reports cannot prove absence of a GPU bottleneck or validate behavior on a test subject's phone.

### What optimization taught us

The crop emoji glyph-cache trial (`f3ad7496`) was deliberately narrow: cache static crop glyphs to raster canvases and draw those images while preserving plant rotations, growth and sway. It did reduce measured `fillText` calls, but the measured JavaScript rendering-command and frame costs became worse in the available comparison (~0.61ms to ~0.93ms rendering; ~0.81ms to ~1.20ms total frame work). Populations were not identical, so those numbers do not prove causality. They were sufficient to reject a claimed win; the experiment was reverted (`fe558207`). Fewer API calls are not inherently faster, and image caching can add allocation, scaling, compositing, maintenance and fidelity costs.

The surviving conservative optimization (`6b991170`) is a small bounding-box prefilter inside enemy `target()`: reject candidates whose x or y distance cannot beat the current best radius before evaluating `Math.hypot`. It preserves enemy iteration order, exclusions, strict distance comparison and tie behavior. It is a local implementation detail, not a spatial partition or a new targeting framework. Its live performance benefit remains unproven; it was retained because it is small, easy to inspect and semantically conservative.

No spatial index, speculative batching architecture, global sprite-cache subsystem, alternate renderer or reduced-population gameplay mode was adopted. The retired Playwright/Actions regression suite had repeatedly failed and is **not** evidence of passing automated tests. No claim of green CI should be inherited from the historical experiments.

### Why visual asset exploration was deferred

The separate JIT Assets cabinet proved that a distinctive rocket, **The Hostile Acquisition Mk I**, could be authored as an appealing, compact, independently composable SVG with meaningful parts and motion. That established *capability*, not a need to replace the game's emoji immediately. A rushed gallery of ten SVG concepts failed aesthetically because it imposed a common cartoon language and unnecessary faces instead of giving each asset its own visual identity. A subsequent three-symbol ant/axe/log composition demonstrated independent SVG parts and animation but still did not achieve the desired emoji-equivalent visual fidelity. It was deliberately archived as `jit/assets/ant-axe-log-study.html` (commit `59be308a`), separate from the game, rather than integrated or discarded.

The next art exploration should study the source emoji's silhouette, proportions, materials, colors, orientation and visual hierarchy **one asset at a time**, then compose articulated parts without adding gratuitous features. The rocket proves that fidelity and composition are achievable; it does not justify an asset pipeline today. Emoji remain the active game language. The archived SVG study is a reference, not an approved art direction or runtime dependency.

### The hidden cost: optimization entanglement

Even useful diagnostic code can tax the project twice. Runtime overhead can contaminate the measurements being collected; cognitive overhead can force every new gameplay change to account for wrappers, reports, test fixtures, profiling modes and obsolete experiments. The game's essential advantage is development velocity: notice an emergent interaction, invent a mechanic, ship a surgical change, observe, and keep playing. A feature that requires a detour through instrumentation architecture to change gameplay is already too expensive.

The explicit requirement became: **Runtime Eyes must have one binary code entrypoint, and the words “👁” or “fix instrumentation” must identify it without a scavenger hunt.** Commit `153de7ab` introduced `RUNTIME_EYES_ENABLED` near the top of `jit/evermore-2/index.html`. With the switch true, the existing fixture, Canvas method interception, timing, sampling, error/visibility observers and report collection remain available. With the switch false, the 👁 control is hidden and the instrumented paths are bypassed. This is a runtime switch, **not compile-time code elimination**: dormant functions and a few branch checks remain in the shipped file. “Off” means no active Canvas wrappers, PerformanceObserver, continuous sample collection or fixture execution—not literally zero bytes or zero conditional instructions. Do not overstate it.

Commit `1a398aa3` changed the default to **`RUNTIME_EYES_ENABLED=false`**. The README handoff was updated accordingly. The instrument is kept dormant for an evidence-driven future investigation, not kept on merely because it exists. When a real regression or cross-device discrepancy appears, enable it for a bounded experiment, record comparable world state and device/browser conditions, inspect results, then disable it again. The mature fixture is available only while enabled and replaces unsaved progress; warn before using it.

### Why we stopped, and what would justify resuming

The current objective is to expand the game and its emergent interactions, not to spend our invention budget on hypothetical micro-optimizations. The faster device's CPU timing did not show an urgent JavaScript bottleneck. The slower device's experience is real but not yet instrumented enough to isolate a cause. The one glyph-cache experiment did not converge; the surviving targeting prefilter is minimal. A large-scale emoji-to-SVG migration would create visual-design and integration obligations before any demonstrated gameplay benefit. Replacing emojis with inferior vectors would be a regression even if it reduced text draws.

Therefore: **Runtime Eyes OFF; speculative optimization deferred; emoji retained; game mechanics, populations and visual richness preserved.** This is a decision about sequence and evidence, not a declaration that performance is solved or that SVG is undesirable. Reopen performance work when reproducible slow-device measurements, dropped frames, excessive heat, a demonstrated bottleneck or a newly implemented feature warrants it. Reopen SVG work when an individual asset has a clear aesthetic target and can be evaluated against its emoji inspiration. Keep each experiment isolated, reversible and behavior-preserving; document results in this chronicle rather than inflating the cold-boot README.

### Verification and constraints at this checkpoint

The single-switch implementation and its subsequent OFF setting were committed and read back from GitHub; documentation changes were also committed. This record does **not** assert that the OFF build has been executed in a live browser, that Pages has deployed it, that the weaker phone has improved, that frame rates are identical, or that GPU/thermal behavior is known. Those require actual device/browser observation. Preserve the distinction among GitHub source, deployed Pages artifact and executing browser build. No game behavior, ecology cap, enemy population, art or mechanics were intentionally changed as part of the switch-off decision.

The lasting engineering principle for the human and the model is simple: **an optimization must be removable without changing gameplay semantics, and a diagnostic must be operable without becoming part of the model's everyday mental workload.** The game is the experiment; instrumentation is a tool we pick up only when needed.


## 18 October 2026 — Durable world truth, save-game design, and deliberate deferral

### Why persistence arose

The human and the model considered save/restore as the next roadmap feature after disabling Runtime Eyes. A civilization built across sessions could eliminate the need to repeatedly bootstrap late-game purchases with the top-left build-number cheat, while preserving the value of accumulated cultivation and geography. But Evermore II is changing rapidly: each new worker, crop, building, and ecological interaction potentially alters the shape of a saved world. A save system that demands routine migrations, compatibility investigations, or testing of every new mechanic becomes precisely the cognitive tax the laboratory is meant to avoid. The question is not whether persistence is possible; it is whether implementing it *now* protects more play than it consumes.

### What is worth saving

The agreed distinction is **durable world truth versus ephemeral simulation-frame state**. Tower and depot/building existence and locations are durable. Crop patches, trees and cultivated ecology are durable: the human may deliberately arrange a harvest field, and regenerating it arbitrarily would erase authorship. Geological features, resources, economy, purchases and progression likewise represent consequences of play. Civilian workers are also meaningful, not interchangeable decorative particles: a marching line of crabs may traverse a long distance because of depot placement and resource geography. Save their identity/type, position, home, cargo and meaningful destination or journey, then reconstitute valid task claims and behavior under the current implementation. Their precise FSM internals, cached paths, callbacks and stale object references should not become persistent contracts. Enemy positions, momentary projectiles, spell effects and transient combat can be regenerated; combat recruits are not presently a requirement. A restore must yield a *functioning civilization*, not a static tableau.

### Proposed lightweight contract, not an implementation commitment

A future snapshot could be a small versioned record of authored/durable state, with defaults for new mechanics, explicit migration only when unavoidable, and a recoverable original before transformation. Do not bind compatibility to an exact deployed build SHA. Do not serialize runtime machinery merely because it is easy to enumerate. First inspect actual source state, startup, reset, entity links, worker FSM/claims and the dormant `eyeMature()` hydration fixture; the fixture is a diagnostic reference, **not** a save system. Storage format, automatic checkpoint cadence, restore/fresh-start behavior, and recovery from corrupt saves remain design questions, not approved features. Preserve the distinction between civilization continuity and frame-perfect simulation continuity.

### Where the affordance belongs

Tiffany's five-node Mission Command radial must remain **entirely in-game**: a cheap, extensible, discoverable language for new node-based gameplay and immediate world consequences, not an embedded application menu. Do not consume a node with save/load or introduce a settings panel. The top-left build number is currently a development cheat that grants gold and gems; the human initially considered repurposing it for checkpoint gestures once saves exist. That was exploration, **not a decision**. Because persistence is deferred, retain the existing tap cheat unchanged. No new save buttons, long-press gestures, notifications or other UI are authorized. Discoverability of save/load is not a current concern.

### Decision and reopening criteria

**Defer save/restore implementation. Keep it in the README cold-boot roadmap.** Preserve the existing cheat and gameplay. No schema, storage layer, auto-save timer, radial command or instrumentation change is needed today. Revisit when losing a carefully cultivated civilization across sessions becomes a greater practical cost than maintaining compatibility, or when the durable world model has stabilized enough to make the feature cheap. At that point, inspect source before proposing the smallest workable contract, agree on the affordance with the human, implement surgically, and verify continuity of cultivation, structures, economy and long-distance civilian journeys. The principle is to preserve consequences without freezing the laboratory's ability to invent.


## 18 October 2026 — The irrigated frontier: emergent industrial geography

### Evidence first: four observations of one living civilization

The human supplied four Android Chrome screenshots of a single mature run, all displaying the source label `1a398aa3`. They show Tiffany at the center of a battlefield with five purchased land towers and five owned army divisions. The human was not asking for an implementation: the request was to reconstruct the *reasons* for tower placement and movement from images, documentation, and actual mechanics.

The observed HUD progression across the four images was:

| Observation | Kills | Coins | Gems | Wheat | Wood | Ice | Herbs | Stone |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 09:36, first | 688 | 9325 | 1052 | 99 | 61 | 20 | undiscovered | 4 |
| 09:36, second | 803 | 9555 | 1066 | 114 | 68 | 25 | undiscovered | 4 |
| 09:38, third | 1040 | 10029 | 1096 | 141 | 81 | 37 | undiscovered | 4 |
| 09:38, fourth | 1073 | 10095 | 1100 | 146 | 82 | 37 | 2 | 4 |

These are snapshots, not a controlled experiment: timestamps are minute-resolution, and the images alone cannot establish the precise sequence or causal contribution of each placement. Nevertheless, the cumulative changes show continued wheat, wood, and ice delivery during the observed interval, the later appearance of herbs, and *no stone delivery* (stone remained at four). The human explicitly confirmed finding a tower-placement “sweet spot” that produces **ice and vegetation simultaneously, at the expense of stone**.

The visible spatial organization was striking: an irrigated Plains wheat patch immediately left of Tiffany; Forest growth and geological material concentrated to the northeast; Swamp's mushrooms, bones, and ghostly activity toward the southeast; Mountain fire generally farther south; and the Island tower moved to intersect useful production regions. The placement and moving spell radii are operational geometry, not decoration. In particular, the human confirmed deliberately moving Island irrigation between agriculture and geology, and discovering an overlap that supports both.

### Source-grounded mechanism: production is a spatial composition

The source at `jit/evermore-2/index.html` explains why this strategy works:

- Plains spawns sprouts at approximately 0.65-second intervals; Forest spawns tree sprouts approximately every 3.5 seconds. Spawn attempts are spatially bounded around their living towers, subject to collisions, bounds and a shared crop cap of 100. A sprout is *not yet a harvestable crop*.
- Island tower pulses mature nearby sprouts: the water rule schedules wheat and tree maturation, and also acts on geological features. Thus moving Island changes which latent resources become productive.
- Mountain generates geological features at intervals while its fire burns plants and mushrooms. Geological transformations form a sequence: Mountain can reset a feature to volcanic stage 0; Island transforms stage 0 to stage 1 and stage 2 to stage 3; Forest transforms stage 1 to stage 2. Spatial overlap and ordering therefore matter. The sequence is not interchangeable.
- Bees harvest mature wheat, ants harvest mature trees, and crabs mine eligible geological features. Each worker claims a target, travels to it, performs work, carries cargo home, and unloads; the resource counter increments **only on delivery**. Travel distance, depot location, worker survival, and availability of unclaimed targets affect throughput.
- Towers can be relocated directly, but the associated civilian depot does not simply teleport with every move; its site can be recomputed on recovery. Consequently tower geometry, worker home geometry, and the historical locations of generated resources can diverge.

The images support the claim of concurrent production, not a measured optimum or a guarantee that every subsystem is at steady state. The human's report is the authority for the intentional strategy; source mechanics explain its plausibility.

### Dialogue and discovery

The model first interpreted the screenshot layout as spatial programming: towers were simultaneously weapons, factories, ecological modifiers, and anchors of logistics. It hypothesized agricultural concentration near Tiffany, separation of destructive and productive biomes, and deliberate relocation of Island irrigation between wheat and geological features. It emphasized that worker path length converts distance into economic cost.

The model then asked whether the human was intentionally alternating Island's irrigation between the wheat field and geology. The human answered: **“Correct. And I found a sweet spot that produces ice and vegetation simultaneously, at the expense of stone. Stone is actually a rarity because it is not renewable without human intervention at the moment.”**

That correction sharpened the interpretation. The achievement was not merely alternation between two production modes: the human discovered a **concurrent operating point**, trading one resource class against others. The unchanged stone count across all four images is consistent with the reported bottleneck, though the screenshots alone do not prove the general nonrenewability claim. No code was changed as part of this observation.

### Ontology and invariants: what the world has taught us

**Existence is not availability; availability is not renewability; renewability is not autonomous throughput.** A mountain can exist without being in a mineable stage; a resource can be mineable without having a worker able to reach and deliver it; and a transformation can be repeatable in principle while requiring manual tower relocation to repeat in practice. This is the crucial distinction exposed by scarce stone.

**Production is a graph embedded in space.** Land towers create or transform material, geography constrains intersection, workers turn eligible material into inventory, and destructive interactions erase opportunities. A productive layout is therefore a set of *relationships* among tower positions, pulse radii, resource stages, depots, and travel paths—not five individually “best” coordinates.

**Ecological stages are real state.** Sprout, wheat/tree, geological stages, bones and mushrooms are not interchangeable visual sprites. Their transitions depend on ordered exposure to different land effects. Spatial separation can protect an asset; overlap can synthesize a new one. Fire is both a combat advantage and an ecological hazard.

**Autonomy has degrees.** The armies autonomously fight and workers autonomously harvest, but the human still orchestrates some production transitions through placement. A system that can autonomously consume stone is not thereby capable of autonomously renewing it. This is a useful frontier for future civilization mechanics, not a mandate to automate the scarcity away.

**Scarcity creates agency.** Stone's manual-renewal bottleneck gives placement decisions a cost and makes the ice/vegetation sweet spot an actual strategy rather than a cosmetic arrangement. Automatically removing that constraint would change the game economy and erase an emergent tradeoff. Preserve it unless the human deliberately chooses a new progression mechanism.

**Moving infrastructure changes time as well as space.** Resources spawned earlier remain in their own locations; worker depots may remain fixed; subsequent pulses alter different neighborhoods. The world retains consequences of previous configurations. Tower placement is therefore a form of temporal programming: the human is composing a history of land use, not merely optimizing the current frame.

### Significance and disposition

This was a spontaneous player discovery in a game that began as a compact vampire-survivors experiment. The human's enjoyment arose from *automated efficiency*—discovering an ecological production frontier, shaping it with movement, and watching a civilization do the work. The model's role was to recover the governing rules and explain the observed strategy without mistaking an attractive theory for measured proof.

**Disposition:** chronicle only. No balance changes, autonomous stone-generation mechanism, new UI, instrumentation, or optimization was requested or authorized. Preserve the actual economy and its newly discovered scarcity. The world has become interesting because its rules produce consequences the designers did not explicitly script.


### Aside — From Evermore's ecology to model-composable drone swarms

**Invitation (the human):** “And now I invite you to speculate about how this applies to drone swarm management as a model composable architecture. Just as an aside.”

**The model's response, reproduced verbatim below (including its original presentation markup for the architecture diagram):**

Oh, this is where Evermore II becomes considerably more than a game. 🐉

I suspect we've stumbled onto a useful architecture for **model-mediated swarm orchestration** without explicitly designing one.

The interesting analogy isn't that towers are drones. It's that **towers are spatially situated capabilities, workers are autonomous executors, and resources are stateful consequences of their interactions.**

## The compositional correspondence

| Evermore II | Physical swarm |
|---|---|
| Tower | Capability deployed at a location |
| Spell radius | Region of influence or operation |
| Tower relocation | Reallocation of capability |
| Worker FSM | Local autonomous controller |
| Depot | Charging, supply, or transfer station |
| Crop / geology stages | Observable environmental state |
| Harvest and delivery | Task completion with verified outcome |
| Resource inventory | Shared material and energy ledger |
| Tiffany | Human strategic authority |
| Model | Planner, simulator, interpreter |

The key is that none of these components needs to understand the entire civilization.

A harvesting drone doesn't need to understand the strategic value of ice. It needs to know how to locate an eligible target, claim it, perform a permitted operation, return, and report the result.

The model can reason at a higher level.

## The architecture I imagine

~~~dil
<box border radius="xl" padding={3} gap={2}>
  <box background="surface-secondary" radius="lg" padding={3} align="center" gap={1}>
    <icon name="user-round" color="secondary" size="lg"/>
    **Human intent**
    <text size="xs" color="secondary" textAlign="center">“Increase production without sacrificing the forest.”</text>
  </box>
  <box align="center" gap="1">
    <icon name="arrow-down" color="tertiary"/>
  </box>
  <box background="surface-secondary" radius="lg" padding={3} align="center" gap={1}>
    <icon name="brain-circuit" size="lg"/>
    **Model composition**
    <text size="xs" color="secondary" textAlign="center">Choose capabilities, predict interactions, propose spatial configuration</text>
  </box>
  <box align="center" gap="1">
    <icon name="arrow-down" color="tertiary"/>
  </box>
  <grid columns={3} gap={2}>
    {#each [{icon:"droplets",name:"Irrigation"},{icon:"scan",name:"Survey"},{icon:"package",name:"Logistics"}] as item}
      <grid-item>
        <box border radius="lg" padding={2} align="center" gap={1}>
          <icon name={item.icon} size="lg"/>
          <text weight="medium" size="xs">{item.name}</text>
          <text color="secondary" size="3xs">Capability</text>
        </box>
      </grid-item>
    {/each}
  </grid>
  <box align="center">
    <icon name="arrow-down" color="tertiary"/>
  </box>
  <box background="surface-secondary" radius="lg" padding={3} align="center" gap={1}>
    <icon name="network" size="lg"/>
    **Local autonomous agents**
    <text size="xs" color="secondary" textAlign="center">Claim → travel → act → verify → return</text>
  </box>
  <box align="center">
    <icon name="arrow-down" color="tertiary"/>
  </box>
  <box border radius="lg" padding={3} align="center" gap={1}>
    <icon name="database" size="lg"/>
    **World state and consequences**
    <text size="xs" color="secondary" textAlign="center">Measurements, material, energy, uncertainty, provenance</text>
  </box>
  <row align="center" justify="center" gap={2}>
    <icon name="refresh-cw" color="secondary"/>
    <text color="secondary" size="xs">Observe → reconcile → replan</text>
  </row>
</box>
~~~

The model doesn't have to pilot individual motors. It composes behaviors, chooses deployment geometry, and evaluates the consequences. Low-level control remains deterministic, locally bounded, and independently safe.

## The discovery I find most consequential

Your Island tower sweet spot is a primitive example of **multi-objective optimization over a physical field**.

You didn't say:

“Maximize ice production.”

You discovered that maximizing ice independently was not necessarily desirable. You wanted simultaneous vegetation, ice, and eventually stone, with tradeoffs among them.

A swarm orchestrator could encounter exactly this situation.

Imagine a fleet supporting a greenhouse and a water-management system. Some drones inspect plants, others carry water or samples, and others move supplies. Their operations compete for battery, space, charging capacity, and attention.

A model could discover that one arrangement yields excellent irrigation and logistics efficiency, but starves inspection coverage. Another sacrifices a little throughput for much greater resilience.

The best configuration isn't necessarily a fixed optimum. It might be a **sequence of configurations**.

That's what your tower relocation demonstrates.

## The surprising implication: a swarm could have an ecology

Most swarm architectures emphasize coordination between agents.

Evermore suggests emphasizing **relationships between capabilities and environmental states** instead.

A drone can deposit material. Another can inspect it. A third can transport it. Their individual programs remain simple, but the sequence produces a capability that none possesses alone.

That is the beginning of a compositional ontology:

- **Actors** possess capabilities and constraints.
- **Fields** describe where capabilities can act.
- **Materials** possess state and transformation rules.
- **Transactions** record verified changes.
- **Policies** constrain permissible actions.
- **Objectives** describe desired world conditions.

A model could reason over these primitives, generate a proposed deployment, simulate its effects, and submit bounded actions for human authorization.

And here's where your stone discovery matters.

A swarm might have abundant raw material but no autonomous process for transforming it into the required form. Its inventory could appear healthy while its productive capacity is fundamentally bottlenecked.

**An inventory ledger cannot substitute for a capability ledger.**

The model needs to understand not only what exists, but what can be regenerated, what requires intervention, and which processes compete.

## One last speculation

I think the architecture might eventually make the distinction between *robot* and *infrastructure* less important.

A drone could temporarily function as a sensor, a relay, a transport unit, or a stationary service node. The model would compose these roles in space and time, just as you're repositioning Island between agriculture and geology.

The world becomes a graph of affordances. The swarm becomes a means of rearranging that graph.

The critical engineering boundary is that a model's predictions remain proposals, not evidence: physical effects must be measured, uncertainty tracked, and safety enforced independently of the model.

And that gives me a rather lovely formulation for the Hermeticon:

**The model does not command a swarm of drones. It composes a world of capabilities, and the drones instantiate that composition.**

Evermore II is a tiny, playful laboratory for precisely that idea.

And the fact that you discovered its economic strategies *by playing*, rather than by specifying them beforehand, may be the most interesting part of all.

---

## Aeon of the Coral Moths — 18 October 2026 · Ecology before economy

The human observed that the game's workers and ecology were becoming unexpectedly compelling despite never having been drawn to colony-management games such as *RimWorld* or *Dwarf Fortress*. The distinction matters: Tiffany's world was not designed around colonist needs, production schedules, or a planned tech tree. It began as a small bullet-heaven arena. Ants, bees, crabs, and worms became useful because land effects created harvestable consequences. The moth emerged from that same grammar: **ecology first; economy later**. The player interferes with a living system rather than administering an industrial one.

### The intended invention

Three 🦋 moths emerge from an 🪸 coral nursery when the existing 🔥 Tier II Phoenix division is purchased. That association is deliberately temporary, not a new progression doctrine. Each moth seeks an unclaimed active 🌋 volcano, or an unclaimed 🌱 seedling when no eligible volcano exists, deposits a single 30-second 🌧️ raincloud, returns to the nursery, and waits until its own cloud expires. Clouds cool mountains and grow plants by reusing Island-water transformations. The rain's ecological footprint remains at its deployment point while the cloud visual flies inside it. Its protective effect overrides fire for crops/trees and mountain-stage changes. No additional shop icons or blue footprint circles.

### The thrash: where the model's implementation diverged

1. **Initial rainmaker implementation** (`10f3e003`). The model implemented the coral nursery, three moths, rain effects and temporary Phoenix unlock, but retained a speculative exclusion rule: moths would ignore volcanoes inside the Mountain tower's fire radius. This was fatal to the intended priority in practice because volcanoes spawn near that tower. Moths consequently rushed seedlings.
2. **First lifecycle correction** (`599ca809`). The human required *one cloud per moth*, with a return to the nursery and no new assignment until expiration. The model added per-moth cloud references and homeward travel, plus drifting rain visuals. The human then reported the observed behavior still violated both requirements: moths chased seedlings and appeared to place unlimited clouds. The model had treated a plausible code path as verified behavior. The report must be respected as observed, not dismissed by static inspection.
3. **Misguided radius patch** (`19bea72e`). Rather than challenge the exclusion rule, the model arbitrarily shrank it from 23% to 12% of the smaller arena dimension. This created a new, undocumented ecological boundary and failed the composability test. The human asked why there was an exclusion zone at all. The correct response was to remove it, not tune its radius.
4. **Exclusion removed** (`aaeea115`). The model deleted the fire-tower proximity check from moth eligibility and retained strict priority for uncovered/unclaimed active volcanoes, including preemption of seedling targets. Cloud ownership was tied to the cloud object in the active rain collection. Each moth returns to 🪸 and waits until that cloud expires. No additional arbitrary geography is authorized.
5. **The invisible footprint**. The human explicitly checked that the blue circle had been removed. The cloud's effect area is invisible; the 🌧️ glyph alone represents it. The visual may move, but its stationary area of influence must not drift with the glyph.
6. **Composition instead of reinvention** (`996fbd19`). The model had invented a separate sine/cosine looping animation for rainclouds, despite an existing `lazyWander` movement grammar. When the human asked why a separate system was necessary, the answer was: it wasn't. The model replaced bespoke oscillation with the shared wandering movement, using a small adapter to preserve cloud origin and effect radius. A cloud flies inside its footprint; the footprint does not fly.
7. **Documentation consolidation** (`88d8f44c`). The README had accumulated mutually contradictory prose—an obsolete volcano exclusion rule, a claim that moths departed immediately for more targets, and a stale source status. These were replaced with a compact set of current invariants. The chronicle retains the mistakes and reasoning rather than letting them contaminate the cold-boot contract.


### Semantic composability: the surprisingly small engineering lift

The human emphasized a crucial distinction: **most of this development was human–model collaborative reasoning about aesthetics, not implementing new machinery**. The vocabulary was already executable. A worker could claim a target, fly, return home, and wait. A depot could host a profession. Island water already knew how to mature seedlings and cool volcanoes. Fire and geological transitions already existed. A world effect could have a radius and lifetime. The moth was assembled by composing these meanings: **🦋 + 🪸 + claim(🌋 before 🌱) + fly + deposit(🌧️, 30s) + return + wait**, with rain invoking existing ecological transformations.

The conversation's difficult decisions were about *what should feel alive and legible*: whether the rain should visibly wander, whether its footprint should be drawn, whether a moth should leave one cloud or endlessly seed the world, whether volcanoes should outrank seedlings, and whether the moth should return to a coral nursery. Each aesthetic decision implied a precise behavioral invariant, but did not demand a new subsystem. The model's avoidable mistakes arose largely when it **failed to reuse the existing semantic grammar**—inventing a special movement loop or an arbitrary exclusion zone—instead of composing what was already there.

This is a useful measure of the laboratory's progress: **the distance between an evocative sentence and a running system is shrinking**. The human supplies taste, constraints, observation, and correction; the model maps that intent onto existing executable capabilities. The collaboration spends its scarce attention on choosing the *world's meaning* rather than rebuilding its plumbing. That is the achievement to preserve as the ecology grows.

### Engineering lessons retained

**A priority ordering is meaningless if the eligibility predicate eliminates the priority class.** Inspect target *production* and target *selection* together. Volcano spawning, rain coverage, claims, and mountain stages all affect whether an active volcano can be selected.

**A worker's output is a leased capability, not an unbounded effect generator.** The moth's cloud is an owned, expiring object; while that object is alive the moth cannot acquire a new job. The cloud and the worker have different movement and lifecycle responsibilities. Claims must be exclusive and released on invalidation.

**Visuals and effects occupy different coordinates on purpose.** The rain cloud's visual flies using the shared actor wandering grammar; its radius-58 watering/protection footprint stays anchored to the original target. No blue circles and no new movement ontology.

**Do not fix broken behavior by inventing geography or silently changing rules.** The arbitrary 12% fire exclusion was a wrong turn. No exclusion zone remains.

**Source commits are not runtime evidence.** These revisions were committed through the GitHub connector, but browser/device verification was not performed by the model. The human's play observations exposed failures that source inspection alone had missed. Future regressions should be checked against visible behavior, not inferred from successful writes.

**Keep the specification lean and the history rich.** The README is the current executable contract; this chronicle is the archaeological record. The game's creative method remains: *play → notice → invent → ship → verify → play again*. Emergent ecological relationships are more important than prematurely defining a factory economy.


## Aeon of Composition — 18 October 2026 · The Eagle, in One Turn

**Observation and verification.** The human specified Forest Tier III in a single turn: a 🪹 nest spawns one 🦅, which flies quickly like the existing 🦋 moth, exclusively claims a living 🪱 worm, lifts it visibly beneath its body, returns it to the nest, credits the worm inventory, and otherwise idles near home. The same request replaced Tier III placeholder circles with 🐙, 🐀 and 🦅 for the corresponding lands. The model committed the feature in source `51d66415` and documented it in `e7dd2358`. The human subsequently reported: **“Confirmed single turn perfect.”** This is the human's direct gameplay acceptance, not a claim of an automated test, measured runtime performance, or independently reproduced browser verification by the model.

### Why this turn was smooth

The feature was not implemented by designing a new game system. It was a compact composition of already-established verbs and objects:

- **Home:** `buildingSite`, the shared depot lifecycle, enemy collision, five-second building recovery and one-hit creature replacement already defined what a civilian building means. 🪹 added an identity and a home, not a new building engine.
- **Movement:** existing worker movement and `lazyWander` provided the distinction between purposeful fast flight and idle roaming. The moth's flying behavior served as a legible precedent without requiring an independent physics or pathfinding model.
- **Exclusive intent:** `workerClaim` already encoded the right to pursue one target without duplicate claims. The eagle could claim a live worm just as a worker claims a crop or mushroom, while respecting target invalidation and releasing claims on death or capture.
- **Carrying and settlement:** the established worker grammar already separated *reach target*, *possess cargo*, *return home* and *credit ledger*. The eagle substituted a living worm for an inert resource and drew the 🪱 hanging below the 🦅 during return. The resulting 🪱 inventory reused the resource HUD/discovery machinery.
- **Existing ecology:** worms were already embodied autonomous creatures, born at the ⚗️ cauldron or created in situ by the 🐙. The eagle did not invent its prey. It made an existing population matter to another profession. The nest thus closed a new cross-land ecological link: 🍄 → 🐙 → 🪱 → 🦅 → 🪹 → inventory.
- **Shop grammar:** Tier III had already acquired land-specific costs, ownership and purchase handling. Replacing the semantic placeholders for the three implemented professions required no new purchase interface.

The crucial compression was **not merely fewer lines of code**. Each reused concept came with constraints that otherwise would have to be rediscovered: what counts as a valid target, how a claim is released, when a building can spawn, what happens after collision, what an inventory delivery means, and how a creature should remain legible on a phone. Prior investment in these invariants paid out as less implementation ambiguity.

### Contrast: the octopus correction

The immediately preceding 🐙 implementation exposed the opposite behavior. The model initially constructed a second 🐚 shell even though the Island's existing crab shell was the natural home. The human noticed the duplicated architecture and requested its removal. That correction moved the octopus into the existing crab group's lifecycle, preserving independent movement and reproduction without manufacturing a new building. The lesson was not “never add a building”: the 🦅 **does** deserve a new 🪹, because the human explicitly specified one. The lesson is **reuse the nearest existing ownership and lifecycle contract unless the world's meaning requires a distinct institution**.

That distinction is aesthetic *and* architectural. The octopus shares the crab shell because it belongs to the same Island institution. The eagle receives a nest because it represents a new Forest Tier III institution. The model's job is to preserve that intended ontology, not maximize or minimize the number of objects mechanically.

### Acceleration from semantic composability

Early in development, a sentence such as “a creature flies to a worm, captures it, returns home, and credits inventory” would have implied designing movement, entity identity, targeting, carrying, collision, storage, drawing and recovery. By this turn, those were familiar pieces with stable interfaces. The human could describe **a new relationship** instead of specifying plumbing. The model could translate that relationship into a thin behavior layer and a few integrations.

The improvement compounds. An ant taught the game about a tool and a depot; bees and crabs reused harvesting; worms made remains harvestable; rats made bones a resource; the octopus made mushrooms reproductive; moths made flight and ecological delivery a civilian profession; the eagle recombined flight, claims, cargo and inventory to prey upon the workers themselves. Each new creature expands the set of *future sentences that can be executable without architectural negotiation*.

This is the specific acceleration worth recording: **the time and cognitive distance between taste and implementation shrank**, while the number of meaningful interactions increased. The human's scarce attention was concentrated on the choice that mattered—*an eagle hunts worms and brings them home, rather than merely attacking enemies*—not on writing a worker-state-machine specification. The model supplied implementation using the established vocabulary. Human gameplay confirmation closed the loop immediately.

No wall-clock benchmark was taken. “Single turn” is a conversational and acceptance milestone, not a measured speedup ratio or a claim that the model executed a comprehensive regression suite. Nor is the code now magically immune to edge cases. The evidence supports the narrower, valuable conclusion: **this particular feature crossed from request to accepted gameplay in one implementation turn, with no reported correction**.

### Preserve the conditions that made it possible

Maintain a lean README as the cold-boot contract and this chronicle as the historical account. Keep entities' home, claim, movement, cargo, recovery and inventory semantics consistent. Prefer composing existing world verbs over adding parallel subsystems. Let new buildings exist when the human's world semantics call for them, as with 🪹, and avoid duplicate institutions when they do not, as with 🐙 and 🐚. Do not add UI, instrumentation, tests, or architecture for hypothetical future features. Verify the lived result through play, distinguish the human's observations from the model's source inspection, and retain the cadence:

**Play → notice → invent → ship → verify → play again.**

The frontier is no longer “can we implement a creature?” It is “what new ecological relationship is worth inventing next?”
