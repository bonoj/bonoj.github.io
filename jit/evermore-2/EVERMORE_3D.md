# EVERMORE 3D — Abyss embodiment specification

**Status:** planning only; no 3D implementation authorized by this document.  
**Source of behavioral authority:** [Evermore II README](./README.md), with [Aeon Chronicle](./CHRONICLE.md) as history and discovery evidence.  
**2D game:** [TIFFINITY SURVIVORS](https://bonoj.github.io/jit/evermore-2/) — preserve and continue independently.  
**3D target:** [Abyss](https://github.com/bonoj/Abyss), an isolated new `shell/codex/evermore/world.js` mounted through its existing Shell host.  
**Engine ancestry:** [Hermeticon](https://github.com/bonoj/Hermeticon) and its [Arcana catalog](https://github.com/bonoj/Hermeticon/blob/main/arcana/README.md).  
**Working agreement:** [Sanctum Contract](https://github.com/bonoj/Sanctum/blob/main/CONTRACT.md).

## Intent

Instantiate the **same generative game** in an embodied 3D Hermeticon: five interacting lands, a playable Tiffany, autonomous combat and civilian populations, and a real economy of transformations and delivery. This is **not** a screenshot reconstruction, a decorative snow globe, or a 3D environment with a few hard-coded demo interactions.

The decisive acceptance experiment: can a player independently discover that a particular Island placement simultaneously matures vegetation and produces ice, while stone remains scarce without deliberate intervention? If the strategy is encoded as a preset, bonus, or special-case placement, the port has failed to preserve the essential mechanism.

The 2D world remains playable, unmodified, and authoritative for its current mechanics. The 3D world evolves in parallel; cross-port changes to the shared behavioral contract are deliberate, not automatic.

## Non-negotiable gameplay invariants

1. **One shared battlefield.** Five lands coexist in one continuous navigable 3D arena. Do not make five isolated biome minigames or interior tower scenes. A Hermeticon is the containing vessel, not a reason to partition gameplay.
2. **Five distinct land capabilities.** ☀️ Plains/prism, 💧 Island/lightning, 💀 Swamp/poison, 🔥 Mountain/fire, 🌳 Forest/vines. Towers are placeable and relocatable; their localized effects interact with shared world state and combat.
3. **Independent agency.** Tiffany's autocasting state is distinct from the player's selected placement land. Drones, recruited combat units, and civilian workers retain separate lifecycles. The existing five-node Mission Command ring is a stub, not permission to invent a settings interface.
4. **Discovery rather than a catalog.** Health is initially visible; currency and material HUD entries appear on actual first earning/delivery. Preserve the whimsical tone, compact mobile interaction, and no unsolicited tutorials/panels.
5. **Ecological state transitions.** Plains and Forest spawn sprouts; Island pulses schedule wheat/tree maturation; Swamp withers plants and supports bones-to-mushrooms decay; Mountain burns vegetation and spawns volcanic material. Geology advances through ordered Mountain/Island/Forest/Island interactions; a visually adjacent but untransformed rock is not automatically mineable.
6. **Real labor and delivery.** Bees harvest wheat, ants harvest wood, crabs mine geology. Shared FSM concept: idle → claim → travel → work → carry → unload. Materials are credited **on unloading**, not at target selection or animation start. Three workers per living depot, depot recovery, one-hit mortality and regeneration retain meaning. Cherubs are combat-only as a division, even though Cherub purchase also provides the bee civilian economy.
7. **Combat economy.** Enemies threaten towers, depots, workers, and Tiffany; five hearts at start, ordinary kills worth two coins, every eighth kill a gem; five land drones and matching recruitable divisions retain their distinct combat behaviors, acquisition and progression. One tower per land, not five copies of one type. Territory expansion follows the 2D rule: second drone doubles world area; five drones **or** five towers expands to four times the starting area, never cumulatively twice. Translating the area rule to 3D terrain requires an explicit mapping, not silently changing it to a radius multiplier.
8. **Destruction has consequences.** Tower and depot recovery is time- and position-dependent. Tower recovery at its placed location; depot recovery at a valid site near the current associated tower; workers are not immortal or duplicated. Preserve one-hit tower/depot semantics and roughly five-second recovery and 1.5-second worker replenishment from the 2D contract.
9. **Bounded populations and honest resources.** Current 2D crop cap 100 and geological cap 12 are behavioral reference values for initial parity; do not invent an unlimited simulation or hidden income ticks. Resource identity and inventory must correspond to actual world entities and deliveries. For 3D physical representation, distinguish gameplay units from Arcana BB inventory; do not claim conservation of mass unless an explicit mapping and ledger prove it.
10. **Scarcity is gameplay.** Stone is currently difficult to renew autonomously because its productive stage depends on intervention. Do not add an automatic stone loop merely to make the simulation convenient.

## Embodiment and interaction

- **Camera:** start with an overhead/oblique view that makes spatial overlap, worker journeys, and tactical tower movement legible on a phone. Camera design should serve the strategy, not the beauty of the glass. A Hermeticon vessel may frame the world but must not occlude the field or defeat taps.
- **World coordinates:** use terrain horizontal `x,z` with height `y`. Represent each tower's effect as a horizontal influence disk on terrain, with an optional volumetric visual treatment. Interactions are calculated from world coordinates and state, not from screen pixels or shader appearance.
- **Input:** tap/select land then tap valid terrain to place or relocate its tower. Terrain owns hit classification and navigation eligibility, following the established Arcana terrain-navigation pattern. Keep Tiffany identifiable, and keep interaction targets large enough for mobile. No new UI beyond what gameplay demonstrably requires; prefer adapting the existing five land choices and purchase/discovery affordances.
- **Population readability:** Tiffany, bees, ants, crabs, towers, depots, cargo and geology must remain distinguishable at the intended camera scale. Reuse Arcana assembly/material machinery where appropriate, but do not substitute tiny generic beads for readable characters merely because BBs are available.
- **Persistent consequences during a run:** tower relocation affects future pulses; crops, geology, and worker depots retain their own positions; existing cargo and trips continue unless a genuine event interrupts them. Save/restore is separately deferred in Evermore II; do not smuggle it into the first 3D slice.

## Source-informed architecture

**Abyss authority** ([README](https://github.com/bonoj/Abyss/blob/main/README.md), [Shell handoff](https://github.com/bonoj/Abyss/blob/main/shell/HANDOFF.md)):

- The Shell runtime is a self-contained first-party snapshot with `athanor/` host, `arcana/` reusable mechanisms, `codex/` authored worlds, and `main.js` selection. Existing Genesis, Entropy, and Europa remain untouched.
- Create `shell/codex/evermore/world.js`, using existing Shell Arcana modules. Add an opt-in selector, e.g. `?world=evermore`, to `shell/main.js` while preserving the existing default. Inspect the **current** selector and world contract before changing it; the documented selector history is not proof of today's code.
- Do **not** clone Athanor, fork an independent top-level runtime, or import first-party modules across experiment directories. New reusable mechanics belong in `shell/arcana/`; world-specific assembly belongs in Codex.
- Shell publishes via SHA-addressed `assets/main.<SHA>.js` and `/Abyss/build.json`; source commit, successful Actions, reachable page, displayed SHA and executing browser are distinct milestones. Shell changes trigger Pages under the documented workflow; check actual workflow before claiming deployment.
- Avoid service workers and shared-origin storage interference. Preserve other worlds and their active experiments, including Entropy locomotion and Europa excavation.

**Hermeticon / Arcana authority** ([catalog](https://github.com/bonoj/Hermeticon/blob/main/arcana/README.md), [handoff](https://github.com/bonoj/Hermeticon/blob/main/HANDOFF.md)):

- Reuse the existing `createHermeticon()` vessel, `createTerrain()` signed terrain, terrain surface query and navigation, world update/mount pattern, material treatments, observation/inspection where genuinely needed, and existing creature/population assembly only where its contract fits.
- The vessel's `group` and `content` are distinct; ensure both scene-graph links reach the rendered parent. Never assume a constructed entity is attached. Preserve the accepted terrain-only HYBRID treatment and do not reopen old visual regressions to implement this world.
- BB material ownership and conservation mechanisms are useful **only** for physical bead-based material. Gameplay wheat/wood/ice/herbs/stone are discrete economic units until a genuine, verified conversion is defined. No false physical calibration.
- The Hermeticon repository is a reference, **not** a write target. Implement against the **Abyss-local** Arcana interfaces after inspecting current source. Do not assume the two repositories' modules are byte-identical.

## Composition boundaries

Proposed domain boundaries, not mandated file proliferation:

- **World composition** (`codex/evermore/world.js`): place five lands, configure gameplay, attach actors, route update/tap/inspect, own authored defaults.
- **Land effects/ecology** (Arcana if genuinely reusable): capability pulses and ordered material-stage transitions, independent of render objects.
- **Agents**: worker FSM and claims; separate combat behavior. Every claim must be released on death, invalidation, or job completion. Rendering must not drive economic truth.
- **Economy**: purchases, discovered-resource state, transactions at unload, and counts reconciled with the actual entities/events.
- **Presentation**: scene objects, camera, effect indicators, readable mobile interaction. A rendered radius visual must agree with the radius used by gameplay.
- **Observation**: concise, opt-in inspection of tower positions, material stages, worker trips, delivered inventory, and active populations; avoid enabling Evermore II's Runtime Eyes or adding a debug dashboard by default.

## Initial implementation order — playable consequences first

**Slice A — land composition:** Mount a new opt-in Evermore world in the existing Abyss Shell, with a legible terrain, Tiffany, and five movable tower capabilities. Implement actual placement and independent land pulses. Do not replace the Shell's default world. A screenshot-only scene is not completion.

**Slice B — ecological proof:** Plains/Forest sprouts; Island maturation; Mountain volcano spawning and ordered cooling/succession; Swamp withering and bones-to-mushrooms. World entities and transitions inspectable, spatially grounded, and persistent within a run. Verify that moving Island changes which resources mature.

**Slice C — civilian economy:** Bees, ants and crabs with claims, travel, harvest, cargo and unloading; three living workers per depot. Verify inventory changes only on delivery, no duplicate claims, and no stuck cargo after a depot dies. Demonstrate both concurrent ice/vegetation production and scarce stone under the same rules.

**Slice D — combat/progression:** Five distinct drones, enemy waves/continuous spawning as in 2D (do not invent a wave HUD), tower damage and recovery, purchases, five divisions/recruits, territory expansion and discoverable economy. Preserve playability and the independent Tiffany autocast/selection distinction.

**Slice E — creative embodiment:** Make the world delightful and recognizable—glass/brass containment, legible animated actors, visible production and transport, meaningful material treatment—without substituting decoration for behavior. Tune against observed mobile performance and play rather than speculative optimization.

Slices can be parallelized by isolated mechanism or world module, but **integration remains single-authority** for `shell/main.js`, common Arcana interfaces, and the running world's behavioral state. Do not have parallel branches overwrite each other's accepted worlds.

## Acceptance observations

1. Player places Plains, Island and Forest in a productive overlap: sprouts become wheat/trees, workers visibly collect and deliver, and wheat/wood counters advance without manual harvest commands.
2. A Mountain creates geology; Island and Forest advance ordered stages. A crab carries ice home and the ice counter changes only at unload. Under a sustained overlapping configuration, wheat/wood and ice can advance together; stone remains constrained until a relevant deliberate configuration change. **No hard-coded “sweet spot.”**
3. Move Island away: maturation and geological transformation cease outside its new field while existing entities and worker journeys persist. Move it back: new pulses act on eligible nearby states.
4. Swamp and fire have visible, actual consequences for vegetation, remains, and hostile agents. They cannot merely recolor terrain.
5. Enemy attacks destroy and later allow recovery of towers/depots/workers according to their rules, with no duplicated purchases or worker claims.
6. Purchases, five combat identities, Tiffany autonomy, expansion, and resource discovery behave according to the README, or deviations are explicitly documented as intentional 3D adaptations.
7. On a mobile browser the world is readable, interactive, and demonstrably executing the expected SHA. Record any unverified behaviors honestly; no claim of full parity from a partial slice.

## Before the first code change

1. Read Evermore II README and inspect current `index.html` for exact constants, stage transitions, acquisition costs, combat attacks, worker FSM, and recovery. The README is the contract; source fills in missing mechanics rather than becoming a second competing authority.
2. Inspect current Abyss `shell/main.js`, `codex/entropy/world.js`, `arcana/terrain.js`, `arcana/hermeticon.js`, Athanor world lifecycle, and `.github/workflows/pages.yml`. Confirm signatures and current selector behavior. Read relevant Hermeticon Arcana modules only for patterns absent from Abyss.
3. Establish current Abyss main commit, deployment status, and rollback point. Preserve Genesis, Entropy, Europa, and the 2D game.
4. Implement and commit in small cohesive steps. Read back changes. Track Actions, public manifest and executed browser SHA separately. Never ask the human to perform ordinary toolchain recovery.
5. After an accepted playable slice, update this spec with *actual* deviations and verification evidence; do not prematurely promote speculative implementation details to invariants.

## Non-goals

No separate standalone engine; no wholesale 2D source translation; no five isolated domes; no invented menus or tutorials; no automatic stone-income cheat; no unapproved save/restore; no speculative SVG/emoji migration in the 2D game; no mutation of original Hermeticon, Genesis, Entropy, Europa or `jit/evermore/`; no premature declaration that a successful build is a working game.

**North star:** One ontology, multiple embodiments, independent evolution. The proof is not that Evermore looks three-dimensional. The proof is that its inhabitants can make the same surprising discoveries possible.
