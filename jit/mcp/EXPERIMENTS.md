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


## 2026-11-08T15:16:24Z — E5 ordinary-chat tool discovery and invocation VERIFIED (partial acceptance)

From a fresh **ordinary ChatGPT conversation**, the tool inventory independently exposed all six existing-plugin tools: `integration_ping`, `device_status`, `browser_observe`, `jit_capabilities`, `jit_observe`, and `jit_invoke`. The previously missing E4 `browser_observe` is now discoverable. This verifies tool exposure, **not** the root cause of the prior missing-tool state.

Actual production calls through the installed plugin:

- `jit_capabilities({})` returned `interface_version:1`, `revision:0`, with `companion_page_only` (read-only, explicit paired-visible-page sharing) and `echo_integer` (read-only integer echo, range -999..999). Both advertise a shared 60 calls/60 seconds limit.
- `jit_invoke({capability:"echo_integer",input:{value:42}})` returned `{"interface_version":1,"revision":0,"capability":"echo_integer","data":{"value":42}}`. **Stable dispatcher works in ordinary ChatGPT.**
- `jit_observe({})` returned `{"available":false,"state":"unavailable","reason":"unpaired_or_expired","observation_method":"first_party_companion_dom","scope":"companion_page_only","consent_active":false,"observed_at":null,"age_seconds":null,"visibility":null,"nonce":null,"data":null,"interface_version":1}`.
- `device_status({})` returned `{"paired":false,"online":false,"state":"unpaired","observed_at":null,"age_seconds":null,"server_time":"2026-11-08T15:16:24.533Z","device_time":null,"device_nonce":null,"platform":null,"visibility":null,"capabilities":[],"expires_at":null,"heartbeat_timeout_seconds":45}`.

**Disposition:** E5 tool discovery, interface v1 and production dispatch **VERIFIED**. Consent-off/unpaired observation boundary **VERIFIED**. E4/E5 real Android shared-counter readback and revocation **PENDING** because pairing expired. The key additional E5 gate—introducing a *new* capability after bootstrap and invoking it through the *unchanged* MCP tool signatures **without plugin republishing**—is also **PENDING**. The existing `echo_integer` capability proves dispatch but not independent future iteration. Do not declare E5 fully complete.

**Next:** Pair the Android companion again, keep it visible in split-screen, and test explicit sharing through `jit_observe` and `browser_observe`; refresh after counter increment, then revoke and confirm unavailable while pairing remains intact. Record exact UTC production responses.


## 2026-11-08T15:19:13Z — E4/E5 first real Android observation VERIFIED

Ordinary ChatGPT called the production `jit_observe({})` MCP tool after the user explicitly shared the first-party companion page. It returned `available:true`, `state:"available"`, `consent_active:true`, `visibility:"visible"`, `observed_at:"2026-11-08T15:19:05.784Z"`, `age_seconds:7.32`, `nonce:"57ff262e-6838-4bdc-9a98-2b5d0559a660"`, `interface_version:1`, and `data:{origin:"https://jit-mcp.bracedbuddy1.chatgpt.site",path:"/device",title:"JIT MCP · Device",visibility:"visible",device_time:"2026-11-08T15:19:05.595Z",nonce:"57ff262e-6838-4bdc-9a98-2b5d0559a660",demo_counter:0}`.

Independent concurrent `device_status({})` returned `paired:true,online:true,state:"online",platform:"Android",visibility:"visible"`, heartbeat at `2026-11-08T15:19:05.874Z`, server time `2026-11-08T15:19:13.113Z`, and enrollment expiry `2026-11-08T15:27:57.097Z`.

Earlier at server time `2026-11-08T15:18:30.671Z`, while the page was hidden, `jit_observe` returned `available:false,state:"stale",reason:"page_hidden",consent_active:true`; `device_status` showed paired but stale. This confirms visibility gating and recovery on returning the page to visible split-screen.

**Disposition:** Production first-party Android shared-page readback via the stable E5 tool is **VERIFIED**. Changed counter + fresh nonce, explicit stop-sharing revocation while remaining paired, and E5 new-capability-without-plugin-republish are **PENDING**. Do not mark full E4/E5 acceptance yet.


## 2026-11-08T15:19:44Z — E4 changed-counter and fresh-nonce readback VERIFIED

After the user incremented the companion demo counter and tapped Refresh shared snapshot, ordinary ChatGPT invoked the production `jit_observe({})` tool again. It returned `available:true`, `state:"available"`, `consent_active:true`, `visibility:"visible"`, `observed_at:"2026-11-08T15:19:36.462Z"`, `age_seconds:8.236`, `nonce:"0e5fb111-3b13-4cba-8d60-8e5c185bf494"`, and `data.demo_counter:1` (device time `2026-11-08T15:19:36.268Z`). Previous production snapshot had `data.demo_counter:0` and nonce `57ff262e-6838-4bdc-9a98-2b5d0559a660`. Independent `device_status({})` remained `paired:true,online:true,state:"online",platform:"Android",visibility:"visible"` with server time `2026-11-08T15:19:44.668Z`.

**Disposition:** Android consented initial observation, refreshed changed counter, distinct nonce and live pairing **VERIFIED** via stable MCP tool. Explicit Stop sharing -> unavailable while still paired **PENDING**; E5 future capability iteration without republishing **PENDING**.


## 2026-11-08T15:20:13Z — E4 Android consent/revocation acceptance VERIFIED

Following the user's explicit Stop sharing action, ordinary ChatGPT invoked production `jit_observe({})` and `device_status({})` through the installed JIT MCP plugin.

- `jit_observe`: `{"available":false,"state":"unavailable","reason":"sharing_disabled","observation_method":"first_party_companion_dom","scope":"companion_page_only","consent_active":false,"observed_at":null,"age_seconds":null,"visibility":"visible","nonce":null,"data":null,"interface_version":1}`.
- `device_status`: `{"paired":true,"online":true,"state":"online","observed_at":"2026-11-08T15:20:05.922Z","age_seconds":7.732,"server_time":"2026-11-08T15:20:13.654Z","device_time":"2026-11-08T15:20:05.726Z","device_nonce":"6dc42fd0-533a-473a-b1ba-029a900d436d","platform":"Android","visibility":"visible","capabilities":["browser_heartbeat","page_visibility"],"expires_at":"2026-11-08T15:27:57.097Z","heartbeat_timeout_seconds":45}`.

**E4 disposition: VERIFIED end-to-end on physical Android in ordinary ChatGPT.** Verified before-consent unavailable; consented fresh counter 0; changed counter 1 with distinct nonce; page-hidden stale; explicit Stop sharing immediately unavailable with consent false while the device remained paired/online. The verified observation scope is only the first-party companion page; this does not establish general tab/OS observation or actuation.

**E5 disposition: PARTIALLY VERIFIED.** Permanent v1 MCP tools are discoverable and callable; `jit_invoke` echoes a typed integer; `jit_observe` passed the Android observation lifecycle. Still pending: demonstrate adding a **new** capability through unchanged tool signatures without plugin republishing and document the independently operable browser-first deployment mechanism. Do not equate a working dispatcher with completed independent iteration.


## 2026-11-08 — E5 independent-deployment gate: BLOCKED (not a runtime failure)

Ordinary ChatGPT re-invoked `jit_capabilities({})` and confirmed live interface v1/revision 0 with `companion_page_only` and `echo_integer`. The existing GitHub mirror `jit/mcp/site/worker.mjs`, however, still declares only `integration_ping`, `device_status` and `browser_observe`; it does **not** contain the E5 `jit_capabilities` / `jit_invoke` / `jit_observe` implementation. The GitHub README/HANDOFF/CONTRACT also retain pre-E5 status. Therefore the repository mirror is stale relative to the verified deployed Site.

This ordinary-chat tool inventory provides GitHub file writes and existing JIT MCP read-only tools, but **no supported Site source/deploy action**. GitHub Pages cannot deploy the authenticated Site backend. No source changes, Site deployment, plugin republishing or capability additions were attempted in this step. The `echo_integer` capability is already present; it cannot count as proof of adding a *new* capability without plugin republishing.

**Required before claiming E5 complete:** recover the exact deployed E5 Site source and deployment identifiers; reconcile the mirror without overwriting production with old code; establish and verify an independently callable deployment path (e.g., authorized backend deployment API/CI) for this Site or an independently hosted backend behind the fixed MCP interface; then introduce a distinct harmless read-only capability, verify it through `jit_capabilities` and `jit_invoke` in ordinary ChatGPT, and confirm the plugin ID/tool signatures and release remain unchanged. If the current Sites platform does not permit deployment outside Work, document that limitation and consider a separate backend rather than misrepresenting success.

**Disposition:** E4 VERIFIED; E5 interface/discovery/Android observation VERIFIED; E5 browser-first independent capability deployment **NOT YET VERIFIED**.


## 2026-11-08 — E5 plugin release provenance VERIFIED

Read the existing private JIT MCP plugin via Plugin Creator's read-only source and release metadata actions (no plugin update). Plugin ID `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`, scope `USER`, discoverability `PRIVATE`, version `1.0.0`, current release `PluginRelease_a2893093886481919da01bd918ca4504`, created `2026-11-08T13:59:23.433598Z`. The release listing contains only this release. Its files are `.app.json` and `.codex-plugin/plugin.json`; they bind the existing Sites app ID `asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d` and website `https://jit-mcp.bracedbuddy1.chatgpt.site`. Neither contains the Site worker source. The live MCP now advertises six tools despite the original plugin package/release remaining current. This establishes **plugin-release stability** across the earlier E3/E4/E5 Site changes, not independent backend capability deployment.

Available connected tools provide read-only plugin source/release metadata and plugin package updates, but no action to read or deploy the existing ChatGPT Site backend. Do not use Plugin Creator's package update to solve a Site-source problem; do not treat the stale GitHub E4 mirror as deployed E5 source. **Remaining blocker:** recover exact Site deployment source and establish controlled extension/deployment path.


## E5.1 — Hermeticon Memory capability runtime, local test (2026-11-08)

- Existing Supabase project confirmed `iqglyokmcobegledbfcm` (`Hermeticon Memory`, `ACTIVE_HEALTHY`, `us-east-1`). Existing `memory` Edge Function confirmed `ACTIVE`, version 2; not modified.
- Runtime prototype committed at `jit/mcp/runtime/index.ts` (`35431a88e25cd284c343f17282a90203c4e49f14`). Unit tests committed at `jit/mcp/runtime/index.test.mjs` (`83aaf36f3d6caa276b0915fc4bdc6b3e2ad7fcf0`).
- Locally executed six equivalent tests using Node.js `v22.16.0` against a temporary `.mjs` copy of the TypeScript-compatible JavaScript runtime; `node --test`: **6 passed, 0 failed**. Categories: discovery, bounded echo, default deny, missing/wrong secret, HTTP method/content-type/JSON/body limit, authenticated invocation. This is local evidence only; no deployed HTTP verification.
- **Not deployed**; no gateway secret configured. The current bearer token alone does not protect against replay, and there is no rate limiting. Do not enable authenticated production invocation until hardened. No claim that E5 independent deployment is verified.
- Repeat local tests from repo root with `cp jit/mcp/runtime/index.ts jit/mcp/runtime/index.mjs && node --test jit/mcp/runtime/index.test.mjs` (remove the generated `.mjs` afterward; do not commit it). Production Deno testing is still outstanding.


## E5.1 — Supabase deployment (2026-11-08)

- New function `jit-mcp-capabilities` deployed to existing Hermeticon Memory project `iqglyokmcobegledbfcm` through the connected Supabase deployment action. Function ID `97d7fbc6-303c-48e0-9782-c9990d556279`, **ACTIVE**, version **1**, `verify_jwt:true`, entrypoint `index.mjs`, SHA-256 `7931f49507bed743b35a3b6895e0d7d3d8568fec52e27eea75c5eaa19bb6e808`. Source mirror `jit/mcp/runtime/index.mjs` commit `cfb34d0df31e8e47456fd2d018db7a2128f55f87`.
- Readback via `list_edge_functions` confirmed `jit-mcp-capabilities` ACTIVE v1 and original `memory` ACTIVE v2 (unchanged).
- Node.js v22.16.0 `node --test test.mjs` local six-test suite: **6 pass, 0 fail**. This verifies local logic, not live endpoint behavior.
- **Security hold:** no `JIT_MCP_GATEWAY_SECRET` configured; handler returns 503 after any valid Supabase JWT. No gateway integration, replay defense, rate limit or live authenticated invocation verified. Function is deployed but not ready for production dispatch. Keep `verify_jwt:true`; do not expose secret in source or public clients.
- **E5 independent capability deployment remains UNVERIFIED** until gateway is securely integrated and a *subsequent* backend-only revision is seen in ordinary ChatGPT without Site/plugin redeploy.


## E5.1 — authentication readiness checkpoint (2026-11-08)

- Re-ran local Node v22.16.0 tests against the saved runtime/test snapshot: **6 passed, 0 failed**; `index.ts` and `index.mjs` byte comparison passed. This is **not** a GitHub Actions run or live endpoint test.
- Checked available connected Supabase actions: deployment, Edge Function readback, SQL and logs are available; **no Edge Function secret-management action** is exposed. No secret was provisioned, no JWT was obtained, and no live authorized request was sent.
- Checked GitHub's commit-associated workflow-run endpoint for `cbe44984d597f4348f1421fe751e9a2a4f76c057`: returned no runs. This endpoint is PR-filtered and is **not conclusive evidence** that the push workflow never ran.
- Security gate remains: configure gateway credential in Supabase secrets and Site server-side secrets (not client), choose durable nonce/replay and rate-limit enforcement, verify production authorization, then connect Work Site gateway. Do not enable automatic production deployments until these pass.


## E5.1 — signed gateway request implementation (2026-11-08)

- Implemented HMAC-SHA256 request signing over a version tag, millisecond timestamp, nonce, and SHA-256 of exact request body in `runtime/index.mjs` (commit `e858771f211c5c3ee96b456fb44de5cc06601bad`). Synchronized `index.ts` mirror (commit `eea9cff88ee45bc5b5e9b64aaf4d13dbfdc43c63`). Handler checks freshness, nonce/signature format, body size, and requires a durable `admit(nonce,timestamp)` callback. Missing callback or secret returns 503; failed replay admission returns 429. **The deployed Supabase function is still the older v1, not this code.**
- Replaced unit tests with ten scenarios covering signature integrity, expiry, replay, admission failures and size limit (commit `8dd748da6fa47da916df209d1f5763f4b7e1614a`). **Tests not yet executed**: local container could not resolve GitHub raw host; GitHub Actions status not verified. No pass claim.
- The SQL ledger remains source-only and must be reviewed, applied and wired via a server-side role. There is no production secret configured and no authenticated Site gateway connection. Do not deploy the new signed runtime as operational or claim E5 verified until tests, durable admission and live authorization are verified.


## E5.1 cleanup — canonical current state (2026-11-08; supersedes earlier prototype plans)

- Removed unintegrated HMAC signing/replay admission and deleted `runtime/replay-ledger.sql` (source only; it was never applied). No database schema changes. Simplified to a bounded allowlisted read-only Edge Function, with Supabase JWT in `Authorization` and a **separate** server-only `X-JIT-Gateway-Secret` header. Function fails closed until secret configured.
- Replaced expanded tests with six focused tests and synchronized `runtime/index.ts` and `runtime/index.mjs`. **Six local tests passed** in Node; note local tests exercised an equivalent simplified handler before the final GitHub source edits, not a fetched post-commit build. GitHub Actions execution remains unverified.
- Deployed `jit-mcp-capabilities` **ACTIVE v2**, `verify_jwt:true`, function ID `97d7fbc6-303c-48e0-9782-c9990d556279`, SHA256 `d0fe057087bdaece193470f7440c9ea2a736c0c86cebd93f985cb4e02228f486`. Confirmed through Supabase list after deployment. Existing `memory` function remains ACTIVE v2, `verify_jwt:false`, unchanged.
- Rewrote HANDOFF into a single actionable integration path; updated README and CONTRACT. No Site/plugin/Android changes. **No secret provisioned, no live authorized backend invocation, and no Site gateway dispatch yet.** E5 independent deployment still unverified.
- Earlier E5.1 entries in this chronological log describe abandoned prototypes, **not current instructions**. Current instructions: [HANDOFF.md](HANDOFF.md).

## 2026-11-08T21:41:00.497375Z — E5 Site gateway deployed, credential gate remains

Recovered exact live Site v6 source `6b6fb5877c07195fe387a1ca79c3f65fa891cc51` via the existing Sites source repository. Verified deployed v6 ID `appgdep_6af08f7e3090819198c645d041bf0d2a` before editing. The GitHub E4 mirror was stale and was not used as deploy input.

- Site v7 deployment `appgdep_6af0ec66ed648191a0cd5e88ac546583`, version `appgprj_6af07fda46ec8191a71e9df6f4bc9e75~appgver_fcfbb8dc2994819180f7845b00b1bb74`, source `b69b739d709f10e0c5e56a56136aca7a983fa478`. Sites reports `succeeded`, `has_mcp:true`, environment revision `1`.
- Preserved plugin `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`, release `PluginRelease_a2893093886481919da01bd918ca4504`, and six MCP definitions. No plugin package update.
- Supabase `jit-mcp-capabilities` remains ACTIVE v2 with JWT verification; `memory` is unchanged. Configured the existing project's legacy anon JWT in the Site secret store as `JIT_MCP_SUPABASE_JWT`. No shared secret was configured. The connected Supabase tools expose Edge Function deploy/read and public-key read, but no Edge Function secret write. This Work runtime has no authenticated Supabase management CLI session. The JWT is not a substitute for the private shared secret.
- The Site routes typed, allowlisted read-only capabilities to the fixed Supabase endpoint when both credentials exist. It bounds requests and responses, rejects redirects, and applies the existing MCP quota. Missing credentials or backend errors leave local capabilities usable.
- `node test.mjs`, `node build.mjs` and `git diff --check` passed. A mocked authenticated backend changed from revision 1 (`echo_text_v1`) to revision 2 (adds `text_length_v1`) while MCP tool definitions stayed byte-equivalent. The test invoked the new capability, rejected a stale revision and invalid output, and confirmed local fallback on backend failure. This is local evidence, not a Supabase production deployment.
- Post-deploy installed-plugin readback in Work: `jit_capabilities` returned interface 1, revision 0, `backend_status:"not_configured"` and the two built-in capabilities. `jit_invoke` returned `{"interface_version":1,"revision":0,"capability":"echo_integer","data":{"value":42}}`. `jit_observe` returned `unpaired_or_expired` with null data, as expected without an active enrollment. Prior ordinary Android E2–E4 evidence remains verified.

**E5 remains open.** Use the same randomly generated `JIT_MCP_GATEWAY_SECRET` in Supabase Edge Function secrets and the private Site's server-side secret store. Apply the Site secret revision to v7. Verify the baseline `echo_text_v1` in ordinary ChatGPT. Then change only Supabase to publish a distinct typed read-only capability and verify discovery/invocation with the Site deployment and plugin release unchanged. No production baseline or backend-only update was attempted before the shared credential gate.

## 2026-11-08T22:09:34.436626Z — E5 owner setup deployed

Recovered live v7 source `b69b739d709f10e0c5e56a56136aca7a983fa478` from the existing Site repository and compared the prepared GitHub changes. Deployed source `c9d1098a4bed385de35017866f0064846f39e58c` as `appgdep_6af0f31770ac81919529f9aa65973a71`, saved version `appgprj_6af07fda46ec8191a71e9df6f4bc9e75~appgver_b3cff6a1709481919adbd2fd6bd778f6`, environment revision `2`. Sites reports succeeded and MCP enabled. The migration `0003_gateway_setup.sql` ships in the Site bundle. No plugin package change or Supabase credential change.

The setup route requires the platform-verified owner email; its write path also requires active pairing and same-origin JSON. It validates the supplied credential against the fixed Supabase endpoint before a write-once insert. D1 stores AES-GCM ciphertext, with the key held in the Sites secret store. The response exposes only configuration status; the client clears the form input on submit.

Local tests passed for owner-only access, pairing, cross-origin rejection, invalid credential rejection without writing, simultaneous submissions, ciphertext, credential-free responses, and gateway readback. Existing E4/E5 tests passed, including unchanged MCP tool definitions. Unauthenticated production /setup returned HTTP 401. Authenticated Android submission and ordinary-chat baseline are pending the owner's paste.

## 2026-11-08T22:23:48.916672Z — E5 setup transport repaired and preflight verified

- Verified Site deployment `appgdep_6af0f31770ac81919529f9aa65973a71` mapped to exact source `c9d1098a4bed385de35017866f0064846f39e58c`. Authenticated setup GETs returned 200. Original setup POSTs at `2026-11-08T22:15:44.372Z` and `2026-11-08T22:16:01.364Z` returned 422 under the generic catch. The Supabase log query did not return events for that interval.
- Direct negative control using the project's anon JWT and a deliberately invalid non-secret value reached the Supabase handler and returned `401 {"error":"unauthorized"}`. Supabase source readback showed the baseline `echo_text_v1` handler and JWT verification enabled. The rejected user value was never inspected.
- Diagnostic Site deployment `appgdep_6af0f633ad6c81919a74a74c3e16dc8f` reproduced `setup_preflight:"network_failure"` with the same fixed Supabase destination. This demonstrates a Site fetch-path failure without relying on the owner's submitted secret.
- Replaced the runtime timeout helper with explicit AbortController and used manual redirect handling that rejects any redirect. Deployment `appgdep_6af0f66eca3c8191b506dec1e844544a`, source `37d8325083afdbccc431706427b567afe51f7d6f`, environment revision `2` succeeded. The installed plugin then returned `backend_status:"not_configured",setup_preflight:"ready_for_secret"`. That result requires the request to reach the Supabase handler and receive its expected invalid-secret response. The two fetch changes were deployed together, so the individual failing option was not isolated.
- Setup now distinguishes JWT rejection, shared-secret mismatch, missing backend secret, network failure, redirect and incompatible response without logging the credential or upstream response. Local tests passed. The owner-only form, encrypted storage, Site/plugin identity and six tool signatures are unchanged.

**Pending:** the owner's successful paste, ordinary-chat baseline and backend-only capability proof. No Supabase deployment was made during the repair.

## 2026-11-08 — E5 production baseline verified from ordinary ChatGPT

- User reported the deployed `/setup` page returned: **“Saved and verified with Supabase. You can clear your clipboard.”** This is user-observed provisioning success; the credential itself was never provided in chat.
- In this **ordinary ChatGPT conversation**, directly invoked the installed private JIT MCP plugin's `jit_capabilities` tool. It returned `interface_version:1`, `revision:67108864`, `backend_status:"available"`, and discovered Supabase-backed `echo_text_v1` alongside the existing local capabilities.
- Invoked `jit_invoke` with `{capability:"echo_text_v1",input:{text:"e5-baseline"},expected_revision:67108864}`. Live structured response: `{interface_version:1,revision:67108864,capability:"echo_text_v1",data:{text:"e5-baseline"}}`. **PASS: production backend discovery and invocation through the installed plugin, outside Work mode.**
- This verifies the baseline, **not yet** independent backend-only deployment. Next: deploy a distinct read-only capability by changing only the Supabase function; then verify its discovery/invocation here while Site deployment and plugin release remain unchanged.
- Exact tool-call UTC timestamps were not exposed in this conversation; date is the current conversation date, not a fabricated timestamp.

## 2026-11-08 — E5 backend-only capability deployment verified (PASS)

- Read the live Supabase `jit-mcp-capabilities` function: ACTIVE v3, `verify_jwt:true`, original `memory` function untouched. Baseline ordinary-chat plugin discovery had `backend_status:"available"`, registry revision `67108864`, and `echo_text_v1` invocation returned `e5-baseline`.
- Deployed **only** Supabase function `jit-mcp-capabilities` as ACTIVE **v4**, preserving `verify_jwt:true`, same gateway authentication and bounded read-only behavior. Function SHA256 reported `47ba769fc0fb674f1ddb5b68c8235de1a29088bb40e01f146d2636969aeb901f`. Added typed `text_length_v1` (Unicode code-point count); backend revision incremented from 1 to 2. No Site or plugin deployment/update performed.
- Immediately invoked installed `jit_capabilities` in this **ordinary ChatGPT conversation**. Returned `backend_status:"available"`, registry revision `134217728`, and discovered new `text_length_v1` with text input and integer output schema.
- Invoked `jit_invoke` with `{capability:"text_length_v1",input:{text:"Hello 🐝"},expected_revision:134217728}`. Live structured response: `{interface_version:1,revision:134217728,capability:"text_length_v1",data:{value:7}}`. **PASS**.
- E5 independent backend-only capability iteration is **verified**. Tool responses did not expose precise invocation UTC timestamps; no timestamps invented.


## 2026-11-08 — First-party JIT page controlled from ordinary ChatGPT (VERIFIED)

**Goal:** extend capability to a website we own, deploy and iterate on it, and manipulate that page from an ordinary ChatGPT conversation in Android Chrome. This is distinct from controlling arbitrary third-party Chrome tabs.

### Implemented

- Created Supabase tables `public.jit_page_demo` (bounded counter/state) and `public.jit_page_commands` (increment/decrement/reset queue with consumed timestamp) in existing project `iqglyokmcobegledbfcm`. Anonymous and authenticated database roles were denied direct table access.
- Deployed a new `jit-page-demo` Supabase Edge Function, ACTIVE v1, ID `7c283175-5104-4de5-bb8f-0b80541e0d56`, with GET state/pending-command polling and POST command acknowledgment/execution. This is a separate first-party demonstration backend, not an extension of the existing six JIT MCP plugin tools.
- Created `jit/mcp/control/index.html` on GitHub `master`, commit `adcf02fab2d2e0f2705d3de02c7ba17af2733923`, intended URL `https://bonoj.github.io/jit/mcp/control/`. The page polls the function and displays a counter, connectivity, and command execution log. The local button only updates an explanatory message; it does not mutate the backend counter.
- Did not change the installed plugin, its Site gateway, or E2–E5 infrastructure. No Work session, browser extension, OS accessibility permission, or screen capture was needed.

### Real Android acceptance evidence

1. User opened the deployed page in Android Chrome and reported: `Chat controls this page`, counter `0`, `Connected · checking for chat commands`.
2. From **this ordinary ChatGPT conversation**, assistant inserted `increment` into `public.jit_page_commands` via the connected Supabase tool. Backend returned command **#1**, created at `2026-11-08 22:44:46.667312+00`.
3. Initial independent SQL readbacks found counter `0` and command #1 pending (`consumed_at:null`).
4. User **refreshed the Chrome page**, then reported counter `1`, `Connected · checking for chat commands`, and `Executed increment #1 → 1`.
5. Independent SQL readback verified `counter:1`, command `id:1`, `action:increment`, `consumed_at:2026-11-08 22:45:11.07+00`; state updated at `2026-11-08 22:45:11.026+00`.

**Disposition: VERIFIED** for ordinary ChatGPT → authenticated Supabase connector SQL command enqueue → first-party deployed page in Android Chrome → browser-triggered backend mutation → independent database readback. This is a real command execution, not a simulated result.

### Boundaries and next experiment

- **Continuous polling without refresh is not yet verified.** Refresh was performed before successful execution. Test a second queued command with Chrome foregrounded and **without refreshing**.
- The command originated through the connected Supabase management connector, **not** through the existing `JIT MCP` `jit_invoke` tool. Native JIT MCP dispatch remains a separate integration task.
- The endpoint's GET and POST are publicly callable with `verify_jwt:false`; the demonstration function currently has **no per-user authentication or command acknowledgment authorization**. Its CORS policy is not authentication. Treat it as a single-purpose public demo only; do not reuse for sensitive state, arbitrary commands, or multi-user control. Harden with authenticated sessions and atomic/idempotent command claiming before broadening scope.
- No evidence of arbitrary-site DOM access or control. The successful case is a **first-party page intentionally designed to cooperate**.
- The page reports connected when GET polling succeeds; that is not evidence of an independently verified continuous background connection.


### Follow-up: automatic command delivery without refresh — VERIFIED

- User kept the same first-party JIT page open in Android Chrome and explicitly authorized the next command with “Go for it :).”
- Assistant inserted `increment` command **#2** from ordinary ChatGPT using connected Supabase SQL. Created `2026-11-08 22:48:12.478606+00`.
- Initial database readback showed `counter:1`, command #2 `consumed_at:null`.
- **Without refreshing the page**, user confirmed the counter changed to **2**.
- Independent SQL readback: `counter:2`, state updated `2026-11-08 22:48:28.859+00`, command #2 consumed `2026-11-08 22:48:28.923+00`.
- **Disposition: VERIFIED** for foreground Chrome automatic polling and execution, no refresh or local interaction required. Observed end-to-end interval from enqueue to acknowledgment was ~16.4 seconds; do not interpret this single observation as the poll cadence or a latency guarantee.
- Scope remains first-party cooperating page; commands are queued through Supabase connector, not the existing JIT MCP plugin. The demonstration endpoint remains unauthenticated and unsuitable for sensitive actions.


## 2026-11-08 — Architecture correction, detour postmortem, and next steps

### Capability achieved (verified, not aspirational)

**Ordinary ChatGPT can command a live first-party website open in Android Chrome without Android pairing or a browser refresh.** The chat uses the connected Supabase management tool to enqueue a bounded command; the deployed page polls the Supabase Edge Function, executes/acknowledges the command, and displays the resulting shared state. Independent SQL readbacks confirmed commands #1 and #2 were consumed and the counter advanced `0 → 1 → 2`. Command #2 was received with the Chrome page already open and **no refresh**. This is the exact narrow capability required to start iterating on chat-manipulable JIT websites.

The actual architecture is **ordinary ChatGPT → Supabase connector → database queue → first-party page polling an Edge Function → state/acknowledgment → ChatGPT SQL readback**. It does **not** use the previously built Android companion pairing, the Site gateway, or `JIT MCP` plugin invocation. Those systems still exist and their earlier experiments remain valid, but they are not dependencies of this workflow. The result does not establish access to arbitrary Chrome tabs, general DOM inspection, or arbitrary browser automation.

### Why the assistant detoured (failure analysis)

The user consistently wanted a **website we can build, deploy, extend, and manipulate from chat**. The assistant incorrectly reframed that as a requirement to **control Chrome or access arbitrary third-party page DOM**. That self-imposed requirement led to unnecessary exploration of Android pairing/companion transport, browser extensions, accessibility/screen capture, bookmarklets, and Site gateway changes. The assistant then treated lack of Site deployment access in ordinary chat as a blocker, even though GitHub Pages and the existing connected Supabase tools were sufficient for a first-party cooperative page. It repeatedly explained or proposed architecture instead of shipping the smallest end-to-end experiment. The problem was assistant scope drift and failure to distinguish first-party page instrumentation from browser-level automation, **not ambiguity in the user's request**.

**Correction:** For owned JIT pages, instrument the page directly and use a backend command/state channel. Do not require Android pairing, Work, Chrome privileges, screenshots, arbitrary-tab DOM access, or Site gateway changes unless a future *specific* requirement justifies them. Preserve the earlier E2–E5 work without making it part of this new critical path.

### Next steps (ordered)

1. **Harden the demo before extending its authority.** The current `jit-page-demo` endpoint has `verify_jwt:false`, publicly readable state and publicly callable command acknowledgment; CORS is not authentication. Introduce scoped authorization for command submission/claim/acknowledgment, owner/session isolation, bounded operations, replay resistance, atomic/idempotent claiming, and expiry. Do not expose Supabase service-role credentials or reuse the unauthenticated demo for sensitive operations.
2. **Define a minimal first-party page protocol:** page/session identity, capability registry, typed command envelope and IDs, result/error acknowledgment, version/revision, freshness, and bounded read-only observation. Prefer a small auditable contract over speculative general-browser machinery.
3. **Demonstrate actual UI inspection and manipulation** on an iterated JIT page: report selected DOM/application state; chat issues a harmless action (e.g. change a component value, toggle a panel, select a scene element); page executes and returns structured result; verify in Android Chrome and backend. Keep user approval for consequential actions.
4. **Choose the normal chat dispatch path.** Supabase management SQL is proven but is an administrative connector, not an ideal user-facing runtime API. Evaluate routing the same authenticated command protocol through the existing JIT MCP backend capabilities while preserving the six installed tool signatures, or a purpose-built authenticated connector. Do not conflate this integration with the already verified page transport.
5. **Test reliability:** foreground/background behavior, refresh/reconnect, command ordering, duplicate delivery, timeout, offline recovery, and multiple sessions/devices. Measure rather than promise latency.
6. **Maintain this ledger** with UTC evidence, code/deployment revisions, independent readbacks, failures, and precise boundaries. Update README/HANDOFF only after verified implementation, not speculative design.

**Decision:** First-party cooperative website control is the primary JIT iteration path. Android pairing remains a separate historical capability, not a prerequisite. The immediate work is security hardening and a typed inspect/act/ack protocol—not rebuilding browser control.


## 2026-11-08 — First-party UI inspect/act experiment deployed (ANDROID ACCEPTANCE PENDING)

- Extended the existing bounded demo command queue with `toggle_panel`, `select_orbit`, and `select_grove`. Extended shared state with `panel_open` and `selection`; retained original counter commands and state.
- Added `public.jit_demo_apply_command(bigint)` with row locks and a transactional state update + command consumption, improving idempotence for duplicate acknowledgments. Revoked public/anon/authenticated EXECUTE, granted only to `service_role`.
- Deployed `jit-page-demo` Edge Function **v2**, with `protocol:1`, `revision:2`, read-only shared UI state in GET, and RPC-backed command acknowledgment in POST. Original counter page remains supported.
- Created `jit/mcp/control/ui.html` on GitHub master commit `b8beab2180185117b5fd88680926a40f6d34c36a`, URL `https://bonoj.github.io/jit/mcp/control/ui.html`. UI has two selectable elements (Orbit and Grove), an inspector panel, visible selected state, polling status, and command execution log.
- **No Android acceptance yet.** Next: user opens the UI page in Chrome; assistant enqueues `select_orbit` or `toggle_panel` from ordinary chat; user confirms visual change without refreshing; independently verify backend state and consumed command.
- **Security limitation unchanged:** the demonstration Edge Function is public and its command-acknowledgment POST is unauthenticated. The RPC transaction improves concurrency but **does not authenticate the browser**. The demo is restricted to harmless predetermined UI operations and must not be extended to private or consequential capabilities before session-scoped authorization is implemented.


## 2026-11-08 — First-party DOM observe/click/fill implementation deployed (ANDROID ACCEPTANCE PENDING)

**Correction of course:** no Work or ChatGPT Site redeployment required. Continue in ordinary ChatGPT using GitHub Pages and Supabase; do not reintroduce Android pairing as a dependency for first-party JIT pages.

- Supabase migration added `form_text`, `dom_snapshot` and command `args`, and bounded `click` / `fill` actions. Updated `jit_demo_apply_command` to validate allowlisted target IDs and maximum 120-character form values, applying command + consumption transactionally. Existing counter and panel commands preserved.
- Deployed `jit-page-demo` Edge Function **v3**, protocol 1 revision 3. GET advertises pending typed commands and shared state; POST accepts a bounded DOM snapshot or acknowledges a command through the database RPC. Existing v1 counter page remains compatible.
- Deployed `jit/mcp/control/dom.html` at `https://bonoj.github.io/jit/mcp/control/dom.html`, GitHub commit `d8109452a50bd4c8edb99519a9450153716a371e`. The first-party page inventories its four allowlisted controls (three buttons, one text input), publishes their labels/values as a DOM snapshot, polls for commands, invokes `HTMLElement.click()` or assigns `HTMLInputElement.value` and dispatches `input`, then displays the acknowledged shared state.
- **No user/browser verification yet** for this deployment. Next: user opens `dom.html` in Android Chrome and confirms Connected; assistant reads `dom_snapshot` through connected Supabase, then enqueues a typed `fill` and `click` using discovered target IDs, and verifies browser-visible behavior and database consumption without refresh.
- **Important limits:** this is a first-party cooperative page, not arbitrary-tab DOM access. Snapshot data is shared through the demo backend rather than E4 paired companion. The function is still unauthenticated and exposes demo state/acknowledgment to public callers; do not send private data or scale to arbitrary actions. Backend updates state before the page calls `click()` or sets the input; acknowledgment proves command consumption, **not independently that the DOM event succeeded**. Subsequent iterations should report post-action browser observations and error status, use authenticated scoped sessions, and make acknowledgment occur after successful execution.


## 2026-11-08 — Architecture pivot: one-install Android WebView companion (DECISION; NOT IMPLEMENTED)

**Decision source:** User identified an already-owned Android device as a process-capable browser host and explicitly rejected repeated APK downloads. This supersedes the proposed hosted Chromium/Playwright runtime as the implementation target. Canonical specification: [ANDROID-WEBVIEW.md](ANDROID-WEBVIEW.md); concise resume path: [HANDOFF.md](HANDOFF.md). The earlier [BROWSER-AUTOMATION.md](BROWSER-AUTOMATION.md) remains a record of the cloud-browser design, **not** the controlling plan where it conflicts.

### Why pivot

- **Cloud browser was an unnecessary new dependency.** GitHub Pages and Supabase Edge Functions cannot themselves host a persistent Chromium process, so the earlier plan required another compute provider (Railway was identified as an *optional* candidate, not connected). That would add provisioning, operating cost, and another integration to maintain. No remote Chromium deployment was performed.
- **Chrome on Android is not an open automation API.** Existing Android Chrome sessions/tabs and cookies cannot be inspected or controlled by an ordinary unrelated app via a supported unrestricted DOM interface. Chrome DevTools Protocol access on Android typically involves ADB debugging/authorization and transport complexity; accessibility provides UI semantics rather than unrestricted page DOM. E3/E4 demonstrated heartbeat and consented snapshots, **not** arbitrary Chrome-tab control.
- **First-party page experiments were intentionally narrower.** The Supabase-backed counter/UI/DOM demos worked only on cooperative JIT pages with embedded polling/instrumentation; the DOM demo had no Android acceptance and its backend could acknowledge state before real DOM execution. Its public unauthenticated endpoint is unsuitable for general browsing. These experiments remain valid evidence for command delivery and failure modes, not evidence of arbitrary-site automation.
- **The physical phone already supplies compute and browser embedding.** A Kotlin app can own an Android WebView and invoke `evaluateJavascript` against loaded pages, enabling DOM-derived observations and grounded actions on many unmodified sites without paying for cloud Chromium. This does **not** grant access to existing Chrome tabs/cookies or bypass browser security boundaries.
- **Repeated APK installations would destroy the iteration loop.** Put the durable Android permissions, WebView, authenticated transport, safe script loader and native dispatch into a small once-installed host; deliver DOM automation logic as versioned, verified JavaScript. The objective is routine chat-driven changes without reinstalling. Native defects, new permissions, Android API changes or security fixes may still require an APK update.

### Capabilities planned, not yet demonstrated

| Surface | New target capability | Important boundary |
|---|---|---|
| Browser host | Android companion owns a visible WebView and maintains its own session | Not Chrome's existing session; Android background execution can be suspended |
| Read | Actual page URL/title, bounded visible text, actionable DOM elements with role/name/value and revision | Cross-origin frames and protected surfaces may be inaccessible; avoid leaking secrets |
| Act | Navigate, grounded click, fill with appropriate events, scroll, back | Must execute in WebView and return **fresh DOM postcondition**; stale refs rejected |
| Control | Authenticated JIT MCP → Supabase command/result transport → enrolled device | No unauthenticated demo queue; user/device scoping, expiry, replay protection, stop/revoke |
| Iteration | Remotely shipped signed/versioned JS runtime with digest verification, compatibility checks and rollback | No remotely granted native permissions; native API changes still require an app update |
| Workflow | Ordinary Android ChatGPT handles use **and development** via existing plugin/GitHub/Supabase | Companion must be available; no Work, manual relay or repeat sideload in normal use |

### Evidence and unchanged infrastructure

- **VERIFIED before pivot:** Private plugin callable from ordinary Android ChatGPT, six unchanged MCP signatures; E5 authenticated backend-only capability extension `echo_text_v1` → `text_length_v1` without Site/plugin republish; E3/E4 device transport/consent patterns; first-party queued command delivery. Preserve those results.
- **INSPECTED 2026-11-08:** Live Supabase `jit-mcp-capabilities` ACTIVE v4, `verify_jwt:true`, revision 2, only text/integer capabilities, 2048-byte request limit. Structured browser payloads and post-action results are **not yet supported** by this deployed interface. Existing gateway secret stays configured.
- **NOT BUILT / NOT VERIFIED:** Android WebView APK, secure enrolled device command/result service, remotely verified JavaScript update channel, arbitrary-site DOM observation/actions, or end-to-end ordinary-chat acceptance. No APK installed, no browser-host subscription required, and no claim of completed browser automation.

### Implementation and acceptance gates

1. Inspect live gateway/Supabase sources and preserve E5 compatibility. Design backward-compatible structured command/result envelopes; do not deploy stale repo runtime mirrors.
2. Commit/build minimal Kotlin WebView companion and GitHub Actions APK pipeline. Include visible stop, enrollment, authenticated transport, safe remote JS update/rollback, and execution result handling.
3. Install/enroll the APK **once** after the native host is ready. Verify chat-issued commands reach the device and completed results return; queueing alone is insufficient.
4. Deploy and revise the DOM automation JavaScript remotely; verify a behavioral update is adopted **without downloading a new APK**.
5. From **ordinary ChatGPT**, navigate/observe/fill/click/observe on two unrelated unmodified public websites, with real DOM-derived postconditions, plus revoke/offline tests. Record UTC timestamps, versions and outputs here. Do not mark VERIFIED before those tests.

**Status: SPECIFIED / IMPLEMENTATION PENDING.** This entry is a decision record, not experimental proof. Future work must follow [HANDOFF.md](HANDOFF.md) → [ANDROID-WEBVIEW.md](ANDROID-WEBVIEW.md); do not resume the Railway/cloud-host path without explicit user direction.


## 2026-11-08 — Android companion initial source scaffold (IMPLEMENTED IN REPO; BUILD UNVERIFIED)

- Committed Android Gradle project under `jit/mcp/android/`: WebView Activity with HTTPS-only user-entered navigation, JavaScript enabled, DOM storage, file/content access disabled, mixed content blocked, visible stop/clear and a **local-only** `evaluateJavascript` DOM observation diagnostic. The Activity is currently **Java**, not the Kotlin called for in the spec; this must be resolved before the first intended installation.
- Added `.github/workflows/jit-android.yml` to attempt `gradle :app:assembleDebug` and upload a short-lived debug APK artifact. Workflow commit `a48014942f6a4ab2d260dc56dc70a8fadfecf2cf`.
- **Not verified:** workflow completion, Gradle compilation, APK artifact, physical-device operation. No installation requested. Debug builds are not the final signed once-install release channel.
- **Not implemented:** authenticated device transport/enrollment, signed remotely updatable JS, browser commands through MCP, post-action observation, or arbitrary-site end-to-end acceptance. No remote commands are accepted by the prototype; no untrusted page-to-native bridge is exposed.
- **Next:** verify/fix CI build, implement native secure transport and signed JS update path, then produce the single intended installable APK. Do **not** ask the user to install the prototype.


## 2026-11-08 — Android CI and DOM runtime source follow-up (SOURCE ONLY)

- Updated `.github/workflows/jit-android.yml` to provision pinned Gradle 8.9 with `gradle/actions/setup-gradle@v4`, matching Android Gradle Plugin 8.7.3; commit `56c448558925135de514abb6c15dbd88c9d050bd`. No successful GitHub Actions run has been observed yet; no build claim.
- Committed `jit/mcp/android/runtime/dom-v1.js`, commit `1ec586e4e63867f160a1389db83985fc9e79c492`. It defines a versioned in-page DOM observer, visible actionable element refs, revision checks, bounded observations, and click/fill dispatch with input/change events. It intentionally does not access native APIs, credentials or network.
- **Important:** This JS is not yet remotely fetched or injected by the APK; its synchronous action result is **not** proof of navigation/SPA settlement or completed browser acceptance. It needs authenticated native orchestration, post-action settle/re-observe, signed update validation, and cross-site tests. No APK installation requested.


## 2026-11-08 — Native WebView → packaged DOM runtime integration (SOURCE ONLY)

- Committed `jit/mcp/android/app/src/main/assets/dom-v1.js` as an offline copy of the versioned DOM runtime, commit `0456939f742f9fcbcc1ab02e980d4349c2cd0a4a`.
- Updated `MainActivity.java`, commit `3deed08f6baa61b6417932cec4d86790203ec2c0`: visible **Inspect DOM locally** button loads the packaged JS asset, runs it with `WebView.evaluateJavascript`, invokes `__jitDomRuntime.act({operation:'observe'})`, parses returned JSON and displays observation revision and control count. HTTPS page is required; errors are reported in-app.
- **Source integration only:** Android compilation, device execution and actual DOM output remain UNVERIFIED. The bundled runtime is an offline baseline, **not** remotely updated. No enrolled device, secure command transport or remote action execution exists. Do not request APK installation yet.
- Next gate: validate build, then implement authenticated transport and verified remotely updatable runtime with fallback. Never expose an untrusted page-to-native bridge or route public demo commands into this WebView.


## 2026-11-08 — WebView asset loading hardening; build verification still unavailable

- Updated `MainActivity.java` at commit `ac429847e5cabb0ae0c96d6d6f96e7295b01b983`: replace single `InputStream.read` with complete buffered read of the bundled JS runtime; disable WebView debugging, multi-window support, file-URL cross-origin access.
- Attempted to inspect GitHub Actions runs using available GitHub tools; only PR-filtered commit-run lookup and run-ID-specific endpoints were available, with no general workflow-run listing. The public GitHub workflow-run endpoint could not be retrieved. **No successful or failed Android build was observed**. Do not infer a build result.
- **Still blocked at build verification**, before native transport/enrollment and remote update integration. No APK installation requested.


## 2026-11-08 — Android CI green reported; typed native WebView executor committed

- **USER-REPORTED:** GitHub Actions build became green after workflow SDK fixes, most recently commit `be2803466e595fcbd466136563a17ae2446ab71f`. This is evidence of a successful reported build, not independent APK installation/device testing. Earlier failures: obsolete `sdkmanager tools` requested by `android-actions/setup-android@v3`; then `sdkmanager` not on `PATH`. The workflow now resolves SDK manager from installed command-line tools.
- Committed `BrowserExecutor.java` at `03ff69fe2aedd663ad9f9761210a34e4b0d46046`: typed local native dispatcher for observe, click, fill, scroll, back and HTTPS navigation, with bounded post-action re-observation and explicit errors. **A 350 ms delay is not proof of completion of arbitrary asynchronous site operations.** Navigation returns pending, not success.
- Wired the Activity's local Inspect DOM control to `BrowserExecutor`, commit `5c8cde53d783a245953c306d8e5b26d6f6891292`. This subsequent source revision has **not yet been build-verified**.
- **Still missing:** enrolled device auth, secure command/result queue, remote signed JS updates, ordinary-chat browser invocation, two-site acceptance. No one-time APK installation requested.


## 2026-11-08 — Live E5 backend inspection and Android transport authority contract

- Re-read live Supabase `jit-mcp-capabilities` v4: `verify_jwt:true`, gateway-secret authenticated, 2048-byte body limit, only `echo_text_v1` and `text_length_v1`. No browser capability or device queue exists. Queried database inventory: only `public.jit_page_commands` and `public.jit_page_demo` match JIT/device names; those belong to the earlier first-party demo and are not an authenticated browser-control plane.
- Committed [`android/TRANSPORT.md`](android/TRANSPORT.md), commit `0a8c0c03c2d79bc4bee4e6b99a268c4c14a26474`, specifying authenticated account/device enrollment, private command/result model, lease/idempotence, explicit foreground consent, revoke, and signed JS runtime updates.
- **Design contract only:** no new Supabase tables or functions deployed; no phone enrollment or remote command channel implemented. The existing E5 backend remains unchanged. Next implementation must prove the gateway's actual caller identity and deploy private authenticated transport before allowing any remote WebView action.


## 2026-11-08 — Private browser transport database foundation deployed (VERIFIED SCHEMA; NO COMMAND SERVICE)

- Created PostgreSQL schema `jit_browser` in Supabase project `iqglyokmcobegledbfcm`, with `devices`, `sessions`, and `commands` tables. Added foreign keys, expiration checks, command operation/status allowlists, JSON-object argument validation, and pending-command indexes.
- Enabled RLS on all three tables and revoked direct schema/table privileges from `public`, `anon`, and `authenticated`. Independent PostgreSQL verification returned `rls_enabled=true`, `anon_select=false`, `authenticated_select=false` for all three tables.
- **Not implemented:** device credential enrollment, service-to-service identity checks, atomic command claiming, authenticated Edge Function API, signed JS updates, or Android polling. No new public endpoint was exposed and no browser commands can be submitted or executed through this schema yet.
- Preserved the existing `jit-mcp-capabilities` v4, gateway secret and first-party demo tables. Next: implement account/device authorization and authenticated claim/complete service before wiring the APK.


## 2026-11-09T00:38:36.960Z — E6 foreground observation transport deployed; phone acceptance pending

- Recovered exact E5 Site source `37d8325083afdbccc431706427b567afe51f7d6f`. Existing six signatures, Site, plugin identity, and gateway credential preserved. Published Site deployment `appgdep_6af115a40e10819180dc38526469a281`, source `a56552c2f36bc432326ac58fd694093268b78b22`, environment revision `2`.
- Applied `jit_browser_transport_v1` migration. Database readback confirmed RPC execute privileges: anon false, authenticated false, service_role true. Existing private schema remains unavailable directly to clients.
- Existing Supabase capability function ACTIVE v5, JWT verification still enabled. Installed MCP returned backend available at revision `201326592`; `text_length_v1("Hello 🐝")` returned 7. `browser_observe_v1` returned `foreground_session_required` without a device. `browser_runtime_key_v1` returned the public signing key pinned by the APK. These calls ran in Work.
- Source implements write-once enrollment codes, Android Keystore-protected device credential, explicit foreground/origin scope, atomic observe claim and bounded completed result, and Ed25519 verification of signed JS. The runtime key uses a domain-separated derivation from the existing server-held gateway secret. Neither the APK nor the repository contains that secret; the Android JWT asset is the project's public anon key.
- Site regression tests and build passed. Backend fixture tests passed for typed routing, token hashing, origin validation and signed manifest tamper rejection. The APK workflow is triggered by this source commit. Physical Android enrollment, completed WebView observation, ordinary-chat readback and installed signed update remain unverified. Remote observation is the only queued operation enabled by this slice; native navigation remains user-operated.

## 2026-11-09T00:40:48.691Z — E6 APK built and verified

- GitHub Actions run `42541309034` built commit `b1238a07d5f7c539775a6cf4b2e662a392d0a9c6` and uploaded artifact `13641212121`. Downloaded archive SHA-256 matched GitHub's digest `5189c9128da5db760b583a26ef2c917e21c6cf3a24cf6ae1f8a33518a3e57e18`.
- Extracted APK SHA-256 `8163e9f8a3263786445db64e5ea4dc7bb913a2cb39ae0173f7b87016f353b70c`. Android apksig verified v2 signing (Android Debug certificate). Pinned runtime public key inside APK matched the live capability readback. This debug signing identity is for this test installation; a durable native release signing channel has not been configured.
- Live Supabase rejected an unknown device's signed-runtime request with HTTP 401 `unauthorized`. Existing E5 call and E6 foreground guard were independently verified through the installed plugin in Work. Physical installation, enrollment, foreground WebView result, and ordinary-chat acceptance require the owner device. A local signature test passed; an installed phone fetching and activating v2 is still pending.

## 2026-11-09 01:55:47.881470 UTC — E6 real DOM round trip VERIFIED

- In an ordinary ChatGPT conversation, after the user reported **Sharing current page**, invoked existing private JIT MCP `jit_invoke` capability `browser_observe_v1` with empty input. It returned pending command `44a04929-0a7f-4c33-836f-8bd383aa20c8`.
- Invoked `browser_result_v1` with that command ID; returned **completed** with origin `https://example.com`, title `Example Domain`, real DOM text beginning “This domain is for use in documentation examples without needing permission.”, observed_at `2026-11-09T01:55:47.881470Z`, nonce `7191e661-c6b0-4b37-b01c-443d3d0108ba`, runtime_version `2`.
- **Verified:** plugin → authenticated Supabase transport → foreground Android WebView → live DOM observation → result readback. This supersedes the earlier false conclusion based on legacy `device_status` and `jit_observe` reporting unpaired.
- **Still open:** test Stop sharing / rejected post-revocation observation; independently verify signed runtime update without reinstall; verify which APK is installed and lifecycle stability. Do not claim all E6 acceptance complete.

## 2026-11-09 — E6 post-stop revocation VERIFIED

- User explicitly reported **Sharing stopped** after the successful remote DOM observation.
- Immediately invoked `jit_invoke({capability:"browser_observe_v1",input:{}})` from ordinary ChatGPT.
- The plugin/backend rejected the command with exact error `foreground_session_required` (`INVALID_ARGUMENT` wrapper). No new observation command was accepted.
- **Verified:** remote observation is blocked after user stops sharing. Enrollment persistence was previously confirmed separately in Supabase; this check does not prove installed APK version or signed runtime-update activation.
- **Remaining E6 work:** independently test remotely signed JavaScript update without APK reinstall; verify updated APK lifecycle behavior on the physical device. Do not conflate those with the already verified observation/revocation round trip.

## 2026-11-09 02:04 UTC — E7 physical link extraction VERIFIED, plugin readback BLOCKED

- Android E7 signed APK build [42548481030](https://github.com/bonoj/bonoj.github.io/actions/runs/42548481030) succeeded; observed live Android runtime **3** proves the new host/runtime executed.
- Ordinary ChatGPT invoked `browser_observe_v1`, received command `e0bbda09-cb66-4909-8808-7ec0ee5ab6ee` pending.
- `browser_result_v1` failed at plugin boundary with `invalid_output`.
- Authoritative Supabase `jit_browser.commands` record: `status=completed`, `claimed_at=2026-11-09 02:04:11.453375+00`, `completed_at=2026-11-09 02:04:11.557736+00`, `observed_at=2026-11-09T02:04:11.445184Z`, `origin=https://example.com`, `title=Example Domain`, `runtime_version=3`, nonce `79fe9bfb-7122-42d8-a969-e6a340c3320e`, `links=[{text:"Learn more",href:"https://iana.org/help/example-domains"}]`.
- This proves device execution, structured link extraction and backend persistence. **It does not prove plugin-facing E7 readback.** The existing Site gateway or plugin output validator appears to reject the new `links` property; inspect and extend its schema without altering six tool signatures. Do not ask user to reinstall or re-enroll.

## 2026-11-09T02:30:36.699727106Z — E8 bounded transport deployed; signed APK verified

- Recovered the live E6/E7 Site source `a56552c2f36bc432326ac58fd694093268b78b22`, Supabase v6 source and live PostgreSQL RPC. The old Site validator enumerated E6 result fields and rejected E7 links.
- Site deployment `appgdep_6af12f7d0ed88191957bdf85390a5528`, source `a75acd233ac580e7071aa016e6841195e115cf64`, environment revision `2` succeeded at `2026-11-09T02:27:14.977252+00:00`. Supabase function v7 deployed with JWT verification enabled. Same plugin, signing root, Site, credential and existing RPC privilege boundary.
- Protocol 1 separates bounded application objects from transport fields. Payload limit 2048 UTF-8 bytes, depth 6, 128 total nodes, 24 items/fields per container, strings up to 1024 UTF-16 units. Generic HTTP requests up to 4096 bytes; legacy requests retain 2048. Existing `browser_observe_v1` and `browser_result_v1` continue to use legacy E6/E7 shapes. The gateway accepts legacy links and opaque nested E8 results. Host negotiation prevents E7 clients claiming E8 commands. Mutating operations require an observation revision; native confirmation gates all mutating operations except bounded scroll. Runtime v4/v5 only implement observe, extract and (v5) scroll.
- Site and Edge fixture suites passed, including E7 links, novel nested output, invalid protocol/URL/depth/Unicode/size, owner/device authentication, signed release validation and tampering. Local PostgreSQL execution passed legacy negotiation, single-use enrollment fixture, concurrent enqueue, atomic claim, replay, origin/owner isolation, expiry and Stop. Production installed-plugin checks in Work returned catalog revision `268435456`, E5 Unicode length 7, and `foreground_session_required` on both legacy and E8 enqueue with no foreground session.
- [Actions run 42551098507](https://github.com/bonoj/bonoj.github.io/actions/runs/42551098507) built and signed `7dcdbb33c4f1bd7ed33574e1b9255d8b06e2811b`, artifact `13645376329`. Downloaded archive hash matched GitHub. APK hash `80d1e6816c06281ef4c5ca818421dcf1d06e88d9660846437e941b524461488f`; independently verified v3 Android signature, certificate SHA-256 `567c25ebd88715fcf157f68c700fc4e7601487fd747362f7da87cb9b26c91177`, and unchanged pinned JS signing public key. This verifies the binary, not physical installation.
- Baseline runtime v4 is signed by the existing key. Staged v5 bytes at the fixed GitHub Pages release URL; fetched bytes matched SHA-256 `693460a66e3ce39c953b4d3fec35bb5be18a13823e81cadf61436fecd49b69f7`. Runtime publishing uses a private version/digest approval row. Edge fetches only the fixed versioned URL and verifies its exact bytes before signing. The fixture proved that v5 introduces nested headings and scroll with the same protocol and signed manifest. v5 is not yet approved in production, so the phone can first prove v4.
- **Pending:** owner install in place and ordinary-chat v4 readback on the physical WebView; then approve v5, verify the new nested structure and real scroll without changing Site, Edge function or APK, and verify Stop. No re-enrollment or credential change was requested.
