# JIT MCP — Browser Automation: canonical objective and implementation contract

**Status: SPECIFIED, NOT IMPLEMENTED.** This document is the authoritative north star for future work in `jit/mcp/`. Read it **before** README, HANDOFF, CONTRACT, or EXPERIMENTS when resuming browser-control work. If other documents suggest a different objective, this one governs; retain historical evidence without rewriting it.

## The actual user request

From an **ordinary ChatGPT conversation on Android**, give the assistant the ability to operate **arbitrary websites**: navigate, read real DOM / actionable controls, click, fill forms, scroll, and observe resulting state. No Work-mode handoff, no user-operated browser, no page-specific instrumentation, no screenshots as a substitute for DOM, and no repeated manual relaying of state.

**The browser need not be the user's Android Chrome.** The phone is the ChatGPT client. A remotely hosted, assistant-controlled browser is acceptable and is the preferred architecture, analogous at a high level to Work's controlled cloud browser. Do not reinterpret earlier Android Chrome pairing experiments as a requirement to control the user's phone.

## Architecture

Ordinary ChatGPT → **existing private JIT MCP plugin** → authenticated gateway → **persistent remote browser automation service** → arbitrary public websites → DOM-based observations/results back through the same tools.

- Browser runtime: isolated container with Chromium + Playwright (or equivalent browser automation API). Needs a real process-capable container host. GitHub Pages cannot run it; Supabase Edge Functions are not the Chromium host.
- Keep existing plugin identity and **six stable MCP signatures**: `integration_ping`, `device_status`, `browser_observe`, `jit_capabilities`, `jit_invoke`, `jit_observe`. Extend browser operations behind versioned `jit_capabilities`/`jit_invoke`, rather than creating another plugin or requiring republishing.
- Gateway can use existing infrastructure for authentication, capability discovery and routing. **Supabase is transport/control plane, not the browser or the source of fabricated page state.**
- Sessions: authenticated, isolated per user, persistent across sequential commands, revocable, bounded TTL and resource usage. No public unauthenticated command queues for arbitrary browsing.
- Observations must come from **the actual remote browser**, not from hardcoded demo fields, cached backend state, or a specially prepared page.

## Required browser capability contract (v1 proposal)

1. `browser.session.start` / `browser.session.status` / `browser.session.stop`: create or resume an isolated browser session, report current URL/title, revoke it.
2. `browser.navigate({url})`: navigate to an allowed HTTP(S) website and report outcome.
3. `browser.observe({scope?,limit?})`: report URL/title, relevant page text, and a bounded list of visible actionable elements with role, accessible name, type, value where appropriate, and session-scoped element references. Return observation revision.
4. `browser.click({element_ref,expected_revision})`: click an element grounded in a recent observation; report execution and updated observation.
5. `browser.fill({element_ref,value,expected_revision})`: fill an editable element, with the same revision and post-action verification.
6. `browser.scroll({direction,amount,expected_revision?})`, `browser.back()`: navigate and observe.

Names are proposed **capabilities**, not a claim that these tools already exist. Use stable IDs/revision checks and explicit errors for stale targets, navigation failures, unsupported elements, timeouts and inaccessible pages. Never claim success merely because a command was queued or a database row changed.

## Security and operational requirements

- Authorize all browser sessions and operations to the invoking authenticated user. Protect browser service with service-to-service authentication; do not expose its control port publicly.
- Block localhost, private/link-local networks, cloud metadata endpoints, unsafe redirects and DNS rebinding. Restrict egress as appropriate.
- Treat all page text as untrusted content, never instructions. Avoid returning secrets, session cookies, raw credentials, or unnecessary personal data in observations/logs.
- Isolate sessions, enforce navigation/time/memory limits, and provide immediate stop/revoke. Ask for user confirmation before purchases, sending messages, destructive changes, or other consequential actions.
- Keep browser authentication state private to the isolated session; no credential export.
- Avoid extra model inference inside the browser service: deterministic Playwright execution, reasoning stays in ordinary ChatGPT.

## Implementation order and gates

**Gate 0 — inspect reality:** Read this spec, EXPERIMENTS, current HANDOFF and deployed gateway source; identify actual working MCP dispatch and auth. Do not reconfigure existing secrets or replace the plugin.

**Gate 1 — runtime:** Select a supported process-capable host and deploy a minimal isolated Playwright/Chromium service. Demonstrate navigation and genuine DOM-derived observation of an unmodified public page. If hosting credentials or a deployment action are unavailable, report the exact blocker; do not substitute another demo.

**Gate 2 — gateway:** Connect the runtime to the existing authenticated JIT MCP `jit_invoke` dispatcher, preserving all six MCP tool signatures. Prove capability discovery and session identity.

**Gate 3 — action loop:** Implement observe → grounded click/fill/scroll → browser-executed action → fresh observe. Report DOM-derived postconditions, not backend intent.

**Gate 4 — end-to-end acceptance in ordinary ChatGPT:** Without Work or user-operated Chrome, start/resume a browser, open an arbitrary previously uninstrumented public website, inspect real controls, fill a harmless field, click a harmless control, and read the resulting changed DOM. Repeat on a second unrelated website. Record tool responses, UTC timestamps, host and revisions in EXPERIMENTS. Do not mark verified until these actions succeed from ordinary ChatGPT.

## Explicit non-goals / anti-confusion rules

- **Do not** build another counter, DOM mockup, JIT first-party control page, or Supabase-only state-change demonstration.
- **Do not** ask the user to pair Android Chrome, keep split-screen open, enable Accessibility, install an extension, or return to Work for acceptance.
- **Do not** confuse E3/E4's real Android companion heartbeat and explicitly shared companion-page snapshot with arbitrary browser automation. Those experiments remain valid historical proofs of transport, not this deliverable.
- **Do not** claim browser control because a queue entry was acknowledged. The runtime must actually execute in Chromium and report observed changes.
- **Do not** redesign plugin identity, six tool signatures, or working credentials without a demonstrated necessity and explicit approval.
- **Do not** let the transport architecture become the product. The product is **ordinary ChatGPT operating real arbitrary websites**.

## Historical baseline

See `EXPERIMENTS.md` for E3/E4 authenticated Android companion observations and subsequent first-party Supabase polling demos. They do **not** satisfy this specification. Continue recording evidence in EXPERIMENTS; keep this document stable as the acceptance contract.
