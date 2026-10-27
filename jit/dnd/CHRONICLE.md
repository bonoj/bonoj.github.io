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
