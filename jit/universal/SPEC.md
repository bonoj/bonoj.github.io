# UNIVERSAL — SYSTEM SPEC v0.3

Status: design contract and execution gates; implementation status is recorded separately in README and CHRONICLE.
Home: `jit/universal/`.
Tagline: **Every story. The same story.**

## Execution correction — 2026-11-04

The previous implementation process over-optimized isolated modules and commits, while the reader remained a fifteen-scene fixture. **Do not equate architectural additions with screenplay capability.** The unit of delivery is a verified, integrated reader-visible improvement. Follow [EXECUTION.md](EXECUTION.md).

All twelve genres must be selectable in the preview immediately, even if immature. Label unproven adapters as fixtures; never advertise them as feature-length films or a thousand distinct plots. The public interface remains genre selection and Next Picture, with Previous and export. The fifteen-function graph is a dramatic skeleton, **not fifteen scenes**. Develop character simulation, genre-specific causal conflicts, scene realization, dialogue, and corpus evaluation together. Avoid superficial seed variety and byte-uniqueness as proxies for creative diversity.

**Current milestone:** a selectable twelve-genre prototype. Thriller has three authored architectures; eleven other genres each have one short scenario. This is a coverage milestone, not a claim of universality or semantic diversity. The next acceptance gate is multiple distinct causal plot families per genre with meaningful scene-level consequences and substantially expanded scripts.

## 1. Product

A fictional film studio that produces an unlimited catalog of superficially unique, professionally formatted, intentionally unremarkable screenplays. The institution never acknowledges its own absurdity on the public site. Its Quality Assurance Division regards originality as a defect.

The user can generate a film from a reproducible seed, choose a genre and repeatedly generate new films, read a complete script, compare two films at the narrative-function level, and inspect studio production artifacts.

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

Initial proof adapters: romantic comedy and thriller. The target public genre set and launch gates are specified in §18. Additional adapters must implement the same capability contract.

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

Public-facing brand: **UNIVERSAL**.

Primary experiences:
- **Greenlight a Picture**: select only a genre and press Next Picture for another accepted film; produce a film.
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

**Pass C — Breadth:** target genres, cross-axis recombination, dialogue variation, corpus tests, repair and originality normalization.

**Pass D — Length:** extend to feature-scale with connective scenes and pacing, review multiple entire scripts, tighten repetition controls.

**Pass E — Studio:** full website, reader, comparison view, catalog, fictional QA, export, visual identity and deployment.

## 12. Open questions to resolve by experiments

- How much semantic variation can a finite browser template grammar support before becoming visibly repetitive?
- Can scene transactions remain valid when independent genre axes are mixed?
- What is the smallest realization library that produces convincing screenplay-scale diversity?
- How should a conventionality heuristic be operationalized without falsely claiming objective measures of mediocrity?
- Which scene families require bespoke writing versus general compositional grammar?

The system should answer these with generated fixtures and tests, not rhetoric.


---

# IMPLEMENTATION BLUEPRINT v0.2 — THE UNIVERSAL SCREENPLAY FACTORY

This section supersedes the earlier multi-axis public configuration proposal. It is an implementation plan, not evidence that the generator has been built. The objective is **thousands of independently readable, coherent screenplays in every supported genre**, not thousands of title variants or fifteen-beat outlines.

## 13. The audience contract: one selector, infinite Next

The public interface has exactly one primary creative control: **Genre**. Default to a genre chosen by the studio. The prominent **Next Picture** action generates another movie in the currently selected genre. Genre changes generate a new movie in the selected genre. The user never needs to configure a seed, character, setting, tone, length, trope, ending, or randomization axis.

A film's identity is `engineVersion + genreId + ordinal/seed`. The UI maintains a per-genre cursor so Next advances to a genuinely new candidate without disturbing other genres. Previous/Next, browser history, and a copyable permalink permit returning to a film. A seed may be exposed in a quiet technical details area for reproducibility, never as a required input. On reload, the permalink restores exactly the same film. **Next** means next *accepted* distinct film, not next raw random seed.

A user should be able to: choose Horror; read a full screenplay; press Next repeatedly; encounter distinct horror films with familiar dramatic competence; switch to Western; switch back to Horror and recover their prior place. Reading and navigation must remain responsive on mobile. Generation can happen ahead of time in a Web Worker; never block scrolling or render a blank screen while composing a film.

Genre names are plain-language labels. The initial complete set is Romance / Romantic Comedy, Horror, Thriller, Science Fiction, Western, Mystery, Action, Drama, Comedy, Fantasy, and Crime. Each is an independently testable contract, not a skin. Additional genres are registered through the same capability interface. Genres with insufficient tested realization coverage are not exposed as working choices.

## 14. Scale model: finite grammar, combinatorial space, bounded quality

The factory is an **offline, deterministic narrative compiler**, not a runtime language model and not a paragraph-shuffler. Thousands of viable outputs require a deep, authored vocabulary of compatible semantic units and a planner that can assemble them. A large mathematical combination count is not proof of a large *usable* catalog.

Every accepted movie combines independently seeded choices across: narrative variant; protagonist flaw and need; goal; antagonist/opposing force; relationship topology; secret and its custodian; setting ecology; institutions; evidence chain; obstacle ladder; resource limitations; motif; scene realization families; dialogue tactics; and closure. Genre constrains every choice. The common dramatic function graph is stable, but concrete causal mechanisms and scene count vary.

Use an **acceptance budget**: produce candidates, validate them, compute similarity against nearby catalog entries, and accept only those passing gates. If generation exhausts a bounded attempt budget, surface a truthful generation failure and preserve the current film; do not claim infinite validated output. Maintain a monotonic ordinal so the same Next sequence is reproducible across sessions and versions.

Target corpus: at least **1,000 accepted scripts per launch genre**, plus a cross-genre corpus of at least 10,000 films, subject to the actual browser time and memory budget. These are acceptance targets, not preexisting results. Measure collision, distinctness, completeness, and generation time. A single generated script must be a genuine full screenplay; a generated title plus a few scenes does not count.

## 15. Compiler layers and module boundaries

Keep source in `jit/universal/`, with pure modules independently executable in Node tests and browser workers. Proposed modules:

- `src/core/prng.js`: versioned, platform-stable integer PRNG, hash-derived independent streams, unbiased bounded selection.
- `src/core/schema.js`: serializable typed records, runtime schema assertions, schema migrations.
- `src/story/functions.js`: immutable universal dramatic function vocabulary and mandatory causal edges.
- `src/story/variants.js`: alternate compatible subgraphs and optional scene expansions.
- `src/story/planner.js`: goal-directed constraint planner, obligation scheduling, dependency graph.
- `src/story/state.js`: immutable world-state snapshots and event transactions.
- `src/story/casting.js`: character biographies, conflicting wants, role allocation, voice constraints.
- `src/story/continuity.js`: temporal, spatial, informational, relationship, possession, and promise validation.
- `src/genre/registry.js`: genre registration, capability negotiation, compatibility filtering.
- `src/genre/<id>/...`: genre-specific world ontology, obstacles, evidence, locations, scene realizations, endings, dialogue register.
- `src/language/realize.js`: scene beat to screenplay AST, with coherent dialogue and action.
- `src/language/grammar.js`: syntax, variation, pronouns, tense, agreement, discourse referents, lexical avoidance.
- `src/quality/evaluate.js`: measurable structural, continuity, repetition, and conventionality checks.
- `src/quality/repair.js`: deterministic planning-level repair with bounded backtracking.
- `src/catalog/identity.js`: film IDs, per-genre ordinals, share URLs, versioning.
- `src/catalog/diversity.js`: fingerprints, locality-sensitive similarity, corpus metrics.
- `src/render/fountain.js`, `html.js`, `print.css`: AST renderers.
- `src/worker.js`: asynchronous generation and cancellation.
- `src/ui/...`: genre picker, Next/Previous, film header, screenplay reader, quiet studio archive.
- `test/...`, `fixtures/...`, `CHRONICLE.md`: reproducible tests, golden scripts, progress and limitations.

Do not force these exact file names if a simpler tested layout is clearer. Preserve **separation of planner, genre semantics, language realization, and UI**. No screenplay continuity logic belongs in a click handler or renderer.

## 16. Story planning: events first, prose last

A film is planned in three passes before any dialogue is written.

**Macroplan:** instantiate the canonical function graph and choose one of several legal plot architectures (investigation, rescue, pursuit, reconciliation, containment, succession, exposure, survival, restoration, etc.). Each architecture maps to the same invariant dramatic functions but introduces different causal dependencies. Set up the protagonist's external goal, internal misconception, stakes, antagonistic pressure, relationship arc, and the costly decision required at the climax.

**Mesoplan:** construct a directed acyclic graph of concrete events and obligations: evidence introduced before deduction, secret known by a custodian before disclosure, threat escalating after its cause, promise made before broken, tool acquired before used, wound sustained before its consequences, location accessed only after a route opens. Schedule scenes using a topological order plus pacing constraints. Multiple subplots must cross the main plot through actual causal effects, not decorative cutaways.

**Microplan:** for each scene define objective, opposing objective, conflict tactic, obstacle, turning point, transaction, emotional change, entry and exit conditions, and information exposed to the audience. A scene with no state change, character development, motif setup/payoff, or deliberate pacing function is rejected. Scene realization then turns that microplan into screenplay blocks.

An explicit obligation ledger records setup, expected payoff, earliest payoff position, deadline, dependencies, and discharge evidence. The final act cannot be emitted while critical obligations remain unresolved. Optional threads may close ambiguously only when that ambiguity is intentional and marked.

## 17. State machine: provenance, not just consistency

State is event-sourced. Each scene has an ordered list of typed events such as `learnsFact`, `revealsFact`, `transfersObject`, `entersLocation`, `changesTrust`, `makesPromise`, `breaksPromise`, `incursInjury`, `spendsResource`, `changesGoal`, `opensAccess`, `closesAccess`, `dies`, `discoversEvidence`, and `resolvesThread`.

Events carry preconditions, effects, witnesses, timestamp, scene ID, and provenance links. An event can be applied only if its preconditions hold. Track **audience knowledge separately from character knowledge** so mysteries, dramatic irony, and twists remain intentional. Track character beliefs separately from objective truth: a character can sincerely act on a false belief without breaking continuity.

Every significant prop has creation/acquisition, custody, and disposal records. Every travel transition respects an explicit, genre-aware time/distance model. Track injury, exhaustion, money, authority, tools, and resource scarcity when relevant to a plot. All scene state deltas are replayable from the initial snapshot, enabling pinpoint explanations of invalid causality.

## 18. Genre semantics: eleven real adapters

Every genre implements the same capability contract: `establishNormality`, `disrupt`, `createCommitment`, `supplyClue`, `concealTruth`, `raiseCost`, `splitAlliance`, `forceSacrifice`, `stageConfrontation`, `resolveRelationship`, `closeImage`. Each capability returns **plans and constraints**, not just replacement vocabulary. Each genre provides at least three substantially different realization families for every core capability at launch, with expansion through authored scene families and compatible combinators.

**Romance / Romantic Comedy:** attraction, mutually conflicting needs, credible separation, changed behavior, reunion or bittersweet release. Relationship consent and motivation are causal, not mechanical.

**Horror:** vulnerability, rules of threat, bounded escape routes, escalating dread, revelation of threat mechanism, costly survival or loss. The threat obeys its established rules.

**Thriller:** asymmetrical information, pursuit, institutional pressure, betrayal, time pressure, credible reversals.

**Science Fiction:** speculative premise with explicit operational limits; technical consequences; social or personal cost; resolution uses established capabilities rather than a last-minute invention.

**Western:** contested territory, personal code, scarce resources, community obligations, geographic isolation, irreversible confrontation.

**Mystery:** fair clue placement, suspect opportunity/motive, controlled red herrings, a solution deducible from previously shown evidence; no arbitrary final-scene culprit.

**Action:** physical objectives, spatially intelligible sequences, resource depletion, injury consequences, escalation, meaningful tactical reversal.

**Drama:** competing human obligations, consequential choices, restrained escalation, relationship changes, earned closure.

**Comedy:** coherent causal plot with character-driven misunderstandings, status reversals, recurring setups/payoffs; not random joke insertion.

**Fantasy:** magic or mythic rules with costs and constraints, coherent political/social systems, established resolution mechanism.

**Crime:** opportunity, motive, means, cover-up or pursuit, institutional counterpressure, consequences of moral compromise.

Hybridization happens **internally** when a genre demands it (e.g. a romantic mystery subplot), but the audience chooses only the dominant genre. Every scene is checked against the selected genre's credibility envelope. A scene must not accidentally turn a restrained drama into supernatural horror.

## 19. Character engine and dialogue

A character is a persistent agent with public desire, private need, misconception, taboo, leverage, relationships, and a changing tactical approach. Assign a voice vector: sentence length, diction, directness, metaphor density, humor, evasion, interruption, formality, and preferred rhetorical tactics. Voice affects how characters pursue goals, not merely how they pronounce identical exposition.

Dialogue generation is a constrained **conversation planner**: speakers have intentions and information; each exchange advances or resists a scene objective. Construct conversational moves (request, deflect, challenge, reveal, deny, bargain, threaten, concede, joke, evade, interrupt, reinterpret), then realize each move in character voice and genre register. Check that a speaker cannot reference knowledge they do not possess, that questions receive plausible responses, and that exchanges change tactics rather than restate the same point.

Author reusable, semantically typed dialogue patterns with multiple clause structures, discourse transitions, and context-sensitive callbacks. Maintain a local repetition ledger for phrase stems, signature lines, exposition formats, and dialogue turn shapes. Ban obvious stock filler and repeated lines across adjacent scenes. No raw random adjective insertion, synonym roulette, or globally interchangeable lines.

The practical limitation is explicit: **without a runtime language model, naturalistic long-form dialogue requires a substantial authored realization library**. The system must earn diversity by building that library and measuring outputs; it cannot declare naturalness by architecture alone.

## 20. Full screenplay length and pacing

Feature-scale output is a hard acceptance requirement. Plan approximately 55–85 scenes, with act progression and a measurable distribution of dialogue, action, tension, aftermath, and connective material. Do not inflate length with repeated conversations or arbitrarily long action blocks.

Use scene-length envelopes based on function and genre, measured in actual Fountain/AST word and block counts. Target roughly 15,000–25,000 screenplay words as a **provisional engineering envelope**, subject to calibration against real screenplay formatting and complete-script review; screenplay page count is not equal to word count. No unverified claim of a 90–120-page script. If calibrated pagination is later implemented, label estimates honestly.

Scenes expand through additional causal obstacles, tactical turns, earned character beats, and meaningful subplot intersections. If a generated movie cannot support feature-scale substance, reject it rather than pad it. The opening, midpoint, crisis, climax, and final image must be structurally recognizable without being copied verbatim across scripts.

## 21. Variety without narrative entropy

Each accepted film receives a **structural fingerprint** (function graph, event graph topology, reversal positions), **semantic fingerprint** (goals, obstacles, secrets, institutions, relationships, setting ecology), and **surface fingerprint** (dialogue n-grams, scene realization IDs, motifs, locations, character names). The structural fingerprint is expected to be similar across genres by design; semantic and surface fingerprints must diverge substantially across films.

Keep a small precomputed **catalog manifest** of tested film IDs and their fingerprints, plus optional browser-local recent-history fingerprints. The factory need not ship thousands of full scripts as static assets. Next derives the next candidate from a stable per-genre ordinal, skips rejected candidates deterministically, and records accepted IDs. Precompute quality-approved ordinals where feasible so the public Next action is fast.

A diversity gate compares each candidate to recent same-genre films and a fixed reference corpus. Measure title collisions, cast-name collisions, duplicate scene plans, repeated dialogue passages, and template concentration. Define thresholds empirically after corpus analysis, not by invented percentages. Do not use a huge global in-browser set that grows without bound; use bounded local history and a versioned static fingerprint index.

## 22. Determinism, worker performance, and failure handling

Use a specified PRNG algorithm and string hash with known test vectors. Derive named streams from `filmId` so changes in casting do not reshuffle plot architecture. Record `engineVersion`, `schemaVersion`, `genreAdapterVersion`, `libraryVersion`, and `seed` in film metadata.

Generate in a Web Worker; send progress by pipeline stage, not fabricated percent completion. Cancel obsolete work when genre changes or Next is tapped repeatedly. Keep the previous screenplay visible until the next accepted film is ready. Cache the current and immediately adjacent films in memory; optionally persist a small bounded cache in IndexedDB when supported. Never rely on cache for correctness.

Set measured time and memory budgets for low-end Android devices. Instrument planning, realization, validation, serialization, and render separately. Use bounded retries and report a recoverable error when exhausted. An invalid film never reaches the reader. Run generation without a network connection after initial asset load. Versioned source and assets must avoid stale-browser ambiguity.

## 23. Quality gates and what 'works' means

Validation tiers:

1. **Schema:** every record is well-formed and references existing IDs.
2. **Graph:** all required dramatic functions exist in legal order; obligations are scheduled.
3. **Continuity:** facts, beliefs, knowledge, objects, access, injuries, resources, locations, and time remain consistent.
4. **Genre:** threat, romance, speculative, investigation, and resolution rules are respected.
5. **Screenplay:** all scenes contain valid sluglines and action/dialogue AST; dialogue speakers exist and are present.
6. **Length/pacing:** feature envelope, act distribution, scene density, and subplot payoffs pass.
7. **Distinctness:** no unacceptable collision or excessive near-duplicate content.
8. **Language:** repeated phrasing, impossible references, awkward agreement, exposition loops, and character-voice drift are flagged.
9. **Editorial:** human review of complete scripts across every genre, including the worst-scoring accepted samples.

A test result distinguishes **hard failure**, **measurable warning**, and **subjective editorial concern**. Static checks cannot prove that a movie is compelling, genuinely funny, frightening, or naturalistic. No quality dashboard should imply otherwise.

Required test suite: pure unit tests; property-based event/state tests; seeded golden fixtures; metamorphic tests that change genre but preserve function contracts; corpus-scale generation tests; export/import round trips; browser/mobile performance tests; and full-script human reading. Include regression fixtures for every continuity bug fixed.

## 24. Corpus factory and review tooling

Provide a developer-only batch runner that can generate films headlessly from `genre × ordinal range`, save structured diagnostics, aggregate pass/fail reasons, compute uniqueness metrics, and export selected full Fountain scripts. It must be able to resume deterministically after interruption and produce a reproducible report identifying engine/library versions and tested ordinals.

Corpus reports include: accepted/rejected candidates; failures by invariant and genre; average/percentile generation times; scene and word distributions; scene family usage; repeated phrase hotspots; similarity outliers; unresolved obligations; and hand-review queue. Sample **random accepted, worst accepted, and rejected** scripts. Optimize the worst cases, not merely attractive demos.

Keep fixture-based tests small and fast for each edit; run heavier corpus sweeps at release gates. Store summaries and representative fixtures in the repository, not thousands of generated scripts unless necessary for regression.

## 25. Release plan with proof gates

**Phase 0 — Establish the contract.** Implement schema, versioned seed identity, event vocabulary, universal function graph, and executable invariants. Produce machine-readable fixtures and test commands. No public generator claim.

**Phase 1 — One genre, complete short film.** Build one genre (suggest Thriller), a real planner, state transactions, realization, screenplay AST, export, and a fully coherent 12–20-scene film. Demonstrate several distinct seeds. Do not call these features.

**Phase 2 — Two distant genres, same engine.** Add Romantic Comedy or Horror. Verify that the same dramatic function sequence yields genuinely different scene causality and dialogue, not noun replacement. Build a corpus runner and continuity debugger.

**Phase 3 — Genre factory.** Implement all eleven adapters, typed capability libraries, voice/dialogue planner, deterministic repair, and diversity checks. Every listed genre must pass its own golden and property tests before appearing in the selector.

**Phase 4 — Feature length.** Grow to 55–85 causally necessary scenes with subplots, pacing, and earned payoffs. Review entire scripts in each genre. Reject padding. Calibrate actual length and performance.

**Phase 5 — Thousands.** Generate and evaluate at least 1,000 accepted films per exposed genre; measure duplication, runtime, and failure rates; expand libraries where concentration is high. A combinatorial estimate alone never satisfies this gate.

**Phase 6 — Universal studio.** Build the elegant, dead-serious public experience: genre selector, full screenplay, Next Picture, Previous, permalinks, export, optional quiet archive, and fictional Quality Assurance. The public site does not expose engineering diagnostics or a forest of configuration knobs.

**Phase 7 — Publish and verify.** Deploy only under `/jit/universal/`; preserve the JIT root and other experiments. Verify GitHub source, Pages output, mobile reading, Next sequencing, back/forward, URL restoration, export, and offline regeneration. Record build/version in the README and chronicle.

### Exit criterion

A visitor can select any exposed genre and read one complete, coherent screenplay; tap Next dozens of times without immediately encountering a repeated story, cast, scene chain, or dialogue pattern; return to any film by URL; and continue through a tested catalog whose corpus metrics support a claim of thousands of distinct screenplays. Until then, describe the product by its proven phase, not its aspiration.

## 26. Explicit non-goals and architectural traps

- No runtime LLM API, subscription, login, server-side generation, or user prompt engineering.
- No fake infinite catalog produced by renaming identical screenplays.
- No genre-only word substitution.
- No screenplay padded by duplicating scenes.
- No random twist that violates prior facts.
- No invented production statistics presented as engineering evidence.
- No requirement for visitors to learn seeds, plot axes, or graph theory.
- No publishing a polished studio shell before a real generator exists.
- No claim that one finite library automatically yields unlimited high-quality prose.
