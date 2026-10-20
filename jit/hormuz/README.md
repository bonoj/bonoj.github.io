# HORMUZ — Alembic JIT

Live target: https://bonoj.github.io/jit/hormuz/

Single-file browser-only observatory; source: [index.html](index.html). Inspired by [Hermeticon Alembic SIGINT](https://github.com/bonoj/Hermeticon/blob/main/codex/alembic/sigint.md). No Supabase or proxy. The human explicitly authorized deployment on 20 October 2026.

## Sources and polling

| Source | Content | Minimum interval |
|---|---|---|
| Open-Meteo Weather | model wind speed/direction, temperature, humidity, pressure | 15 min |
| Open-Meteo Marine | model waves, SST, current | 30 min |
| hormuz.now | public aggregate AIS-visible crossings, tanker counts, fleet, waiting | 60 sec |
| USGS | M2.5+ earthquakes in broad regional box, last 7 days | 30 min |
| Eagle Intelligence | published maritime-risk status and update time | 5 min |

A 5-second timer only checks **whether a source is due**. It does **not** fetch every five seconds. Hidden tabs stop polling; resumed tabs fetch only overdue sources. Failures back off (minimum 60 seconds). Provider clocks/freshness differ; each panel exposes source state. No persistent client cache and no service-side storage.

hormuz.now publishes CORS support, source update cadences, and CC BY 4.0 attribution; see https://hormuz.now/data . The traffic values are AIS-visible, incomplete under missing transponders, and must not be interpreted as comprehensive vessel activity. Individual live AIS vessel tracks are intentionally not displayed. The map and boats are **schematic/synthetic**, never observed tracks. Weather and sea-state numbers are forecasts/model estimates, not direct local instrument observations. Eagle status is an attributed publisher assessment, not a physical observation.

## Verification

GitHub source created in commit `7ad970b1` and fetched back for readback. **Browser runtime and GitHub Pages publication not independently confirmed** until opened by a human or browser instrument. Do not claim live data successfully fetched from the browser until observed.

## Next

Inspect live response schema and mobile viewport; fix only actual failures. Add provenance timestamps/latency, regional stations and historical comparisons once the base transport is observed. Do not route ingestion through Supabase.
