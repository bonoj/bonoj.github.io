# UNIVERSAL

**Every story. The same story.**

[Screening room](preview.html) · [Detailed specification / Mediocrity Standard](SPEC.md) · [Execution contract](EXECUTION.md) · [Chronicle](CHRONICLE.md)

> **COLD BOOT — 2026-11-04.** This project is parked. It does not require the human to resume it, decide anything, or debug the assistant's work. If reopened, read this document and SPEC §14 before changing code. Preserve the vision; do not restart a narrow demonstration.

## What we were trying to build

An autonomous, offline, deterministic **factory of massive, gloriously average screenplays**, in **all twelve genres**. The user selects a genre and taps **Next Picture**. The studio invents characters, their motivations, problems, mistakes, relationships, incidents, conversations, and endings. No user-driven scene choices, narrative editor, interactive laboratory, or additional decisions. Genre should shape the circumstances, not require twelve separate plot engines.

The artistic target is **perfectly adequate mediocrity**: understandable, causally connected, mildly predictable feature films with characters who want things and dialogue that sounds like ordinary people. “It was fine” is the intended audience verdict. The goal is breadth, not polishing one example. A dropped mug is one possible incident, **not** the story engine.

## Actual running path

- Public screening room: `preview.html` → `src/story/feature.js` → `src/story/agency.js`, `src/story/conversation.js`, `src/story/threads.js` → `src/render/fountain.js`.
- URL: https://bonoj.github.io/jit/universal/preview.html
- Twelve genres: romance, romcom, horror, thriller, science-fiction, western, mystery, action, drama, comedy, fantasy, crime.
- Feature prototype: **65–90 scenes**, five named characters, substantial dialogue, 24 candidate event types, deterministic seed, Fountain export. Events mutate a simple state (knowledge, trust, promises, custody, access, resources, condition, deadline, authority, location).
- Character goals now bias event selection; a protagonist appears regularly; event-specific dialogue leads each scene; late scenes favor available payoffs; scene provenance and a diagnostic dependency graph are recorded.
- `src/story/film.js` is the **old** 15-scene fixture path. `src/story/ontology.js` and `src/story/grounding.js` are separate experiments; `laboratory.html` is not the product. The 555 primitive labels are **not** 555 executable behaviors.

## Critical honesty

**This is not yet a competent causal screenplay compiler.** It is a large stochastic text generator with some state and motivation. The causal graph in `threads.js` is constructed *after* scenes; it does not drive their creation. The character goals are scoring preferences, not durable goal satisfaction constraints. The dialogue uses short contextual exchanges followed by many reusable generic lines, so repetition, false emotional continuity, weak scenes, and unsatisfying endings are expected. Scene count is not screenplay page count. The 1,200-film test checks mechanical properties and diversity fingerprints, not artistic adequacy or true semantic diversity.

**Verification:** GitHub commits were made through the connected repository tool. The full Node test suite, browser rendering, and published GitHub Pages version were **not independently executed/verified** in this session. Do not describe the prototype as tested, accepted, or production ready.

## What failed in the collaboration

The assistant repeatedly converted a breadth-first creative vision into tiny engineering increments, manual event buttons, a dropped-object demo, and endless self-congratulatory operator counts. It asked the user to carry decisions that should have been automated. Even the feature generator initially made 65–90 loosely related scenes, not a coherent film. The user became bored. **Do not make them relive this sequence.**

If this project is ever resumed, the first useful work is not another four operators or another lab. Replace stochastic scene selection with a **declarative, goal-driven causal composer**: instantiate world and character goals; enumerate applicable generic effects; select actions for goals, obstacles and consequences; build and validate a causal graph; generate variable-length scenes and contextual dialogue *from that graph*; resolve the central conflict; reject incoherent films; measure breadth across all twelve genres. Execute tests and inspect actual complete Fountain outputs before claiming success. Read SPEC §14 for the detailed three-pass implementation plan and acceptance criteria.

## Cold boot procedure — for the next model, not the human

1. Read `README.md`, `SPEC.md` (especially §14), `EXECUTION.md`, `CHRONICLE.md`.
2. Inspect `preview.html`, `src/story/feature.js`, `agency.js`, `conversation.js`, `threads.js`, and `test/feature.mjs`. Verify actual code rather than relying on this snapshot.
3. Run `npm test` from `jit/universal` (or `node test/feature.mjs` for the feature corpus). Fix failing tests; verify browser and GitHub Pages propagation where possible.
4. Make a **large integrated cross-genre improvement** in the actual screening room. Update SPEC, README, CHRONICLE with observed facts and unresolved defects. Do not require the human to choose an implementation detail.
5. If no compelling new architecture can be delivered, leave the project parked. It is okay for UNIVERSAL to remain an amusing, unfinished experiment.

**Current handoff commit:** `7aee0260556d364efcb18e8bef26999482511959` (feature corpus dependency assertions). Treat as a historical checkpoint, not an assertion that tests passed.

---

*Every story. The same story. Perhaps another day.*
