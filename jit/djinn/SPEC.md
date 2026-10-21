# 🧞 Djinn — Working Specification

**Status:** Evolving discussion document, not implementation authorization.
**Started:** 21 October 2026
**History:** [CHRONICLE.md](./CHRONICLE.md)

## Mission

Enable a five-year-old (with ordinary parental support for setup), a scientist who uses software but does not engineer it, and an eighty-year-old grandhuman to create, publish, revisit, and revise a **composable executable JIT artifact in a few turns of idle chat**, as the human and model already do.

The human should not need to learn GitHub, programming, or the model's toolchain. **Teach the human how to be taught:** provide a short copy-paste request that asks their own model to guide them through setup, perform what it can, and explain only what the human must do.

## Working hypothesis: how much GitHub must the human know?

**Very little, after initial provisioning.** GitHub is the durable source/publishing substrate, not the ordinary interaction surface.

| Initial step | Human responsibility | Model responsibility |
| --- | --- | --- |
| GitHub account | Create an account and complete required authentication | Explain and guide |
| Repository | Create or approve a repository | Recommend structure, provide or write starter files |
| Pages | Enable Pages with GitHub Actions as the publishing source | Supply workflow and check its status |
| Model connection | Authorize supported, appropriately scoped GitHub access | Determine actual connector/tool capabilities and verify read/write access |

**Important distinction:** Configuring GitHub Pages does **not** grant a model repository write access. A supported connector or other authorized mechanism is independently necessary. Capabilities vary by model and host; never imply universal compatibility.

After provisioning, ordinary use should be **ask → build → visit → change → visit again**. No routine GitHub UI required. A stable link should survive revisions; last working versions should be recoverable; claims of success must distinguish written, committed, deployed, and verified.

## Model-mediated onboarding

Do not write a lengthy GitHub tutorial or teach a fixed model interface. Supply a concise, polite, copyable handoff prompt that instructs the human's own model to adapt the walkthrough to its real capabilities and the human's device.

**First candidate — not yet tested across model hosts:**

> I want to create little interactive worlds by chatting with you. Help me set up GitHub and publishing, one step at a time. Explain only what I need to do myself, handle the technical work you can, and verify each step before continuing. Don't ask me to learn programming.

The first meaningful success should be a working creation, **not** a congratulatory empty repository. After setup, ask: **“What would you like to make?”**

## Smallest candidate product surface

1. One setup prompt that the human can copy into their chosen model.
2. One composable starter repository or equivalent initialized workspace.
3. One durable publishing workflow through GitHub Actions and Pages.
4. One conversational handoff contract that keeps model work grounded in the repository and verification.

This is a candidate decomposition, **not a settled architecture**. Investigate how the model receives the starter contract, how permissions are scoped, how first deploy is verified, and how supported hosts differ before implementing.

## Audience and safety boundaries

The three example humans share the same creative substrate, not three incompatible product tiers. A child requires adult involvement for account creation, permissions, and any external sharing; avoid assuming independent access to services with age restrictions. A scientist may need explicit units, assumptions, provenance, and reproducibility. A grandhuman should not need to learn specialized vocabulary or navigate hidden failure states.

## Open questions

- Which model hosts can actually perform repository operations after user authorization? What fallback works when they cannot?
- What is the least error-prone initial repo + Pages + Actions setup on mobile?
- Can the human paste a single prompt **before** GitHub setup, with their model handling the remaining guidance?
- What reusable JIT components and proven publishing machinery should the starter inherit?
- What does a trustworthy end-to-end first-wish verification look like?

## Editorial rule

Keep this file a **living working specification**. Update it as the design evolves. When decisions stabilize or discussion grows unwieldy, compact the spec and move the historical reasoning and superseded exploration to [CHRONICLE.md](./CHRONICLE.md). Do not prematurely treat hypotheses as commitments.
