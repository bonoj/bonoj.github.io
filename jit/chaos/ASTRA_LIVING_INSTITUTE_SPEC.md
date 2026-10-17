# ASTRA BUILD SPEC — THE LIVING INSTITUTE
**Status:** ambitious implementation charter; NOT implemented. **Date:** 2026-10-17.
**Canonical runtime:** https://bonoj.github.io/jit/chaos/
**Source:** `bonoj/bonoj.github.io`, `jit/chaos/index.html`
**Handoff:** `jit/chaos/README.md`
**Verified starting runtime:** `6f63b78b27de03be5ffe644eb52a6c7751ae2c88` (~60.53 FPS, 0 shader errors, 253 practice BBs).
**Intended builder:** Astra, operating as an autonomous systems engineer with permission to design and implement within the scoped Chaos experiment.

## 0. Mission

Build a **living, materially accountable Hermeticon Institute**: a small architectural civilization, not a static model. Its purpose is to observe, understand, extract, move, transform, store, and reuse matter; inhabit its terrain; maintain its infrastructure; and leave a causal history. Its world persists independent of the Hermeticon viewport and independent of the Wanderer. Every visible major feature has a structural and operational reason to exist. Architectural beauty should emerge from the machinery's organization.

**North star:** A user can watch the Institute operating, move the viewing frame elsewhere, return, damage a component, observe consequences and repairs, and interrogate the exact history and BB material account. It must still be the same world.

The task is ambitious by design. Astra should take architectural initiative, not reduce the vision to a toy, but ship incremental, inspectable, reversible vertical slices. No false claims of verification.

## 1. Non-negotiable invariants

1. **Physical authority:** Terrain/world coordinates own positions and supports. The Hermeticon is a presentation viewport, not a physical parent, simulation authority, or existence gate.
2. **Observer independence:** World simulation, material inventory, entity identity, and production continue with no Wanderer and no camera. Any observer may request a view transform; no observer owns the world.
3. **Persistent populations:** Crossing a viewport boundary never creates, destroys, transfers, or teleports material. No cluster popping. Maintain partial geometry continuity at boundaries. Existing per-fragment aperture is a starting mechanism, not a universal physical law.
4. **Conservation:** Each BB-equivalent has exactly one material owner at a time. Transfer is atomic; totals reconcile before/after production, detachment, damage, recovery, and storage. Do not silently duplicate or despawn matter.
5. **Causal construction:** Intent → requirements → functional relationships → load paths and clearances → support resolution → lattice → BB material → behavior → inspectable evidence. Never reverse this into decorative placement.
6. **Composability:** Structures, connectors, actuators, logistics, and renderers are replaceable capabilities. No god object or one-off hand-scripted Institute.
7. **Determinism:** Seeded world generation, bounded fixed-step simulation, reproducible events and replayable operations. Render rate must not determine simulation outcomes.
8. **Phone-first:** Touch targets large enough for a phone; tap interaction, no long-press; target ~60 FPS, profile and budget work instead of hiding regression. Prefer CPU-first architecture and Three.js instancing; existing GPU shader aperture is allowed.
9. **Evidence before claims:** Source write + read-back, deploy verification, and user-observed executing SHA are separate gates. Record shader errors, frame rate, invariant results, counts and provenance.
10. **Isolation:** Modify only `jit/chaos/` and its own documentation. Never modify protected root, Abyss, Hermeticon, Arcana, other JIT experiments, or `chaos-seed-v1`. Do not regenerate the frozen bundle from upstream and overwrite mutations.

## 2. Existing baseline and debts

Read `jit/chaos/README.md` first. Current source is a frozen single-file Three.js world. `createTerrainEntityContract(T,terrain,surface,view)` composes 3 *practice* structures: survey-monument (118 BB), field-gate (77 BB), propelled surveyor (58 BB). Anchors and frame errors are instrumented. `worldView` currently wraps `terrain.setOffset`; Wanderer is a legacy tracking client. Practice meshes use per-fragment GPU spherical aperture; CPU per-BB clipping was explicitly rejected. `createMaterialSurvey({populations:[],debris})` does not yet integrate entity ownership. Actual GPU-clipped visible BB count is unknown: `null` is correct, not zero. Existing entity render root and terrain both participate in view transforms: carefully inspect double-offset behavior before refactoring.

Known debts: independently supported footings; meaningful joints and load paths; entity→detached debris transfer; production and logistics; proper world-view decoupling; persistent event ledger; meaningful operations. Preserve current good build until a tested replacement is available.

## 3. The Institute as a system

The Institute consists of **functional precincts** connected by material, energy, data, and access flows. Exact shapes, spatial layout, and visual language are Astra's design responsibility, constrained by real geometry and operational semantics.

### A. Survey Spire / Observatory
An instrument platform that samples terrain, material deposits, impacts, and local activity. Its mast, aperture, calibration frame, foundation, and observation channels must be individually identifiable. Its observations generate timestamped records and influence other systems (e.g., surveying before extraction). It must actually observe measurable world state; no fake dashboards.

### B. Excavation and Foundry
A terrain-coupled intake and processing station. Identify a material deposit or permitted excavation site; remove or receive finite material; route it into a stockpile; convert inventory into named structural parts at measurable throughput and energy cost. Do not invent infinite material. If extraction is too risky in first slice, begin with a finite seeded stockpile and explicitly label it as a fixture.

### C. Material Transport
An extensible network of conveyors, carriers, rail/cable links, or BB streams connecting foundry, depot, construction sites, and recycling. Define ports, capacities, routing, occupancy, latency, losses (normally zero), congestion, failure, and transfer receipts. Visual flow must correspond to actual inventory transfers, not decorative particles. Transport geometry needs clearance and terrain support.

### D. Construction Yard
A builder that assembles lattice modules from finite stock, in stages, with observable material movement and explicit dependencies. Foundations before columns, columns before spans, spans before dependent machinery. Pause, resume, cancel, dismantle, and reuse material. Partially built states must be valid and inspectable.

### E. Power / Actuation
Choose a bounded, comprehensible source (e.g., finite stored energy replenished by a terrain-coupled collector or an explicitly simulated power plant). Model generation, storage, consumption, and shortage. Transport and fabrication slow or stop when power is unavailable. Never claim thermodynamic realism; define the abstraction and units.

### F. Archive / Memory
An event-sourced ledger of entity creation, material transfer, construction, impact, damage, repair, observations, and view changes (view changes are nonphysical). Provide event IDs, simulation ticks, actors, sources, destinations, quantities, and resulting checksums. Replay or reconstruct at least one meaningful sequence from seed + events.

### G. Maintenance and Recovery
Detect damage and failed connections. Dispatch a finite-capacity repair mechanism; prioritize critical load paths; scavenge debris; replace missing parts; report shortages. Repairs consume inventory and time. If a support fails, the dependent span becomes compromised, inaccessible, or collapses according to explicit simple rules—not a cosmetic flash.

### H. Inhabitants / Service Agents
A small deterministic population of autonomous service entities (surveyors, carriers, repairers). Each has identity, task, position, finite resources, and constraints. They should visibly accomplish tasks without the Wanderer. Avoid speculative general AI: finite-state or utility-based agents with auditable decisions suffice.

### I. Public Court / Traversal
A legible central precinct that makes the other systems comprehensible at a glance. Walkways, arches, bridges, galleries and vertical connections must honor load paths, clearance and terrain. Provide at least one striking but causally justified impossible-world feature (e.g., a suspended observatory supported by an engineered cable network, or a moving counterweighted bridge).

## 4. Semantic schema (proposed; adapt only with explicit rationale)

```ts
type Entity = {
 id: string; kind: string; purpose: string;
 transform: {terrainPosition:[number,number,number]; orientation:[number,number,number,number]};
 motion: 'anchored'|'constrained'|'gravity-driven'|'self-propelled';
 support: SupportContract;
 parts: PartRef[]; ports: Port[]; state: Record<string,unknown>;
 capabilities: string[]; owner: string;
};
type Part = {id:string; role:string; material:string; beadCount:number;
 geometry: LatticeRecipe; supportRefs:string[]; loadCapacity:number;
 damage:number; ownerEntity:string|null};
type Port = {id:string; kind:'material'|'energy'|'data'|'access';
 direction:'in'|'out'|'bidirectional'; capacity:number; connections:string[]};
type Transfer = {id:string; tick:number; material:string; amount:number;
 from:string; to:string; cause:string; committed:boolean};
type WorldEvent = {id:string; tick:number; type:string; actor:string;
 subjects:string[]; payload:Record<string,unknown>; checksum:string};
```

A schema is not a license for excessive abstraction. Start with the minimum contracts required by an end-to-end causal slice, then grow them with demonstrated use.

## 5. Structural grammar

Provide reusable primitives: footing, column, beam, truss, arch, ring, cable, plate, pier, bearing, joint, rail, hopper, channel, gantry, mast, aperture, platform, actuator and enclosure. Every part has a semantic role and finite BB bill of materials. Distinguish a geometric lattice from an engineering model: start with explicit simplified load capacity and dependency rules; do not claim finite-element simulation. Resolve support at each footing, including sloped or excavated terrain; record unsupported and over-capacity cases. Permit partial construction and controlled disassembly.

Prefer an Institute that grows in intelligible phases rather than instantaneously appearing as one giant prefab. A finished structure should be reconstructible from its recipe and inventory transactions.

## 6. World-view contract

Extract a reusable `WorldView` authority with terrain-to-view transform, Hermeticon aperture, and independent center/offset control. The Wanderer may follow or request a view but cannot be required for initialization or updates. Distinguish:
- **physical position:** invariant terrain/world coordinates;
- **presentation transform:** coordinates used to render under a given view;
- **visibility:** GPU fragment aperture or other continuous rendering policy;
- **residency:** whether simulation state is loaded, never equated with visible;
- **ownership:** where material physically belongs, unaffected by view.

Instrument physical and rendered coordinates separately. Test with Wanderer disabled, viewport translated independently, two hypothetical observers viewing the same world, and a structure straddling the spherical boundary. No CPU instance-count deletion for BB clipping. The view should not change simulation checksums.

## 7. Material and lifecycle accounting

Introduce a single authoritative material ledger or inventory service. Track authored structural BBs, stockpile BBs, in-transit BBs, detached debris BBs, consumed/reprocessed material, and externally introduced fixtures. Make the conservation equation explicit:

`initial + imported - exported = structures + stores + transit + debris + accounted waste`.

Every operation emits a transaction. Reject negative inventory, double ownership, missing destinations, and silent deletion. Entity destruction is a **transfer** into debris/recovery inventory, not a disappearing mesh. Visible count and submitted count must never be substituted for owned count. Preserve GPU visibility as unknown where unmeasurable.

For high BB counts, aggregate accounting at batch/part level, with deterministic per-BB identity only where needed. Do not require one JS object per bead.

## 8. Simulation and scheduler

Fixed-step, seeded deterministic world update with a documented subsystem order, e.g. inputs → planning → transfers → construction → structural integrity → movement/contacts → observations → ledger → presentation. Cap catch-up work; record dropped simulation time. Rendering may interpolate but not drive physical state. Provide a pause, single-step and deterministic replay facility suitable for testing. A view-only camera or Wanderer action must not advance or perturb physical outcomes.

Define and instrument time scales for work cycles so activity is visible in a brief phone session. Do not build a simulation that only becomes interesting after an hour.

## 9. Interactions and experience

Minimal default UI: the Institute itself, clear build SHA/FPS, a compact inspect affordance, and a few large controls for play/pause, inspect, seed/reset, and a single controlled disturbance. Tap a precinct to reveal purpose, current task, material inventory, connections, health, throughput and recent causal events. Tap an agent to see its assignment and route. Tap a material stream to see source/destination and transferred quantity. Avoid UI clutter and long-press.

Include a guided **Demonstration Cycle**: survey → allocate stock → transport → build a span → operate the span → introduce a safe local failure → recover material → repair → resume. The cycle should run autonomously and repeat deterministically from a known seed. The user may interrupt it without corrupting state.

## 10. Visual direction

Create an unmistakable, legible architectural identity: brass and dark stone structural hierarchy, cool glass observatory apertures, luminous but meaningful flows, restrained color coding by material/function, and moving mechanical details that correspond to actual state. Use depth and silhouette; major elements must read on a phone. Prioritize sparse strong shapes over random greebles. The Institute should feel like a tiny working laboratory-city inside a vast material world.

No generated static images pasted onto the world as substitutes for executable structure. Avoid decorative BB explosions that imply material transfers that never occurred.

## 11. Performance budgets and instrumentation

Target 60 FPS on the user's phone at its current render settings; baseline measured ~60.53 FPS. Track frame time distribution, update/render costs per subsystem, entity count, BBs owned/submitted, draw calls, allocations, mesh growth, shader compile errors, and view-culling strategy. Report p50/p95 frame times where feasible, not only instantaneous FPS. Build scalable batch instancing and spatial indexing when measured need justifies them. Degrade ornamental rendering before simulation correctness. Avoid hidden population caps; if safety budgets are necessary, expose them explicitly and make backpressure visible.

An `inspect()` snapshot must expose: build SHA; seed/tick; world-view authority/offset; all entity states and physical/render transforms; supports/load violations; network topology; power balance; material conservation equation; agent tasks; event ledger cursor/checksum; shader errors; FPS/perf; invariants and violations. Prefer an optional bounded event history over unbounded memory growth.

## 12. Required acceptance experiments

**A. No-Wanderer boot:** Disable Wanderer initialization and updates. Institute boots, works, moves material and logs events. No null references.

**B. View crossing:** Sweep Hermeticon over a partially intersecting tower, arch and BB stream. Geometry crosses smoothly at the fragment level; no cluster popping; entity/material count unchanged.

**C. Independent transforms:** Change view center/offset without moving terrain-space anchors; verify physical coordinates and world checksum unchanged. Avoid double-offset transforms.

**D. Footings:** Build a supported bridge across uneven terrain; then remove one support. Verify structural state changes causally and accurately.

**E. Conservation:** Transfer 100 BB-equivalents from stockpile to carrier to beam; damage beam; recover debris; repair. At every stage equation balances and each amount has one owner.

**F. Deterministic replay:** Same seed and action/event sequence produces identical state checksum at N fixed ticks, independent of frame cadence and camera motion.

**G. Autonomous activity:** With no user input for 2 minutes, at least one full survey→fabrication→delivery→construction→operation cycle completes, and the ledger explains each transition.

**H. Failure recovery:** Interrupt construction, starve power, disconnect transport, and simulate localized impact. No negative inventory, orphaned ownership, deadlock without reported cause, or silent material loss.

**I. Regression:** Existing practice compositions and terrain aperture remain intact; no shader errors; touch/navigation works; protected root and recovery branch unchanged.

**J. Mobile performance:** Collect measured phone FPS and frame-time telemetry for idle, construction, transfer, impact, and recovery. Explicitly document unmet targets.

Each experiment needs an automated or instrumented assertion where possible, a recorded expected result, an observed result, and the exact build SHA. Do not declare a gate passed based on source inspection alone.

## 13. Delivery sequence — vertical slices, not disconnected frameworks

**Phase 0 — protect and witness:** Read handoff/source, snapshot baseline, establish reproducible source verification and build/runtime gates. Fix misleading instrumentation and document current double-offset risk only if demonstrated.

**Phase 1 — sovereign world:** Separate WorldView from Wanderer; prove no-Wanderer simulation and boundary continuity. Add fixed-step seed/tick and invariant telemetry without changing visible baseline unnecessarily.

**Phase 2 — material truth:** Unified inventory/transaction ledger; register practice parts and debris; create a finite stockpile and demonstrate atomic transfers, rollback/reject on failure, and conservation tests.

**Phase 3 — one complete working machine:** A small survey → foundry → carrier → construction-yard pipeline builds one supported functional span from inventory. Show causal material movement and operating states.

**Phase 4 — structural grammar:** Footings, joints, load paths, supported spans, damage propagation, disassembly and repair. Grow beyond the practice gate with a real multi-footing supported structure.

**Phase 5 — autonomous Institute:** Add agent scheduler, power constraints, observatory sampling, archive and maintenance loop. Run with no user input and no Wanderer.

**Phase 6 — grand architecture:** Compose the full Institute precincts into a coherent spatial plan, vertical layering and beautiful, meaningful mechanical spectacle. Do not compromise earlier invariants for visual effect.

**Phase 7 — disturbance and replay:** Meteor/local impact integrated with structural damage, BB detachment, salvage, repairs, and replayable history. Ship guided demonstration and inspector.

**Phase 8 — hardening:** Mobile performance profiling, bounded memory, error handling, cold handoff, catalog of reusable components, recorded acceptance matrix and final user-visible demonstration.

Every phase must leave a deployable, inspectable Chaos artifact; if a phase is too large, subdivide it. Preserve last known good runtime until replacement is verified. No need to ask the user to perform routine engineering decisions; ask only for genuinely irreversible design choices.

## 14. Engineering workflow for Astra

1. Read this spec, `jit/chaos/README.md`, and the current `jit/chaos/index.html`. Inspect actual implementation; do not trust obsolete README sections over current code.
2. Write a short phase plan and risk register in `jit/chaos/`. Then **build**, don't stall in speculative planning.
3. Use small, verified GitHub writes. If writes fail, consult existing GitHub/Gate recovery machinery rather than repeatedly attempting the same failing call. Never overwrite concurrent changes without fetching latest blob.
4. After each meaningful commit: read back changed files, check syntax/static invariants, inspect deployment status, and request executing SHA/runtime evidence when browser observation is unavailable.
5. Keep a concise, cumulative progress ledger: completed behaviors, exact commits, tests, failures, unresolved questions, next executable step. Update cold handoff after major phases.
6. Prefer architecture that can later be extracted into Arcana, but **do not** extract into Arcana during this Chaos experiment without explicit authorization.
7. Be creatively audacious with the world and conservative with evidence. A failed measured experiment is more useful than an unverified claim of success.

## 15. Definition of done

The Institute is done when it is a persistent, self-operating, structurally legible material system that demonstrably constructs, works, breaks, recovers and remembers; when it does so without the Wanderer; when the Hermeticon merely presents a moving aperture onto that world; when BB ownership reconciles at every state transition; when deterministic replay explains its history; when the user can inspect the causality of every major event; and when measured mobile performance and live deployment evidence are attached to the delivered build.

**What does not count:** A static beautiful building; a giant scene graph; decorative streams; instant-spawning prefab populations; simulated ledgers that do not govern inventory; a camera-dependent world; unverifiable FPS assertions; or a code commit called “live” without executing-build evidence.

**Astra's creative freedom:** Name precincts, invent engineering mechanisms, design architectural silhouettes, choose procedural recipes and service-agent behavior, and surprise the user with coherent emergent details. Do not weaken conservation, independence, persistence, inspectability, or deployment isolation.

**Final instruction:** Make the impossible architecture possible by making its consequences real.

## 16. Existing-system integration map — MANDATORY READ BEFORE BUILDING

This section was added after explicit review of the frozen Chaos bundle. **Do not rebuild capabilities already present.** The list describes current implementation and its limitations, not promised APIs in upstream Arcana. Search the named functions in `jit/chaos/index.html` and inspect their complete source and call sites before designing replacements.

| Existing component | Actual source entry point | Reuse obligation |
|---|---|---|
| Hermeticon shell and capture boundary | `createHermeticon()`, `world2.group`, `world2.content`, `world2.inspect().vessel.innerRadius` | Preserve shell geometry (outer 10.25, inner 10.07) and separate visibility from physical containment. Do not parent physical entity identity to the vessel. |
| Terrain and signed-field geometry | `createTerrain()`, `createTerrainSurfaceQuery()`, `terrain.sample`, `terrain.sphereContact`, `terrain.impact`, `terrain.setOffset`, `terrain.getAperture` | Terrain is the support and contact authority. Reuse existing signed volume, material map, crater and aperture mechanisms; do not add a competing terrain model. |
| World viewing | `worldView` in `createEntropy()`, `terrain.setOffset`, `createTerrainEntityContract(...,view)` | Separate world/view frames; keep Hermeticon fragment-level aperture and no-Wanderer requirement. Beware duplicated transforms and shader program variants. |
| Authored BB structural entities | `createTerrainEntityContract()` | Extend semantic components and anchored/propelled contracts; retain terrain-space persistence and the 253-BB baseline. Do not replace it with unrelated decorative meshes. |
| Detached BB physics | `createBeadDebris(T6,{terrain,offset,innerRadius,parent,abiogenesis,wanderer})` | **Primary existing loose-matter engine.** Inspect `emit`, `canAccept`, `receiveImpulse`, `collideSphere`, `directRegionToward`, `update`, `inspect`; integrate damage and recovery with its BB accounting and collision mechanics rather than building a second loose-bead simulator. |
| Vessel and secondary capture | `createBeadDebris` internal vessel/abiogenesis/wanderer collision and ownership logic | Preserve existing vessel wall contact and capture distinctions. **Do not conflate capture with viewport visibility.** Inspect how the `ownership` counters (`terrain`, `vessel`, `abiogenesis`, `wanderer`) are calculated. Current world call site passes `abioentropy` while function signature names `abiogenesis`: verify whether this is an actual integration mismatch before relying on secondary capture. |
| Gravity/contact and connected limbs | `createGravitySystem`, `uniformGravity`, `createTerrainContact`, `createConnectedLimbs`, `createKineticBody`, `createFootContacts` | Reuse established forces, terrain collision and constrained-motion contracts where appropriate. Some articulated/kinetic trials are disabled: do not enable blindly or assert they are validated. |
| Meteor and impacts | `createCinderfall`, `createImpactDispatcher`, `world2.castMeteor`, `terrain.impact` | Use the existing meteor→dispatcher→debris/creature/plant→terrain impact route. Register Institute damage receivers with dispatcher rather than creating an unrelated explosion engine. Note `creatures:[]` and `plants:[]` currently carry no active populations. |
| Population survey | `createMaterialSurvey({populations,debris})`, `world2.materialSurvey`, `world2.inspect().material` | Extend/reconcile current inspection and ownership. Current `populations:[]`; Institute entity counts are appended separately. Do not confuse authored, submitted, visible, detached, or allocated. |
| Navigation and observer | `createTerrainNavigation({terrain,actor})`, `createWanderer({terrain})`, `world2.attachView` | Reuse tap/raycast plumbing where useful; remove any requirement for Wanderer as simulation or view authority. Existing navigation is Wanderer-centric and may need an optional client adapter. |
| Rendering/visibility treatment | `createObservationLens`, terrain aperture shader, entity `onBeforeCompile` spherical fragment aperture | Preserve terrain-only hybrid depth treatment and shell appearance. No CPU cluster culling. Check shader error telemetry after each shader edit. |
| Instrumentation | `world2.inspect()`, `terrain.inspect()`, `debris.inspect()`, `institute.inspect()`, renderer/edge error report | Extend existing observable contracts rather than inventing a parallel dashboard. |

### 16.1 Concrete BB debris and capture rules

- `createBeadDebris` uses dynamically grown `InstancedMesh` capacity and maintains its own physical `beads` collection; the reported `allocated` is GPU capacity, **not** BB ownership. `count` is actual detached beads, `visible` is submitted instances, and ownership counters describe physical classification. The user has previously rejected arbitrary hidden population limits. Profile and expose backpressure rather than silently capping matter.
- The existing engine computes terrain contact, vessel interactions, Wanderer capture, and a secondary small Hermeticon capture region. These are *physical interactions*, not proof that the visibility shader is responsible for BB existence.
- Current call site: `createBeadDebris(T5,{terrain,offset:botanicalOffset,innerRadius:world2.inspect().vessel.innerRadius,parent:world2.content,abioentropy:cradleCollision,wanderer:{inspect:()=>wanderer.inspect(),innerRadius:10.07*0.06}})`. The function signature accepts `abiogenesis`, not `abioentropy`. Astra must investigate this discrepancy and either document why it is benign or correct it with an isolated test. Do not claim secondary capture works from the current zero capture counters.
- `offset:botanicalOffset` currently derives from `wanderer.inspect().offset`. Decouple that dependency in favor of `worldView` before claiming no-Wanderer support. The same applies to Cinderfall, optional observer logic, and navigation wiring.
- When structural BBs are detached, create an **atomic material ownership transfer** and emit through the existing debris interface. Avoid double-counting while a structure is damaged or a BB is in transit. Make any ownership bookkeeping mismatch visible in invariants.
- No arbitrary disappearance at the Hermeticon boundary. Loose BBs may collide, rebound, be captured or transported according to physical rules; authored structural geometry may be partially clipped for presentation. The two policies are distinct and must not be interchanged.

### 16.2 Rendering and 60 FPS guidance

The live observation for `6f63b78b` reported **60.53 FPS**, no shader errors, 17 shader programs, 652×1179 render target at device pixel ratio 1.7, and ~2.4 ms last observation-lens render time (not total frame time). These are *one-device measurements*, not universal budgets or proof of headroom.

Target **60 FPS phone-first** and approximately **16.7 ms/frame** total budget. Capture p50/p95 frame times and separately attribute CPU simulation, BB integration, terrain rebuild, instanced-matrix uploads, shader passes, and GPU draw overhead. Preserve existing CPU-first, instanced Three.js strategy. Reuse pooled meshes and existing geometries. Avoid per-frame allocations proportional to every BB when avoidable; use spatial locality and update only changed instance data where feasible. Measure first, then optimize; never degrade material conservation or determinism to hide performance costs.

Prior world experiments reportedly achieved far higher BB counts in other contexts; **do not infer Chaos has the same capacity**. Run actual increasing-population trials, record device and build, and identify performance knees. At performance limits, reduce ornamental work, spread construction across ticks, or expose a user-visible throughput budget. Do not silently discard material.

### 16.3 Mandatory Astra inspection gates

Before writing a new material, capture, physics, or visibility subsystem, Astra must produce a short reuse decision for the corresponding component above: **existing behavior, tested limitation, required extension, and regression test**. Prefer modifying an existing composable system to adding a competing implementation.

Run focused tests for: vessel wall collision versus shader aperture; secondary capture fixture; detached-BB ownership after impact; viewport sweep with a stationary structure; world simulation with Wanderer absent; and high-BB-count 60 FPS behavior. Record which tests were actually observed in browser versus inferred from source. The baseline has not passed these new tests merely because its shader compiled.


## 17. Visual ambition: dense executable anatomy, not merely machinery

**User-supplied reference images (2026-10-17):** (1) an intricate low-poly subterranean BB ecosystem with luminous jellyfish, articulated crawling organisms, branching flora, fungal canopies, suspended roots, a cavern, and distributed colonies; (2) an immense eye-like BB assembly suspended within a brass Hermeticon over a sparse, populated terrain. The images were supplied in the conversation, **not** uploaded into this repository. If Astra cannot access the conversation attachments, request them or use this detailed description; do not claim to have seen unavailable assets.

**These references are a qualitative acceptance target.** The Institute must achieve comparable levels of structural differentiation, silhouette sophistication, density contrast, spatial layering, color/material organization, and dynamic visual life. It must not stop at a handful of simple rings, columns, cubes, and token agents. A successful implementation is not a pixel copy: it derives similarly complex structures from reusable executable recipes.

### 17.1 What the first image demands

A materially rich, layered landscape: low-poly terrain with overhangs and caves; rooted stalk populations with vertical growth; umbrella-like fungal branching; coral-like branching aggregates; dangling luminous chains; clustered, bead-built articulated animals; suspended bell-shaped jellyfish with tentacles; winged creatures with coherent membrane/rib lattices; and pockets of light whose illumination corresponds to actual organisms or devices. The composition has distinct near/middle/far populations, dense colonies contrasted with open traversable spaces, and credible contact between structures and terrain.

These are **behavioral archetypes**, not mere shapes. A fungus has a root, growth allocation, branches, and reproduction or decay rule. A crawler has a segmented body, joints, gait/contact constraints, and material inventory. A jellyfish has a bell, radial anatomy, tentacles, buoyancy/propulsion abstraction, and a response to impact. A flying organism has lift/propulsion rules, articulated span geometry, and navigation. A luminous population has an energy source/cost or explicit chemical/material rule. Choose feasible abstractions, document them, and keep the causal contract truthful.

### 17.2 What the second image demands

A monumental **eye-like instrument or organism** made from many densely packed BBs with a coherent iris, pupil, concentric material regions, and physically meaningful sensing behavior. It is suspended within the Hermeticon over a much sparser landscape. This establishes a scale hierarchy: extremely detailed focal structure, sparse terrain-level populations, vast negative space, and a clearly visible vessel frame. The eye must have a purpose: observing, tracking, scanning, sampling, or coordinating the Institute. Its geometry and motion should express its function. It is **not** authorization to fill the world with a single static sphere of decorative BBs.

If building a monumental eye, specify its support/locomotion mode, material source, sensor data, power, actuator costs, and behavior when the viewport moves. The Hermeticon remains a viewport, not the eye's physical parent.

### 17.3 Reusable generative anatomy grammar

Extend the structural grammar with a composable **living-anatomy grammar** shared by flora, fauna, machines, and architecture: branching, radial, bilateral, segmented, articulated, membrane/rib, lattice shell, filament/tentacle, packed volume, gradient material region, and anchored/propelled/constrained motion. Each recipe exposes scale, density, material palette, growth topology, joints, support/contact constraints, BB bill of materials, update cost, and inspection schema. Material must stay owned and conserved through growth, shedding, impact, and reconstruction.

Use procedural density intelligently: clustered regions may contain many thousands of BBs, while distant areas remain sparse. Do not flatten everything to uniform BB spacing or indiscriminate noise. Structural hierarchy and negative space are essential.

### 17.4 Required spectacle demonstrations

1. **Growing colony:** An initially sparse botanical colony grows into differentiated branching/fungal structures using finite material, with visible construction stages and no spontaneous BB duplication.
2. **Articulated life:** A segmented BB creature traverses uneven terrain, visibly actuating coherent body sections. Damage detaches real material through the existing debris engine.
3. **Suspended life or instrument:** A jellyfish-like organism or suspended observatory moves with meaningful dynamics; tentacles/appendages respond coherently, and viewport movement does not change physical state.
4. **Monumental focal anatomy:** An iris-like sensing assembly or similarly extraordinary architectural instrument forms a dense, readable, layered BB structure and performs actual observation.
5. **Ecological/industrial coupling:** At least one living population exchanges material or information with the Institute's logistics/observation system. The Institute is embedded in an inhabited world, not surrounded by inert props.
6. **Scale and density sweep:** Demonstrate close-up BB readability and wide-shot silhouette coherence while holding the mobile performance target. Report actual counts, draw cost, CPU update cost, and FPS.

### 17.5 Performance and truth at high complexity

Visual richness does not excuse invented behavior. Prioritize scalable instancing, recipe-based geometry, bounded simulation detail, sparse updates, deterministic procedural growth, and spatially localized interaction. An organism may have 10,000 rendered BBs without 10,000 independent physics solvers if grouped structural behavior is honestly modeled. Detached beads that enter loose physics must transfer into the existing debris system with real ownership receipts. Distinguish static structural beads, animated coherent beads, and free-moving debris.

**Astra acceptance warning:** A technically correct foundry, transport network, and repair loop surrounded by simplistic placeholder shapes does **not** satisfy this charter. The user expects astonishing executable detail: systems that look richly alive because their internal structure and behavior are richly specified. Build and verify function first in slices, but deliver the visual sophistication as a first-class, measurable requirement, not optional polish.

## 18. Cybernetic biomechanical design language — core requirement

**User direction (2026-10-17):** The target is explicitly **mechanical, cybernetic, and biomechanical**, in addition to rich biological and architectural detail. These are not three separate decorative styles. The Institute is a world in which organic, mechanical, and computational systems share a common executable anatomy. This requirement applies across organisms, infrastructure, instruments, transport, construction, and repair.

### 18.1 Unified anatomy

Treat the following as interchangeable *functional analogues* only where their mechanisms and limitations are modeled:

| Biological function | Mechanical analogue | Cybernetic analogue | Required observable consequence |
|---|---|---|---|
| Skeleton, shell, bone | Beam, truss, chassis, armor | Load monitoring | Support, constraint, breakage |
| Muscle, tendon | Motor, piston, cable, winch | Closed-loop actuation | Force, movement, energy use |
| Circulation | Pipe, conveyor, pump | Flow control | Finite matter/energy transport |
| Nervous system | Wiring, signal bus | Sensors, control network | Measured inputs and decisions |
| Metabolism | Reactor, generator, accumulator | Power management | Energy budget and shortage |
| Growth and healing | Fabrication, modular assembly | Diagnostics and repair planning | Conserved construction and recovery |
| Sensory organs | Lens, antenna, probe, radar | Perception and telemetry | Actual sampled world state |
| Joint and ligament | Hinge, bearing, compliant coupling | Feedback stabilization | Kinematic constraints and failure |
| Exoskeleton and skin | Protective casing, membrane | Distributed condition sensing | Damage, permeability, enclosure |

A mechanism may be wholly mechanical, wholly organic, or hybrid. The simulation should distinguish its physical capabilities and failure modes, not assign behavior based on appearance alone.

### 18.2 Visual identity

Aim for **living industrial wonder**: articulated brass skeletons, dark mineral chassis, translucent membranes, luminous signaling pathways, dense BB muscle fibers, ribbed shells, delicate instrument arrays, cable-tendon bundles, counterweights, geared joints, flexible conduits, telescoping limbs, responsive apertures, and massive structures that move with purpose. Mix precision-engineered symmetry with adaptive growth and local irregularity. Use rich material contrast and structural layering, not arbitrary greebles.

Do not restrict the palette to steampunk brass: include ceramics, glass, bone-like composites, oxidized metals, stone, luminescent tissue, and functional color-coded BB populations. Make close-up component anatomy as convincing as wide-shot silhouettes.

### 18.3 Executable hybrid archetypes

**A. Survey leviathan:** A large mobile or suspended sensing organism with articulated skeletal spars, BB tissue, an instrument iris, sensor tendrils, and finite energy/material requirements. It actively observes the world, and its observations affect Institute operations.

**B. Foundry organism:** A partly grown, partly fabricated production system with feedstock intake, pump-like material transport, articulated manipulators, thermal/process constraints, and a finite throughput. Its appearance reveals what it is currently doing.

**C. Repair arthropod:** A segmented crawler with independently constrained legs, tool-bearing mandibles, replaceable BB armor, onboard stock, and a task planner. It can retrieve actual debris and repair an actual damaged connection.

**D. Living bridge:** A terrain-supported load path combining rigid trusses, cable tendons, adjustable counterweights, and monitored strain. It adapts to load, can fail, and can be rebuilt from reclaimed material.

**E. Cybernetic grove:** Rooted colonies with conductive or material-carrying trunks, luminous sensor nodes, and mechanical pollinators or maintenance drones. Their growth and activity connect to the Institute's logistics and observation networks.

These are creative challenge archetypes, not an instruction to spawn all five instantly. Astra should choose a small number for early vertical slices, then build toward a coherent ecology of interoperable hybrid systems.

### 18.4 Control and causality

Implement a minimal sensor → controller → actuator loop on at least one biomechanical entity. The sensor must measure real simulation state; the controller must have explicit policy, timing and limits; the actuator must change physical or structural state and consume resources. Record sensed values, commands, actuation, and outcomes. Make a broken sensor, disconnected signal, exhausted power supply, or severed tendon produce a distinguishable failure. Avoid decorative blinking indicators that claim to represent nonexistent computation.

### 18.5 Mandatory demonstrations and tests

1. A biomechanical assembly actuates a constrained joint under a real control loop, with recorded input, output, energy consumption, and joint limit.
2. A service creature physically carries finite BB material from debris or storage to a construction/repair site, with ownership reconciliation.
3. A cybernetic sensor influences autonomous behavior; severing its connection produces an observable and recoverable operational change.
4. A living or hybrid structure sustains localized damage and visibly reallocates work, load, or repair resources.
5. At least one large, visually intricate hybrid structure integrates articulated mechanics, dense BB anatomy, material flow, and meaningful sensing in a single coherent entity.
6. Rendering remains compatible with Hermeticon per-fragment visibility and independent world-view motion; no viewport-triggered physical disappearance.

**Astra acceptance warning:** Organic sculptures with glued-on gears, stationary clockwork decorations, or purely cosmetic luminous nerves do not meet this requirement. The ambition is a cybernetic biomechanical world whose engineering is inseparable from its visual design.
