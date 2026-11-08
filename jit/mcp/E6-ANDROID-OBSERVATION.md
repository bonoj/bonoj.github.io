# E6 — Android-native observation (implementation contract)

Status: **planned, not implemented or deployed**. E5 production backend-only capability iteration was verified in ordinary ChatGPT on 2026-11-08. E6 must provide **real Android-origin observations**, not synthetic Supabase data.

## Objective

In ordinary ChatGPT on Android, the user explicitly shares a screen snapshot from a native companion and the existing `jit_observe` tool reads it. Do not require Work for ordinary use, another model, or a new MCP plugin release.

## Constraints and trust boundary

- A Chrome page cannot capture other tabs or apps. Use an Android-native application and Android MediaProjection with an explicit OS consent prompt for each capture session as required by the platform.
- Capture only after a visible user gesture; show an unmistakable sharing state and Stop control. Never silently capture in the background. Respect Android foreground-service/mediaProjection rules for the target SDK. Handle permission revocation, app lifecycle and process death.
- Preserve the existing private plugin, its six tool signatures, Site identity, owner authentication, and E5 Supabase gateway. E6 may require an additive Site route and D1 schema migration, but must not weaken existing E4 consent or pairing behavior.
- Never send raw screen pixels through Supabase capability catalog. Route capture payload through authenticated, bounded, expiring Site storage. No persistent image history. No credentials or images in logs. Limit size, rate and retention; enforce user/session ownership server-side.
- Screen pixels are untrusted data. Redact or exclude secure surfaces as Android provides; do not attempt to bypass FLAG_SECURE. Do not implement accessibility control, taps, typing or background automation in E6.

## Minimum end-to-end slice

1. Add a small native Android companion project in `jit/mcp/android/` (Kotlin, modern Android APIs). It signs in/pairs using an explicitly documented supported owner-authenticated flow; do not copy browser session tokens or put gateway secrets in the APK. If native authentication cannot be established, treat that as an explicit implementation blocker, not an excuse to remove authentication.
2. The user taps **Share screen**; Android prompts for MediaProjection consent. Capture one bounded still frame, compress to a suitable image format, and upload over HTTPS to a new authenticated, consent-gated Site endpoint. Return a short-lived snapshot identifier and receipt time. Provide **Stop sharing** to revoke it immediately.
3. Add server-side snapshot validation and a bounded read-only observation route integrated with existing `jit_observe` (e.g. scope `android_screen_snapshot`), while retaining `companion_page_only` semantics. The stable tool schema currently permits only `companion_page_only`; if extending scope cannot be accomplished without changing the published tool signature, use an existing compatible output mechanism or explicitly record the blocker before any plugin change. Do not falsely claim the old tool can accept new arguments.
4. In ordinary ChatGPT, invoke `jit_observe` and verify the snapshot's content is actually available to the model, not just a URL or a claim that an image was captured. Verify revocation and expiry return unavailable.
5. Tests: owner isolation, origin/authorization, replay resistance, image size and MIME validation, retention and deletion, fresh/expired consent, permission cancellation, lifecycle cleanup, and no sensitive logging. Verify on a physical Android device.

## Acceptance criteria

- Real Android OS permission dialog appears; user explicitly authorizes capture.
- A user-selected real screen image becomes readable through the installed JIT MCP plugin in **ordinary ChatGPT**.
- Revocation and expiration prevent subsequent reads; no hidden persistent capture.
- Existing E2–E5 behavior remains intact. Record precise UTC evidence in `EXPERIMENTS.md` and update `HANDOFF.md` only after verified tests.

## Execution order

Inspect current Site source, MCP tool schemas, and Android build/deployment options **before** coding. Implement the smallest native+Site slice that can actually satisfy the above acceptance criteria. Do not introduce a second credential provisioning ceremony. Stop and report the exact blocking permission/tool-schema boundary if the platform cannot deliver image content through the installed tool without a plugin update.
