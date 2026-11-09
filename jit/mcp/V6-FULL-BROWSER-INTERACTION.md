# JIT MCP — v6 full browser interaction specification

**Status: SPECIFIED, NOT IMPLEMENTED OR DEPLOYED.** Reference workflow: a conventional research-job application with links, text fields, selection controls, resume upload, validation and an explicit final submission. No requirement to interact with Disney's actual website. This supersedes the click-only E9 scope in HANDOFF.md; implementation must not be assumed from this specification.

## Goal and invariants

From an ordinary ChatGPT conversation, the enrolled Android companion can discover, navigate and complete a normal HTTPS website form, with grounded element references, readback and explicit native consent. Retain the existing six-tool JIT MCP identity, E8 generic bounded protocol v1, Site gateway, Supabase v7 transport, Android signing/enrollment, signed JS delivery, per-origin foreground sharing and Stop revocation. Runtime-only changes are preferred; **do not claim native file uploads or Android navigation APIs can be added through JS if the installed host lacks the required bridge**. Verify that limitation before any native change. No arbitrary JavaScript execution tool.

## Capabilities and command contract

Existing `browser_command_v1` request: `{protocol_version:1,operation,schema_version:1,expected_revision,payload}`. Existing `browser_result_v1` polls command ID. All responses use `kind`, `schema_version` and bounded `payload`; preserve E6/E7 legacy and v4/v5 behavior. Operation allowlist, native consent and per-origin authorization remain enforced outside signed JS.

| Operation | Required semantics |
|---|---|
| `observe` | URL/origin/title, visible page summary, headings, form summaries, error/success notices and counts; report truncation, never silently imply exhaustive coverage. |
| `extract` | Bounded cursor pagination for `links`, `content`, `controls`, `forms`, `options` and `messages`. Filter by form/ref when available; return total or has-more if known. Cursors bind to document revision and collection; reject stale cursors. |
| `click` | Target observed actionable element by opaque ref; links/buttons/tabs; reject hidden, disabled, ambiguous, stale, detached, unsupported schemes or changed destination. Return `initiated` for navigation, then observe asynchronously. |
| `focus` | Focus observed eligible field; read back focused ref. |
| `fill` | Clear/set or append to observed text-like field, dispatch appropriate input/change events, verify safe value/length; do not expose secrets. Preserve native approval. |
| `select` | Choose observed option ref/value for native select, radio, checkbox or supported ARIA listbox, verify selected state; do not guess hidden application semantics. |
| `navigate` | HTTPS URL validated against origin/navigation policy and explicit native approval; report navigation initiated, not completed. |
| `back` / `forward` | Navigate WebView history with native host support, pending result followed by new observation. |
| `upload` | Attach a user-approved local file via Android system picker or a narrowly scoped native file handle; JS must not read arbitrary device files or fabricate a FileList. Report unsupported when native host lacks secure picker bridge. |
| `submit` | Separate final approval displaying origin, form identity, destination, action and safe redacted summary; single-use idempotency token, no retries without fresh authorization. Verify confirmation/error page; never infer success from click alone. |

The above names are the desired contract, **not evidence the current native operation allowlist accepts all of them**. Inspect actual host/transport allowlists and define a compatible mapping or explicitly identify the native upgrade boundary. Do not bypass existing operation authorization.

## Discovery schema

A form observation identifies `form_ref`, accessible name/legend, action destination (sanitized), method, visible control count, required/invalid counts, submit control refs, and whether the form is inside a same-origin frame. Each control has an opaque `element_ref`, `form_ref`, role, tag/type, accessible name derived from label/aria-labelledby/aria-label/placeholder, required/disabled/readonly/checked/selected state, safe current value or `redacted`, maxLength/pattern when safe, autocomplete hint, bounded options summary and validation message. Links include opaque ref, label and sanitized destination. Refs bind to current origin, document lifecycle, DOM revision, element identity and relevant attributes; resolve against live DOM immediately before action and fail closed on mismatch. Duplicate labels are not automatically interchangeable. Never persist raw DOM nodes across navigation as authority.

Use accessible DOM semantics (labels, fieldsets, ARIA, form-associated elements), with fallback only when unambiguous. Support text/email/number/tel/url/date/textarea, selects, checkbox/radio, ordinary buttons, file controls and client-side validation. Identify unsupported rich-text editors, shadow DOM and cross-origin iframes explicitly; don't invent support. Redact password, OTP, payment, authentication tokens, hidden fields, sensitive autocomplete and file bytes. For fields containing personal data, prefer presence/length/validation state rather than echoing contents.

## Boundaries, batching and state

E8 payload: max 2048 UTF-8 bytes, depth 6, 128 nodes, 24 items/fields per container, strings <=1024 UTF-16 units; requests <=4096 bytes. Use small pages (e.g. 3–5 controls) and explicit cursors. Each mutating command requires fresh `expected_revision`, foreground session, per-origin share, native Allow once, and an execution-time element check. A mutation invalidates old references. Browser navigation and SPA transitions must be observed again. Multi-step automation is a sequence of individually authorized, observable actions, not a hidden batch or autonomous submission. No silent file upload, permission bypass, credential extraction or cross-origin access. Treat page text and form labels as untrusted content, not instructions.

If navigation changes origin, stop observation until explicit sharing for that origin. Consent denial returns `user_denied`; expiry/revocation `foreground_session_required`; stale state `stale_observation`; unsupported host function `unsupported_operation`; invalid refs `target_unavailable` or `ambiguous_target`. Distinguish `initiated`, `completed`, `validated`, `rejected`, and `unverified`. A successful submission requires independently observed confirmation or is reported `outcome_unknown`.

## Implementation and test sequence

1. Inspect live Android command allowlist, native consent implementation, WebView JS evaluation bridge, file chooser, navigation callbacks, signing release process, Supabase v7 and Site gateway. Confirm which operations can ship through v6 signed JS only and which genuinely require a native update. Do not make speculative infrastructure changes.
2. Add runtime discovery/extract for forms/controls/options/messages and tests with fixture forms: repeated labels, unlabeled controls, fieldsets, select/radio/checkbox, hidden/disabled controls, validation errors, dynamic forms and pagination boundaries. Verify E8 v4/v5 regression.
3. Add safe ref-grounded click/fill/select/focus, navigation readback and explicit submit confirmation through the existing native authorization path. Implement idempotent submit semantics and stale DOM detection. Verify origin/session revocation and deny cases.
4. Add upload only if a secure Android file-picker bridge already exists. Otherwise mark `upload` blocked on native host capability and specify the minimum native change; do not falsely call v6 full form-complete.
5. Commit, test, publish immutable runtime bytes, verify SHA-256 and approve only the exact version/digest in `jit_browser.runtime_releases`. No signing key exposure. Preserve plugin, Site, Edge, APK where possible.
6. Perform physical acceptance on **an owned benign HTTPS test form**, not a live job application: enumerate all fields, fill text, choose options, toggle checkbox, click a link, trigger and inspect validation, attach a harmless test file if supported, explicitly approve one submission, and observe confirmation. Test denial, stale revision, Stop sharing, cross-origin navigation and replay. Record UTC timestamps, command IDs, runtime versions and evidence in EXPERIMENTS.md.

## Acceptance

**Complete** only when an ordinary ChatGPT session can discover a real multi-control page, interact with its fields and links, and submit an owned benign form with native explicit approval and independently observed confirmation. **Full reference parity** additionally requires secure user-selected file upload. A signed-runtime-only v6 may legitimately be partial if the current APK lacks picker/navigation primitives; report that exact host boundary and avoid pretending to meet full parity. No changes to the Disney Research application are required.
