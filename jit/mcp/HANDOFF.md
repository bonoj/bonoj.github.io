# JIT MCP — current handoff (2026-11-08)

## Goal

Preserve the **same private JIT MCP plugin** and working Android observation transport. Complete E5 by proving that a new typed, harmless capability can be independently deployed and invoked through the permanent MCP tools from ordinary ChatGPT **without a plugin or Site republish for each capability**. GitHub Pages remains the default frontend.

## Canonical references

- Repository: `bonoj/bonoj.github.io`, branch `master`, directory `jit/mcp/`.
- Existing Site: https://jit-mcp.bracedbuddy1.chatgpt.site
- Android companion: https://jit-mcp.bracedbuddy1.chatgpt.site/device
- Existing plugin ID: `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`.
- Existing Site project ID: `appgprj_6af07fda46ec8191a71e9df6f4bc9e75`.
- Plugin current release: `PluginRelease_a2893093886481919da01bd918ca4504`, v1.0.0, created `2026-11-08T13:59:23.433598Z`; only release returned by release listing.
- Read `EXPERIMENTS.md`, `E5-PERMANENT-INTERFACE.md`, `E5-DEPLOYMENT-BOUNDARY.md`, `CONTRACT.md` before modifying anything.

## Verified

- E2 `integration_ping`: verified ordinary chat.
- E3 `device_status`: real Android pairing, visible/online heartbeat verified.
- E4 `browser_observe` and stable `jit_observe`: **FULLY VERIFIED on Android** in ordinary chat. Shared counter 0 at `2026-11-08T15:19:05.784Z`, refreshed counter 1 at `15:19:36.462Z` with distinct nonce, then explicit Stop sharing yielded `available:false,reason:sharing_disabled,consent_active:false` while `device_status` remained paired/online/visible at `15:20:13.654Z`. Hidden-page observation was correctly stale. Exact data in `EXPERIMENTS.md`.
- E5 live Site exposes six MCP tools: `integration_ping`, `device_status`, `browser_observe`, `jit_capabilities`, `jit_invoke`, `jit_observe`. `jit_capabilities` returns interface_version 1/revision 0, `companion_page_only` and `echo_integer`. `jit_invoke({capability:'echo_integer',input:{value:42}})` returned 42. **Stable interface verified; independent deployment NOT verified**.
- Plugin package is still its original release; package contains only `.app.json` and `.codex-plugin/plugin.json`, not Site worker source.

## Critical source mismatch

`jit/mcp/site/worker.mjs` in GitHub is an **obsolete E4 mirror** (only three tool definitions). The deployed Site is E5 (six tools). **Never deploy the GitHub mirror over production.** First recover exact deployed E5 source and reconcile GitHub. The ordinary-chat tools currently available do not expose a ChatGPT Site source/deploy API. Plugin Creator can read/update the plugin package, but that is NOT the Site backend.

## Next engineering work

1. Recover exact deployed E5 Site source, deployment metadata and supported Site deployment workflow. Do not alter existing pairing, authentication, privacy, or plugin identity.
2. Determine whether an authenticated, fixed-gateway dispatch to an independently deployable backend can be implemented. If it needs one final Work/Sites bootstrap, document that explicitly. Avoid creating a second plugin.
3. Design and implement a default-deny, schema-validated, versioned registry and authenticated gateway-to-backend transport. No arbitrary URLs, code execution, open proxy, secrets or unrestricted device control.
4. Deploy a **new** harmless read-only capability, such as bounded `echo_text_v1`, through the independent deployment path.
5. In an ordinary Android ChatGPT conversation, verify it appears in `jit_capabilities` and works through `jit_invoke` without a new plugin release or Site republish for that capability. Log exact response, UTC, source/deployment IDs and unchanged plugin release.
6. Only then mark E5 independent deployment VERIFIED.

## Operating rules

Keep tests and claims separate; update `EXPERIMENTS.md` with observed results. Do not log pairing codes, tokens or other secrets. Android observation is opt-in first-party companion-page state only, not unrelated tabs, OS control or remote actuation. Avoid asking the user to repeat completed E4 tests. Do not claim independent deployment merely because E5 tools exist.

## Work-mode handoff prompt

Continue JIT MCP E5 in `bonoj/bonoj.github.io` (`jit/mcp/`). Read HANDOFF, EXPERIMENTS, E5-DEPLOYMENT-BOUNDARY and current live Site source. Preserve the existing private plugin ID, Site identity, pairing, E4 consent/revocation and all six MCP tools. Recover and mirror the **exact deployed E5 source** first; GitHub `site/worker.mjs` is stale E4. Implement and verify a secure fixed gateway to an independently deployable backend, if supported, without introducing a new plugin. Prove a **new** read-only capability can be added and invoked through unchanged `jit_capabilities`/`jit_invoke` from ordinary ChatGPT without Site/plugin republishing for that addition. Test, deploy, record exact evidence in EXPERIMENTS, and update HANDOFF/README/CONTRACT. If a supported independent deployment path is unavailable, stop and document the precise blocker instead of claiming completion.
