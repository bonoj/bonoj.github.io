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

## 2026-11-08 — Plugin Creator launch observed

User screenshot from Android Chrome shows **Work** selected, **Plugin Creator** attached in the composer, and a default draft prompt `help me create a plugin`. This establishes that the **Create plugin** menu item launches a Work-mode creator workflow; it does **not** establish that the plugin was created, installed, or callable in normal Chat mode.

**Decision:** Use Work strictly as a one-time tool-manufacturing environment, not as the runtime for the Android bridge. Request a private, tool-only `JIT MCP` plugin exposing a fresh `integration_ping` nonce/timestamp and `connected_device: false`. No external services or repo changes. After installation, test invocation in ordinary Android Chat. Keep E2 open until then.

## 2026-11-08 — E2 VERIFIED: custom plugin invoked in ordinary Chat

Tool inventory exposed `mcp__JIT_MCP__integration_ping` directly in this existing conversation. Invoked successfully; result:

```json
{"timestamp":"2026-11-08T14:03:56.588Z","nonce":"071c570c-966e-47fd-8d63-b6d955cef26e","source":"jit-mcp","connected_device":false}
```

**Verified:** custom tool is callable from this ordinary conversation (no Work-mode transition). This is a live tool result, not a mock. The tool is available under the `JIT_MCP` namespace. **Not verified:** transport to Android device; `connected_device` is explicitly false. The GitHub `server.py` research probe is not established as the implementation behind the hosted plugin; do not conflate them.

**Next gate E3:** inspect hosted plugin implementation and available editing tools, then implement an authenticated device-to-plugin transport. Avoid putting tokens or device observations in public JIT.

## 2026-11-08 — Hosted plugin identity inspected

Plugin Creator's owned-personal-plugin listing returned `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`, scope `USER`, discoverability `PRIVATE`, version `1.0.0`, release `PluginRelease_a2893093886481919da01bd918ca4504`. Read its two manifest files: `.app.json` and `.codex-plugin/plugin.json`. Display name is **JIT MCP**; website URL is `https://jit-mcp.bracedbuddy1.chatgpt.site`.

**Architecture correction:** the installed callable tool is Site-backed, not proven to run the `jit/mcp/server.py` Python source in this repository. Treat that Python server as an independent integration probe, not the active implementation. Plugin Creator supports eligible edits to skill/support files, but App binding/MCP configuration must be preserved; hosted Site MCP tool implementation needs to be changed via the Site development environment.

**E3 remains open:** no actual device transport, device enrollment, or authenticated communication yet. Do not mistake the hosted integration ping for device connectivity.

## 2026-11-08T14:23:41.940553Z — E3 implemented and deployed; Android acceptance pending

### Identity and infrastructure inspected

Read README, this ledger, CONTRACT and E3-TRANSPORT before edits. Opened the existing Site's actual source repository. Original source commit: `6638c4e3eab76f21342d5d09559bb53adce17297`; implementation was a dependency-free Worker `worker.mjs`, not GitHub `server.py`.

Sites documentation confirms that both browser and MCP calls receive a Site-scoped authenticated user ID. Added logical D1 binding `DB` and a schema-only migration through the supported deployment archive. Preserved `capabilities:["mcp"]`, existing project, private owner-only access, App binding and plugin ID. Did not create another plugin or modify other JIT projects.

- Project: `appgprj_6af07fda46ec8191a71e9df6f4bc9e75`
- App binding: `asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`
- Plugin: `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`
- Plugin package inspection still reports `1.0.0`, release `PluginRelease_a2893093886481919da01bd918ca4504`. Site MCP source is independently updated; no archive replacement was used.
- Companion: https://jit-mcp.bracedbuddy1.chatgpt.site/device

### Protocol and security implementation

One random session per authenticated user, 256-bit bearer credential hashed server-side, six-digit code hashed server-side, two-minute code lifetime, five-attempt lockout, explicit code confirmation and ten-second enrollment throttle. A code without the signed-in identity and browser credential is insufficient. Credentials remain in page memory; no app cookies/localStorage/sessionStorage. Same-origin JSON checks protect device writes.

A confirmed session starts offline until its first valid heartbeat. Every 20 seconds while visible, the actual browser sends platform summary, visibility, its UTC time and cryptographic nonce. Server receipt time controls a 45-second online threshold. Hidden is stale; expired heartbeat is offline; expired 10-minute enrollment is unpaired. Disconnect deletes the record, and replacement enrollment invalidates the old credential. The read-only `device_status` tool accepts no selectors and exposes no credentials.

Storage contains a Site-scoped user ID, random session alias, credential/code hashes, expiry/attempt metadata, and the latest minimized observation. No persistent hardware identifier, raw user agent, history, page contents or inference. The TTL is enforced logically; physical deletion occurs on the next authenticated device API request. No periodic D1 purge or storage-backup retention guarantee is implemented.

### Deployments

1. Site source `425a61ccb836d708f898d69a88c84a9db91b9bf8`
   - Version: `appgprj_6af07fda46ec8191a71e9df6f4bc9e75~appgver_16d949fd095c819184e8ce029b68e03a`
   - Deployment: `appgdep_6af084183e288191a74a3ba9f1423855`
   - Succeeded 2026-11-08T14:15:58.725598Z.
2. Browser-verified Site source `aeb7558df72466a2c6510bdbd123da92070ea05a`
   - Version: `appgprj_6af07fda46ec8191a71e9df6f4bc9e75~appgver_4b331c2ffa3081918d7fbed79f2ad13d`
   - Deployment: `appgdep_6af0855fcf908191ab40dee3ff11bac6`
   - Succeeded 2026-11-08T14:21:25.502050Z, `has_mcp:true`.
   - URL: https://jit-mcp.bracedbuddy1.chatgpt.site
   - Contains cryptographic nonce generation compatible with HTTP local preview as well as HTTPS production.

3. Final Site source `40e986d75aecae9196db1229f1d6c5a5a6ada219`
   - Version: `appgprj_6af07fda46ec8191a71e9df6f4bc9e75~appgver_e53600b562d48191956382304540dcef`
   - Deployment: `appgdep_6af085fbb67c8191a7d51ee5971e25e3`
   - Succeeded 2026-11-08T14:24:01.113211Z, `has_mcp:true`.
   - Corrected state precedence so a hidden session becomes **offline** after 45 seconds, rather than remaining stale indefinitely. Added and passed a regression assertion.

### Verified tests

- `node test.mjs` against real SQLite: no device online before enrollment/confirmation/heartbeat; absent identity rejection; cross-user and wrong-token rejection; CSRF rejection; enrollment throttle; five-attempt lockout; two-minute code expiry; visible heartbeat online; hidden stale; 45-second offline boundary; Disconnect revocation; ten-minute credential expiry; physical cleanup on a subsequent API request; ping nonce uniqueness. Expiry tests advance the test clock, not production time.
- Real cloud-browser client, local preview only, explicit QA identity: successfully paired and reported Linux/visible at `2026-11-08T14:20:04.608Z`, device time `2026-11-08T14:20:04.604Z`. A later genuine heartbeat at `2026-11-08T14:20:44.626Z` had a different browser-generated nonce. This verifies recurring browser-to-server communication, **not Android connectivity**.
- Prominent Disconnect was clicked in that browser; server response/UI confirmed session revocation.
- The preview adapter uses local SQLite and an explicit QA identity and is excluded from the production build. It cannot be used as evidence of production authentication.
- Final deployed original-plugin ping:
  `{"timestamp":"2026-11-08T14:24:19.249Z","nonce":"78006530-7648-4c9e-be4c-00a102f994d8","source":"jit-mcp","connected_device":false}`
- Production /device navigation reached the expected ChatGPT sign-in gate. Site publication and continued original-plugin ping are verified.

### Unverified / exact limitations

The active Work tool inventory still listed only `integration_ping` after publication; no callable `device_status` handle was exposed in this conversation. Sites documents that republishing refreshes the connected plugin's tools, and both deployments reported MCP readiness, but actual new-tool discovery/invocation in ChatGPT remains unverified. Do not mark the E3 acceptance test passed.

The cloud browser had no existing ChatGPT login. No credentials were requested merely for QA; production enrollment and D1 read/write behavior therefore remain unverified. A direct service-header request to /mcp returned HTTP 401; service access did not substitute for MCP OAuth/user identity. No authentication bypass or synthetic production heartbeat was added.

No physical Android page was enrolled. Real closed-tab wall-clock expiry remains unverified; deterministic expiry tests passed. Switching Android apps typically hides Chrome, so stale is the intended result; split-screen can keep the page visible during a chat invocation.

### Next acceptance action

On Android, open the companion, sign in with the same account if needed, start pairing, re-enter the displayed code and confirm. Invoke `device_status` in ordinary ChatGPT, loading a new chat if its existing tool inventory has not refreshed. Compare platform, browser nonce and timestamps. Close the page, wait over 45 seconds, and invoke again. Record observed results here; retain E3 as pending until that succeeds.

## 2026-11-08T14:37Z — E3 VERIFIED: authenticated Android browser transport

**Independent ordinary-chat MCP invocation succeeded after real Android enrollment.** The user first supplied a production `device_status` response with `paired:true`, `online:true`, `state:"online"`, `platform:"Android"`, `visibility:"visible"`, `observed_at:"2026-11-08T14:37:04.158Z"`, device-generated nonce `868c76c8-9325-4e6e-aeca-51f992160522`, and a 45-second heartbeat threshold. This supplied response was not, by itself, independent verification.

The assistant then invoked the actual `mcp__JIT_MCP__device_status({})` tool **in this ordinary ChatGPT conversation**, receiving:

```json
{"paired":true,"online":false,"state":"stale","observed_at":"2026-11-08T14:37:20.834Z","age_seconds":5.02,"server_time":"2026-11-08T14:37:25.854Z","device_time":"2026-11-08T14:37:20.656Z","device_nonce":"1e59aae4-7ec1-45e6-91cc-ba7602636ce1","platform":"Android","visibility":"hidden","capabilities":["browser_heartbeat","page_visibility"],"expires_at":"2026-11-08T14:46:53.119Z","heartbeat_timeout_seconds":45}
```

**What this establishes:** the existing private Site-backed plugin's newly published `device_status` tool is discoverable and callable in ordinary ChatGPT; the server sees an authenticated, paired Android browser, receives fresh browser-originated timestamps/nonces and visibility observations, and correctly distinguishes a hidden browser from a visible/online browser. The second nonce differs from the user-supplied earlier heartbeat. This is an actual end-to-end ChatGPT → MCP → hosted Site → enrolled Android browser observation, not a hardcoded `connected_device:true` or a Work-only demonstration.

**Important boundary:** `online:false` with `state:"stale"` was observed when the page was hidden even though `age_seconds` was only 5.02. That is expected visibility gating, not a transport failure. No >45-second real-world expiry check, post-expiry offline readback, Android OS access, arbitrary Chrome tab observation, or remote actuation has yet been independently verified in this conversation. E4 and E5 remain open.

**Ledger disposition:** E3 **VERIFIED** for authenticated, browser-page heartbeat and ordinary-chat MCP readback. Future E4 should determine a consented observation surface; future E5 should test a narrowly bounded, user-authorized action with readback. Preserve separation between a companion webpage and general Android/browser control.

## 2026-11-08T14:47:45.849384Z — E4 deployed

Sites published version 5 of the existing private Site with MCP enabled. The plugin remains `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`.

- Companion page: https://jit-mcp.bracedbuddy1.chatgpt.site/device
- Site source commit: `ebd135a189a6d4c6db7567b147cabbf97990ce9c`
- Site version: `appgprj_6af07fda46ec8191a71e9df6f4bc9e75~appgver_af81bab6b9008191b68aea19bcb274f6`
- Deployment: `appgdep_6af08b8a5f908191ba239cafa2dc3477`

`browser_observe()` reads the paired user's latest explicitly shared companion-page snapshot. Sharing starts off. Share and Refresh capture only the origin, path, title, visibility, browser time, nonce and numeric demo counter. Server receipt controls freshness. A snapshot is readable for up to 45 seconds while the page has a fresh visible heartbeat. A hidden heartbeat clears the snapshot. Stop sharing clears consent and the snapshot without unpairing. A new pairing clears both, and the existing enrollment expiry bounds access and uses the same opportunistic row cleanup as E3.

### Verified

- `node test.mjs` passed the E3 suite and E4 checks against SQLite using the same migrations and Worker as production. Checks cover `tools/list`, no snapshot before consent, authenticated user and token isolation, payload size and allowed fields, refresh with a different nonce, hidden and expired snapshots, revocation, replacement and disconnect.
- Browser preview with a QA identity confirmed pairing, initial sharing, changing the demo counter from 0 to 1, explicit refresh, and a successful stop-sharing response.
- Production Site reports `succeeded` and `has_mcp:true` with the original plugin ID. The installed plugin's existing tools answered after deployment:
  - `integration_ping`: `{"timestamp":"2026-11-08T14:48:08.813Z","nonce":"09c0e202-907f-40bf-88cf-6e0c064aa7fa","source":"jit-mcp","connected_device":false}`
  - `device_status`: `{"paired":false,"online":false,"state":"unpaired","observed_at":null,"age_seconds":null,"server_time":"2026-11-08T14:48:09.216Z","device_time":null,"device_nonce":null,"platform":null,"visibility":null,"capabilities":[],"expires_at":null,"heartbeat_timeout_seconds":45}`

Exact MCP observation outputs from the local SQLite fixture follow. Their times are from the test clock.

```json
{"available":true,"state":"available","reason":null,"observation_method":"first_party_companion_dom","scope":"companion_page_only","consent_active":true,"observed_at":"2026-11-08T14:33:50.000Z","age_seconds":0,"visibility":"visible","nonce":"8fa2bb67-3767-4f3d-a902-dc93c872cf9e","data":{"origin":"https://test.example","path":"/device","title":"JIT MCP · Device","visibility":"visible","device_time":"2026-11-08T14:33:50.000Z","nonce":"8fa2bb67-3767-4f3d-a902-dc93c872cf9e","demo_counter":0}}
{"available":true,"state":"available","reason":null,"observation_method":"first_party_companion_dom","scope":"companion_page_only","consent_active":true,"observed_at":"2026-11-08T14:33:50.000Z","age_seconds":0,"visibility":"visible","nonce":"781cf275-4b3e-4c78-ace7-e9c7674ff73f","data":{"origin":"https://test.example","path":"/device","title":"JIT MCP · Device","visibility":"visible","device_time":"2026-11-08T14:33:50.000Z","nonce":"781cf275-4b3e-4c78-ace7-e9c7674ff73f","demo_counter":1}}
```

### Android acceptance pending

This Work conversation still exposes the two E3 tool handles. The Worker advertises `browser_observe` and Sites published the MCP-enabled version. Discovery and invocation of the new tool in ordinary ChatGPT remain unverified. On Android, reload and pair the companion, then keep Chrome visible in split screen with a fresh ordinary ChatGPT chat. Invoke `browser_observe` before sharing, then share and read back within 45 seconds. Change the counter, refresh and read it back again. Verify that backgrounding makes the snapshot stale and that stopping sharing makes it unavailable. Record the production responses here.
