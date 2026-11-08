# Experiments and evidence ledger

Date initialized: 2026-11-08. Status words: **proposed**, **observed**, **blocked**, **verified**.

| ID | Question | Status | Evidence / outcome | Next |
|---|---|---|---|---|
| E0 | Can the existing ChatGPT conversation invoke installed provider tools? | observed | GitHub and Gmail connector calls succeeded in this conversation; does not establish arbitrary custom tool support. | Test own plugin. |
| E1 | Can this account create and install a tool-only custom ChatGPT plugin? | proposed | Earlier exploration suggested ChatGPT Sites and MCP options; no installation attempted or verified. Plan/platform availability must be checked against official documentation. | Validate product flow and permissions. |
| E2 | Can that plugin's tool be called from ordinary ChatGPT on Android? | proposed | No direct Android invocation tested. | Install a harmless `ping` and call it from Android. |
| E3 | Can the tool exchange authenticated messages with an Android companion? | proposed | No transport or companion exists. | Return device-generated nonce and timestamp, never synthetic values. |
| E4 | Can we observe an authorized foreground browser tab? | proposed | Android Chrome does not grant generic DOM access to unrelated apps. Accessibility and MediaProjection have consent/visibility limits. | Determine actual observation surface. |
| E5 | Can we actuate a harmless control and verify the result? | proposed | Requires explicit user authorization and read-back. | Test on owned benign page. |

## Current connector inventory (observed)

Tools exposed in this chat include GitHub repository read/write, Gmail, Google Drive, Supabase, and plugin discovery/permissions tools. The available plugin-management tools support search/suggestion/permissions but **do not themselves expose a custom-plugin creation or arbitrary MCP server registration action**. This is an observation about the current tool inventory, not a claim that user-facing setup is impossible.

Plugin directory search surfaced **TinyFish**, a cloud browser agent; not installed and not a bridge to the existing Android browser. No plugin was installed.

## Evidence rules

- **Observed**: exact tool result or official product documentation inspected, with context.
- **Verified**: repeatable end-to-end test with independent read-back.
- Do not conflate source committed, Pages deployed, MCP reachable, plugin installed, tool callable, device reachable, and action verified.
- Update this file with each experiment's result, timestamp, evidence URL or invocation summary, and unresolved constraints.
