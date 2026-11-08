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

## 2026-11-08 — Official product-path audit

Official sources checked:

- [Plugins in ChatGPT](https://help.openai.com/en/articles/20001256-plugins-in-chatgpt): Site-hosted MCP plugin can be created on any plan; local MCP tools on desktop do not become available on web/mobile.
- [Hosting a plugin with ChatGPT Sites](https://help.openai.com/en/articles/20001547-hosting-a-plugin-with-chatgpt-sites): requires Sites access, ownership/publishing rights, and plugin creation permission. It does not itself establish Android invocation.
- [Custom MCP connections](https://help.openai.com/en/articles/12584461-connecting-custom-mcp-servers-in-chatgpt): explicitly says custom MCP server connections are web-only; full write/modify access is Business/Enterprise/Edu, while Pro is read/fetch-limited.
- [Plugin quickstart](https://developers.openai.com/plugins/quickstart): documented end-to-end test explicitly uses **Work** on the web, which violates our target requirement.
- [MCP server guide](https://developers.openai.com/plugins/build/mcp-server): tool-only server supported; Streamable HTTP at `/mcp`; inspect locally; static GitHub Pages alone cannot host it.

**Finding:** No official source checked establishes that a self-created, Site-hosted tool can be invoked in an ordinary Android ChatGPT chat. This is the gating uncertainty, not a proven impossibility.

**Current session limitation:** Available Plugin Management tools can discover and suggest existing plugins but cannot create/install a custom MCP connection or Site. Therefore no real `device_ping` invocation can be attempted directly from this tool inventory. Do not simulate a successful call.

**Minimal manual account-level probe, only if needed:** In ChatGPT web Plugins (+), check whether **Add custom MCP server** or **Plugin Creator / ChatGPT Sites** creation is offered. If permitted, create a read-only tool-only `ping` using a hosted Site, install it, then attempt to invoke it from an ordinary Android Chat (not Work). Record the exact UI availability, any error, and whether a real tool result arrives. Do not enroll the device until this passes.

**Decision:** E1/E2 remain **unverified / blocked by missing creation action in current session**. The documented Work quickstart is not an acceptable substitute. Avoid implementing Android Accessibility or browser actuation until the chat invocation path passes.

## 2026-11-08 — Runnable integration probe committed

Added [server.py](server.py), [requirements.txt](requirements.txt), and [SERVER.md](SERVER.md). `integration_ping` returns a fresh UTC timestamp and nonce from the MCP server, explicitly declaring `connected_device: false`. This is a real server implementation, not a mocked Android response.

**Verification:** source committed to GitHub; local MCP protocol execution and ChatGPT registration **not tested**. The GitHub Pages probe URL could not be fetched by the available web client; a separate container HTTP attempt also failed DNS resolution, so live Pages delivery remains **unverified**, not failed.

**Next:** use MCP inspector or a supported plugin host to verify the server tool, then attempt invocation from an ordinary Android ChatGPT conversation. Do not confuse source commit with successful tool invocation.

## 2026-11-08 — Runtime availability and source checks

- Tried to install Python `mcp>=1.9,<2` in the available execution environment; package registry DNS resolution failed. **MCP runtime and handshake not tested**. Do not treat this as a package incompatibility.
- A Python syntax compile of the server implementation succeeded in a local reconstructed copy; this does not validate the MCP API or server startup.
- Added [tests/test_probe.py](tests/test_probe.py), dependency-free AST checks for the ping function, live nonce/timestamp expressions, and explicit `connected_device: false`. Tests committed but **not yet executed against repository checkout**.
- Current session cannot install a user-created plugin through its available management actions. The next decisive test remains account-level plugin creation/installation and ordinary Android chat invocation.

## 2026-11-08 — Account creation controls observed (user screenshot)

A screenshot supplied from Android Chrome at `chatgpt.com/plugins` shows the **Add** menu with three visible options: **Create plugin**, **Upload plugin archive**, and **Add custom MCP server**. Installed plugin icons are also visible.

**E1 update:** the user's account **exposes creation/registration entrypoints in the mobile web UI** (observed). This does not yet establish permission to complete creation, that a hosted plugin can run tools, or that tools can be invoked in an ordinary Android ChatGPT conversation. **E2 remains unverified**.

**Next test:** tap **Create plugin** and inspect the creation form and available hosting/tool capabilities before committing to an integration path. Do not assume that `server.py` can be registered via custom MCP until it is deployed on a reachable authenticated HTTPS endpoint.
