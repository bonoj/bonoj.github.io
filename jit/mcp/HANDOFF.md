# JIT MCP — E5 handoff (2026-11-08)

E2–E4 are verified in ordinary Android ChatGPT. E5 interface v1 works, and the Supabase gateway is deployed on the existing Site. **Independent production capability deployment remains unverified.**

- Site: https://jit-mcp.bracedbuddy1.chatgpt.site (companion `/device`). Project `appgprj_6af07fda46ec8191a71e9df6f4bc9e75`.
- Site v7 deployment `appgdep_6af0ec66ed648191a0cd5e88ac546583`, version `appgprj_6af07fda46ec8191a71e9df6f4bc9e75~appgver_fcfbb8dc2994819180f7845b00b1bb74`, source `b69b739d709f10e0c5e56a56136aca7a983fa478`. The reviewed source is mirrored under `site/`. Compare the live Site commit before any further edits.
- Private plugin `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`; release `PluginRelease_a2893093886481919da01bd918ca4504`. All six tool signatures are unchanged.
- Supabase project `iqglyokmcobegledbfcm`, function `jit-mcp-capabilities` ACTIVE v2 with `verify_jwt:true`. Source: `runtime/index.mjs` and its identical `index.ts` mirror. The existing `memory` function is independent.
- The Site holds the legacy anon JWT under `JIT_MCP_SUPABASE_JWT`. Production `jit_capabilities` returned `backend_status:"not_configured"`; local echo and observation calls answered.

## Resume here

1. Use an authenticated Supabase Dashboard or CLI session to set a strong random `JIT_MCP_GATEWAY_SECRET` in Edge Function secrets. Set the identical value in the existing Site's server-only secret store and apply that environment revision to v7. Use secret inputs, never chat text, repo content, source, client code or logs. The connected Supabase tools have no secret-write operation.
2. In ordinary ChatGPT, call `jit_capabilities` and confirm `backend_status:"available"` and `echo_text_v1` in the catalog. Invoke it with `{text:"e5-baseline"}` and the returned catalog revision. Record UTC results and current Site deployment/plugin release.
3. Only then deploy a backend-only revision introducing a distinct read-only capability. Example: `text_length_v1`, with `input_kind:"text"`, `output_kind:"integer"`, bounded input and an incremented backend catalog revision. Test locally, deploy only `jit-mcp-capabilities`, and verify discovery and invocation from ordinary ChatGPT. Confirm the Site deployment, plugin release and six tool signatures stayed fixed across this step.
4. Record exact observations in [EXPERIMENTS.md](EXPERIMENTS.md). Keep E5 pending until the ordinary-chat production proof is observed.

No new plugin, database, inference service or replay infrastructure is needed.

## One-time browser provisioning implementation (not deployed)

Prepared in GitHub commits `45c65fd`, `345b710`, `47651f3`. The **live Site is unchanged**. `site/worker.mjs` adds an authenticated `/setup` page and same-origin `/api/setup` endpoint. It requires an actively paired owner session, validates a 64–128 character alphanumeric/underscore/hyphen secret, inserts once into the server-only D1 `jit_gateway_config` table, and thereafter uses the stored value as `X-JIT-Gateway-Secret` when calling Supabase. Existing environment-secret support is preserved. No secret is returned to the browser. SQL migration: `site/gateway-setup.sql`.

**Work deployment sequence:** (1) compare the current live Site source and GitHub mirror; do not overwrite newer live changes, (2) inspect Site database access/security and ensure server-side-only table and platform encryption at rest, (3) apply the SQL to the existing Site DB, (4) deploy the reconciled Site code without modifying plugin tool signatures, (5) have the user open `https://jit-mcp.bracedbuddy1.chatgpt.site/setup` while signed in and with the Android companion actively paired, paste the **existing** 64-character Supabase secret, and save, (6) verify backend availability and backend-only deploy through ordinary ChatGPT. **Do not request the secret in Work or chat.**

**Security review before deployment:** active pairing narrows access but does not independently establish a unique immutable owner; verify that the paired session belongs to the intended Site owner and pin authorization if necessary. Confirm the D1 storage protection is acceptable; unlike the platform's managed secret store, this is an application database value. Never claim the Site has been deployed or that this is a managed Site secret. If these controls cannot be established, do not deploy the setup endpoint.
