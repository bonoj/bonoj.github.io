# Icarus — active specification

**Executable:** https://bonoj.github.io/jit/icarus/ · [Chronicle](./CHRONICLE.md) · [Ice Cathedral reference](./ice-cathedral.png)

This is the **forward-looking design contract**, not the development diary. Completed experiments and film-clock history live in the Chronicle. The human and model will discuss and agree the final ship design **before implementation**. Do not silently treat a proposed design as authorized.

## Proven baseline — observed live

- Build `ae96c5c1`: autonomous meteor storms, eight asymmetric bays, full initial discrete ice canopy, 12 ice pushers, water/garden/processing/ice chains. The 36.8-second observer trace proved actual water delivery, growth, ice manufacture, hauling and placement; also exposed duplicate placement and unfavorable erosion rate.
- Build `07eca833`: lethal meteor-to-module collision, severed connections, exclusive ice destination reservations, 👁 tap-to-copy compact geometry snapshot, 👁 long-press full JSON download.
- Human-provided `icarus-eye/v2` snapshot at 11.8 s, seed 741, viewport 384 × 694: 41 meteors, 18 hits, 5 ice destroyed, 87 ice surviving, 12 pushers, one destroyed 💧 bay, three severed links, no reported violations. The water bay at (0.19, 0.62) died while the remaining modules stayed powered but became vulnerable to downstream feedstock starvation.
- The model reconstructed a dark portrait hub-and-spokes schematic from the compact coordinates: a pale-blue ice crescent across the top, ⚙️ central, 🧊 upper-left, ⚗️ right, paired 🛰️ midship, 🌱/🌳 lower-right, dead 💧 isolated lower-left. **The human confirmed this exactly matched the running screen.** Compact 👁 geometry is therefore a validated visual-development instrument, not merely telemetry.
- GitHub source commits and human runtime observations are distinct evidence. The build badge currently resolves the latest GitHub file revision; it is not an immutable deployed-build attestation.

## Current assignment — final Ice Cathedral ship design (DISCUSSION, not yet authorized to build)

Create a **badass, unmistakably industrial, asymmetrical lighthugger** with an elongated structural spine and dense working masses, inspired by the broad silhouette language of the USG Ishimura but not copying its asset. The [Ice Cathedral image](./ice-cathedral.png) is the visual reference. The human wants to be blown away by the finished ship **and** wants genuine ablative protection, not a cosmetic blue crescent. Preserve causal systems from the observed baseline. **Do not modify the executable until the final build is agreed in chat.**

### Non-negotiable geometry and causality

1. **Portrait, forward up.** Warm curved solar horizon at top, without a literal sun disk or decorative arc stroke. The vessel extends down/aft through the viewport; silhouette must remain legible on a phone.
2. **Physical ship, not a network diagram.** Replace bare hub-and-spokes with a coherent, substantial asymmetric hull: a main longitudinal structural keel/spine, varied connected hull compartments, offset industrial assemblies, machinery and visible drone/processing infrastructure. Every bay has a meaningful spatial footprint and attachment, not just an emoji at a point. Exposed machinery is vulnerable. Structural connections have explicit topology and failure consequences.
3. **True ablative shield.** The initial ice is a crowded, irregular, opaque cluster of individually simulated 🧊 chunks with solid blue footprints. Ice has position, collision size, HP, origin, support/attachment and physical occupancy. No single shield-health bar, alpha-only glow, decorative halo, dashed guide line, ghost slot or invulnerable drawn ice outline. A meteor is intercepted **only** if its swept physical trajectory intersects an existing intact ice chunk **before** reaching hull. Impacts damage/remove that chunk; resulting holes expose the actual geometry behind it. Hits on exposed modules destroy them immediately (current established rule).
4. **Shield must cover the vessel, not merely sit above it.** Design armor placement and meteor incidence together. For each bay, account for threat direction, forward/side exposure, ice occlusion, and possible breach routes. No claim of protection without actual ray/segment interception tests. Irregular crown, shoulder armor and selective lateral cladding are candidates for discussion; do not silently lock their shapes.
5. **No magical repairs.** Ice is finite physical material: ⚙️ power → 💧 circulation → ⚗️ precursor → 🧊 physical chunk at source → 🛰️ worker claims, loads, transports and installs it. 🌱 competes for water and grows 🌳. Destroyed sources and broken links interrupt real transfers; no production without supply.
6. **Real consequences.** Vectored downward micrometeor storms with angled left/right components, continuous swept collision, earliest actual target along path, localized impact/fire, destroyed bay wrecks, severed physical connections and downstream stalls. Drone bodies and carried ice are vulnerable. Preserve deterministic fixed-step seeded reset and meaningful event provenance.
7. **Autonomy, not gameplay.** No joystick, player policies, shop, win/lose overlay or invented controls. Only unobtrusive pause, reset, and 👁. Cap active pushers around 12, adjusted only for legibility/performance.

### Visual contract

- Industrial vessel should be identifiable **even if emoji icons are hidden**: distinct bow, spine, midship machinery, protruding structures, asymmetrical silhouette, aft engineering mass.
- Large readable bay icons belong **inside or on physical modules**, not as disconnected labels.
- Ice must appear densely packed and solid, with legible individual chunks and localized holes. It must visibly surround or armor the forward hull and exposed shoulder machinery, while allowing selected aft equipment to remain vulnerable.
- Visual layering is meaningful: meteors in front of shield, shield in front of sheltered hull, workers/cargo moving through real gaps, structural hull beneath. No purely illustrative collision proxy that differs from rendered geometry.
- Use the Ice Cathedral image for composition, not as a collision mesh or pasted background. Ship, ice, workers, fire and impacts must be drawn from live state.
- Single-page, no parent scroll, mobile-first. Preserve a coherent dark-space/ice/industrial palette and avoid HUD clutter.

### 👁 contract — two distinct observation scales

- **Tap:** copy a **thin** `icarus-eye/v2`-compatible spatial snapshot, small enough to paste in chat. Include exact normalized module locations, HP, links, active ice positions/HP, workers/cargo/targets, meteor positions/velocities, chain health, short recent event tail, seed, time, build and viewport. Expand only where needed for geometry comprehension: hull footprints, orientation, armor attachment/occlusion, module exposure, powered/supplied/producing/stalled state. Do not dump full event history on tap.
- **Long press:** download full JSON history with event provenance, IDs, all ice and modules (including dead), resource transfers, workers, collisions, destroyed connections, counters, invariant violations and truncation counters.
- One instrumentation switch should be capable of disabling runtime eyes without changing simulation dynamics. Runtime geometry must be faithfully representable by the thin eye report. The model should be able to reconstruct the rendered vessel from it and compare that reconstruction with the human's screen.
- Retain the existing build-identity caveat until actual execution SHA stamping is fixed.

### Acceptance tests for the final build

1. **Spatial shielding:** deterministic meteor rays strike outer ice first; removing a particular piece permits a repeatable strike on the module behind it. Lateral rays can reach deliberately unshielded parts. No shield-hit credit for a miss.
2. **Lethal exposed hit:** an unblocked meteor striking a bay kills it on that hit, visibly leaves wreckage, and interrupts actual connections/resources. No invulnerable hidden module center.
3. **Logistics:** produced ice begins at 🧊; one worker owns one chunk and one placement reservation; cargo travels with worker; placement changes subsequent collision results; no overlap, teleport or phantom stock.
4. **Cascade:** destruction of 💧 stops downstream supply and eventually ice manufacture; severing links can isolate modules; surviving powered modules may nevertheless be stalled for lack of material.
5. **Visual correspondence:** compact 👁 describes the actual hull footprints, ice geometry and module positions well enough to reconstruct the on-screen silhouette. Human compares it with the live display.
6. **Regression:** no negative inventories, orphan claims, double placement, uncontrolled populations, production from dead bays, or tunneling meteors; stable mobile frame rate and reset reproducibility.
7. **Verification:** JS syntax, GitHub readback, preserved reference image and live human 👁 after deployment. Do not claim browser verification from source readback.

## Decisions to make together before building

**Hull:** exact silhouette, length and width, mass distribution, bow, central keel, aft engines, asymmetry and exposed equipment.

**Armor:** shape of initial shield, whether shoulder/lateral coverage extends along hull, how chunks attach and what support loss does; threat-angle envelope and how protection is demonstrated.

**Materials and motion:** how much ice production can offset storms, how workers route through hull/armor, whether wreckage or detached armor remains physically interactive.

**Presentation:** visual density and rendering language at 384 × 694, readability of 🧊 and modules, and how to show active causal flows without decorative guides.

**Status: SPEC CLEANED; FINAL DESIGN DISCUSSION NEXT. NO FINAL BUILD AUTHORIZED YET.**


---

# ICARUS — The Living Shipyard
**FINAL BUILD PROPOSAL · DISCUSSION DRAFT · PRESERVED FROM CHAT · NOT YET IMPLEMENTED**

**A partially skeletal interstellar lighthugger that continuously builds, defends, dismantles, and reconstructs its own protective architecture while decelerating toward a star system.**

Not a finished spaceship with animated workers attached.

A flying Tycho Station. A battered ice cathedral. An industrial ecosystem fighting to keep its own machinery alive.

And I want to borrow the most important quality of our Evermore II tower civilizations: **every spectacular event should emerge from a chain of ordinary material transactions.**

## 1. The ship

The ship begins with an established forward ice shield, but its flanks and industrial skeleton remain visible. It has unfinished truss bays, vulnerable antennae, a growing habitat, exposed cargo handling, and two immense aft drive assemblies.

No decorative modules floating on sticks. The sticks are trusses. The modules are attached to them. Their failure changes the vessel.

### Ship layout — extensive design diagram

The diagram below translates the proposed chat illustration into labeled spatial topology. It is a **conceptual plan**, not measured or deployed collision geometry.

\`\`\`mermaid
flowchart TB
    D["☄️ Incoming particle field<br/>Velocity vector toward destination"] --> C["🧊 Dense irregular forward ice cathedral<br/>Individual sacrificial chunks / gaps / supports"]
    C --> B["Armored bow + forward construction racks"]
    B --> K["Longitudinal industrial keel<br/>Partially exposed structural trusses"]
    K --> L["PORT / LEFT<br/>🛰️ primary construction hangar<br/>💧 circulation / salvage depot"]
    K --> R["STARBOARD / RIGHT<br/>⚗️ processing mass<br/>🧊 foundry / exposed equipment"]
    K --> M["⚙️ central power & distribution<br/>Structural / electrical / fluid services"]
    M --> H["🌱 / 🌳 growing habitat<br/>Vulnerable environmental systems"]
    K --> A["Aft truss works<br/>unfinished hardpoints / radiators / antennae"]
    A --> E["Paired Conjoiner drives<br/>Exhaust and clearance envelope"]
    L --- M
    R --- M
    H --- A
\`\`\`

\`\`\`text
                  INCOMING ☄️  ☄️  ☄️
                     ↘   ↓   ↙

              🧊 🧊 🧊 🧊 🧊 🧊 🧊
          🧊 🧊   ICE CATHEDRAL   🧊 🧊
            🧊  racks / openings  🧊
                       ║
                [ ARMORED BOW ]
                       ║
       [🛰️ HANGAR] ════╬════ [⚗️ WORKS]
             ╲         ║          ╲
          [💧 LOOP]  [⚙️ CORE]   [🧊 FOUNDRY]
                ╲      ║      ╱
               exposed TRUSS KEEL
                    ╱  ║  ╲
             [SALVAGE] ║ [🌱 HABITAT]
                       ║    [🌳]
                  unfinished racks
                  /           \
             ANTENNA         RADIATOR
                       ║
                 AFT ENGINE WORKS
                  /           \
             [DRIVE]         [DRIVE]

    All lines represent proposed *physical* members,
    not automatically power/fluid/material connections.
\`\`\`

## 2. The industrial ecology

Evermore II gives us the right precedent. Its Fire tower doesn't simply spawn a volcano: scorpions lose stone armor, Idols collect the loose stone, carry it to construction sites, Phoenixes claim the completed volcanoes, and the volcanoes become permanent defensive positions. Sun's scarabs similarly turn recovered stone into monuments and point defense.

I want that same **material provenance → autonomous labor → constructed infrastructure → new capability → destruction and recovery** pattern aboard Icarus.

Here is the proposed chain architecture:

### Chain A — ⚙️ The ship's industrial heartbeat

**⚙️ reactor → power network → connected machinery → production and movement**

The reactor supplies finite power capacity. Machinery draws power while operating. Structural connections carry explicitly defined services.

A severed connection might leave a module structurally attached but electrically dead. A different break could physically detach an entire assembly.

The power system is what allows the rest of the ecology to function.

### Chain B — 💧⚗️🧊 The ice economy

**💧 circulation → ⚗️ processing → precursor → 🧊 foundry → physical ice → 🛰️ hauling → shield attachment**

This is our primary survival economy.

Ice isn't generated at the impact site. A chunk emerges at the foundry, gets claimed by a pusher, travels through space, and becomes part of the protective architecture.

Ice placement changes which modules lie behind cover.

Destroy the foundry, and the remaining chunks become an exhaustible reserve. Destroy the coolant system, and production eventually stops.

### Chain C — 🛰️🏗️ The Tycho construction fleet

**Construction bay → worker → loose material → haul → structural site → completed assembly**

This is the Evermore II monument chain, translated into spacecraft engineering.

Workers can assemble truss sections, support brackets, ice racks, sensor masts and defensive platforms from physical materials.

Construction sites accept actual delivered cargo. Their completed structures become operational entities with their own integrity and connections.

If a support collapses, its dependent structures may detach, releasing salvage.

The ship can become more complete over time—or more skeletal.

### Chain D — 🌱🌳 The living habitat

**💧 water → 🌱 growth → 🌳 biomass → oxygen and consumable organic stock**

The habitat isn't a decorative garden.

It competes with ice manufacturing for water and power. It produces finite life-support capacity and possibly organic feedstock for other processes.

A solar exposure or fire can destroy vegetation, turning a small external failure into a prolonged survival crisis.

The tradeoff is important: diverting all resources into armor might save the hull while starving its inhabitants.

### Chain E — ☄️💥🧊 The salvage economy

**☄️ impact → ice fracture / machinery destruction → loose recoverable debris → 🛰️ salvage → ⚗️ processing → usable material**

Meteorites are not merely enemies.

Some leave collectible fragments. Damaged machinery can produce salvage. Ice that breaks away may remain recoverable until it drifts beyond reach.

The construction fleet has to decide whether to repair, recover, or abandon material.

This creates a second route into production, without granting free resources.

### Chain F — 🛰️🛡️ The defensive construction network

Here's our analogue to Evermore II's Sun monuments and Fire volcanoes.

**Salvaged metal → 🛰️ delivery → mounted defense structure → local threat detection → projectile interception**

I'd propose two distinct defensive systems:

**⚡ Point-defense cannon:** Mounted on an exposed hardpoint. Tracks nearby meteorites, consumes power and ammunition, intercepts threats before they reach the shield.

**🧊 Ice bastion:** A constructed rack holding multiple physical chunks. Provides passive cover, loses pieces under impact, and can be rebuilt by workers.

The two defenses compete for the same construction labor and materials.

A cannon protects a region but needs energy, ammunition and functioning sensors. An ice bastion works without power but is gradually consumed.

A cannon destroyed by an impact may leave salvage for the fleet. An ice rack destroyed at its anchor may release several intact chunks into space.

Neither defense is free, invulnerable or omniscient.

### Diagram — whole industrial metabolism

\`\`\`mermaid
flowchart TB
    P["⚙️ Reactor"] -->|finite power| W["💧 Circulation"]
    P -->|finite power| X["⚗️ Processing"]
    P -->|finite power| F["🧊 Foundry"]
    P -->|finite power| Y["🛰️ Construction bays"]
    P -->|finite power| G["🌱 Habitat"]
    W -->|water packets| X
    W -->|competing water packets| G
    G -->|growth| T["🌳 Biomass / life support"]
    X -->|processed precursor| F
    F -->|physical ice chunks| I["Loose ice at foundry"]
    I -->|exclusive claim / visible haul| Y
    Y -->|physical placement| S["🧊 Shield / bastion racks"]
    Y -->|material delivery| N["🏗️ New truss / hardpoint"]
    N -->|mount| Q["⚡ Point defense"]
    Q -->|power + ammunition + local detection| V["☄️ Interception"]
    C["☄️ Incoming impacts"] -->|hit| S
    C -->|unshielded strike| N
    C -->|fracture / wreckage| Z["Loose salvage"]
    S -->|broken / detached chunks| Z
    N -->|broken members| Z
    Z -->|exclusive recovery / haul| Y
    Y -->|deliver recovered feedstock| X
    X -->|reclaimed usable stock| N
\`\`\`

### Diagram — material provenance and claims

\`\`\`mermaid
stateDiagram-v2
    [*] --> SourceObject
    SourceObject --> Claimed: worker reserves exact object
    Claimed --> Loaded: worker reaches object
    Loaded --> InTransit: visible cargo follows worker
    InTransit --> Delivered: arrives at valid destination
    Delivered --> BuiltStructure: site accepts physical material
    BuiltStructure --> ActiveCapability: prerequisites met
    ActiveCapability --> Wreck: hit / lost support
    Wreck --> LooseSalvage: detach recoverable material
    LooseSalvage --> Claimed: salvage worker claims
    Claimed --> SourceObject: claim invalidated / worker dies / released
    InTransit --> LooseSalvage: worker dies / drops cargo
\`\`\`

### Diagram — competition for shared capacity

\`\`\`mermaid
flowchart LR
    W["💧 finite water"] --> I["⚗️ / 🧊 ice production"]
    W --> H["🌱 / 🌳 habitat"]
    L["🛰️ finite labor"] --> A["Repair armor"]
    L --> B["Build ⚡ cannon"]
    L --> C["Recover salvage"]
    L --> D["Build temporary shade"]
    M["Finite recovered metal"] --> B
    M --> D
    M --> E["Replace broken structure"]
\`\`\`

## 3. The great threat: orientation

I want the ship to experience a gradual change in attitude during its deceleration mission.

Not a scripted cinematic explosion. A real change in geometry relative to two external fields:

**Interstellar particles:** incoming along the velocity vector, even when the vessel rotates.

**Stellar radiation:** arriving from the system's star along a separate directional vector.

A bay may be protected from meteors yet exposed to the Sun. A shield configuration may protect the habitat while leaving a construction site in a lethal work zone.

Pushers should sense locally and prefer sheltered paths. Some repairs become impossible until protection is constructed.

A damaged antenna might be repairable but require the fleet to build temporary ice cover before approaching it.

That is a whole game of consequences without requiring gameplay controls.

### Diagram — attitude is not velocity

\`\`\`text
               INTERSTELLAR PARTICLES
                        ↓ ↓ ↓
    CRUISE                  TURN                  DECELERATION
       🧊                      🧊                        🔥 engines
       ║                       ╲                        ║
       ║                        ╲                       ║
       ║                         ╲                      ║
     drives                    drives                    🧊 aftward
       ↓                        ↘                         (old bow)

    Ship's velocity remains destination-ward through the turn.
    The ship's thrust vector reverses to brake.
    Solar radiation may arrive from a *different* direction.
    No protection is credited without actual occlusion.
\`\`\`

\`\`\`mermaid
flowchart TB
    A["Ship attitude changes"] --> B["Relative meteor incidence changes"]
    A --> C["Relative solar incidence changes"]
    B --> D["Ice intercepts ray first?"]
    C --> E["Module / EVA worker in actual shadow?"]
    D -->|yes| F["Local ice erosion"]
    D -->|no| G["Exposed hull / worker impact"]
    E -->|yes| H["Sheltered work possible"]
    E -->|no| I["Solar heating / damage / EVA risk"]
    F --> J["New holes and changing cover"]
    G --> K["Wreck / severed services"]
    I --> K
    J --> D
    K --> L["Autonomous reassessment"]
    L --> M["Recover / construct shade / relocate armor"]
    M --> H
\`\`\`

### Diagram — spatial occlusion contract

\`\`\`text
   ☄️ particle ray  ────────────────►  [🧊 chunk] [BAY]
                                            X       SAFE
   ☄️ particle ray  ───────────────────────────────►[BAY]
                                                    DESTROYED

   ☀️ solar ray     ────────────────►  [ice rack]   [EVA]
                                            X       SHADED
   ☀️ solar ray     ───────────────────────────────►[EVA]
                                                    EXPOSED

   The same ray/geometry data must determine collision,
   exposure, render ordering, and the compact 👁 report.
\`\`\`

## 4. The first autonomous spectacle

Here's the kind of event sequence I want to witness:

1. Incoming micrometeorites chip away at the forward ice cathedral. A local hole opens above an exposed communications mast.
2. A meteor destroys the mast. Its loss reduces long-range sensor coverage, creating a blind sector for point defense.
3. A construction pusher retrieves a metal fragment from the wreck and delivers it to a new hardpoint.
4. Other workers haul fresh ice to the damaged sector, but the changing solar angle makes their direct route unsafe.
5. The fleet builds a temporary protective rack. Workers can now approach the exposed hardpoint.
6. The rebuilt sensor enables a nearby cannon to track and intercept incoming particles again.
7. Another impact destroys the rack's support. Several ice chunks detach, drift away, and the repaired mast becomes vulnerable again.

Every step should have a specific object, position, cause and observable event. No invisible global resource credits. No scripted guarantee that the sequence completes.

### Diagram — event cascade and emergent recovery

\`\`\`mermaid
flowchart TD
    A["☄️ Hits 🧊 ice"] --> B["Local shield hole"]
    B --> C["☄️ Destroys exposed antenna"]
    C --> D["Sensor coverage shrinks"]
    D --> E["⚡ Cannon loses local tracking"]
    C --> F["Loose metal salvage"]
    F --> G["🛰️ Claims and hauls wreckage"]
    G --> H["🏗️ Rebuilds sensor hardpoint"]
    B --> I["🛰️ Hauls fresh 🧊"]
    I --> J{"Solar ray exposes work site?"}
    J -->|yes| K["Build temporary ice rack"]
    K --> L["Work site shaded"]
    J -->|no| L
    L --> H
    H --> M["Sensor comes online"]
    M --> N["⚡ Local point defense resumes"]
    K --> O["☄️ Hits rack support"]
    O --> P["Rack detaches / loose ice drifts"]
    P --> B
\`\`\`

### Diagram — point defense versus passive ice

\`\`\`mermaid
flowchart TB
    M["Recovered material + 🛰️ labor"] --> C["⚡ Cannon hardpoint"]
    M --> I["🧊 Bastion rack"]
    C --> S{"Sensor coverage?"}
    S -->|yes| P{"Power + ammunition?"}
    S -->|no| F["No intercept"]
    P -->|yes| T["Track local meteor / fire"]
    P -->|no| F
    T --> H["Meteor intercepted before hull"]
    I --> A{"Actual ice occupies impact path?"}
    A -->|yes| E["Chunk absorbs impact / erodes"]
    A -->|no| X["Exposed module hit"]
    F --> A
    E --> D["Hole opens / workers can refill"]
\`\`\`

## 5. Simulation boundaries

For our first build, I'd keep the population small enough that the world remains comprehensible on a phone: around twelve construction workers, a handful of cannons, a few major structural assemblies, and a dense but bounded population of individual ice chunks.

We should build on Icarus's existing worker and observer machinery rather than create parallel actor systems. Construction, hauling, salvage and repair can be tasks within the same worker model.

And 👁 must expose the actual ship geometry, material provenance, module dependencies, exposed shadow regions, construction progress and cannon targets. We should be able to reconstruct not just what the ship looks like, but **why its systems are behaving as they are**.

### Diagram — one autonomous worker architecture

\`\`\`mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> EvaluateLocalWork: powered operational hangar
    EvaluateLocalWork --> ClaimIce: exposed shield gap + ice available
    EvaluateLocalWork --> ClaimSalvage: loose salvage reachable
    EvaluateLocalWork --> ClaimConstruction: funded construction site
    ClaimIce --> TravelToSource
    ClaimSalvage --> TravelToSource
    ClaimConstruction --> TravelToSource
    TravelToSource --> CarryCargo: physically load object
    CarryCargo --> Deliver: safe path to reserved site
    Deliver --> Idle: site receives material / reservation cleared
    TravelToSource --> Idle: invalid target / claim released
    CarryCargo --> Drop: destroyed / unsafe / destination lost
    Drop --> [*]: physical cargo released
\`\`\`

### Diagram — dependency-aware failures

\`\`\`mermaid
flowchart TB
    A["☄️ destroys 💧 circulation bay"] --> B["💧 water production stops"]
    B --> C["Existing water buffers consumed"]
    C --> D["⚗️ precursor production stalls"]
    C --> E["🌱 growth stalls"]
    D --> F["🧊 foundry consumes last precursor"]
    F --> G["New ice stops"]
    G --> H["🛰️ idle without chunks"]
    H --> I["Shield erosion exceeds replenishment"]
    I --> J["More modules exposed"]
    J --> K["Further irreversible damage"]
\`\`\`

## 6. The design decision I favor

I would **not** make the first build perform an entire 180° flip. That risks turning our attention toward animation instead of the ecology.

Instead, begin with a ship already in its deceleration phase, with a modest, continuously changing relative angle between its hull, the particle stream and the stellar radiation field. This makes exposure and shelter matter immediately.

Build the physical shipyard, material loops, ice bastions, sensors and point-defense first. The full turnaround becomes a natural next experiment once those systems are credible.

**The target is a civilization of machinery living on the outside of a spacecraft.** Every worker carries something. Every structure protects or enables something. Every destruction can propagate into an industrial crisis—or create the material for an unexpected recovery.

That's the specification I'd propose for our final build. It remains a discussion draft here; no executable changes are authorized by this specification alone.

---

## Diagram index / acceptance mapping

| Diagram | What it must eventually prove |
|---|---|
| Ship layout | The drawn vessel and collision hull share one geometry source |
| Whole industrial metabolism | Every resource and capability has an actual producing/consuming cause |
| Material provenance | Each claimed object exists, moves, arrives or is physically dropped |
| Shared capacity | Competing demands constrain water, material and labor |
| Attitude / solar exposure | Velocity, ship orientation and solar direction are independent |
| Spatial occlusion | A shield only protects what its physical geometry intercepts |
| Damage/recovery cascade | Local damage can alter distant capabilities through real dependencies |
| Point defense versus ice | Active and passive defenses have different inputs and failure modes |
| Worker FSM | Existing workers serve all tasks without duplicate autonomous subsystems |
| Dependency failures | Power and stored resources are distinguished from ongoing supply |

**Status: proposal preserved and extensively diagrammed; executable unchanged.**
