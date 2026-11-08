# JIT MCP — current handoff: arbitrary-site browser automation

**Read [BROWSER-AUTOMATION.md](BROWSER-AUTOMATION.md) FIRST. It is the binding objective, implementation inventory, ordinary-chat-first policy and acceptance contract.** This file replaces the obsolete E5 owner-setup instructions. No Work session is required for routine usage or ordinary development.

## Actual status

- **VERIFIED:** Private JIT MCP plugin callable from ordinary ChatGPT on Android, six unchanged MCP tool signatures.
- **VERIFIED:** E5 authenticated Supabase capability discovery and invocation via `jit_capabilities` / `jit_invoke`; original gateway secret already provisioned. Production baseline `echo_text_v1` succeeded.
- **VERIFIED:** Backend-only Supabase deployment of `text_length_v1` was discovered and invoked from ordinary ChatGPT, returning `7` for `Hello 🐝`, with no plugin/Site republish. See EXPERIMENTS.
- **VERIFIED, HISTORICAL:** E3/E4 paired Android Chrome companion and consented snapshot; useful auth/freshness patterns, **not** required for the target.
- **VERIFIED, HISTORICAL:** First-party Supabase command delivery to GitHub Pages without refresh; not arbitrary-browser control and not a substitute for Chromium.
- **NOT IMPLEMENTED:** Hosted Playwright/Chromium runtime, arbitrary-site DOM inspection, click, fill, scroll and end-to-end acceptance through JIT MCP.

## Next action in an ordinary ChatGPT conversation

1. Inspect the deployed `jit-mcp-capabilities` Edge Function and **live** Site gateway implementation, not the stale `runtime/index.mjs` mirror. Confirm current authenticated dispatch and version/schema limits. Preserve existing secrets, plugin identity and six tool signatures.
2. Find a **deployable, process-capable Chromium host** using tools/connectors available from ordinary chat. Prioritize one-time provisioning with subsequent API/GitHub-driven deployments. If provisioning cannot be done with available tools, specify exactly one necessary user action and keep all subsequent work in ordinary chat.
3. Deploy isolated Playwright/Chromium runtime. Verify real DOM observation of an unmodified site from the runtime.
4. Expose versioned browser capabilities through the **existing** Supabase backend and `jit_invoke`; preserve the installed plugin. The existing text/integer-only E5 schemas may need a backward-compatible extension for structured browser observations and action payloads; test and document that actual constraint rather than pretending the current schema supports browser control.
5. Verify from **ordinary ChatGPT**: navigate → real DOM observe → fill → click → fresh DOM observe on two unrelated unmodified websites. Log UTC proof in EXPERIMENTS. No Work or Android companion in the acceptance path.

## Do not drift

Do not re-run /setup, rotate credentials, create another plugin, ask for Android pairing, deploy another first-party counter/UI demo, use Supabase SQL queue changes as evidence of browser control, or require Work for routine development. The product is **ordinary ChatGPT operating arbitrary websites through a remotely controlled browser**. If a step does not advance that, stop and return to the canonical spec.

## Pointers

- [Canonical spec](BROWSER-AUTOMATION.md)
- [Experiment evidence](EXPERIMENTS.md)
- Supabase project `iqglyokmcobegledbfcm`, Edge Function `jit-mcp-capabilities`
- Existing plugin `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`
- Existing six tools: `integration_ping`, `device_status`, `browser_observe`, `jit_capabilities`, `jit_invoke`, `jit_observe`
