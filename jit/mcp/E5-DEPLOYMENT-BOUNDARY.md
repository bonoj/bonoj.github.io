# E5 — Deployment boundary and migration decision

Status: **design gate; no production migration authorized or performed** (2026-11-08).

## Verified

E4 is fully verified on real Android through ordinary ChatGPT. E5 stable tools `jit_capabilities`, `jit_invoke`, `jit_observe` are discoverable and callable. `echo_integer(42)` returns 42. The live Site has interface v1/revision 0.

## Current blocker

`site/worker.mjs` in GitHub is an **E4-era mirror**, not the currently deployed E5 implementation. It advertises only `integration_ping`, `device_status`, `browser_observe`; the deployed Site advertises six tools including the three E5 tools. Do not deploy this old mirror over production.

The existing registered `jit_invoke` implementation demonstrably handles only the allowlisted capabilities reported by `jit_capabilities`. There is no evidence that it can dynamically load new code or forward to a remote service. Therefore merely publishing a new GitHub Pages script or Cloudflare Worker **cannot** make a new capability callable through the existing Site gateway. First, the gateway must explicitly support a controlled extension mechanism.

## Recommended target

- **GitHub Pages**: JIT browser UI, companion experiments where static hosting is sufficient, public documentation, and source-of-truth.
- **Independently deployable backend** (candidate: separately owned Cloudflare Worker with narrowly scoped storage): typed, allowlisted read-only capability implementations; deployment from a reviewed GitHub commit via authenticated CI or supported API.
- **Existing ChatGPT Site**: private MCP authentication gateway and fixed tool inventory. It must implement a verified authenticated proxy/dispatch to the independent backend before the backend can add capabilities without Site republishing.
- **Existing plugin identity** stays unchanged. Do not introduce a new plugin as a shortcut.

## Required security contract for any gateway extension

1. Fixed `jit_capabilities`/`jit_invoke` signatures, schema-validated names and payloads; default deny.
2. No arbitrary code, shell, user-supplied URLs, open proxy or arbitrary JavaScript from the model.
3. Server-to-server authenticated requests, owner isolation, short-lived credentials, explicit scope and replay protection; no forwarding ChatGPT identity headers or browser bearer tokens to untrusted origins.
4. Bounded payloads, timeouts, rate limits, explicit error responses and revision checks. No silently widening permissions.
5. Consent and revocation remain enforced at the trusted boundary for device observation. Remote capability registry cannot override them.
6. Prefer pinned registry/release manifests and signed/approved deploys; no unaudited runtime loading.

## Acceptance experiment (must be observed, not inferred)

1. Recover the **exact deployed E5 Site source** and deployed version/deployment ID, then reconcile `site/` and update README/CONTRACT/HANDOFF.
2. Confirm whether Sites permits updating the existing Site gateway outside Work. If not, a **one-time gateway modification** may still be required; do not claim the migration is already complete.
3. Provision independent backend with an explicit owner-controlled deployment method and add a harmless new read-only capability (e.g. `echo_text_v1`, bounded plain-text echo), distinct from existing `echo_integer`.
4. Verify `jit_capabilities` exposes it and `jit_invoke` calls it from **ordinary ChatGPT** with the *same* plugin ID and registered tool signatures, without a plugin release or Site republish between capability additions.
5. Record source commit, deployment IDs, server-reported revision, actual invocation outputs, plugin release/version before/after, and failures in EXPERIMENTS.
6. Only then mark E5 independent iteration VERIFIED.

## Decision

Do not migrate the functioning E4 companion or replace the Site yet. Keep GitHub Pages as default for artifacts. The next engineering task is recovering deployed E5 source and verifying a supported gateway-to-independent-backend extension mechanism. If this mechanism cannot be implemented without another Work session, record that as a one-time bootstrap limitation rather than inventing a deploy path.
