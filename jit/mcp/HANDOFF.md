# JIT MCP — ACTIVE EXECUTION PATH (2026-11-09 UTC)

**One entrypoint:** [HANDOFF.md](HANDOFF.md) → [INVARIANTS.md](INVARIANTS.md) → [V6-FULL-BROWSER-INTERACTION.md](V6-FULL-BROWSER-INTERACTION.md) acceptance gates → latest chronological entry in [EXPERIMENTS.md](EXPERIMENTS.md). Other documents are background or historical. **Do not execute an older handoff, old E6 checklist, or earlier “v6 not active” status.**

## Established production baseline (do not redo)

- Private **six-tool JIT MCP** plugin in **ordinary Android ChatGPT**; native path is `jit_capabilities` and `jit_invoke` using `browser_command_v1` / `browser_result_v1`. Legacy `device_status`, `browser_observe`, `jit_observe` are **not native Android diagnostics**.
- Native WebView companion is enrolled and running; signed remote **runtime v6 is LIVE**. Approved v6 SHA-256: `4ed8f295771878b7e5218e4b3f281d7dc7d4e87e8dda9f67d4cf7f0a12a39fc0`. Real Android observe, paginated controls extraction, and text fill returned completed v6 results on 2026-11-09 04:24–04:27 UTC. See EXPERIMENTS for command IDs.
- Existing Site gateway, Supabase project `iqglyokmcobegledbfcm`, signing root, enrollment, plugin identity, and APK must be preserved. **No reinstall, re-pairing, redeploy, signing approval or new v6 implementation without evidence of a specific defect.**
- A previous `click` command `7985bd6d-245b-4617-889b-a8ba87a33611` was queued but result lookup returned `command_not_found` twice. **Click and navigation are NOT verified.** Do not claim v6 full browser acceptance from the successful text fill.
- The last application interaction was a user-requested name fill only. **Do not revisit, click or submit the Disney Research application without fresh user authorization.**

## Next engineering job — execute in this order

1. **Read before acting:** this file, INVARIANTS, v6 hard acceptance gate, newest EXPERIMENTS entry, then relevant live source. Check current `master` and deployed state. Do not reinterpret old “not built”/“not active” paragraphs as current facts.
2. **Diagnose `command_not_found` read-only first:** inspect exact command ID, private Supabase command/result/session records and expiry/cleanup, Site result adapter, Edge claim/ack, native navigation lifecycle. Establish whether command was executed, expired, revoked, or deleted. Distinguish a transport error from a real click. Do not ask for another sharing session to perform this investigation.
3. **Fix only the proven failing boundary:** preserve protocol v1, bounded versioned envelopes, signed runtime, same-origin/foreground consent, revision checks, replay/rollback defenses, Stop revocation, and v5 fallback. Add regression tests for the exact failure and navigation-result race. No broad redesign, speculative deployment or APK update.
4. **Verify source/tests/backend without user:** run existing `runtime/v6.test.mjs` and relevant transport tests; check actual deployment and runtime digest if changed. If a native change is proven necessary, use **only** `.github/workflows/jit-android.yml` and its signed `jit-android-signed/jit-browser-signed.apk` artifact; preserve signing identity and enrollment. A CI pass is not device acceptance.
5. **Prepare one safe, owned HTTPS test flow** for full acceptance, not an active application or third-party submission: bounded pagination; a benign link click and navigation readback; back/forward; two distinct field fills with post-action DOM readback; select and checkbox/radio state; validation feedback; Stop-sharing denial; subsequent signed runtime capability without Site/Edge/APK change. Check cross-origin consent and fail-closed behavior. If no owned fixture exists, create/test one before asking the user to share.
6. **Only then ask for minimal physical interaction:** one foreground sharing/consent session and, only if proved indispensable, one in-place signed APK update. Immediately use native `browser_command_v1` `observe` → `browser_result_v1`; for subsequent operations use a fresh device-returned DOM `revision`, current `lN/cN` refs and per-operation user authorization. Never reuse historical revisions. Observe postconditions independently. No automatic consequential submission.
7. **Close against the v6 spec, not a demo:** report gates A–H individually as PASS/FAIL/NOT TESTED with real command IDs, `observed_at` UTC, origin, revision and runtime version. Record actual evidence at the **chronological end** of EXPERIMENTS, then update this short handoff. Do not claim full completion while any required gate is unverified.

## Minimal native call shape

```js
const q = await tools.mcp__JIT_MCP__jit_invoke({
  capability:"browser_command_v1",
  input:{protocol_version:1,operation:"observe",schema_version:1,expected_revision:null,payload:{}}
});
// Obtain q's returned command_id, then:
const result = await tools.mcp__JIT_MCP__jit_invoke({
  capability:"browser_result_v1",
  input:{command_id:"<returned command_id>"}
});
```

The tool's pending response is **not** an executed action. Read the completed result. Fresh revision is required for follow-on `extract`, `fill`, `click`, etc. If a command disappears, investigate the lifecycle before reissuing it.

## Stop conditions

Stop and report the exact blocker if current production contradicts documentation, consent cannot be enforced, command state is ambiguous, or a requested operation is consequential without explicit confirmation. Never silently weaken authorization, migrate transport, rotate keys, reset enrollment, or make the user debug infrastructure.

---
# Archived handoffs and prior checkpoints — historical, not executable

The material below records earlier implementation and release stages. **All “next action”, “not activated”, and “not built” statements below are superseded by the active execution path above.** Consult for provenance only.

---

# CURRENT HANDOFF — v6 LIVE on native Android (2026-11-09 04:27 UTC)

**Read [INVARIANTS.md](INVARIANTS.md), then the newest entry in [EXPERIMENTS.md](EXPERIMENTS.md). This section supersedes earlier v5-only and v6-not-activated statements below.**

**Current production truth:** v6 is approved in private Supabase `jit_browser.runtime_releases` at SHA-256 `4ed8f295771878b7e5218e4b3f281d7dc7d4e87e8dda9f67d4cf7f0a12a39fc0`, and **physically verified executing** in the enrolled Android WebView. In ordinary ChatGPT, v6 `observe` returned `https://example.com` at `04:24:17.325015Z`. On `https://la.disneyresearch.com`, v6 `observe` and `extract controls` found a real Disney Research application form; v6 `fill` of `c0 Name*` with `human name` completed at `04:27:40.774304Z`, `accepted:true`, `length:9`. **No APK reinstall, re-enrollment, plugin identity change, Site redeploy or Edge redeploy was needed in this session.** Do not infer installed APK version from runtime version.

**User's last explicit browser constraint:** “Fill in the name form. Don't click anything.” That task completed. **Do not click, navigate, or submit on Disney Research without a new explicit user request.** No application was submitted.

**Next steps (priority order):**
1. **Fix command/result lifecycle for clicks without user disruption.** A v6 `click` to Example Domain's `Learn more` link was enqueued as command `7985bd6d-245b-4617-889b-a8ba87a33611`, but `browser_result_v1` returned `command_not_found` twice. Diagnose live `jit_browser` command/session/result records, device claim/ack/expiry and cross-origin revocation semantics. Do not claim the click occurred. Avoid using an active job application form as the test target.
2. **Verify a benign click end-to-end** only with fresh user authorization and foreground sharing: observe a safe page, use the fresh `revision` and returned `lN` reference, enqueue `click`, read its command result, then independently observe the destination or same-origin page. Cross-origin arrival must require explicit consent; do not bypass per-origin controls. Record exact UTC evidence.
3. **Test v6 extension carrier** `operation:"extract"`, `payload:{extension:"inspect_metadata"}` (with fresh revision), then bounded form controls, select/checkbox and history only on benign test pages with explicit consent. Verify fail-closed on stale revisions, hidden/unsafe targets, cross-origin requests, consequential submit, and Stop sharing.
4. **Verify latest signed APK provenance separately** using canonical `.github/workflows/jit-android.yml` and `jit-android-signed` artifact. Prior successful run `42548481030` produced artifact `13644790627` on commit `2f8bb5a...`; that does not prove current versionCode 4 installation. **Do not require a new APK merely to activate v6**; remote JS v6 already works.
5. Update EXPERIMENTS with real UTC command IDs, outcome and limitation; keep this handoff current. Preserve six-tool plugin identity, signing root, consent, enrollment, and v5 fallback.

**Native tool recipe:** `jit_capabilities` if needed → `jit_invoke({capability:"browser_command_v1",input:{protocol_version:1,operation:"observe",schema_version:1,expected_revision:null,payload:{}}})` → `jit_invoke({capability:"browser_result_v1",input:{command_id}})`. For `extract` or `fill`, use a fresh device-returned `revision`. The last verified fill used `{operation:"fill",payload:{ref:"c0",label:"Name*",value:"human name"}}` and `expected_revision:"e64a3e0c-bd1c-4e87-b7ef-ac287f954a3b"`. **Never reuse that revision for future commands.** Legacy `device_status`, `browser_observe`, `jit_observe` describe a different Chrome companion and are non-authoritative for native Android.

---

# NATIVE ANDROID MCP — FIRST ACTION (2026-11-09 UTC)

**Authoritative:** [INVARIANTS.md](INVARIANTS.md). For a sharing Android user, immediately call `jit_invoke({capability:"browser_observe_v1",input:{}})`, then `jit_invoke({capability:"browser_result_v1",input:{command_id}})`. For generalized browser actions, discover `browser_command_v1` in `jit_capabilities` first. **Never use `device_status`, `browser_observe`, `jit_observe` to infer native Android status**; those are legacy Chrome companion interfaces. No split-screen/Chrome pairing/re-enrollment advice based on them.

**Just verified:** ordinary ChatGPT received completed real Android WebView DOM observation at 2026-11-09 04:13:24.408207 UTC, command `d93dab27-f65c-445c-9651-cfa87450015e`, `https://example.com`, runtime v5, link to iana.org. User was already sharing; no enrollment action was required. v6 runtime and physical signed APK upgrade are not yet verified. Preserve signed-release workflow `.github/workflows/jit-android.yml` and six-tool identity. Record actual results in EXPERIMENTS, not fabricated CI/device claims.

---

# CURRENT HANDOFF — Android JIT MCP release discipline (2026-11-08)

## Non-negotiable release contract

**Only one canonical APK release workflow:** [`.github/workflows/jit-android.yml`](../../.github/workflows/jit-android.yml). It runs on Android/runtime changes and manual dispatch, runs `node --test jit/mcp/runtime/v6.test.mjs`, builds `:app:assembleDebug` using Gradle 8.10.2, signs with existing repository Actions secrets `JIT_APK_KEYSTORE_BASE64` and `JIT_APK_KEYSTORE_PASSWORD`, alias `jit-browser`, verifies with `apksigner verify --verbose --print-certs`, and uploads **`jit-android-signed`** containing **`jit-browser-signed.apk`**. It retains artifacts 14 days and fails on missing artifacts. Do not expose keystore, passwords or secret values.

**Never substitute an unsigned build** (`app-release-unsigned.apk`), request that the user upload a CI ZIP, request a run URL/ID, create another competing APK workflow, or suggest uninstall/re-enrollment as an upgrade path. Inspect the repository's existing successful signed workflow and Actions artifact history FIRST. If artifact retrieval is unavailable to a particular connector, state the actual limitation; don't confuse that with the artifact not existing. A green workflow means CI tests, signing and signature verification passed, **not** physical-device acceptance.

**Current changes:** restored canonical signed pipeline trigger (44c5485); added Node runtime regression gate, Gradle 8.10.2 and required signed artifact (164d2a3); deleted duplicate unsigned workflow (7e9f878). Those are committed changes, **not evidence that the newest signed run has completed**. Check Actions for actual green run and artifact before claiming ready.

**Release acceptance:** verify signed APK exists and is nonempty; verify signature/certificate matches currently installed app, package ID and monotonically increasing versionCode; verify in-place upgrade preserving enrollment; check foreground session consent, ordinary ChatGPT observation/interactions, cross-origin denial, stop/revocation and v5 fallback. Record actual UTC evidence in EXPERIMENTS.md. A build passing CI is not proof of runtime v6 activation: signed runtime approval is a separate process; do not conflate APK signing and remote-JS signing.

**Recovery procedure:** read this file, [README.md](README.md), [ANDROID-WEBVIEW.md](ANDROID-WEBVIEW.md), [INVARIANTS.md](INVARIANTS.md), [EXPERIMENTS.md](EXPERIMENTS.md), and canonical workflow; inspect latest signed Actions run and artifact. Fix the canonical workflow in place if broken. Do not ask the user to perform repository/CI retrieval steps the assistant can do. Request user action only for genuinely physical Android installation, foreground sharing and consent.

---

# E10 continued — 2026-11-08

- Fixed v6+ signed operation manifest fallback: malformed/absent manifest now denies every operation; only older signed v5 uses the legacy compatibility list (commit 65f520c).
- Implemented explicit foreground, same-origin, session-scoped interaction consent. Android Share dialog clearly authorizes read/navigation/ordinary form actions for that session, with immediate Stop revocation; consequential submissions remain blocked. Avoids per-action permission prompts only after explicit approval. DeviceTransport.start now takes a boolean and MainActivity calls start(true) (commits c97d470, aa727ea).
- Re-exercised 11 simulated v6 runtime checks including signed manifest, inspect_metadata through extract carrier, text fill, select, checkbox, click, navigation/history and cross-origin rejection. These are V8 mock checks, not Node CI or physical Android results.
- Local execution environment contains an existing Android release keystore with one alias, jit-browser, but has **no Android SDK, Gradle or unsigned APK**; do not expose keystore contents or password. No APK was signed, built, downloaded, or verified. GitHub workflow was committed, but its run/artifact status could not be established through available commit-status/PR-run tools. Never ask user to install an unverified APK.
- Live Supabase Edge v9 remains active; v5 remains sole approved signed runtime. Continue build/CI verification and in-place signing compatibility, then device acceptance. Do not claim E10 complete.

---
# E10 foundation update — 2026-11-08 (not yet accepted)

**Committed:** DeviceTransport signed-source operation class manifest (read, interact, navigate, consequential) with deny-by-default unknown classes and no consequential execution, preserving legacy v5 fallback. v6 source declares the classes in its signed bytes, adds inspect_metadata as a new operation and also exposes it through the existing extract carrier. Edge transport protocol.mjs no longer hardcodes operation names; Edge Function v9 deployed ACTIVE with JWT preserved. Android version 0.4.0 (versionCode 4). GitHub Actions workflow .github/workflows/jit-mcp-android-build.yml added with Node v6 fixture gate and unsigned release APK artifact. **Workflow result, actual APK artifact and signing are not yet verified.**

**Critical discovered limitation:** Ordinary ChatGPT Site's published browser_command_v1 input schema still lists nine operation names. A direct new operation name will be rejected there. Signed-runtime-only extensibility must therefore use a risk-class-preserving carrier (e.g. extract + payload.extension=inspect_metadata) until the Site schema is generalized. This carrier must be verified on a real device; do not claim end-to-end success from fixture tests.

**Remaining:** Confirm GitHub Actions build and fixture tests; obtain APK artifact, sign with original Android release key using Android-compatible APK signing and verify upgrade compatibility; validate signed runtime release bytes and SQL approval; real device session, form and navigation readback, stop/revocation and extension carrier acceptance. Do not request reinstall or declare completion before APK is verified.

---
# v6 implementation checkpoint — 2026-11-08 (do not mistake for acceptance)

Binding target: [V6-FULL-BROWSER-INTERACTION.md](V6-FULL-BROWSER-INTERACTION.md). The earlier E9 click-only handoff below is superseded.

**Verified repo changes:** Native DeviceTransport now accepts 256 KiB signed runtime scripts and up to 512 KiB runtime HTTP response, increases native approval timeout to 30s, and maps target errors/navigation transitions. Signed runtime release loader limit changed to 256 KiB. v6.js implements observe, paginated links/content/controls/forms/options/messages, click, fill, dropdown/checkbox/radio through fill, same-origin navigate and history back/forward. Native-compatible operation names preserved. Test fixture `runtime/v6.test.mjs` added. An in-tool simulated DOM check passed 11 operations, but CI/node and device tests are not yet verified.

**Verified live backend:** Supabase Edge Function `jit-mcp-capabilities` version 8 ACTIVE, runtime loader 256 KiB verified by fetching deployed function. Private runtime approval table remains v5 only; v6 has **not** been signed/approved/activated. Installed Android companion remains unchanged.

**Open engineering blockers:** Build/sign and distribute native APK preserving signing identity; verify runtime test suite in CI; operation-class manifest extensibility (current host, Site, Edge protocol still name-allowlisted); real WebView history and navigation race behavior; stable DOM refs across reorder; confirm release HTTP response and SHA256; physical ordinary-ChatGPT acceptance; update EXPERIMENTS with observed UTC evidence. No human action requested until build and deployment are verified. Do not claim completion.

---

# JIT MCP handoff — E9 native-consented DOM clicking

## Verified E8 baseline (2026-11-09 UTC)

Read [EXPERIMENTS.md](EXPERIMENTS.md) for exact live command IDs, UTC timestamps, result revisions and evidence. Ordinary Android ChatGPT successfully observed Wikipedia headings and links on runtime v5, then scrolled the physical WebView from 0 to 300 px. Runtime v5 was activated by approving its signed release digest, without Site, Supabase Edge Function or APK changes. Legacy v4/E7 link readback works. Native **Allow once** prompt was user-observed twice for click commands, but both fresh-revision clicks failed closed as `unsupported_operation`. An obsolete revision failed as `stale_observation`. No click was executed. The user has **not** yet performed a post-v5 Stop sharing revocation test.

## E9 objective

Implement and verify one real, harmless DOM link click in the existing Android companion, from ordinary ChatGPT, through the existing private six-tool JIT MCP plugin and unchanged Site/Supabase transport/APK. Deliver **signed remote JavaScript runtime v6 only** if possible. No re-enrollment, app reinstall, credential rotation, gateway redeployment or plugin changes.

## Required design and security

1. Read [INVARIANTS.md](INVARIANTS.md), [ANDROID-WEBVIEW.md](ANDROID-WEBVIEW.md), [E8-TRANSPORT-FOUNDATION.md](E8-TRANSPORT-FOUNDATION.md), [EXPERIMENTS.md](EXPERIMENTS.md), runtime v5 and Android native command/consent executor before editing. Inspect actual production runtime signing/publishing/approval mechanism; never assume a GitHub commit is a live signed release.
2. Introduce a **bounded, stable link reference** in v6 observation/extraction. Link reference must identify a real, currently eligible DOM anchor in the *current document*, not an arbitrary URL supplied by the model. Include a human-readable label and sanitized HTTP(S) destination. Support deterministic disambiguation when labels repeat, paginated extraction, and explicit rejection of missing, ambiguous, stale, hidden or non-HTTP(S) targets. Do not expose or click password fields, download links, dangerous schemes, or hidden elements.
3. Require native foreground user consent for click, using existing **Allow once** prompt. Do not bypass or weaken the existing prompt, origin/session authorization, revision check, operation allowlist, or signed runtime verification. Bind the click to the same page/element state that was shown for approval. If the existing host cannot guarantee this, stop and document the exact limitation rather than silently widening privileges.
4. Handle in-page anchor movement and full navigation distinctly. A click may initiate asynchronous WebView navigation: do not report successful arrival from a synchronous `element.click()` alone. Return `initiated`/pending as appropriate, then verify new URL/DOM through a subsequent observation and active sharing/consent rules. Respect per-origin sharing; cross-origin navigation must not silently grant observation access to the new origin.
5. Preserve generic bounded protocol v1 and existing v4/v5 compatibility. No unbounded extraction, raw script injection, synthetic native consent, or automatic submission. Include tests for stale revisions, duplicate labels, changed DOM, hidden links, unsupported schemes, origin changes, permission denied, Stop sharing, invalid/oversize payloads and signed runtime rollback/tampering.

## Execution

- Implement, test and commit v6 runtime and its tests in `bonoj/bonoj.github.io` on `master`, under `jit/mcp/`.
- Publish the exact immutable v6 runtime bytes at the existing static release URL. Verify their SHA-256 and approve **only that exact digest** in private `jit_browser.runtime_releases` using the existing mechanism. Never expose the signing secret or replace the signing root.
- Do not modify Site/Supabase Edge/APK unless a concrete, verified native limitation makes runtime-only execution impossible; document the limitation and stop before making broad architectural changes.
- Ask the user only for necessary Android foreground sharing/Allow once interaction. In ordinary ChatGPT, observe a benign public test page, extract an unambiguous link reference, request click, await the user's approval, then observe the result. Record real UTC command IDs, outputs, runtime version, result origin and revision.
- Verify rejection after Stop sharing. Update [EXPERIMENTS.md](EXPERIMENTS.md) with observed versus verified outcomes and this handoff with current production state.

## Definition of done

**A physical Android WebView executes one real link click after native Allow once, and ordinary ChatGPT independently observes the resulting page or in-page navigation.** This must work with the same plugin, Site, Supabase transport and APK as E8, with v6 signed-runtime-only activation. If the host cannot safely execute clicks through signed runtime alone, report exactly why; never claim success from command acceptance or a permission popup alone.
