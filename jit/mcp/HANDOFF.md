# JIT MCP — E5 handoff (2026-11-08)

## Objective
Extend the **existing private JIT MCP plugin** from ordinary ChatGPT without Work for every new capability. Preserve the Android companion, consent controls, pairing, and all six existing MCP tools.

## Verified
- E2 `integration_ping`, E3 `device_status`, E4 `browser_observe` on Android in ordinary ChatGPT; consent, counter refresh and revocation verified. See [EXPERIMENTS.md](EXPERIMENTS.md).
- E5 Site exposes `jit_capabilities`, `jit_invoke`, `jit_observe`; built-in `echo_integer(42)` works. **Independent backend capability dispatch is NOT verified.**
- Private plugin ID `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`; Site project `appgprj_6af07fda46ec8191a71e9df6f4bc9e75`; Site https://jit-mcp.bracedbuddy1.chatgpt.site .
- Supabase project **Hermeticon Memory** `iqglyokmcobegledbfcm`, existing `memory` function untouched. Separate `jit-mcp-capabilities` Edge Function deployed **ACTIVE v2**, `verify_jwt:true`, containing allowlisted bounded `echo_text_v1`. Backend is **fail-closed** until `JIT_MCP_GATEWAY_SECRET` is securely configured.

## Canonical code and constraints
- `runtime/index.mjs` is the Edge Function source; `runtime/index.ts` is an identical mirror; `runtime/index.test.mjs` is the six-test suite. `.github/workflows/jit-mcp-runtime.yml` tests and checks mirror equality; no automatic production deployment.
- Auth contract: Supabase JWT in `Authorization: Bearer <jwt>` (verified by Supabase), independent server-only shared credential in `X-JIT-Gateway-Secret` (verified by handler). Do not expose either to the Android companion or model-visible payloads. No custom HMAC, replay database, or background infrastructure.
- Strict allowlist, bounded JSON body (2048 bytes), bounded echo (256 characters), fixed backend URL, no arbitrary code/URL/device actuation. If adding consequential operations later, design their authorization separately.
- **Critical:** GitHub `site/worker.mjs` is a stale E4 mirror; live Site already has six E5 tools. **Never deploy that stale mirror over production.**

## Only remaining E5 integration work
1. In Work/Sites, retrieve and preserve the **exact live E5 Site source** before modifying anything. Reconcile `site/` mirror.
2. Provision the backend credential using supported secret stores; configure the Site's server-only JWT and shared credential. If Site cannot securely hold credentials or call Supabase, stop and report the actual blocker.
3. Make a **single** Site bootstrap change: forward existing `jit_capabilities`/`jit_invoke` through a fixed, authenticated server-side call to the independent Supabase function, preserving existing built-in capabilities and all E2–E4 behavior. No new plugin or new tool signature.
4. Verify baseline, then deploy a new harmless capability by changing **only** Supabase backend source. From ordinary Android ChatGPT, verify discovery and invocation without Site/plugin republish between baseline and new capability. Capture exact UTC results and deployment/release IDs.
5. Update [EXPERIMENTS.md](EXPERIMENTS.md), README and CONTRACT with **observed** results, not assumptions.

## Scope control
No further security frameworks, database tables, custom signing protocols, or repeated planning documents for this read-only proof. Do not claim completion until ordinary-chat end-to-end evidence exists.

## Work continuation
“Continue JIT MCP E5 from `jit/mcp/HANDOFF.md`. Recover exact deployed Site source first. Preserve plugin ID, six tools and Android E4. Configure fixed Supabase gateway, run the backend-only capability deployment proof, and record actual ordinary-chat results. No new infrastructure.”
