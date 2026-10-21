# Competitions — Working Specification

## Purpose
One-page, mobile-first competition operations desk. The human should not need to browse three sponsor sites to understand the challenge, requirements, tradeoffs, or next work. The model reads official sources, verifies changes, updates this executable and records provenance. Sponsor authentication and secret issuance still require human participation.

## Current implementation (2026-10-21)
- Ranked Qloo, PayPal, Nebius tabs, cash amounts, deadlines, registration snapshots, technical constraints, judging summaries, submission requirements, engineering thesis, risks and next actions.
- Local persistent checklist per competition; checkmarks are human-entered progress, not independently verified external actions.
- Copy next turn, copy complete handoff, 👁 export.
- No dependencies; mobile single page; no parent scroll; independent workspace scroll.
- Ender Forge-style runtime SHA-256 fingerprint of executing main inline script, first 8 hex characters. It is not a Git commit SHA.
- Source facts manually curated from official Devpost rules verified 2026-10-21. No browser scraping or claim of live API sync. No sponsor secrets in browser.

## Next frontier
1. Request Qloo API key; verify one real taste-graph call and assess novelty.
2. Build a small isolated Qloo submission if API proves useful; otherwise pivot.
3. Add a model-mediated refresh process (trusted server/CI fetch, parsing, provenance, publish) before claiming automatic website updates.
4. Make judging rubric and requirements more precise as official sources are rechecked.
5. Avoid publishing Hermeticon private mechanisms as competition submissions.

## Publisher contract
Repo bonoj/bonoj.github.io branch master path jit/competitions. Existing stable-world.yml copies jit; never modify publisher casually. Read back commits; distinguish source, published HTML, browser runtime. Protect site root and other JIT worlds.
