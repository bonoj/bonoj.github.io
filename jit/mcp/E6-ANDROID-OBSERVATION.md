# E6 — Browser DOM observation and interaction

Status: **design correction; not implemented or deployed**. Supersedes the mistaken Android screen-capture proposal in this file's initial commit. E5 backend-only capability deployment is complete.

## Actual objective

Enable ordinary ChatGPT on Android to **read and manipulate websites** through a user-authorized browser, using the existing JIT MCP transport. The model should inspect page structure, text, links, forms, controls, and navigation state, then issue bounded click/type/scroll/navigation commands with observable results. The user retains visibility and revocation control. This is **not** a screenshot, MediaProjection, or native Android screen-sharing project.

## Platform boundary

The existing Chrome-hosted companion can read its own origin, but cannot read unrelated tabs or inject scripts into arbitrary websites. Chrome for Android does not provide the standard desktop extension route. Do not claim that pairing a normal page grants cross-origin DOM access. Evaluate an Android browser supporting WebExtensions/content scripts or another explicitly user-authorized browser automation environment before choosing implementation. Any chosen route must be demonstrably available on the user's Android device and usable from ordinary ChatGPT.

## Intended pipeline

Ordinary ChatGPT -> existing six-tool JIT MCP plugin -> authenticated Site relay -> enrolled browser-side agent/content script -> target website DOM and bounded actions -> fresh structured result returned through JIT MCP.

## Minimum useful milestone

1. Inspect deployed Site, current plugin tool schemas, and companion. Identify a supported Android browser automation mechanism that can observe and act on a target page without violating origin isolation.
2. Read-only: explicitly authorize a target tab/site; return current URL, title, visible text excerpt, and a bounded set of semantic interactive elements with stable, context-scoped references. Include freshness and navigation revision. Do not collect passwords, cookies, or hidden inputs.
3. Interaction: invoke one bounded action (e.g. click a harmless button) on an observed element, reject stale context, and observe the resulting page change. Keep high-impact actions (submitting messages, purchases, account changes, deletion) gated behind explicit confirmation.
4. Verify end-to-end on Android **in ordinary ChatGPT**, with the existing plugin identity. Check revocation, expiry, and unrelated-tab isolation.
5. Log UTC evidence in EXPERIMENTS and update HANDOFF after verification.

## Non-goals

No screenshots or MediaProjection, no native Android screen capture, no additional model, no arbitrary shell execution, no silent cross-site surveillance, no credential exfiltration, no new secret provisioning ceremony, and no GitHub deployment proxy posing as device access.

## Design constraint

Preserve the current plugin's six tool signatures where possible. If a schema restriction prevents necessary commands or responses, document and verify that exact boundary before proposing any plugin change. Backend extensibility alone cannot grant a webpage cross-origin access.
