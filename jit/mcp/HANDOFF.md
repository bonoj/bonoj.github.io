# JIT MCP — handoff to a fresh ordinary ChatGPT conversation

**Read this first.** Date: 2026-11-08. This handoff is for a new **ordinary ChatGPT Android chat**, not Work.

## User intent

Continue the existing private JIT MCP experiment, without creating a replacement plugin or asking the user to repeat the project context. Execute tests, distinguish tool results from claims, and update the experiment ledger.

## Identity and sources

- Repo: `bonoj/bonoj.github.io`, branch `master`, directory `jit/mcp/`.
- Site: https://jit-mcp.bracedbuddy1.chatgpt.site
- Companion: https://jit-mcp.bracedbuddy1.chatgpt.site/device
- Existing private plugin ID: `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`
- Read `README.md`, `EXPERIMENTS.md`, `CONTRACT.md`, `E4-OBSERVATION.md`.
- Site source mirror: `site/worker.mjs`. Python `server.py` is an independent probe, not the installed Site backend.

## Verified state

- E2: `integration_ping()` invoked successfully in ordinary ChatGPT.
- E3: real authenticated Android browser pairing and `device_status()` independently verified from ordinary ChatGPT, including browser-generated nonce, time and visibility. E3 VERIFIED.
- E4: deployed to the same Site (2026-11-08), deployment `appgdep_6af08b8a5f908191ba239cafa2dc3477`. Local tests and browser QA passed. **Android E4 acceptance is pending.**
- In the previous ordinary chat at 2026-11-08T14:53:55.656Z, `device_status()` returned `paired:true,online:true,state:"online",platform:"Android",visibility:"visible"`, last heartbeat age 19.83 seconds, enrollment expiry `2026-11-08T15:00:06.767Z`. These are transient facts; query again.
- The previous chat's tool inventory listed only `integration_ping` and `device_status`, **not `browser_observe`**, despite E4 deployment. Fresh-chat tool discovery is the immediate gate.

## Immediate action for the receiving model

1. Inspect `ALL_TOOLS` for `mcp__JIT_MCP__browser_observe` using the available tool orchestration. Do not assume availability.
2. If available, invoke `browser_observe({})` **before sharing**. Expected: unavailable with consent off. Also call `device_status({})` to establish fresh pairing and visibility.
3. Tell the user exactly one next Android action at a time:
   - On the paired `/device` page, tap **Share this page state**.
   - Invoke `browser_observe({})` within 45 seconds, record the numeric demo counter and nonce.
   - Ask user to increment the counter and tap **Refresh shared snapshot**; invoke again and verify changed counter and nonce.
   - Ask user to tap **Stop sharing**; invoke again and verify unavailable while `device_status` remains paired.
4. Record **exact production results** and disposition in `EXPERIMENTS.md`, with UTC timestamps. Mark E4 verified only after actual ordinary-chat MCP readback and revocation are observed.
5. If `browser_observe` is still missing, **do not tell the user to re-pair or repeat the test**. Inspect current plugin/Site discovery and determine why the published MCP tool is not exposed; report the precise blocker. Site backend changes require the Site editor/Work, but plugin inspection is possible in ordinary chat.

## Constraints

- No extra LLM inference or ongoing Work execution.
- Do not create another plugin or change existing App binding.
- E4 is **read-only, opt-in, first-party companion-page DOM**. It does not grant other Chrome tab, Android OS, screenshot, or remote actuation access.
- Distinguish `visible/online`, `hidden/stale`, and `offline`. Pairing expires after 10 minutes, heartbeats every 20 seconds while visible, 45-second freshness threshold.
- Avoid logging secrets, pairing codes, or bearer credentials in the public repository.
