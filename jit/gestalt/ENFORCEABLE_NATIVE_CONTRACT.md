# Enforceable native contract — exploration

**Status:** Investigation only. No changes to the workbench, contract schema, native app, or build pipeline are authorized by this document.

## Question

How do we let a model construct an idiomatic native Kotlin/Compose prototype while making its fidelity to a declarative experience contract **machine-checkable**, rather than merely plausible?

**Principle:** The model constructs. The contract constrains. The native runtime supplies evidence.

## Existing evidence and boundary

- `mini-gestalt/v1` defines tokens, screen content, ordered components, and actions.
- The browser directly interprets `contract.json`; its Compose/XML tabs are illustrative.
- A model separately authored Kotlin/Compose from that contract; GitHub Actions built an APK and the author exercised it on physical Android, including Save and rotation.
- The native app mirrors values in Kotlin. It does **not** parse the contract at runtime; no deterministic JSON-to-Kotlin compiler or general parity guarantee exists.
- A green Gradle build proves compilation, not semantic compliance.

## What exactly must be enforceable?

| Layer | Contractual claim | Candidate evidence |
| --- | --- | --- |
| Identity | Correct contract/schema version and source revision | Manifest with contract hash, source commit, APK identity |
| Vocabulary | Only recognized components, tokens, and actions | Schema validation; static references or generated registry |
| Structure | Required components, order, labels, relationships | Compose semantics tree / tagged nodes |
| Appearance | Token usage, spacing, typography, responsive constraints | Token references; screenshots and layout geometry |
| Behavior | Tap/selection/save effects, navigation, enabled states | Instrumented interactions and observed state transitions |
| State | Save and selection survive specified lifecycle events | Rotation/recreation/process tests according to explicit requirements |
| Accessibility | Roles, labels, touch targets, contrast expectations | Accessibility/semantics checks and device tests |
| Native execution | Actual installable Android implementation | Gradle build, APK install, device/emulator smoke tests |

These are **candidate obligations**, not assertions that the current contract expresses all of them. A contract can only enforce what it specifies unambiguously.

## Candidate machinery

1. **Contract normalizer/validator:** schema and semantic validation; resolve defaults; reject unsupported actions and ambiguous component IDs.
2. **Explicit acceptance obligations:** derive a small checklist of observable invariants from the normalized contract. Separate hard failures from visual tolerances and unspecified freedom.
3. **Model construction boundary:** provide the contract, native component APIs, permitted tokens, project skeleton, and acceptance obligations. Let the model author idiomatic Kotlin/Compose; do not prescribe a universal deterministic compiler.
4. **Traceability:** require stable semantic IDs or tags linking contract nodes/actions to native Compose semantics and state events. Record the contract hash embedded in the built artifact.
5. **Static checks:** verify expected component/token/action references and prohibited divergence where static analysis is reliable. Avoid pretending source-text matching proves runtime behavior.
6. **Native execution loop:** compile; install; traverse Compose semantics; exercise actions; rotate/recreate where specified; capture runtime events, state, and screenshots.
7. **Comparison and repair:** compare actual observations to obligations; give the model bounded failure reports and allow revisions; rerun affected tests and regressions.
8. **Evidence bundle:** contract revision, source revision, APK/build identity, test results, observed semantics/events, screenshots, and unresolved mismatches. A model-written success summary is not evidence.

## Authority and freedom

- **Contract owns intent and required invariants.** The model may choose native implementation details only within that freedom.
- **Native runtime owns observed behavior.** Neither source code nor model explanations substitute for execution.
- **Human owns taste and acceptance.** Delight, composition, and creative judgment are not reduced to a score.
- **Platform owns idiom.** Native Compose need not resemble the browser's DOM implementation internally.
- **Explicitly distinguish:** schema-valid, builds, installs, behavior-verified, visually accepted, production-ready. None implies the next.

## First small experiment

Keep the existing `mini-gestalt/v1` specimen unchanged. Derive obligations for its four component types, four chips, Save toggle, Explore action, and known tokens. Have a model construct a fresh native implementation from the same contract in an isolated fixture. Compare **observed Compose semantics and interaction state** to those obligations, then deliberately introduce one contract violation and verify the machinery detects it.

This is a proposed experiment, **not a request to execute it now**.

## Open design questions

- Where should obligations live: contract annotations, separate acceptance specification, or derived defaults?
- Which semantic IDs are stable across presentation changes?
- How are actions bound to authoritative state without forcing one ViewModel architecture?
- How do we inspect actual Compose nodes without modifying the user-facing design?
- Which differences are native idiom, which are tolerable approximation, and which violate intent?
- How can the loop remain inexpensive enough to preserve conversational iteration?
- What does a minimal useful evidence bundle look like on a phone-only workflow?
- Can the model repair violations without silently weakening the contract or its tests?

## Working posture

**Dream → build → delight → hand off.** Build enough machinery to make a possibility tangible; don't turn the author's play into a benchmark program. The goal is to lower the cost of trustworthy native experience construction, not to prove a universal performance claim.

**Related:** [README](./README.md) · [Architectural thesis](./spec.md) · [Contract](./contract.json) · [Native source](./android/app/src/main/java/io/github/bonoj/jitgestalt/MainActivity.kt).
