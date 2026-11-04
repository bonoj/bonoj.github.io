# PERFECTLY AVERAGE PICTURES — SYSTEM SPEC v0.1

Status: design contract, not an implementation claim.
Proposed home: `jit/average/`.
Tagline: **Every movie you've ever seen. Every movie you'll ever see.**

## 1. Product

A fictional film studio that produces an unlimited catalog of superficially unique, professionally formatted, intentionally unremarkable screenplays. The institution never acknowledges its own absurdity on the public site. Its Quality Assurance Division regards originality as a defect.

The user can generate a film from a reproducible seed, mix dramatic structures and genre treatments, read a complete script, compare two films at the narrative-function level, and inspect studio production artifacts.

### Non-negotiable invariants

1. **Full screenplay**: scene headings, action, character cues, dialogue, parentheticals when warranted, transitions where warranted, beginning, middle, and end. No synopsis masquerading as a screenplay.
2. **Causal continuity**: revelations have established sources; objects and information have provenance; relationships and character knowledge evolve consistently.
3. **Role consistency**: characters maintain stable identities and roles unless a change is explicitly dramatized.
4. **Structural interchangeability**: every movie maps onto the same canonical dramatic function graph, regardless of genre.
5. **Surface distinctiveness**: titles, setting, dialogue, props, occupation, relationships, and scene realizations vary meaningfully across seeds.
6. **Average quality**: competent setup/payoff, familiar beats, modest stakes, conventional closure. No deliberate incoherence or overt joke writing.
7. **Reproducibility**: same engine version + seed + configuration yields identical screenplay and artifacts.
8. **Local operation**: no runtime model, backend, login, or network request required for generation; GitHub Pages compatible.
9. **Transparent evaluation**: distinguish measured structural properties from fictional studio claims. Never claim that machine validation proves subjective quality.
10. **Readable and accessible**: responsive screenplay reader, keyboard controls, exportable plain text, print stylesheet.

## 2. Canonical narrative representation

Separate *what changes* from *how it appears on screen*.

A film is a directed graph of **dramatic functions** with state preconditions and postconditions. Each function contains:
- stable `beatId` and `functionId`
- required participant roles
- preconditions on world state
- state delta (knowledge, trust, obligations, possession, access, risk)
- narrative obligations created and discharged
- admissible scene families
- setup/payoff dependencies
- pacing position and optional duration envelope

Minimum canonical arc:

1. Status quo and protagonist's ordinary competence.
2. Inciting disruption.
3. Reluctant commitment.
4. First attempt and partial success.
5. New relationship or alliance.
6. Early warning / suppressed information.
7. Midpoint reversal.
8. Fallout and damaged trust.
9. Discovery of withheld evidence.
10. Failed plan / apparent defeat.
11. Reinterpretation of original desire.
12. Final plan and costly choice.
13. Confrontation.
14. Consequence and relationship resolution.
15. Familiar closing image.

The arc is **not** fifteen scenes. Each function can be realized as multiple scenes and transitions; a complete feature target should contain approximately 55–85 scenes, with configurable screenplay length and deliberate pacing. This is a target, not a promise of real industry-standard page count.

## 3. World state

Explicit typed state, not arbitrary free text:

- `Character`: id, role, identity, public goal, private goal, fear, misconception, voice profile, current location, alive/present status.
- `Relationship`: pair, trust, alliance, obligation, disclosed facts, active conflict.
- `Fact`: id, truth value, who knows, who suspects, when introduced, when revealed.
- `Object`: id, type, owner, location, information carried, creation and transfer events.
- `Commitment`: id, maker, recipient, terms, status.
- `PlotThread`: setup beat, promised payoff, discharge beat, status.
- `Location`: id, spatial identity, accessibility, genre treatment.
- `Scene`: ordered events, entry/exit state, time continuity, location, participants.

Every scene is a transaction against this state. Validation rejects a scene if a character uses unknown information, an object teleports, a commitment resolves before it exists, or a necessary participant is unavailable.

## 4. Genre and tone adapters

Genre is not the story graph. It is a rendering adapter over dramatic functions and state.

Adapters define:
- location archetypes and scene-heading vocabulary
- occupations and authority structures
- credible stakes and forms of loss
- genre-appropriate evidence, communication, transport, and obstacles
- action grammar, dialogue register, pacing, visual motifs
- resolution conventions

Initial adapters: romantic comedy, political thriller, supernatural horror, space opera, Western. Additional adapters should be data-driven.

**Cross-genre recombination**: configure independent axes for setting, conflict, character relationships, pacing, visual direction, dialogue register, and ending flavor. An adapter must satisfy a semantic capability contract (e.g. `conveySecret`, `isolateProtagonist`, `forceDecision`, `stageConfrontation`) rather than replace nouns in prewritten dialogue.

When a combination is incoherent, the engine must adapt it through an explicit bridge realization or reject it and choose another compatible one; never silently produce a broken scene.

## 5. Generation pipeline

1. Normalize input config and seed.
2. Instantiate canonical function graph and choose compatible optional branches.
3. Cast character roles and generate distinct identity/voice profiles.
4. Establish initial facts, secrets, relationships, locations, objects and obligations.
5. Plan all scene transactions and setup/payoff arcs.
6. Resolve genre capabilities and assign concrete scene realizations.
7. Generate action, dialogue, transitions, recurring motifs and connective scenes.
8. Run structural, continuity, repetition and formatting validators.
9. If invalid, repair at the planning/realization layer using deterministic bounded retries.
10. Apply the **Originality Suppression** pass: detect unusual structural deviations or unsupported tonal novelty and replace with conventional equivalents *without changing causal truth*.
11. Render screenplay and associated studio artifacts.
12. Persist/share config as URL parameters or encoded reproducible identifier.

No runtime LLM required. A future optional model-assisted authoring pipeline may produce additional reviewed templates, but the browser generator remains deterministic.

## 6. Recombination and uniqueness

Use seeded independent PRNG streams for story structure, casting, world, scene realization, dialogue, and visual packaging, so changing one axis does not scramble unrelated choices.

Define canonical equivalence: two movies are structurally equivalent when their ordered dramatic functions and state-change types match, even if their realizations differ.

Distinctness requires more than unique titles. Track n-gram overlap, repeated scene templates, dialogue signatures, and realization coverage. A seed should produce a consistent film; different seeds should ordinarily differ across multiple axes. Collision detection should be measured over a generated test corpus.

## 7. Full-length screenplay architecture

Avoid a single giant template. Compose:
- function-driven **core scenes** with explicit state changes;
- **connective scenes** that carry location, relationship, or information transitions;
- **character scenes** that reinforce goals and misconceptions;
- **echo scenes** that establish motifs and payoffs;
- **breathing-room scenes** that preserve conventional pacing.

Every scene must have a reason to exist in the graph, even if its cinematic effect is deliberately banal.

Target coherent first, long second. A 12–20 scene complete short-feature prototype is acceptable as an engine milestone, **not** as the finished full-screenplay promise. Only claim feature-length output once generated samples are actually reviewed and pass length/continuity tests.

## 8. Screenplay formatting

Use a structured screenplay AST, not strings assembled directly into HTML:
- slugline (INT./EXT., location, time)
- action block
- character cue
- dialogue
- parenthetical
- transition
- optional scene number and page metadata

Render HTML screenplay view, print CSS, and downloadable Fountain/plain-text. Page count is an estimate unless actual pagination is implemented and tested. No fabricated “112 pages” labels.

## 9. Studio experience

Public-facing brand: **PERFECTLY AVERAGE PICTURES**.

Primary experiences:
- **Greenlight a Picture**: select seed and independently mix setting, genre, pacing, dialogue and ending; produce a film.
- **Screenplay Reader**: full script with chapter/act navigation, typography, printable/exportable version.
- **Compare Pictures**: two films side by side, aligned by dramatic function, showing different scene realizations and identical state transitions.
- **Studio Catalog**: seeded reproducible films, posters/titles/loglines, fictional production notes and middling reviews.
- **Quality Assurance**: formal fictional reports about narrative conformity and originality containment.

The site should look like a high-end, self-important film studio, not a code playground. Its satire lives in the system's behavior and corporate copy.

## 10. Validation and acceptance gates

### Engine gates
- Same seed/config/version produces byte-identical script.
- Different genre treatments preserve canonical function graph.
- No invalid knowledge, object custody, character presence, unresolved critical obligations, or out-of-order revelation.
- Every required setup has an observable payoff.
- Every screenplay has complete beginning, middle, and ending.
- Every rendered dialogue block has a valid speaker; no orphan cues.
- Every script exports and reimports to a semantically equivalent structured form.
- A corpus test checks diversity and repeated template concentration.

### Human review gates
- Read multiple complete scripts, not just selected excerpts.
- Review two structurally equivalent films from distant genres.
- Check for obvious noun-swapping, repetitious dialogue, tonal accidents, and scenes with no causal purpose.
- Check actual screenplay length, mobile reading, and print layout.
- Keep the studio's fictional ratings clearly fictional in code and README.

### Release gates
- Do not publish a beautiful shell as a complete generator.
- Ship an honest vertical slice only after the engine demonstrates causal coherence.
- Document known limits, seed format, and reproducible test cases in README.
- Update chronicle after each meaningful implementation pass.

## 11. Implementation sequence

**Pass A — Contract and fixtures:** typed schema, canonical graph, two genre adapters, seeded generator, sample fixture, validator, unit tests.

**Pass B — Coherent film:** scene transactions, setup/payoff, cast and location continuity, screenplay AST, first complete 12–20-scene demonstration.

**Pass C — Breadth:** five genres, cross-axis recombination, dialogue variation, corpus tests, repair and originality normalization.

**Pass D — Length:** extend to feature-scale with connective scenes and pacing, review multiple entire scripts, tighten repetition controls.

**Pass E — Studio:** full website, reader, comparison view, catalog, fictional QA, export, visual identity and deployment.

## 12. Open questions to resolve by experiments

- How much semantic variation can a finite browser template grammar support before becoming visibly repetitive?
- Can scene transactions remain valid when independent genre axes are mixed?
- What is the smallest realization library that produces convincing screenplay-scale diversity?
- How should a conventionality heuristic be operationalized without falsely claiming objective measures of mediocrity?
- Which scene families require bespoke writing versus general compositional grammar?

The system should answer these with generated fixtures and tests, not rhetoric.
