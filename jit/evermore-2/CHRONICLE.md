# TIFFINITY SURVIVORS™ — Development chronicle

Historical development record. **Not the current game specification.** For current behavior, invariants, and the next task, read [README.md](./README.md). Earlier experiments, build-label implementations, verification claims, and proposed frontiers below may have been superseded; do not implement them from this history.

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
