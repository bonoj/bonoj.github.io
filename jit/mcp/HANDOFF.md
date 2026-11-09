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
