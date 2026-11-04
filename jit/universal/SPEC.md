# UNIVERSAL — SYSTEM SPEC v1.0

**Every story. The same story.**

Status: **target architecture**, not a declaration of implemented features. The current implementation and verification gaps are recorded in [README.md](README.md) and [CHRONICLE.md](CHRONICLE.md). Delivery discipline lives in [EXECUTION.md](EXECUTION.md).

## 1. Product and creative thesis

UNIVERSAL is a fictional, extravagantly self-serious film studio producing a seemingly inexhaustible catalog of conventionally competent screenplays. The satire is institutional and deadpan: the studio regards originality as an undesirable production variance. The engineering goal is real, however: **a deterministic, offline, browser-based narrative compiler capable of generating many causally coherent, substantially different screenplays across genres**.

The audience chooses **Genre** and presses **Next Picture**. Previous, permalink, and Fountain export are available. The public interface does not expose the primitive graph, seeds, quality controls, or engineering vocabulary. All twelve existing genres remain selectable, even while their outputs are explicitly development fixtures.

**The central principle: genre does not own the story.** A mug may drop in any genre. “You knew?” can be said in any genre. Genre provides context, affordances, stakes, institutions, atmosphere, and rendering conventions. Physical actions, social maneuvers, plot devices, world events, and dialogue intentions are shared.

## 2. What counts as a film

A *candidate* is any seeded combination of primitives. A *valid event graph* has satisfiable preconditions, concrete state transitions, provenance, continuity, and consequential dependencies. An *accepted story* additionally has intelligible motivation, conflict, escalation, setup/payoff, and a complete dramatic arc. A *screenplay* is an accepted story realized into scenes, action, character cues, and dialogue. A *feature-length screenplay* must meet tested length and quality gates; a 15-scene fixture does not qualify.

Never substitute one count for another:
- catalog entries ≠ executable behaviors;
- raw combinations ≠ valid graphs;
- byte-distinct outputs ≠ semantically distinct stories;
- fifteen canonical dramatic functions ≠ fifteen scenes;
- abstract scalar ledgers ≠ object-level causality;
- plausible screenplay formatting ≠ a readable film.

## 3. Universal ontology

All story state is typed and event-sourced. Entity types:

| Type | Minimum semantics |
| --- | --- |
| Agent | identity, capabilities, goals, beliefs, fears, commitments, location, availability |
| Object | identity, type, physical properties, condition, owner/custodian, location, provenance |
| Place | identity, containment, adjacency, access, occupancy, hazards |
| Fact | proposition, truth status, source, evidence, agents who know/believe/doubt it |
| Relationship | participants, trust, dependency, allegiance, conflict, obligations |
| Institution | members, authority, rules, jurisdiction, resources |
| Resource | kind, quantity, scarcity, custody, transfer and consumption |
| Time | ordering, duration, deadlines, travel constraints |
| Event | actors, targets, witnesses, preconditions, effects, observability, timestamp |
| Thread | setup, dramatic question, causal dependencies, payoff or explicit abandonment |

Every event has stable identity and a replayable transition. Knowledge is agent-specific; an event being true does not mean every character knows it. Witnessing, interpreting, communicating, and believing are separate operations. Ownership, possession, location, access, and physical condition must not be conflated.

A dropped mug is an **object event**. It may break, spill, make noise, attract attention, expose trembling, or do nothing narratively significant. Those consequences depend on state and context. No primitive should magically imply all possible effects.

## 4. Primitive vocabulary and contracts

The initial breadth catalog contains **555 candidate labels**: 130 physical actions, 75 social actions, 117 plot devices, 134 dialogue moves, and 99 world events. These counts describe the current vocabulary, **not** implemented concrete semantics. Grow the catalog across every family without narrowing into genre-specific template writing.

Each executable primitive contract must define:

```text
id, version, category
typed roles and parameter slots
preconditions and capability requirements
direct state effects
optional conditional/observed effects
witness and knowledge propagation rules
causal dependencies and obligations created
possible payoff / reversal / repair operations
genre-neutral realization intent
validation and deterministic replay tests
```

A generic contract is allowed when it is semantically honest. Specialized behavior must be implemented when needed. Avoid fake completeness from attaching the same generic scalar effect to hundreds of unrelated words.

### Composition, not enumeration

An event combines actors, objects, locations, intentions, conditions, and consequences. Reuse a small number of well-defined transition operators with a large vocabulary of typed roles and affordances. Permit one event to create multiple possible future actions; require any chosen successor to satisfy its prerequisites.

Example:

```text
DROP(agent, mug, place)
  requires: agent holds mug; agent present in place
  effects: mug no longer held; mug at place; noise may occur
  conditional: mug breaks if fragile + impact sufficient
  witnesses: agents within perceptual range
  possible branches:
    witness suspects nervousness
    liquid destroys nearby document
    noise interrupts confession
    mug is retrieved without consequence
```

No branch is compulsory. No branch exists merely to decorate the screenplay. Dialogue intentions are likewise universal: *ask*, *deny*, *bargain*, *deflect*, *confess*, *reassure*. Utterances depend on speaker beliefs, objectives, relationships, and the immediate event—not on a fixed genre line library.

## 5. Narrative planning

The compiler plans **causal graphs**, not random strings of fifteen beats.

1. Establish world, cast, capabilities, tensions, goals, secrets, and available resources.
2. Select compatible conflict mechanisms and desired terminal conditions.
3. Construct a dependency graph of events with concrete preconditions and effects.
4. Expand viable alternatives, setbacks, information asymmetries, reversals, and competing goals.
5. Validate every transition by replay; reject or repair at the graph level.
6. Enforce setup/payoff, escalation, changing choices, and consequential character agency.
7. Organize the graph into dramatic movements and scenes; multiple scenes may realize one movement.
8. Render action and dialogue from state, not the other way around.
9. Evaluate continuity, structural diversity, repetition, readability, and length.
10. Accept or reject the film deterministically, with bounded retries and explicit rejection reasons.

The existing fifteen dramatic functions may remain a **diagnostic lens or optional planning scaffold**. They must not be mandatory fixed event slots or impose one universal plot order. Stories can branch, converge, contain parallel threads, and have variable scene counts. The engine should discover varied causal architectures while retaining recognizable beginning, development, and consequence.

## 6. Genre adapters

Genres provide contextual capabilities, not separate plot engines. Current public set:

**Romance, Romantic Comedy, Horror, Thriller, Science Fiction, Western, Mystery, Action, Drama, Comedy, Fantasy, Crime.**

Adapters define believable environments, institutions, technologies, physical constraints, hazards, stakes, occupations, conventions, dialogue register, and cinematic expression. They bind universal actions to concrete objects and circumstances. Genre may reject an implausible realization, but must not prohibit an otherwise ordinary action such as dropping a mug.

The same abstract causal graph should be testable under distant genre adapters where capabilities permit. If adaptation requires a bridge event, the bridge must be explicit, replayable, and consequential. Noun substitution alone is not adaptation.

## 7. Screenplay realization

The source of truth is the validated event graph and its state snapshots. A scene is a purposeful interval with participants, location, time, dramatic objective, conflict, state delta, and links to preceding/following scenes.

Realization must:
- express physical events as observable action;
- distinguish what the audience sees from what characters know;
- derive dialogue tactics from goals, beliefs, and immediate stakes;
- support silence, interruption, misinterpretation, and changing tactics;
- maintain spatial, temporal, object, and information continuity;
- vary scene rhythm, cast configurations, and physical business;
- avoid repetition and unearned exposition;
- export a structured screenplay AST to Fountain and an accessible browser reader.

**Length is downstream of causality.** A feature target of approximately 55–85 purposeful scenes is provisional, not a quota to fill with connective padding. The generated pages and runtime must be measured rather than invented.

## 8. Diversity and acceptance

First corpus milestone: **at least 1,000 accepted, causally valid candidate event graphs per genre**, across the twelve genres. This is a target, not current status, and does not imply 12,000 good feature films.

Measure separately:
- candidate count, valid count, acceptance rate, and rejection reasons;
- graph topology and dependency diversity;
- event and device coverage;
- different goals, conflicts, resolutions, and relationship arcs;
- causal novelty versus cosmetic changes;
- template repetition and dialogue overlap;
- obligations opened/closed, unresolved threads, and continuity failures;
- realized screenplay length, readability, and human review outcomes.

Use structural fingerprints that discount names, locations, and superficial wording. Test with diverse seeds and adversarial combinations. A thousand different IDs do not satisfy the milestone. Sample and **read complete scripts**, including distant-genre variants of comparable causal graphs.

## 9. Determinism, runtime, and interfaces

- Static GitHub Pages-compatible ES modules; no runtime model, backend, account, or generation network dependency.
- Stable versioned seed identity, isolated random streams, deterministic bounded search and replay.
- Explicit compatibility/migration rules when primitive semantics change.
- Browser history, genre selector, Next/Previous, permalink, downloadable Fountain, responsive accessible reader, print support.
- Separate internal diagnostics and corpus tooling from the public studio experience.
- No claims of quality, feature length, or corpus acceptance until demonstrated by executed tests and sampled outputs.

## 10. Delivery roadmap

**A. Ontology + concrete operators:** introduce entity identity, physical custody, agent-specific knowledge, perception, access, time, and replay. Implement reusable transition operators that support many primitive labels.

**B. Broad contract coverage:** map the 555 entries to typed operator families, prerequisites, conditional effects, and failure modes. Track coverage as *catalogued*, *typed*, *executable*, *tested*, and *realized* separately.

**C. Causal graph composer:** replace independent random slot selection with constrained event graph search, explicit dependencies, character decisions, rejection/repair, and structural fingerprints. Preserve breadth across all twelve genres.

**D. Corpus gate:** generate and validate at least 1,000 meaningfully different accepted event graphs per genre. Publish actual acceptance rates and collision metrics.

**E. State-driven screenplay compiler:** realize selected graphs into scenes, dialogue, action, and Fountain; verify across genres. Then expand toward feature length without padding.

**F. Studio presentation:** improve catalog, comparison, fictional quality-assurance artifacts, and reader polish only after actual generated films justify them.

These are **overlapping engineering workstreams**, not permission to spend one tiny commit per turn. Deliver integrated capabilities and verify exact shipped bytes. Prioritize causal breadth and working composition over isolated polish.

## 11. Current implementation boundary (2026-11-04)

Existing: twelve selectable genres, 25 authored premise families, fifteen-scene fixtures, seeded generation, a small reader-visible recombinator, a 555-label breadth catalog, abstract contracts, and five-scalar-channel composition diagnostics. These are useful prototypes but **not** a concrete ontology-driven story compiler. The abstract 75-candidate plans do not drive the screenplay. Current generic additions can introduce props without establishment or payoff. The complete remote test suite and live deployment have not been independently verified.

The next integrated milestone is **concrete event identity + reusable transition operators + causal dependency validation + cross-genre examples**, accompanied by executed tests and reader-visible evidence. Do not inflate the screenplay or polish the UI before the underlying event graph can explain why things happen.

## 12. Studio tone

Public brand: **UNIVERSAL**. Tagline: **Every story. The same story.** The institution is confident, bureaucratic, lavish, and entirely unaware that its artistic conformity is the joke. Keep technical limitations honest in engineering documentation; keep the fictional studio's satire in its own voice.

---
This v1.0 replaces the accumulated v0.2/v0.3 implementation blueprint, contradictory milestone language, genre-by-genre implementation sequence, and the old assumption that fifteen dramatic functions define fifteen generated scenes.
