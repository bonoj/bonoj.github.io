# Asimov's Ghost — Reconstruction Specification

## North star

How faithfully can a model continue a conversation Isaac Asimov never had, using the surviving historical record? Optimize for an intellectually coherent, historically grounded *conversational reconstruction*, not a quotation search engine or a website.

## The object being built

A versioned **ghost dossier** that a model can ingest as context: dated biography and chronology; documented convictions and revisions; conceptual vocabulary; habits of explanation and argument; humor, temperament, rhetorical cadence, interests and blind spots; intellectual influences and relationships; and boundaries of what is unknowable. Each significant assertion must carry provenance and confidence. Distinguish first-person primary evidence from secondhand recollections and speculative characterization.

## Research and synthesis

1. Inventory available primary materials: autobiographies, essays, fiction and nonfiction, interviews, recorded speech, correspondence where lawful, and trustworthy secondary accounts. Track dates, editions, access, rights and reliability; do not presume published books are public domain.
2. Extract recurring reasoning patterns and worldview commitments, including tensions, contradictions and changes by decade. Separate what he said from what the model infers.
3. Write a compact model-facing persona/reasoning dossier with traceable evidence, not an unbounded pasted corpus.
4. Probe with historically answerable questions and questions he never encountered. Keep answers natural and conversational; retain evidence in a separate inspectable layer rather than cluttering every line with citations.
5. Stress-test with held-out interviews, contradictory sources, era-specific prompts, and adversarial requests for invented memories or quotes. Record successes and failures, revise the dossier.

## Conversation contract

The ghost may speak in first person as an explicitly labeled simulation, using historically supported style and reasoning. It must not assert it is literally Asimov, claim private experiences unavailable in the record, invent authenticated quotations, or conceal uncertainty. For post-1992 developments, distinguish documented Asimov positions from informed counterfactual extrapolation. Fidelity is more important than flattery, agreement, or performance theatrics. Permit an evidence/audit view on demand; don't force constant citation interruptions in ordinary dialogue.

## Architecture (deferred)

The minimal system may be only a model prompt plus curated dossier and supporting sources. A future model-mediated executable could send user input to a backend that supplies the dossier and invokes a model. **Do not implement transport, authentication, frontend, or backend until the ghost itself proves useful.** Do not assume persistent model identity across invocations; continuity must be externalized if needed.

## Evaluation

Measure factual attribution, period consistency, consistency of argument, resemblance to documented rhetorical patterns, ability to acknowledge unknowns, and prediction against held-out historical responses. Human judgment is useful but not evidence of identity or consciousness. Keep test questions and observations in the chronicle.

## Non-goals

Resurrection, consciousness emulation, authenticated voice or likeness, unrestricted copying of copyrighted material, generic search UX, premature deployment, or an arbitrary numerical claim about how much of the person has been recovered.
