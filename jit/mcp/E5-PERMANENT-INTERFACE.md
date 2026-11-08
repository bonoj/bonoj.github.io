# E5 — Permanent MCP interface and browser-first development

Status: **scoped; not implemented** (2026-11-08).

## Objective

End the dependency on Work for routine JIT MCP experiments. Work/Sites may be needed once to update the existing plugin interface, but subsequent experiments must be implemented, deployed, configured, and tested through the owned browser-facing JIT runtime without changing the ChatGPT MCP tool inventory.

## Existing identity (preserve)

- Repo: `bonoj/bonoj.github.io`, branch `master`, directory `jit/mcp/`.
- Site: `https://jit-mcp.bracedbuddy1.chatgpt.site`; companion `/device`.
- Plugin: `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`.
- Site project: `appgprj_6af07fda46ec8191a71e9df6f4bc9e75`.
- E2/E3 verified. E4 Site deployed, but `browser_observe` not discoverable in fresh ordinary ChatGPT as of 2026-11-08. Android E4 acceptance pending.
- Preserve `integration_ping`, `device_status`, existing enrollment, auth, private audience and App binding.

## Required architecture

1. Stable, versioned, **small** MCP tool surface registered once. Candidate tools:
   - `jit_capabilities({})`: list enabled, schema-described capabilities and their risk/consent requirements.
   - `jit_invoke({capability, input, expected_revision?})`: dispatch a strictly allowlisted, schema-validated capability; no arbitrary code execution.
   - `jit_observe({scope?})`: retrieve a fresh, consented, narrowly scoped observation with provenance, freshness, nonce and explicit unavailable states.
   Tool names/signatures may be refined after inspecting actual platform constraints; document final contract before implementation.
2. Existing Site remains the authenticated MCP entrypoint. Put capability routing and state behind the stable interface, with a browser-accessible management/development surface where feasible. No promise that a static browser page can host MCP, or that arbitrary new backend code can be deployed without a supported deploy mechanism.
3. A first-party companion can share only explicit, minimized, foreground page state. No unrelated-tab DOM, Android OS control, secrets, screenshots, background surveillance or arbitrary command execution.
4. Capability registry must be default-deny, versioned and typed; per-capability input/output validation, permissions, rate limits, bounded payloads, audit metadata without secrets, and revocation. Treat remote data as untrusted. Separate read-only observations from any future user-confirmed actuation.
5. Implement one harmless vertical slice: the E4 demo counter exposed via stable `jit_observe`, and optionally a no-op/read-only capability via `jit_invoke`. Verify before-consent unavailable, consented fresh counter, changed counter + fresh nonce, and revocation while pairing remains active.
6. Design the iteration path: source edit -> test -> deploy -> capability appears through the **same already registered MCP tools** in an ordinary Android ChatGPT chat. Identify exact supported deployment/auth mechanism. Do not require Work for adding a capability after initial bootstrap; if this cannot be established, report blocker rather than claim success.

## Work implementation tasks

- Read `README.md`, `HANDOFF.md`, `CONTRACT.md`, `EXPERIMENTS.md`, `E4-OBSERVATION.md`, and inspect the existing Site and plugin manifests.
- Diagnose why `browser_observe` is missing after E4 deployment. Record whether it is tool-list caching, Site MCP manifest, plugin registration/release, or another cause; don't guess.
- Design and implement the stable tools on the **existing** Site/plugin; update existing registration only as necessary. Do not create a replacement plugin or Site.
- Keep E3/E4 compatibility where practical, and don't prematurely remove old tools.
- Add automated tests for dispatch validation, consent, user isolation, expiry, replay/stale observations, rate limiting and revocation.
- Deploy, verify tool discovery in a **fresh ordinary ChatGPT conversation** if available, and independently test a browser-originated counter update. If ordinary-chat invocation cannot be performed in Work, explicitly leave it pending for this chat.
- Mirror reviewed deployed Site source into `jit/mcp/site/`. Update README, CONTRACT, EXPERIMENTS and HANDOFF with exact deployment IDs, tests, limitations and a concise next-step instruction.

## Non-goals

No Android native app, accessibility service, unrelated-tab access, autonomous browser actuation, shell/code-execution capability, arbitrary user-provided URLs, new plugin identity, extra inference model, or ongoing Work runtime.

## Acceptance

**Bootstrap complete** only when the permanent tools are discoverable in ordinary ChatGPT, the existing Android session can consent to share a changing demo counter, revocation works, and an additional harmless capability can be introduced and used through the **unchanged** tool signatures without republishing the plugin. Distinguish local tests, Site deployment, plugin discovery, ordinary-chat readback and browser-first iteration as separate gates.
