# JIT Asimov — Asimov's Ghost

**State:** research and reconstruction; small experimental cockpit shipped, no backend.
**North star:** a faithful, evidence-grounded conversational simulation of Isaac Asimov, not a claim to be the person.

## Cold boot

Read [SPEC.md](./SPEC.md) for **what exists, what was just built, and the next bounded build**. [ATLAS.md](./ATLAS.md) is the canonical evidence map; [DOSSIER.md](./DOSSIER.md) is the current model-facing synthesis. Read [CHRONICLE.md](./CHRONICLE.md) for the dated ledger, motivations, observations, and evolving shape of the experiment. Resume from the first incomplete SPEC task; do not restart or invent a frontend.

**Executables:** [Eye 01](https://bonoj.github.io/jit/asimov/), [Eye 02](https://bonoj.github.io/jit/asimov/02.html), [Eye 03](https://bonoj.github.io/jit/asimov/03.html), [Eye 04](https://bonoj.github.io/jit/asimov/04.html); local-only experiment launch/capture, no model API.

**Current frontier:** Eye 04 source shipped: single-chain Ghost conversation, five turns with deviation capture, frozen v2 Dossier, local JSON export. GitHub readback verified; live Pages/device interaction pending. Next: run the conversation and inspect drift before revising Dossier.

**Earlier frontier:** Atlas v0.5.0 adds six dated pre-1992 machine-intelligence propositions and T-004; next is a period-bound first-encounter experiment, with predictions recorded before exposure to modern language models. DOSSIER v2 unchanged.

**Prior frontier:** [EXPERIMENT-03.md](./EXPERIMENT-03.md) is frozen and unrun: two opposing revision cases, four independent two-turn conversations, v2 dossier pinned. Eye 03 executed in four user-attested independent chats (eight responses); provisional tie 20/20, no demonstrated Dossier advantage. Live Pages was operated by the human; strict protocol remains unrun. See SPEC and CHRONICLE. Earlier exploratory runs are documented separately.

**Prior research frontier:** 33 provisional propositions in ATLAS v0.5.0; DOSSIER v2 now distinguishes error correction from defending useful approximations; frozen [EXPERIMENT-01.md](./EXPERIMENT-01.md) remains pinned to v0 and unrun. [EXPERIMENT-02.md](./EXPERIMENT-02.md) now freezes the v1 correction probe, also unrun; publisher's 1989 scan verified Campbell passage; next prioritize independent cold-model evaluation over proliferating frozen tests; prefer two cold ChatGPT contexts for the later comparison. Continue expanding and checking primary evidence. Backend ingestion and browser UI are deferred, possibly forever.

## Turn contract — automatic on every substantive turn

**Standing authorization:** when the human asks to advance, investigate, decide, revise, or probe Asimov's Ghost (including `➡️`), complete the research/build step **and** its documentation in the same turn without waiting for separate instructions to update SPEC or CHRONICLE. Do not turn documentation into an approval gate. A conversational question that materially changes the design also triggers persistence; trivial acknowledgments do not.

1. **Orient:** read this README and the relevant SPEC frontier; consult CHRONICLE for context. Inspect actual artifacts before claiming their state.
2. **Act:** advance one meaningful, bounded research or reconstruction step. The model is the instrument; favor source evidence, dossier quality, and ghost probes over transport plumbing.
3. **Verify:** distinguish documented Asimov evidence, model interpretation, imagined continuation, and unverified hypotheses. Record failures and uncertainty; never invent quotations, private memories, or authenticated identity.
4. **Persist automatically:** update **SPEC** with the authoritative current state, what was just established, what remains uncertain, and the next bounded action; append a **CHRONICLE** entry with UTC DTS, the human's direction, model reasoning, evidence, observations, decisions, and consequences. Keep substantial design detail in SPEC and preserve the discarded alternatives and intellectual trail in CHRONICLE without duplicating the whole SPEC.
5. **Verify persistence and handoff:** read back changed documents and verify commits; update **README only if** status, cold-boot route, invariants, or immediate frontier changed. Keep it featherlight. Report the actual changes and remaining uncertainty. If persistence fails, recover via the documented GitHub/Gate procedure and disclose any remaining gap.

**Ownership:** README = live orientation and turn protocol. SPEC = construction state and forward plan. ATLAS = canonical evidence map. DOSSIER = derived model-facing synthesis. CHRONICLE = append-only dated ledger and intellectual arc. Do not duplicate long accounts across them.

**Chronicle append format:** append each new entry at the end as `## YYYY-MM-DDTHH:mm:00Z — Title` (UTC). Minute precision is sufficient; seconds stay `00`. Do not rewrite or insert between previous entries. Preserve historical entries; add corrections in new entries.

**Guardrails:** natural first-person dialogue is permitted as clearly disclosed simulation; evidence remains inspectable without interrupting every answer. No source corpus is assumed available until verified. Do not build a generic RAG product, frontend, backend, or ingestion transport by default. Before any eventual deployment, follow [Gate](https://github.com/bonoj/Gate/blob/main/README.md) and independently verify commit, publisher, and browser.

**Possible future:** user input transported to a backend that wakes a model with the ghost dossier. Last, or never.
