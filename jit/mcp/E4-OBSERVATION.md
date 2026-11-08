# E4 — Consented observation of the companion page

Status: **specified, not implemented or deployed** (2026-11-08).

## Question

Can an ordinary ChatGPT conversation receive an authentic, narrowly scoped observation of the *enrolled companion browser page*, with source, freshness and user consent? This does **not** mean observing unrelated Chrome tabs or Android applications.

## Minimal experiment

Expose a read-only MCP tool `browser_observe({})` that returns the currently paired page's latest explicitly shared observation. No URL selectors, arbitrary origins, session IDs, code execution or remote navigation parameters.

The companion page should provide a visible **Share this page state** control, off by default. Only after the user opts in may it send a minimal observation: exact companion origin/path (never query strings or fragments), page title, visibility, local observation UTC timestamp, server receipt UTC timestamp, a new random nonce, and a bounded description of a harmless, first-party demo element (e.g. `demo_counter`). The user can revoke sharing without unpairing.

Tool response must include `observation_method:"first_party_companion_dom"`, `scope:"companion_page_only"`, `consent_active`, `observed_at`, `age_seconds`, `visibility`, `nonce`, and `data`. When hidden, expired, unpaired or sharing disabled, return an explicit unavailable/stale result rather than recycling old content as current.

Do not collect typed text, passwords, form values, cookies, tokens, other tabs, history, screenshots, accessibility trees or full HTML. Do not store observations beyond the existing short-lived enrollment; overwrite rather than accumulate history.

## Acceptance tests

1. Before consent, `browser_observe` returns unavailable; no observation stored.
2. After consent on the paired Android page, it returns a genuine first-party DOM observation and unique nonce.
3. Change the harmless demo element on Android, explicitly refresh/share, and verify the changed value via MCP from ordinary ChatGPT.
4. Background the page and verify stale/hidden handling.
5. Revoke consent, disconnect, or expire enrollment; verify observations are unavailable.
6. Confirm cross-user isolation, malformed payload rejection, bounded size, and no accidental secrets.
7. Log exact tool outputs, times and limitations in EXPERIMENTS.

## Constraints

Keep existing `integration_ping`, `device_status`, pairing and App identity unchanged. Implement in the **existing hosted Site**, mirror reviewed source to `jit/mcp/site/`, run existing tests plus new tests, and deploy through Sites. No second model or inference service.

The user may choose to progress to E5 later, but E4 itself adds **no remote actions**. Do not claim Android OS or arbitrary Chrome DOM access.

## Success criterion

A real, opt-in change to a benign first-party page element is independently read back in an ordinary ChatGPT chat using `browser_observe`, with freshness and consent enforced.
