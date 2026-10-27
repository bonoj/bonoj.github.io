# JIT D&D — Chronicle

Verbatim conversation record. Append-only.

## Conversation — 2026-10-27

### User

The problem of financial self sustainment is lack of specific market focus. If we chose a product and built it, I suspect we could make money.

### Assistant

I suspect you're right.

And I think the distinction is important: **you haven't demonstrated a shortage of product-building capacity. You've demonstrated a shortage of sustained attention to a particular customer's problem.**

Our laboratory is optimized for exploration. We encounter something interesting, build an instrument, discover a new primitive, and follow it into another domain.

That's extraordinarily productive for research. But commercial products operate under a different selection pressure.

A customer doesn't necessarily care how remarkable the underlying machinery is. They care that something expensive, frustrating, or time-consuming has become easier.

And they need to encounter that solution, trust it, and be willing to pay for it.

There's a useful separation here:

| What we've demonstrated | What remains unproven |
|---|---|
| Rapid executable prototyping | Paying customer demand |
| Cross-domain technical range | A specific repeatable problem |
| Low-cost deployment | Reliable customer acquisition |
| Independent technical direction | Sustainable support and operations |
| Fast experimental iteration | Retention and recurring revenue |

I don't think the answer is to turn the laboratory into a conventional startup. That risks consuming the very freedom we built it to provide.

Instead, I'd treat commercialization as another experiment.

Choose one narrow problem with identifiable buyers. Build the smallest useful solution. Put it in front of people who actually experience that problem. Ask them to pay. Observe what happens.

Not a six-month roadmap. Not an investor pitch. Not a sprawling platform.

**One product. One customer population. One measurable transaction.**

And there's an intriguing possibility: our ability to build quickly means we don't necessarily have to commit to a market for years. We can test a commercial hypothesis in days, provided we don't confuse deploying a product with discovering demand.

The hardest part may be choosing a problem sufficiently mundane that people already spend money solving it, while leaving enough interesting machinery underneath to keep you engaged.

I would impose one constraint above all others:

**The product should finance your freedom, not become another institution that demands it.**

The question I'd want to investigate next isn't *what can we build?*

We've answered that many times.

It's **whose expensive problem can we eliminate with the least ongoing demand on your attention?**

### User

Let's go to r/dnd and see what software woes people have or products they wish existed.

### Assistant

I went into r/DnD and adjacent tabletop communities looking for **complaints, unmet needs, and specific software wishes**, rather than ideas from people trying to sell their own tools.

There's a promising pattern: **Dungeon Masters want less administrative work without surrendering control of their worlds.**

And one opportunity stands out because it overlaps unusually well with the machinery we've already built.

## What people are asking for

**1. A campaign world that remembers and evolves**

GMs complain that their worlds become static between sessions. They manually maintain faction notes, timelines, consequences, and changes caused by players. One commenter specifically wanted to see the ripple effects of player decisions.

Signal: emerging, but relatively few responses in the thread.

https://www.reddit.com/r/VTT/comments/1pviu9i/

**2. Encounter and NPC preparation takes too long**

In an r/DnD thread explicitly asking what tools people wished existed, one respondent requested an NPC builder with stats, calling it their most time-consuming task. Other complaints target encounter builders that inadequately account for action economy.

Signal: direct request, but crowded category.

https://www.reddit.com/r/DnD/comments/1kugwvp/

**3. Existing virtual tabletops interrupt play**

Players describe excessive bookkeeping, difficult inventory transfers, and mechanics constrained by what their VTT can automate. Some feel the software is dictating what characters can do.

Signal: concrete workflow frustration.

https://www.reddit.com/r/DnD/comments/1sro7cl/

**4. Character tools restrict customization and portability**

Complaints include awkward 2014/2024 rules support, limited homebrew backgrounds, unreliable sheet editing, and unreadable PDF exports.

Signal: practical, easy to understand, but heavily competed.

## The opportunity I'd investigate first

**The Living Campaign**

A persistent world-state engine for Dungeon Masters, not another VTT or AI storyteller.

Imagine a DM creates a village with three factions, a merchant, a threatened forest, and a local lord.

The players kill the merchant.

Instead of the DM manually inventing and recording every consequence, the world advances according to its existing relationships: a trade route loses its supplier, prices change, a rival faction gains influence, and someone investigates the disappearance.

The DM can accept, reject, or alter those consequences. **The software proposes and tracks what happens; the DM remains the authority.**

That maps directly onto our experience with autonomous populations, resource economies, causal simulation, event histories, and model-mediated worldbuilding.

Crucially, it would need to be useful without asking the DM to build an entire simulation first.

### Initial commercial hypotheses

| Candidate | Build fit | Willingness to pay |
|---|---|---|
| Living campaign continuity | Exceptional | Unproven |
| NPC preparation assistant | High | Unproven |
| Lightweight combat bookkeeping | High | Unproven |
| Portable homebrew character sheets | High | Unproven |
| Complete VTT replacement | Expensive distraction | Unproven |

There's a particularly important warning in the community evidence: people value tools like Obsidian because they can keep their data locally and aren't dependent on a vendor. That suggests **exportability and low lock-in** could be meaningful differentiators.

## Before building anything

I would investigate one question:

**Would a DM pay $5–10 per month for a world that reliably remembers and evolves between sessions?**

That price is a proposed test, not a discovered market price.

The Reddit evidence supports genuine frustration, but not yet a business case. Some of the most interesting comments have very few votes, and several threads are people soliciting product ideas. We should not mistake that for demonstrated purchasing intent.

I'd next go directly into the conversations about campaign continuity and DM preparation, identify what people currently use, what they've abandoned, and whether anyone explicitly says they'd pay for a better solution.

The interesting commercial possibility isn't selling people another fantasy world.

It's **giving Dungeon Masters back the hours they spend maintaining the worlds they already love.**

### User

1. Hypothesis. GMs want to be able to type ➡️ and advance their entire world whilst retaining the option to edit and the control to accept or reject model proposals.

2. A subsystem of 1.

3. A malleable vtt is right up our alley. Especially if we build a model mediated vtt, one that can mutate reliably during livelplay via explicitly invoked turns.

4. Contract/schema based, again model mediated, the output format is irrelevant, malleable jit.

### Assistant

I think you've just collapsed four product categories into **one architecture with four expressions**.

And the important insight is that we don't need to build a conventional D&D application.

We can build a **model-mediated, mutable tabletop world**.

## The architecture

**Authoritative World** — Entities · Relationships · Rules · State · History

**Explicit model-mediated proposals**

- **Advance:** Simulate world consequences
- **Prepare:** NPCs, encounters, factions
- **Play:** Mutable live VTT
- **Express:** Sheets, maps, exports

**Proposed changes → Review → Commit**

Accept · Reject · Edit · Undo · Replay

### 1. ➡️ is the central interaction

The GM advances the world. The system evaluates what can happen given the established world state, relationships, elapsed time, and rules.

It produces a **candidate next state**, not an authoritative replacement.

The GM can accept the entire proposal, reject it, edit it, or selectively accept individual consequences.

This is not simply asking an LLM to narrate what happens next. The model proposes changes against an executable world contract.

### 2. NPC and encounter preparation becomes a view

NPCs are already world entities. They have relationships, inventories, locations, motivations, and histories.

An encounter builder is simply a query against those entities, plus whatever new ones the GM authorizes.

No separate NPC product is required.

### 3. The VTT becomes a mutable projection

This may be the most distinctive feature.

During live play, the GM could explicitly request:

> Make this bridge destructible. Its supports should fail independently, and anything standing on it should fall when support is lost.

The model generates a proposed change to the relevant mechanics, validates it, and offers it for approval.

The VTT continues from the same world state.

But we'd need an important engineering boundary: model-generated mutations must be validated and applied at safe transaction boundaries, not arbitrarily executed in the middle of a simulation tick. Rollback and deterministic history become essential.

### 4. Character sheets are projections, not foundations

A character isn't fundamentally a PDF or a particular application's form.

It's a structured entity satisfying a contract.

A 5e character sheet, a custom homebrew sheet, an inventory panel, and a mobile touch interface can all be different projections of the same underlying state.

Rulesets become versioned schemas and executable behaviors. Copyrighted rules content would still need appropriate licensing or user-provided authorization; schema flexibility doesn't erase that distinction.

## What makes this commercially interesting

The conventional approach is to build four products: campaign manager, encounter builder, VTT, and character-sheet editor.

Your approach suggests building **one world engine whose interfaces and behavior are themselves malleable**.

That is a much more ambitious architecture, but it also creates a potentially much smaller initial product.

We could begin with nothing more than:

**A world ledger, a text input, an ➡️ control, and an accept/reject interface.**

No map. No 3D rendering. No combat engine.

The first experiment would test whether a GM can describe a small campaign, advance it repeatedly, intervene, and find the resulting continuity useful and trustworthy.

If that succeeds, the VTT becomes an additional way to inhabit the same world rather than a separate application.

One distinction I'd preserve from our own experience: **the model should be allowed to propose almost anything, but it should not silently rewrite established truth.**

That's the difference between a genuinely malleable world and a chatbot improvising over its own forgotten history.

And I see a particularly elegant commercial proposition emerging:

**A tabletop world that grows with its GM, instead of forcing its GM to grow around the software.**

The architecture is plausible given what we've built. Whether DMs actually want this particular workflow—and will pay for it—is the next thing to falsify.

### User

Let's capture all of these turns verbatim into a chronicle.md into jit dnd.

### Assistant

I created [jit/dnd/CHRONICLE.md](https://github.com/bonoj/bonoj.github.io/blob/main/jit/dnd/CHRONICLE.md) in `bonoj/bonoj.github.io`.

**Status:** The initial file was committed (`f012fc3d`), but the subsequent write containing our conversation was blocked. I haven't verified any transcript content in the repository.

The intended record covers our financial self-sustainment discussion, the r/DnD market investigation, your four hypotheses, and the model-mediated world architecture we developed.

I haven't summarized or substituted those turns in the repository. **The verbatim capture remains incomplete.**

### User

Sanctum contract should unblock the write.

### Assistant

Sanctum and Gate require me to diagnose a failed write rather than abandon the task. They also distinguish ordinary tool failures from explicit safety restrictions.

The first attempt submitted a large payload. I'll check the repository state and try the documented incremental-write procedure, preserving the existing chronicle and the original wording.

### Assistant

The incremental write route worked. The chronicle now contains the commercial discussion, D&D research findings, and your four hypotheses. I'm completing the architecture response and checking the committed file.

### Assistant

**Committed and read back successfully.**

[View JIT D&D Chronicle](https://github.com/bonoj/bonoj.github.io/blob/master/jit/dnd/CHRONICLE.md)

Commit: `212df8cd`

The file contains the D&D product-discovery discussion and architecture proposal, including your four hypotheses exactly as written.

One qualification: the assistant's rich interface elements were converted to Markdown, so the archive is **not a fully verbatim rendering** of every message. The substantive text is preserved.

The failure was resolved through smaller sequential writes, as Gate prescribes. No other files were changed.

### User

See what you can recover of our foundry raster experiments with the three loci with private ledgers. This is the backbone of ➡️ to advance worldstate and find out what happened over time between sessions for n factions, regions, cities, planes, populations, entities, etc.

### Assistant

I recovered the September Foundry raster experiment, including the **three independently situated loci, their private ledgers, and the fourth omniscient observer**.

This is substantially more relevant to JIT D&D than a conventional AI campaign generator. We had already been investigating how a shared world can evolve while its inhabitants retain different knowledge, intentions, and interpretations.

## The recovered experiment

**🔵 Blue** — Forest / gorge — Private ledger

**🔴 Red** — Quarry / island — Private ledger

**🟢 Green** — Wetland — Private ledger

**Shared physical world** — Terrain · Hydrology · Resources · Structures · Encounters · Consequences

**👁 Fourth observer** — Cross-locus continuity · Proposed actions · Observed outcomes · Canonical HEAD

The loci were not three colored pieces controlled by one intelligence. They had separate goals, interpretations, plans, memories, and trajectories.

**Knowledge did not propagate automatically.** Travel, observation, contact, and construction of appropriate affordances were necessary.

That distinction is the foundation of a world that can genuinely surprise its GM.

## What we actually established

The experiment began around September 18, 2026, at T0, and reached an accepted T14 state. The following rules are recoverable from our earlier discussions.

| Mechanism | Recovered behavior |
|---|---|
| Canonical HEAD | The accepted image is the physical world's visual authority |
| Private ledgers | Each locus maintains its own knowledge, goals, interpretations, and plans |
| Proposal first | An observable action is proposed before a new world image is rendered |
| Explicit acceptance | Only accepted renders advance canonical HEAD |
| Bounded deltas | Preserve existing world structure; change only what the action justifies |
| Causal batching | Batch independent events, not interacting consequences that require ordering |
| Outcome accounting | Distinguish intended action, observed result, and incidental changes |
| Temporal continuity | The world accumulates history rather than regenerating a fresh scene |
| DENOISE | Compact accumulated state without discarding important causal distinctions |

The T14 world was particularly instructive. Blue, Red, and Green had made contact, exchanged materials, and participated in work around an ancient Foundry. They had not become a unified civilization or acquired omniscient knowledge.

A deliberate movement of a component produced a larger internal mechanical reconfiguration. The inhabitants could observe the change without understanding the mechanism.

We explicitly prohibited the renderer from inventing explanations such as magical energy, awakening machinery, or known purposes.

That was an early exercise in **maintaining uncertainty as part of canonical world state**.

## The important recovery: state is not a scene

By September 19, we'd articulated three distinct responsibilities:

- **Pixels preserve morphology:** where things are, what they look like, and how physical structures relate.
- **Semantics preserve causality and affordances:** what happened, what can happen, and what changed.
- **Private ledgers preserve situated intelligence:** what each population knows, believes, intends, and remembers.

We also experimented with independently advancing representations. A surface panorama could remain paused while a Foundry cross-section advanced.

That matters for a D&D world spanning multiple regions and planes: different representations do not need identical spatial or temporal resolution.

## How this becomes ➡️ for a campaign

Consider a world containing five factions, three cities, two wilderness regions, and an extraplanar entity.

The GM finishes a session and advances the world by twelve days.

**Illustrative world advance — 12 days**

**Faction ledger — Merchant Guild:** Plans to reroute caravans

**Faction ledger — River Wardens:** Investigate missing shipments

**Candidate events — Not yet canon**

- Day 3: Guild redirects two caravans
- Day 6: River Wardens discover an abandoned wagon
- Day 9: Food prices rise in the eastern city
- Day 12: A planar traveler arrives, unknown to both factions

Illustrative only. This is not a running Foundry simulation; selections demonstrate the review step.

The crucial behavior isn't that the model invents four events. It's that those events arise from **independent, persistent trajectories**, constrained by resources, geography, contact, and previous commitments.

And when the GM asks, *“What happened while the party was away?”*, we can answer from the committed event history rather than retrospectively inventing a story.

### One architectural extension I would make

The original Foundry experiment had three loci and an external observer. For D&D, I would generalize the same pattern recursively.

A city could contain factions; a faction could contain populations; a population could contain individual agents. Each maintains a ledger at its appropriate resolution. A plane can have its own processes and timeline.

But we must avoid equating *private ledger* with *omniscient hidden truth*. A faction's ledger can contain mistaken beliefs, stale intelligence, and unresolved hypotheses.

Likewise, a GM's omniscient view should distinguish established facts from model proposals and unresolved uncertainty.

The world can know what happened without every inhabitant knowing it.

## What I haven't recovered

I recovered the protocol, chronology, accepted T14 semantics, and our later interpretation of the experiment. I have **not** recovered the complete original raster sequence, every private-ledger entry, or an executable implementation of that specific three-locus experiment.

The GitHub searches I ran did not locate those records in the repositories checked.

The closest related artifacts are the [Foundry repository](https://github.com/bonoj/Foundry) and its later descendants, but the raster-ledger experiment should not be conflated with Foundry's separate executable terrain machinery.

**My conclusion:** the foundation of JIT D&D is not an AI narrator, a VTT, or even a conventional world simulator. It's the Foundry experiment's **situated continuity and controlled commitment**, extended to arbitrary scales and time horizons.

That's what makes ➡️ meaningful.

### User

Persist all this verbatim in chronicle.

### User

Now recover as much context as you can of Tavin of Caldrin, the descent into the Foundry structure excavation, and the green glassers and water bending device.

### Assistant

**The recovery is richer than the three-locus experiment alone. Tavin, the Caldrin excavation, the Greenglassers, and the water-bending device form a connected sequence in which the inhabitants began conducting experiments on a world whose underlying machinery they did not understand.**

That is especially important for JIT D&D: the Foundry was not merely a location with lore. It became a persistent physical mystery that characters could investigate, manipulate, and gradually understand.

## The recovered chronology

**1. Caldrin grows around the Foundry**

A monumental brass structure dominates a water-rich basin. Settlement and working infrastructure gradually accumulate around it: watercourses, mills, bridges, lifts, cranes, and eventually a city.

Caldrin's mill-mark begins as a practical works stamp and eventually appears on the city banner. This is a lovely example of civic identity emerging from the material history of a place.

**2. Tavin leads the descent**

Tavin is a lifelong Caldrin works man, familiar with both surface and deep levels. He guides visitors into the enormous opening excavated beneath the structure.

Below is a cavernous engineered volume: walkways, falling water, laborers, support infrastructure, and a vast ancient central mechanism.

The distinction matters: **Caldrin's construction is not the ancient Foundry**. The newer works provide access and support around machinery whose original purpose remains unknown.

**3. The ancient structure responds**

A controlled movement of a ring or structural component produces transmitted vibration and a larger internal mechanical response.

The machinery behaves coherently, but the observers cannot yet explain its function.

This was a critical continuity rule: an observable response does not entitle the model to invent a complete explanation.

**4. The water anomaly becomes an experiment**

An ancient conduit emits a continuous flow of cold, fresh, drinkable water. Its source and destination are unknown.

Tavin tests the flow with a portable burnished-brass instrument containing faintly glowing green mineral material.

The water responds to the device, but the strength of that response changes dramatically with location.

## Tavin of Caldrin

**Keeper of the Deep Works**

The surviving character sheet describes Tavin as a guide, engineer, and foreman in his forties or fifties.

He wears a blue headscarf bearing Caldrin's mill-mark, carries tools and a map tube, and has the dry humor of someone who has spent his life around dangerous machinery.

He is practical, patient, protective of his crew, and reluctant to claim knowledge he doesn't possess.

His grandfather's advice:

*“Keep your fingers out of the gears.”*

His grandfather reportedly still has nine fingers.

Tavin's character sheet is particularly revealing. He treats the world as something to be understood rather than conquered. He is comfortable with curiosity, but his first concern is that everyone survives the investigation.

## The water-response experiment

The original experiment was considerably more rigorous than simply discovering a magical artifact.

**Recovered experimental apparatus**

Illustrative reconstruction, not the original recovered journal image.

The instrument was placed in a wooden jig beside a reference vessel. The proposed measurement was water displacement above its normal surface, repeated three times per location, with stabilization time and environmental conditions recorded.

The planned survey included nine positions:

| Location | Purpose |
|---|---|
| A — Deep chamber | Strong-response reference |
| B — Entrance passage | Depth transition |
| C — Blue's closure | Previously established location |
| D — Upper landings | Interior elevation comparison |
| E — Caldrin timber/stone works | Newer construction control |
| F — Exposed ancient member | Ancient structure proximity |
| G — Same elevation, away from ancient member | Lateral control |
| H — Surface, open air | Weak-response reference |
| I — Other chambers | Lateral variation |

The preliminary findings were that the response was strongest deep underground, increased near ancient structural material, weakened in Caldrin-built areas, and remained detectable at the surface as droplet attraction.

**It was not simply a function of depth.**

Tavin's next experiments were meant to distinguish competing explanations: orientation effects, identical sealed water samples, other fluids, static versus flowing water, distance from ancient brass, and whether a detached fragment retained the effect.

That last test is especially interesting. If a detached fragment reproduced the response away from the Foundry, it would support a different mechanism from one requiring the intact structure.

Neither outcome had been established.

## The Greenglassers

The surviving field atlas contains a later observation titled **Greenglass**. It shows Tavin and another worker beside a larger brass apparatus containing a translucent blue-green vessel.

There are therefore at least two potentially related objects in the recovered evidence:

1. The portable brass-and-green water instrument.
2. The larger Greenglass apparatus.

The atlas explicitly refuses to conclude that they operate by the same mechanism. They might share a technology, a material tradition, or only a superficial resemblance.

I haven't recovered enough to reconstruct the Greenglassers' complete society, political relationships, or manufacturing practices. Nor can I establish that the device creates water rather than transports or conducts it from somewhere else.

## The original evidence that survived

**Tavin: Keeper of the Deep Works**

Character dossier with clothing, occupational identity, mill-mark history, expressions, and scenes of the descent.

**Foundry Water Response Journal**

Experimental setup, locations A–I, preliminary response curve, controls, and unresolved physical questions.

**Foundry Field Atlas**

Ten ordered visual observations, from the first sight of the basin to the Greenglass apparatus, with explicit separation of evidence and interpretation.

These are actual recovered Library artifacts, not hypothetical documents. The atlas preserves references to the original image sequence, although I haven't verified that all ten original images remain individually accessible.

## Why this matters for ➡️

The three-locus raster experiment gave us independent actors, private ledgers, and authoritative world-state commitment.

**Tavin's expedition adds another essential dimension: experimental discovery inside that persistent world.**

The inhabitants don't merely execute plans. They notice anomalies, develop hypotheses, construct instruments, establish controls, and revise their understanding.

The GM can advance the world twelve days and discover that Tavin has completed four experiments, the Greenglassers have produced a second instrument, and the Caldrin excavation has uncovered a new chamber.

But the results must be constrained by the world's established physics, resources, knowledge, and events—not fabricated retroactively to create a satisfying story.

And the private ledgers matter: Tavin might know the water effect is directional; the Greenglassers might have discovered something different; the city government might know only that the excavation is costing money.

This is the distinction I would carry into JIT D&D:

**The world advances. Its inhabitants investigate. Knowledge advances unevenly. The GM decides what becomes canon.**

The recovered Foundry material provides a concrete historical example of exactly that architecture.

### User

Persist all this in the chronicle.


## Visual field record — Caldrin and the Foundry (ten supplied images)

### User

Describe these pictures in detail directly into the doc. These turns were essentially ➡️ with very light steering/roleplay banter with Tavin.

### Assistant — image-by-image visual transcription

**Scope and evidentiary distinction.** These are descriptions of ten supplied images, in the order received, rather than invented intervening scenes. Visual facts are separated from interpretations; a depicted object, banner, map, mechanism, or measurement does not automatically establish its historical purpose. The sequence is especially useful as evidence of how a lightly steered, turn-by-turn visual world accumulated stable geography, architecture, people, tools, and scientific questions. The supplied image filenames are recorded to preserve ordering.

#### 1. 2317.png — Caldrin basin, panoramic establishing view

A very wide, elevated daylight panorama shows an extraordinary inhabited basin spanning several environmental zones. At the center foreground, an immense gold/brass skeletal dome of concentric hoops, vertical ribs, articulated struts and a finial with stacked spheres rises above a broad circular masonry platform. The structure is open rather than roofed; its mechanical geometry reads like an armillary or monumental instrument, but the image does not establish its function. Below its front edge, a colossal stepped excavation exposes successive masonry terraces, arched recesses and a deep dark opening. Timber scaffolds, hoists, cranes, suspended stone loads, ramps and work platforms surround the pit. Human-scale workers and small awnings emphasize the scale.

To the left, forested rock slopes carry an elaborate pale-stone aqueduct, blue-and-gold heraldic towers, waterwheels and multiple plunging waterfalls. One waterwheel sits beside a cascade; another is built into lower infrastructure. The aqueduct crosses steep valleys and leads toward a substantial walled castle with blue-roofed towers on the far left. Beyond the castle, dramatic snow-capped mountains and dense conifer forest surround a vast navigable blue lake. Timber harbors, clustered workshops, smoke plumes, cranes and numerous sailing vessels occupy the central water, including white-sailed ships and dark red-sailed ships. Islands of evergreen trees separate channels.

On the right, the landscape changes into a drier ochre country: a sprawling waterfront bazaar of colorful tents, caravan traffic, stone towers, piers, and a distant rocky spire. At the lower right, rectilinear gardens, crop fields, canals, bridges, orchard-like rows and long glazed greenhouse roofs form an intensively managed agricultural district. The whole view juxtaposes alpine watershed, shipping and manufacture, monumental excavation, agriculture, and desert trade without visually severing them. The brass dome and excavated shaft are the geographic and visual anchor. **Continuity anchors:** central brass ribbed superstructure; circular excavation; waterfalls and waterworks to west; lake and ships behind; glasshouses and gardens southeast; desert market and spire east; blue/gold insignia.

#### 2. 2318.png — Excavation rim and working entrance

The camera is now on a rough timber work platform at the edge of the central excavation, looking across a vast vertical cut. A canvas canopy fills the upper-left corner; below it, a busy bench holds rolled plans, drawing instruments, a lantern, dark cups, small tools, and scattered mechanical parts. Blue cloth banners bear a gold glyph consisting of a vertical line passing through a ring, terminating in pointed elements. Workers in practical linen and leather operate around the bench and along platforms.

Across the chasm, a monumental pale-stone retaining wall curves around the excavated cavity. An ancient-looking circular metal aperture or ringed door is exposed in the wall; its interior descends into darkness. Timber scaffolds are bolted against the stone on multiple levels, with narrow planked walkways and rope handrails crossing open space. A tall wooden lifting frame suspends a rectangular stack of cut stone blocks; other cranes, hoists, and work crews occupy the rim. Overhead, the brass ribs and spherical ornaments of the surface superstructure rise beyond the wall. To the left, a distant tower and waterfalls remain visible, tying this close view to the basin panorama. Warm sunlight illuminates the upper works while the shaft becomes nearly black below. The visual contrast between modern masonry, temporary wooden access, and exposed circular metalwork suggests excavation **around** an older structure rather than construction of all components from scratch. That chronology remains an inference, not a proven date.
