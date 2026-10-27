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


## Fixture 0 — obligations derived from the current specimen (2026-10-27)

**Inspection basis:** `contract.json` and `android/app/src/main/java/io/github/bonoj/jitgestalt/MainActivity.kt`. These are observations of source, **not** executed test results. Baseline branch: `gestalt-working-baseline-2026-10-27`.

### Contract-explicit, machine-checkable candidates

| ID | Obligation | Native observation |
| --- | --- | --- |
| C01 | Hero title `Collect what moves you` and body text are present | Semantics text nodes |
| C02 | Chip labels `Interiors`, `Recipes`, `Cats`, `Gardens` are present | Four labeled selectable nodes |
| C03 | Card title `The observatory` and body are present | Semantics text nodes |
| C04 | Card action is labeled `Save idea` initially | Action node label |
| C05 | Primary action is labeled `Explore ideas` | Action node label |
| C06 | Token values include background `#f7f7f5`, ink `#242424`, accent `#bd1831`, radius `16`, spacing `12` | Normalized contract and implementation mapping; visual inspection only where relevant |
| C07 | Ordered components are hero → chips → card → button | Tagged Compose semantics order / hierarchy |

### Present behavior that the contract does **not** fully specify

- Native chip taps select one chip; tapping it again clears selection. Browser chip taps select but do **not** toggle off.
- Native Save toggles between `Save idea` and `✓ Saved`. Browser also toggles, but the JSON does not formally define the transition.
- Native Explore increments a visible counter; browser Explore only updates a workbench status line. Neither result is declared in the contract.
- Native uses `rememberSaveable` for state; browser holds local JavaScript state. Lifecycle persistence is not a contract obligation.
- Native adds a footer and has a different screen title presentation; the contract does not yet say whether additions are allowed.
- Native hardcodes token colors and uses 20dp outer padding; the contract's `spacing: 12` does not define all padding behavior.

**Finding:** If we blindly derive behavioral tests from the current Android source, we would accidentally turn one model interpretation into contract law. If we derive them from the browser, we would canonize a different interpretation. Neither is authoritative. The contract must first say what a chip selection, Save, and Explore **mean**, and which visual/layout details are binding.

### Minimal extension to investigate, not implement

Give each interactive component a stable ID and an action with explicit state transition or observable effect. For example, `chip-group/interests` owns `selectedInterest`; `card/observatory` toggles `saved`; `button/explore` declares an event or navigation intent. Declare whether selection can be cleared, whether Save survives recreation, and whether added native-only presentation is allowed.

**Enforcement ladder:** (1) schema-valid → (2) contract obligations extracted → (3) native app builds → (4) semantics/action tests run → (5) observed transitions satisfy obligations → (6) human accepts experience. Report each independently.

**Next decision:** author the smallest behavior semantics extension or keep the current specimen intentionally underspecified and enforce only structure/text. Do not silently claim full behavior parity from `mini-gestalt/v1`.


## Behavioral covenant — proposed minimum (2026-10-27)

**Decision:** Explore a small, separately reviewable covenant before extending the full UI schema or changing the native prototype. The existing `mini-gestalt/v1` contract remains intact.

### Division of authority

- **Experience contract:** what exists, what it means, and which behavior must hold.
- **Covenant:** a concise set of state transitions and invariants extracted from explicitly resolved intent.
- **Model:** free to choose Kotlin/Compose structure, state-holder patterns, layout, and native idiom.
- **Independent verifier:** translates the covenant into observations and checks against the built app; it does not infer correctness from the model's explanation.
- **Human:** resolves consequential ambiguities and accepts the felt experience.

### Illustrative covenant, not yet approved behavior

```yaml
schema: gestalt-covenant/proposal-1
contract: mini-gestalt/v1
state:
  saved: boolean
actions:
  save:
    effect: toggle(saved)
invariants:
  - saved state is observable
  - save is reversible
  - saved state survives activity recreation
```

This YAML is a discussion specimen, **not** an accepted schema, generated test, or change to `contract.json`. In particular, lifecycle persistence and deselection semantics have **not** been authorized as contractual requirements.

### Ambiguity ledger

| Question | Browser today | Native today | Covenant status |
| --- | --- | --- | --- |
| Tap selected chip again | Stays selected | Deselects | Unresolved |
| Tap Save | Toggles saved | Toggles saved | Candidate invariant; contract silent |
| Tap Explore | Workbench status | Visible counter | Unresolved |
| Rotate/recreate | Not applicable as Android lifecycle | Uses `rememberSaveable` | Unresolved |
| Add native-only labels/footers | Different presentation | Extra footer | Unresolved |

**Rule:** Differences are questions, not automatic failures. Neither the web renderer nor current native source is the behavioral oracle.

### Minimum useful enforcement experiment

1. Select **one** explicitly approved invariant (e.g., Save toggles and is observable); leave the other questions unresolved.
2. Freeze that covenant independently of the model's generated Kotlin.
3. Have the model construct a separate native fixture from contract + covenant using the known-good Android build skeleton.
4. Build and instrument the fixture; observe actual UI semantics and action effects.
5. Deliberately break Save behavior and require the independent check to fail.
6. Restore the behavior and require the same check to pass.
7. Keep a compact evidence record: contract/covenant hashes, source SHA, APK identity, observed transitions, test verdict, and remaining unknowns.

**Acceptance criterion for the machinery:** it must reject a known violation and accept the restored behavior without editing or weakening the covenant. A green build alone is insufficient.

**Guardrail:** preserve the `gestalt-working-baseline-2026-10-27` branch and existing web/native prototype. Any implementation work goes into an isolated fixture or branch, not the known-good app. No implementation work is authorized by this section.

### Guiding hypothesis

The smallest useful contract may be an accumulating record of **resolved intentions**. Ask the human only when an ambiguity changes the experience materially. Don't force every visual or implementation decision into specification, and don't let the implementation author silently author its own acceptance criteria.
