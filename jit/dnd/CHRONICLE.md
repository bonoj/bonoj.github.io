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
