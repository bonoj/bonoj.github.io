# ICARUS — Development Chronicle

**Status: design canon (provisional), 20 October 2026.** This is a record of the human/model design conversation, not an implementation report. [README](./README.md) is the current compact contract, approved emoji bank, and initial conceptual anatomy. No playable implementation is authorized; the film clock has not started. Proposed behaviors below are **design canon for exploration**, not proven mechanics or permission to build.

## 1. Genesis of the experiment — movie as development clock

The human proposed making a movie into a game **in the time it takes to watch the movie**. The model first considered Source Code (deterministic eight-minute time loop), Ender's Game (squads and zero-G tactics), Sunshine (spacecraft survival), Inception (nested time), Interstellar (relativity), Serenity (autonomous ship crew), and others. The decisive question was not which movie is most impressive, but which gives us a playable causal mechanic quickly. The movie should remain enjoyable; avoid disappearing into infrastructure. **One film, one game, one deadline**; stop when credits roll. This is a future experiment, not a clock already running.

The original Sunshine pitch was: **“Maintain a dying spacecraft approaching the Sun.”** The human drew attention to the oxygen garden 🌱 and the freezing machinery/coolant room 🧊. These became distinct but interdependent ecologies: growth/oxygen/water/fire versus coolant/heat/machinery and environmental hazards. The Sun is a physical force, not merely a backdrop.

## 2. Our existing empire — candidate foundations, not mandatory dependencies

- **Evermore II** (`jit/evermore-2/`): one mobile HTML/CSS/Canvas battlefield, autonomous actors, five interacting ecologies, material pickup/transport/delivery, water, fire, vegetation, worker FSMs. The human observed that it is almost a canvas for new play. Favor external emoji readability and causal worker behavior, **not** a wholesale import of Tiffany's civilization.
- **Hermeticon / Genesis:** volumetric terrain, populations and environmental interactions; potentially useful for physical/spatial modeling. It was considered as a second shell, but no engine integration decision was made.
- **Astra's Orbital Construction:** the human supplied images of detailed modular orbital structures, hulls, ports, trusses and greebling. Astra's exterior is impressive; **interior mode is not ready**. Node-relational construction and procedural greebling are plausible later techniques, but building detailed interiors would consume the movie. The human explicitly preferred **playing from outside, with emojis**.

Convergence: an external, side-on ship with visible interconnected compartments and autonomous workers. The ship itself is the battlefield. We can use 2D composition and emoji rather than walking corridors, building a detailed interior, or requiring a 3D ship engine. The ship may stay centered while the Sun grows, but this remains undecided.

## 3. First conceptual anatomy — ship as living machine

The README preserves the compact concept: **[🌱 garden]—[🧑‍🚀 habitat]—[🧊 coolant]—🛡️ facing ☀️**, with shared ⚡ power, atmosphere, thermal paths and traversable 🚪 connections. This is a schematic, not authoritative geometry.

- **Garden:** water and sunlight sustain plants and breathable atmosphere; overheating and fire destroy that capacity. Plants grow, die and recover visibly.
- **Coolant:** pumps, stored fluid and electricity transport heat; failures propagate through connected equipment.
- **Solar shield:** orientation determines local radiation and thermal exposure; attitude drift can expose compartments.
- **Crew:** small autonomous actors move between compartments, carry real supplies, repair and respond.
- **External presentation:** every relevant compartment is simultaneously visible. The Sun may become larger as the voyage progresses. No invented dashboard or interior navigation.
- **Potential first slice only:** one astronaut, one garden, one coolant pump, one shield. No victory condition committed.

The human selected and approved the **complete candidate emoji bank in README** after eliminating disliked options. Treat that bank as the vocabulary whitelist for future design; not all selected icons need implementation.

## 4. The Rocinante lens — what happens on and inside the hull

The human asked to use the Rocinante's ordeals in *The Expanse* to inform failures, actors, and tools. Borrow the **physical causal relationships**, not characters, scenes, or an exact Roci recreation:

| Rocinante-inspired event | Candidate Icarus consequence |
| --- | --- |
| PDC impacts / hull penetration | Physical punctures, escaping atmosphere, isolated compartments |
| Violent acceleration | Crew and unsecured objects become hazards |
| Reactor/drive trouble | Competing propulsion and life-support power demands |
| Maneuvering-thruster damage | Attitude drift; shield no longer protects the correct face |
| Emergency hull repair | Crew fetches tools and materials, travels to breach, repairs locally |
| Depressurization | Lost air, suits, plant stress, hatch isolation |
| Fire | Oxygen consumed, heat and smoke propagate via ventilation |
| Damaged sensors/communications | Diagnosis and decisions under incomplete information |
| Improvised engineering | Existing finite equipment repurposed in emergencies |

**Core design law: damage creates work; work creates journeys.** A failure should not simply turn a HUD indicator red. An agent perceives it, gathers an appropriate tool, traverses reachable paths, performs a visible operation, and contends with consequences. Nothing is magically repaired from across the ship.

### Proposed autonomous crew roles (not locked cast or exclusive skill gates)

1. **👩‍✈️ Captain:** navigation, shield orientation, trajectory, priorities and emergency overrides; imperfect sensors may lead to poor decisions.
2. **👨‍🔧 Engineer:** 🔧 🔩 🧰, machinery, hull, pipes, repairs and replacements.
3. **👩‍🔬 Botanist:** 🌱 💧 🌾, oxygen ecology, water, harvesting, environmental recovery.
4. **🧑‍🚀 EVA specialist:** exterior traversal with ⛓️, shield and 📡 repairs, radiation/thermal exposure.
5. **🧑‍🚒 Damage-control specialist:** 🧯, hatch isolation, fire response, rescue, decompression.

Roles are **specialties, not exclusive permissions**. Any surviving crew member might improvise beyond their specialty, less effectively. No requirement to introduce all five at once.

### Proposed finite, spatially located tools

| Tools | Consequence |
| --- | --- |
| 🔧 🪛 🔩 | Disassemble, replace, fasten components |
| 🔨 🧱 | Repair hull using finite patch material |
| 🧯 | Consume suppressant to fight fire |
| ⛓️ | Secure EVA crew or equipment |
| 🧲 | Attach equipment to suitable surfaces |
| 🪞 | Reflect light or replace shield sections |
| 🛢️ | Store and transport coolant or fluids |
| 🧪 | Sample and diagnose contamination |
| 🔋 🔌 | Store, transfer, restore power |
| 📡 | Communicate, collect telemetry |
| 🩹 💊 | Treat injury using supplies |

**Tools remain where placed or dropped.** An engineer leaving a 🔧 by a coolant pump creates a future retrieval journey when an EVA worker needs it. Physical possession, finite stock, and reachability are more interesting than magical inventories. Borrow Evermore II's exclusive claims, visible cargo, and delivery discipline where useful.

### Three illustrative cascading disasters (not scripted requirements)

**A. Puncture:** ☄️ → 💥 hull breach → 💨 atmosphere escapes → loose objects move toward breach → crew closes 🚪, retrieves supplies and repairs; the isolated garden may lose environmental regulation.

**B. Cascading coolant failure:** ⚙️ pump fault → 🌡️ rise → 🔥 near 🌱 → crew chooses between isolating the garden and entering to suppress fire; ecology and crew survival are coupled.

**C. Shield dilemma:** 🛡️ alignment drifts → ☀️ exposure → 🧊 cooling overwhelmed → 🆘 exterior repair; captain adjusts attitude while an EVA specialist risks heat and radiation.

## 5. Emerging architecture and player agency

**The ship is not one health bar.** Components, hatches, pipes, radiators, cables, tools and people have independent state and graph relationships. A destroyed radiator removes heat rejection; it does not arbitrarily subtract generic ship HP. A closed hatch interrupts transport/atmosphere; a broken cable interrupts power. Physical causes should produce local, legible consequences.

**Player control remains open.** One attractive direction is controlling ship-wide priorities while crew members autonomously diagnose and respond. Direct commands are an alternative, not yet rejected. The fun may be observing small astronauts improvise, cooperate and make mistakes. Avoid turning the experience into a passive spreadsheet.

## 6. Next decisions, without premature implementation

- Establish a ship silhouette and external screen composition.
- Decide whether the ship moves or the Sun grows in frame.
- Specify a minimal compartment/connection graph and what each connection physically carries.
- Choose a single meaningful first failure and an agent/tool journey.
- Determine player agency (crew direct commands versus priorities).
- Choose the minimal reusable shell after source inspection; protect original worlds.
- Only when authorized, start the film/game clock and implement a playable slice.

**Do not claim this chronicle describes running code. No playable anything yet.** Continue documenting discoveries here; keep README lean and authoritative.
