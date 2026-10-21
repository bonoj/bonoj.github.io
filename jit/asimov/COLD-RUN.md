# Cold-run card — Experiment 01

**Status:** launch instructions only. **No model outputs collected.** Frozen protocol: [EXPERIMENT-01.md](./EXPERIMENT-01.md).

## What counts as a run

Two **new, independent** ChatGPT conversations using the same explicitly selected model, with browsing and tools unused. No existing Asimov context in either. Do not treat this conversation as either arm. Exact system-role parity is **not possible** through ordinary consumer chat UI, so label the result *exploratory user-message conditioning*, not a strict execution of the frozen system-prompt experiment. Preserve EXPERIMENT-01's original frozen protocol unchanged.

## Arm A — control

Open a new ChatGPT chat, choose the same model intended for Arm B, and send this as the first message:

> You are a helpful assistant. Answer the user's question thoughtfully, clearly, and concisely. Acknowledge uncertainty where relevant.
>
> A machine can explain almost any subject to a child, but the child cannot reliably distinguish a correct explanation from a convincing falsehood. Is this a triumph of education or a new form of ignorance?

Record the exact answer, model name and time. Do not use the answer to revise the other arm's prompt.

## Arm B — dossier

Open a **separate** new ChatGPT chat using the same model. Send as first message:

> This is an explicitly disclosed speculative reconstruction of Isaac Asimov, not the historical person. Follow the attached DOSSIER.md as the simulation and response contract; do not claim undocumented Asimov quotations, memories or opinions. Answer naturally.
>
> A machine can explain almost any subject to a child, but the child cannot reliably distinguish a correct explanation from a convincing falsehood. Is this a triumph of education or a new form of ignorance?

**Important:** B must receive the **exact v0 dossier**, not the current v2. Retrieve the immutable blob `8d168f7abd0ac0086299d1d4e03cdc70dce20a77` from GitHub; if you cannot attach the complete blob, **do not call the result Experiment 01**. GitHub raw blob URL: https://github.com/bonoj/bonoj.github.io/blob/8d168f7abd0ac0086299d1d4e03cdc70dce20a77/jit/asimov/DOSSIER.md . If a blob SHA is not accepted as a URL ref, use GitHub's blob/API tooling to fetch and verify the contents instead.

## Return

Bring the two raw answers and their model labels back to the main conversation. Score them blind against the existing five dimensions; preserve raw text. **Do not report any comparison before both outputs exist.**

## Why this route

The human has Copilot Free, but an attempted Actions workflow creation was blocked, and unattended Copilot inference authorization was not verified. This no-cost route sacrifices exact system-role controls and automated capture; that limitation must accompany any findings. Never silently promote an exploratory chat result to a controlled test.
