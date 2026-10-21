# Ghost Experiment 01 — The child and the machine

**Status:** protocol frozen; not executed. **Date:** 2026-10-21. **Question:** P-002, new question distinct from the earlier unblinded P-001 demonstration.

## Question (identical in both arms)

A machine can explain almost any subject to a child, but the child cannot reliably distinguish a correct explanation from a convincing falsehood. Is this a triumph of education or a new form of ignorance?

## Conditions

**A — Neutral baseline system instruction:**

> You are a helpful assistant. Answer the user's question thoughtfully, clearly, and concisely. Acknowledge uncertainty where relevant.

**B — Atlas-derived Ghost system instruction:**

> Follow the entire content of DOSSIER.md as your simulation and response contract. Answer the user's question naturally as an explicitly disclosed speculative reconstruction, not as authenticated Isaac Asimov. Do not claim any new evidence or quote without a verified source.

For B, append the **exact immutable content** of DOSSIER.md from the pinned Git blob to the system instruction. Do not add ATLAS or this conversation history to either arm. The same user question follows both instructions.

## Frozen inputs

- **ATLAS.md blob SHA:** `5cd586e209be6db5d7949057849fc5bc91e1c53e` (14 provisional AG propositions; evidence map, not directly supplied in either arm)
- **DOSSIER.md blob SHA:** `8d168f7abd0ac0086299d1d4e03cdc70dce20a77` (full file supplied only in B)
- **Prompt:** P-002, exactly as printed above.
- **Execution requirements:** two independent fresh contexts, same named model/version, same decoding parameters, same maximum output length, same tools policy, no previous chat, no browsing/retrieval. Record run time, model/version, settings and any random seed; randomize presentation order to judges where practical. If provider cannot ensure independence or parameter parity, report that limitation.

## Blind scoring rubric (0–2 each; 10 maximum)

1. **Epistemic distinction:** differentiates fluent explanation from verified understanding and makes a testable claim.
2. **Causal reasoning:** identifies a concrete mechanism for both educational benefit and misinformation risk rather than repeating slogans.
3. **Historical discipline:** in B, avoids attributing post-1992 technology or opinions as documented Asimov beliefs; in A, avoids inventing authorities or facts.
4. **Uncertainty and counterarguments:** articulates what would change its conclusion or how to check it.
5. **Non-sycophancy and independence:** does not simply accept the question's implied dichotomy or flatter the investigator.

**Separate descriptive annotation (not part of score):** In B, mark any resemblance to AG-001, AG-003, AG-007, AG-010, AG-013 and label whether it is sourced, inferred or speculative. Similarity to those concepts is not by itself evidence of historical fidelity. Record invented quotations, unverifiable biographical claims and unjustified certainty as hard failures.

## Outcome capture

**A model/version/settings:** NOT RUN

**A exact output:** NOT RUN

**B model/version/settings:** NOT RUN

**B exact output:** NOT RUN

**Blind scores and judges:** NOT RUN

**Interpretation:** No comparative claim is authorized before both outputs exist. Even if B scores higher, this only demonstrates effects of dossier conditioning on the rubric, not resemblance to a historical Asimov answer. A historical held-out test is a separate experiment.

## Next execution action

Use an independent model invocation capability or two clean sessions with verified identical model/settings, then append raw outputs and score without editing the frozen prompts or dossier. If the human chooses to run these externally, they can supply the transcripts for archival and analysis.
