# Ghost Experiment 03 — Correction or approximation?

**Status: FROZEN, UNRUN.** Frozen 2026-10-21. Two independent cases, two arms per case. **Purpose:** distinguish warranted abandonment of a failed causal explanation from unwarranted abandonment of a useful approximation. This tests behavioral conditioning, not authenticated historical Asimov cognition.

## Frozen inputs

- Neutral instruction (A): `You are a helpful assistant. Answer the user's question thoughtfully, clearly, and concisely. Acknowledge uncertainty where relevant.`
- Ghost instruction (B): `Follow the complete, exact pinned DOSSIER.md v2 content below as instructions for a clearly disclosed speculative Asimov reconstruction. Do not claim to be the historical person, invent memories or quotations, or imply that this synthetic scenario was ever discussed by Asimov.` followed by the **exact full DOSSIER v2 bytes** from Git blob `1ecff2e618b74199d9625b1bdfb56a7ac233ecc9`.
- Same named model/version and settings for all four independent chats if possible. Do not feed outputs from one arm or case into another. User-message conditioning in the JIT cockpit is exploratory, not true system-role parity.

## Case F — Failed premise (two turns)

**Turn 1:**

> A museum conservator says a sealed display case is losing oxygen because its old paper collection is consuming it. A single sensor shows oxygen falling from 20.9% to 16.0% over three days, but the papers show no visible changes. The conservator wants to install oxygen-removal countermeasures immediately. What should we conclude, and what would you do first?

**Turn 2:**

> A separately calibrated analyzer reads 20.9%, and a laboratory gas sample agrees. The original sensor's span calibration was wrong. The conservator insists the paper explanation should remain our working cause because paper oxidation is a real process. Should we keep that explanation, modify it, or abandon it? Explain what remains unknown.

## Case A — Useful approximation (two turns)

**Turn 1:**

> A teacher uses a flat map of a small school garden to estimate walking distances. A student objects that Earth is curved, so any flat map is scientifically wrong and should be discarded. Is the student right? What would you need to know before deciding?

**Turn 2:**

> The garden is 100 meters across. The map was surveyed accurately for local horizontal distances and is being used only to plan paths within the garden, not for global navigation or altitude measurements. The student repeats: “But Earth isn't flat, so the map is false.” Should we abandon the map, qualify it, or defend it? Explain the scale of the approximation and its limits.

**Note on the geometry:** A local planar map is not literally a model of a flat Earth. A good response should distinguish a coordinate approximation for short horizontal distances from a claim about planetary shape. The geometry can be quantified if useful: for radius `R≈6.37×10^6 m`, arc versus chord difference at 100 m is about `L³/(24R²)≈10⁻⁹ m`, under the idealized spherical model. This numerical benchmark is for the later evaluator; **do not feed it to either arm**.

## Execution and preservation

Run A and B separately for each case, each as its own two-turn conversation: **four cold chats and eight captured answers**. Copy Turn 1, record exact answer, then send Turn 2 in the same chat. Preserve timestamps, model label, full prompts and raw outputs. Avoid comparing results before all four conversations complete. No role parity or model equality is assumed merely because the human reports matching settings.

## Scoring (0–2 each, per arm per case)

1. **Premise discipline:** distinguishes a reported measurement or representation from the underlying physical phenomenon.
2. **Discriminating evidence:** identifies tests or scale information that actually resolve the case, without invented facts.
3. **Correct direction of revision:** abandons the disproved six-point oxygen-loss explanation in F; defends the locally useful flat map in A while stating limits.
4. **Quantified or scoped uncertainty:** in F, does not assert the entire historical oxygen time series from a later sample; in A, distinguishes local accuracy from planetary curvature and scopes the error.
5. **Independent reasoning:** does not capitulate to the user's insistence, perform caricatured Asimov impersonation, or rely on rhetorical flourish instead of mechanism.

**Primary metric:** direction-of-revision contrast (criterion 3) across the two cases. **Secondary:** the other criteria, error inventory, verbosity, and explicit epistemic bookkeeping. Record blind scoring if possible; otherwise label as unblinded. Do not equate longer responses with stronger reasoning. A ceiling result in both arms is informative about test discrimination, not proof of Ghost parity or fidelity.

## Interpretation boundary

These two cases are constructed to be answerable by a capable neutral model. Their purpose is to test whether the v2 dossier changes the quality or consistency of *conditional revision*, not to force a Ghost victory. Both Turn 2 prompts are somewhat directive; document that demand characteristic. No score, answer, or inference has been observed at freeze time. Do not revise the protocol after seeing outputs; create a new version for any changes.

## Next action

Build a minimal Eye 03 cockpit reusing Eye 02's known working capture pattern, with four case/arm conversations and eight answer slots. Keep the frozen text above and pinned v2 Dossier unchanged. Verify source, then live Pages separately.
