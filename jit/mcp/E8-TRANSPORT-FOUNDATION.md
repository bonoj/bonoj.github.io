# E8 — Stable transport foundation: Work execution handoff

## Objective

Preserve the working ordinary ChatGPT → existing private six-tool JIT MCP → Site adapter → authenticated Supabase → installed Android WebView chain, but make **future signed JavaScript runtime capabilities independent of Site changes and routine APK updates**. This is a compatibility-preserving hardening pass, not a migration to another MCP host.

## Verified baseline and current blocker

- E6 real Android WebView observation of example.com completed through ordinary ChatGPT and the plugin. Stop sharing caused `foreground_session_required`.
- E7 signed Android build [42548481030](https://github.com/bonoj/bonoj.github.io/actions/runs/42548481030) succeeded. At 2026-11-09 02:04 UTC the Supabase command record `e0bbda09-cb66-4909-8808-7ec0ee5ab6ee` completed with runtime version 3, origin `https://example.com`, and `links:[{text:"Learn more",href:"https://iana.org/help/example-domains"}]`.
- The live plugin-facing `browser_result_v1` returned `invalid_output` because the Site worker's `commandResult()` enumerated only the E6 fields. Gateway source patched at commit `0ade195f7e1bba5ff8836b1465d9875a63c586da` to accept links. **The GitHub commit is not proof of a Site deployment. E7 plugin readback is still unverified.**
- Supabase Edge Function `jit-mcp-capabilities` v6 supports runtime v3; Android host currently forwards selected DOM fields. The system is already working and must not be replaced.

## Binding architecture

Retain the existing private JIT MCP plugin identity and six signatures: `integration_ping`, `device_status`, `browser_observe`, `jit_capabilities`, `jit_invoke`, `jit_observe`. Keep the Site as a thin, **stable** MCP/authentication adapter; Supabase Edge Functions/Postgres as authenticated command/session/result transport; Android WebView as the actual browser and signed-runtime executor. GitHub Pages is static hosting, not a server-side MCP runtime. **Do not migrate to direct Supabase MCP during E8.**

Preserve existing owner authentication, device enrollment, gateway secret, Supabase project `iqglyokmcobegledbfcm`, private schema, Android package/signing identity, foreground consent, per-origin scope, heartbeat/expiry, revocation, signature verification and antirollback. Never weaken these to achieve generic payloads.

## Required protocol generalization

Introduce a **versioned, bounded, generic JSON application payload** inside a **strict transport envelope**. The transport should validate identity, owner, device, session, command ID, status, operation authorization, version, expiry, byte size, JSON type/depth/entry limits and response integrity, **not enumerate every DOM property** such as `title`, `links`, `headings`, `controls`. Unknown protocol major versions fail closed. Do not make this an unrestricted arbitrary-command execution API. Signed JS runtime delivery remains a separate authenticated path; do not accept unsigned executable code inside commands/results.

Suggested conceptual envelope (illustrative only; preserve E6/E7 legacy shapes or introduce a negotiated version):

```json
{
  "protocol_version": 1,
  "command_id": "uuid",
  "status": "completed",
  "result": {
    "kind": "browser.observation",
    "schema_version": 1,
    "payload": {"title": "Example Domain", "links": []}
  }
}
```

Define precise limits across all boundaries. Existing Android request size is approximately 2048 bytes: account for full UTF-8 serialized body, nesting, key count, array count, result persistence, gateway response and Unicode. Reject oversize input explicitly rather than silently truncating. Preserve backward compatibility with `browser_observe_v1`, `browser_result_v1`, E5 backend-only capabilities, and the six fixed MCP tools. The gateway must be deploy-once for this contract; later **new signed runtime observation shapes must not require another Site or Supabase deployment**. Native changes only for genuinely new host/Android capabilities.

## Work sequence

1. Read `INVARIANTS.md`, `ANDROID-WEBVIEW.md`, `EXPERIMENTS.md`, `E7-STRUCTURED-DOM.md`, this file, and live source. Inspect deployed Site worker, deployed Supabase Edge Function files, private SQL transport, Android `DeviceTransport.java`, signing manifest, workflows and tests. Deployed state outranks stale repo copies.
2. Recover the **actual Site deployment mechanism**. Deploy the minimal E7 gateway fix and verify plugin-visible E7 readback if possible; no new enrollment or APK. If Site deployment needs Work, perform it once during E8. Do not claim deployment from a GitHub commit.
3. Specify and implement the generic transport envelope at Site, Supabase and Android boundaries, with version negotiation/backward compatibility. Make Android forward bounded signed-runtime results without schema-specific `links` patches. Do not break existing authenticated transport or consent.
4. Add deterministic tests for legacy E6 results, E7 links, novel nested payloads, invalid/oversize/deep JSON, Unicode, malformed URLs, unauthorized device, stale/revoked sessions, invalid runtime signature, rollback, replay, expiry, and concurrent commands. Preserve meaningful per-origin security checks.
5. Test/build/sign, deploy Supabase and Site **once** for the generalized protocol. In-place install only if the Android native transport truly changes. Never uninstall, clear app data, re-enroll, rotate credentials, or change the existing plugin identity.
6. Perform real on-device acceptance: ordinary ChatGPT → command enqueue → real Android WebView → Supabase completion → plugin-visible result. Test Stop sharing and denial.
7. Remotely publish a **different signed runtime** (for example visible headings or controls) and prove its new structured output through the **same deployed Site, same Supabase function and same installed APK**, with no Site/Supabase/APK changes between runtime versions. This is the core success test.
8. Log actual UTC timestamps and evidence (commit, CI run, function version, Site deployment, runtime version, command IDs, successful and rejected calls) in `EXPERIMENTS.md`. Update `HANDOFF.md` and `INVARIANTS.md` to match reality.

## Definition of done

E6 and E7 plugin readback still work; one novel signed-runtime observation shape passes ordinary ChatGPT end to end **without another gateway/backend/native deployment** after protocol hardening; revocation still works; six tool signatures, enrollment and secrets unchanged; verified UTC evidence recorded. Do not label complete before that.

## Non-goals and stop conditions

No new plugin, Site replacement, direct Supabase MCP migration, cloud browser, speculative redesign, UI overhaul, credentials regeneration or repetitive user enrollment. If Site deployment is unavailable in current tools, implement and test everything possible, identify exact deployment blocker and hand off without falsely claiming completion. Only request human action for indispensable physical-device acceptance.

## Work invocation

**Execute E8 end to end in `bonoj/bonoj.github.io`, branch `master`, directory `jit/mcp/`. Read this file and `INVARIANTS.md` first. Keep the existing six-tool plugin, Site identity, Supabase and Android enrollment. Generalize and deploy the bounded transport once so future signed JavaScript runtime changes need no Site mutations. Verify real device acceptance and signed-runtime-only evolution. Update the UTC experiment log and handoff. Do not redesign or re-enroll.**
