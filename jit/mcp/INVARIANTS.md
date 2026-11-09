# CURRENT ROUTING CONTRACT — native Android WebView (2026-11-09 UTC)

**CURRENT EXECUTION AND NEXT WORK: [HANDOFF.md](HANDOFF.md), active section only.** v6 is LIVE (observe/extract/fill verified); click/navigation and full v6 acceptance remain unverified. Historical E6/E8 checklists and next actions lower in this document are superseded and must not be executed.

**READ THIS FIRST.** The native Android JIT MCP path is **`jit_capabilities()` → `jit_invoke({capability:"browser_observe_v1",input:{}})` → `jit_invoke({capability:"browser_result_v1",input:{command_id}})`**. For generic operations use `browser_command_v1` with its declared schema and then `browser_result_v1`. The same six-tool plugin identity is preserved; do not rename or remove tools.

**Legacy tools deprecated for native Android status/observation:** `device_status()`, `browser_observe()`, and `jit_observe()` operate the old Chrome/page-sharing companion and **MUST NOT** be called to check native Android enrollment, visibility, sharing or DOM. Their `unpaired`, `hidden` and `sharing_disabled` responses are unrelated to the Android WebView. They may remain available for backward compatibility; do not delete or change signatures. Never suggest Chrome pairing or split-screen for native Android.

**LIVE EVIDENCE:** 2026-11-09 04:13:24.408207 UTC, ordinary ChatGPT invoked `browser_observe_v1`, command `d93dab27-f65c-445c-9651-cfa87450015e`, and `browser_result_v1` returned `completed` with real WebView DOM from `https://example.com`, title `Example Domain`, link `Learn more` → `https://iana.org/help/example-domains`, nonce `c4d1fc36-31ba-491f-8469-dfcd4a3e3bdd`, runtime_version 5. This historical v5 observation alone does not prove v6; later independent v6 activation and text-fill evidence is recorded at the chronological end of EXPERIMENTS.md.

**When user says “Sharing” or “Ready”:** immediately enqueue `browser_observe_v1` and poll `browser_result_v1` with the returned command ID while the foreground session is fresh. Do not spend the window calling legacy status tools or asking the user to pair again. If the result fails, diagnose native Supabase session/command records; never use Chrome session status as evidence. Do not regenerate enrollment credentials without an actual native enrollment failure.

**Documentation hierarchy:** this routing contract and observed native tool output override historical E3/E4 README, stale “not built” statements in ANDROID-WEBVIEW, and obsolete sections lower in this file. Preserve the security and release invariants below. For signed Android APK releases use only `.github/workflows/jit-android.yml`, artifact `jit-android-signed/jit-browser-signed.apk`; never substitute unsigned workflows or require user artifact uploads.

---

# JIT MCP — execution invariants and acceptance gate

**Purpose:** Persistent, binding working instructions for any assistant continuing `jit/mcp/`. Read this file before modifying code, generating an enrollment code, asking the human to test, or claiming E6 complete. This is an operational contract, not a progress narrative.

## Authority and reading order

1. Read Sanctum Conjoiner and Contract through the established repository tools. Honor the user's time, agency, and observed device behavior. Do not invent their contents when unavailable.
2. Read this file, `ANDROID-WEBVIEW.md` (architecture/specification), `HANDOFF.md` (checkpoint), `EXPERIMENTS.md` (UTC evidence), and relevant live source.
3. Live deployed code and database records supersede stale handoffs and inferred behavior. Preserve previous working capabilities.
4. Distinguish **specified / implemented / committed / built / signed / deployed / backend-observed / phone-observed / end-to-end verified**. Never collapse these stages.

## Non-negotiable system invariants

- Preserve the existing private six-tool JIT MCP plugin identity and signatures: `integration_ping`, `device_status`, `browser_observe`, `jit_capabilities`, `jit_invoke`, `jit_observe`.
- Repo `bonoj/bonoj.github.io`, `master`, `jit/mcp/`; Supabase project `iqglyokmcobegledbfcm`, Edge Function `jit-mcp-capabilities`, private `jit_browser` tables. Do not redesign, reset, rotate credentials, or change architecture without a demonstrated blocker.
- One installed Android companion should support subsequent signed, versioned JavaScript runtime updates without routine APK reinstalls. Native fixes may require an APK update; acknowledge that explicitly.
- No remote observation without device enrollment, explicit per-origin consent, an active foreground session, and valid authenticated transport. Stop sharing and navigation away revoke access. Never weaken authentication/RLS/consent to make a test pass.
- Only a real, current third-party HTTPS WebView DOM observation counts. No fabricated browser state, canned page text, or local-only inspection substituted for remote acceptance.
- No secrets, signing keys, credentials, enrollment tokens, or private payloads in commits, logs, or public documentation. Preserve the existing Android signing identity.
- User is **not** the automated test harness. Verify source, API contracts, server state, build and UI logic first. Ask for a human action only when actual on-device permission/interaction is indispensable.

## Known split-brain trap — confirmed 2026-11-09 UTC

The legacy `device_status` / `jit_observe` tools returned `unpaired` / `unavailable` **while the E6 Android transport was successfully enrolled and sharing**. The Supabase database independently confirmed **three enrollments and three sessions**, including `https://example.com` sharing approved at `2026-11-09 01:38:10 UTC`, with subsequent heartbeats. These were real sessions, later revoked. Therefore:
- **Never** conclude E6 enrollment failed solely because `device_status` or `jit_observe` says `unpaired`. They are not authoritative for the E6 session path until their implementation is explicitly unified and verified.
- For E6 use `jit_invoke({capability:"browser_pair_v1",input:{}})` to generate enrollment codes, `jit_invoke({capability:"browser_observe_v1",input:{}})` to enqueue, and `jit_invoke({capability:"browser_result_v1",input:{command_id:"..."}})` to retrieve. Check actual schema before invocation. Inspect `jit_browser.devices`, `jit_browser.sessions`, `jit_browser.commands` and relevant function responses to triangulate.
- Pairing is not sharing; sharing is not observation; successful command enqueue is not completed DOM execution.
- A foreground session requires a fresh heartbeat (server checks a 10-second window); commands expire in 30 seconds. Work promptly once the human says “Sharing.” Do not waste that window checking unrelated status tools or asking for a new code.
- Re-enrolling revokes the prior device credential. Do not generate another code if the existing device has enrolled successfully. Do not ask the user to repeat a proven step.

## Android UI invariants

- **Actual phone behavior outranks source-code intent.** If the user says a button does nothing, treat that as a bug, not a misunderstanding.
- Connect must display actionable options, not only “Remote observation off.” A prior bug combined `AlertDialog.setMessage(...).setItems(...)` and hid the action list; commit `be474a2` removed the message. Do not infer UI acceptance from the passing build.
- The status visible in the app must distinguish enrollment, session start, consent, sharing, network failure, and revocation; never claim “sharing” for an unacknowledged server session.
- Test dialog presentation, buttons, navigation/back/forward, URL entry, status legibility, WebView insets, lifecycle and split-screen behavior before requesting installation wherever testing tools permit. If emulator/phone UI testing is unavailable, say **not device verified**.
- A GitHub Actions success verifies compilation, APK signing and upload only. It does not verify a user interaction.

## Work sequence — follow in order

1. **Recover:** Read the authority documents and source. Identify exact deployed versions and current device/backend state. Preserve working functionality.
2. **Form one falsifiable hypothesis:** Name the precise failing boundary (UI → Android transport → Edge Function → SQL → plugin) and its expected evidence. Do not ask the user to re-enroll to investigate a backend discrepancy.
3. **Inspect and reproduce without user friction:** Read Android source, deployed Edge Function, SQL function and tables, workflow, and logs as applicable. Prefer read-only checks. Verify source and live backend match; beware stale repository copies.
4. **Fix the smallest proven defect:** Preserve security and the six tool signatures. Add regression coverage or a deterministic diagnostic for the failure. Do not expand scope into a redesign.
5. **Verify each layer:** Review diff; run available tests; confirm GitHub Actions build/sign/upload; confirm deployment when relevant; run backend API and SQL checks. Record exact commit/run/version and limitations.
6. **Use the human only for final device acceptance:** One clear instruction at a time, only after prerequisites are confirmed. When user reports “Sharing,” immediately enqueue `browser_observe_v1`, retrieve `browser_result_v1` before expiry, and capture a fresh real DOM result. If it fails, inspect command/session records and error paths before asking for another action.
7. **Prove revocation:** Stop sharing, confirm observation is rejected, and verify device pairing may remain intact.
8. **Log UTC evidence** in `EXPERIMENTS.md` and update `HANDOFF.md` with what passed, failed, and the next precise action. UTC timestamps must be obtained from an actual source, not invented.

## E6 acceptance checklist

- [ ] Existing installed signed APK is current; Connect and Enroll UI demonstrably usable.
- [x] Real Android enrollment reached Supabase (database evidence 2026-11-09).
- [x] Real Android foreground sessions and heartbeats reached Supabase (database evidence 2026-11-09).
- [ ] E6 plugin command enqueued while the foreground session is live.
- [ ] Android claims and executes that command against a real HTTPS page.
- [ ] `browser_result_v1` returns fresh page title/text, origin, nonce, UTC observed_at, and runtime_version.
- [ ] Revocation verified; no further remote observation after Stop sharing.
- [ ] Signed runtime update path independently verified without APK reinstall.
- [ ] Any contradictory legacy status UI/API reconciled or explicitly marked non-authoritative.

## Communication discipline

- Be brief, factual and action-oriented. No generic progress updates, no repeated instructions already completed, no speculative claims of success.
- Say exactly which evidence supports a claim. Separate server facts from UI assumptions.
- When a user says “Sharing,” **run the E6 observation immediately**. Do not spend the live session window explaining the plan.
- If a test fails, own it and inspect before asking for more human input.
- Never label E6 complete based on commits, CI, successful enrollment, or sharing alone.

**Next action at this checkpoint:** Confirm the current E6 session state in Supabase, then when the user explicitly shares again, invoke `browser_observe_v1` and `browser_result_v1` immediately. Diagnose any failure from actual command and session records. Avoid unnecessary re-enrollment.


## E8 transport checkpoint

E6 end-to-end and Stop were subsequently verified in ordinary ChatGPT. E7 phone links reached Supabase; the E8 Site now accepts the legacy links shape, covered by fixture tests. E8 Site/Supabase are deployed and the matching signed APK is built, but E8 phone/ordinary-chat acceptance is pending. For generic operations use `browser_command_v1` and `browser_result_v1`. Retain the existing enrollment and verify v4 before approving v5. See HANDOFF for exact current state.
