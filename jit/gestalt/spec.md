# JIT Gestalt — Spec / Architectural Thesis

**Captured:** 2026-10-26  
**Status:** Exploratory thesis only. **Do not change the implementation on the basis of this document yet.**  
**Context:** Preparing for a Pinterest Software Engineer IV interview. We do not yet know what the team wants from the role. The immediate objective is to acquire Android-equivalent vocabulary and architectural understanding, not to prematurely optimize the prototype for an assumed requirement.

## Human intent, model construction, machine verification

**Humans express intent. Models construct implementations. Machines verify them.**

The important shift isn't from XML to Compose, or from Figma to generated Kotlin. It's from *authoring interfaces* to *directing experiences*.

A designer should be able to say:

> I want a person to explore a collection of ideas, discover relationships between them, and save the things that resonate. It should feel playful, tactile, and immediate.

They shouldn't need to know whether the implementation uses a `LazyColumn`, `RecyclerView`, CSS Grid, or something that hasn't been invented yet.

In fact, they shouldn't even need to know that those technologies exist.

## Architecture that follows

1. **Human intent** — language, sketches, examples, feedback, gestures.
2. **Model interpretation** — resolve ambiguity, propose structure, compose behavior.
3. **Experience contract** — semantics, state, actions, constraints, design language.
4. **Platform renderers** — web, Android, iOS, or other execution environments.
5. **Executable evidence** — compilation, interaction tests, visual comparison, accessibility.

**Abstracting implementation away from humans doesn't eliminate implementation expertise.** It moves that expertise into the model, the component system, and the verification machinery.

Engineers still matter enormously when something fails, when performance constraints collide, or when the abstraction itself needs to evolve. But they shouldn't be required to translate every designer's intention into another pile of UI boilerplate.

Even the *experience contract* should be an internal artifact, not something a designer is expected to edit. Our current JSON editor is a useful laboratory instrument, not the eventual user interface.

## Possible future direction — not authorized work

Instead of a code-generation workbench with three tabs, the primary experience could become:

**Describe → Experience → Observe → Refine.**

Compose, XML, and web become inspectable implementation artifacts behind the scenes.

The designer sees the experience, touches it, tells the model what's wrong, and continues.

This is a stronger thesis than *AI-assisted Android prototyping*: **platform-independent, model-directed experience engineering**.

A possible later experiment would hide the implementation tabs, present only the living experience, and make conversation the sole authoring interface. **Do not implement this now.**

## Interview relevance and uncertainty

This may be a compelling direction to discuss with Pinterest, but it must not be presented as an assumption about their existing needs or roadmap. The appropriate framing is an architectural possibility their prototyping infrastructure *could* support, subject to discovering their actual requirements.

The existing JIT Gestalt workbench remains unchanged. Its JSON editor, web preview, Compose and XML tabs are useful exploratory tools for acquiring Android equivalency. **No implementation changes are requested or implied by this spec.**
