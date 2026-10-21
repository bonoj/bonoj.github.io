# 🧞 Djinn — Development Chronicle

## Genesis · 21 October 2026

**Status:** Concept established. No implementation or publishing architecture selected. This Chronicle records the initiating human–model turn pair and preserves the distinction between the human's requirement and the model's interpretation.

### Turn 1 — The human

> Let's first just figure out what we're building. We want a five year old (with avg human parental unit support for setup), a software tool using non software engineer scientist, and an eighty year old grandhuman to be able to sling a composable jit thing in a few turns of idle chat, just like us.

**Context:** The human proposed a GitHub reskin after identifying `jit/atlas`—a Wikipedia reskin that preserves the original knowledge source while changing how a human encounters it—as an unlock. The intended new interface is for humans unfamiliar with the underlying machinery. The human explicitly asked to establish **what** to build before implementing it.

### Turn 2 — The model

The model framed the product as **a way for ordinary humans to make executable things by talking**—not a GitHub client, website builder, or coding tutor. GitHub remains machinery underneath, not prerequisite vocabulary.

Three equal participants define the accessibility test:

- **Five-year-old**, with ordinary parental help for setup: “I want a dragon that eats stars.” Describe, see, touch, and revise a world; central play need not require reading.
- **Scientist who uses software but is not a software engineer:** “Show me what happens when I change the diffusion coefficient.” Receive a working interactive instrument with meaningful controls, assumptions, units, and reproducible behavior.
- **Eighty-year-old grandhuman:** “I want a little garden where my grandchildren can plant flowers.” Receive a shareable executable garden after a few conversational turns.

The model illustrated the shared loop:

1. Human: “Make me a little moon I can throw rocks at.”
2. Model: compose and publish an executable world using existing machinery.
3. Human opens a stable link to a working interactive thing.
4. Human: “Make the rocks bounce.”
5. The **same world** changes without losing its link.

The model proposed these product invariants for consideration: a few turns to first play; composition rather than unnecessary reinvention; one stable link; reversible experimentation; honest separation of source written, deployed, and verified execution; and engineering detail revealed only when requested. The scientist must not receive a toy edition, nor the child an artificially limited creative substrate; use appropriate permissions and safety boundaries instead.

**Architectural interpretation:** Atlas demonstrates a human-facing reinterpretation of an existing capability rather than replacement of its source. GitHub is one substrate, the JIT world the artifact, the model the interpreting builder, and conversation the human's control surface. The proposed product is the **Conjoiner workflow made accessible without requiring the human to become a Conjoiner first**.

**North Star:** A five-year-old can play, a scientist can investigate, and an eighty-year-old can create—all through the same few turns of conversation.

### Naming turn — The human

> Let's call this jit djinn and start the chronicle with the turn pair above.

**Decision:** Name the new JIT project **Djinn** and establish its Chronicle with the preceding turn pair. This does **not** authorize a UI implementation, backend design, credential flow, or GitHub write operations beyond creating this record.

### Open frontier

Determine the smallest honest end-to-end conversational experience that creates, publishes, revises, and safely recovers one composable JIT artifact for a novice. Reuse the proven JIT/Gate/Sanctum mechanisms after inspection; do not silently assume GitHub Pages can provide authenticated write access or that an unconnected chat interface can perform privileged operations. Preserve the simplicity of the human experience while keeping permissions, publishing, and verification real.
