# Lattice — maximum-vacuum specification

**Authority:** This is the governing target; [README](README.md) is the implemented-state handoff; [CHRONICLE](CHRONICLE.md) preserves the full original 53-channel specification and previous README without loss. [channels.json](channels.json) is the candidate inventory, not a ceiling.

## Objective

Acquire the maximum useful breadth and depth of legitimate public civilian Earth and orbital telemetry. Prioritize **independent observable phenomena, geographic and record coverage, and independent provider families** over quotas, repeated station-level additions, UI and engineering ceremony.

## Execution contract

1. On ➡️ acquire and test new eligible real data. Prefer bounded multi-station/network queries and geographically distributed records over one-station-per-turn development. Reuse existing provider responses and governor; avoid redundant requests.
2. Validate HTTP, source schema, meaningful fields, units, timestamps, provenance, geography and representative missing/edge cases with automated tests. Distinguish server-side source success from browser-origin CORS and normalized runtime success. Never manufacture a passing observation.
3. On failure, record the concrete blocker and continue with another eligible source. Do not ask the human to debug endpoint plumbing. Do not make per-channel promotion or 53-item completion a gate to expansion.
4. Preserve raw individual observations in bounded session memory where permitted, with source identity and age. Preserve measured/reported/modelled/forecast/predicted distinctions. No fabricated positions or values.
5. Continue beyond the initial 53 candidate channels while useful eligible sources exist. No arbitrary stopping quota.

## Non-negotiable constraints

- Public civilian/environmental sources only; respect terms, licensing, rate limits and CORS. No exposed secrets, unauthorized scraping, military tracking, or synthetic records represented as observed.
- Single existing transport governor for all requests: concurrency, host pacing, dedup, bounded queue/body, timeout, retry/backoff, cache and offline/hidden handling. No second fetch mechanism.
- Preserve standalone mobile-first JIT, canonical URL, existing SHA-stamped Pages publishing, `build.json`, Hormuz independence and current UI. No Supabase requirement or new backend.
- No persistence/replay, visualization overhaul, globe work, dashboards, new controls, catalog grooming or publisher refactor while eligible intake remains, absent a demonstrated blocking defect.
- Provenance fields where available: source/provider, record identity, geometry or extent, observed/published/fetched time, value, unit, quality and kind. Null means missing; never substitute zero or a different variable.

## Current frontier

Existing broad families: USGS ComCat, NASA EONET, Open-Meteo, ISS, NWS, UK EA. Newly tested families: NOAA CO-OPS, USGS Water, NDBC and EMSC; their present implementation is geographically narrow. Expand their **network footprint** and seek independent sources in Africa, South America, Asia, Oceania and polar regions. BOM HTTP 403 and Geoscience Australia unresolved endpoint require evidence-based handling, not speculative success.

## Evidence and completion

Report configured, fetched, source-valid, normalized and browser-verified distinctly. CI green is not browser proof. A productive turn materially expands genuine records, geographic coverage or independent sources, or documents a concrete blocker and proceeds to the next source. The mission has no channel-count completion threshold.

**History:** The complete prior 53-channel table, detailed verification ladder and original execution plan are preserved verbatim in [CHRONICLE.md](CHRONICLE.md); use [channels.json](channels.json) for the current machine-readable candidate registry.
