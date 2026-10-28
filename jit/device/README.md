# JIT Device Observatory

**Live:** https://bonoj.github.io/jit/device/

## Purpose

A self-contained static, permissionless browser capability inventory. User collects an Eye JSON and returns it for analysis. No telemetry, external fetches, persistent storage writes, or permission prompts in the executable JavaScript. Loading the HTML from GitHub Pages necessarily involves a network request.

## Contract

- `index.html` is the executable source; `jit-device-eye/v1` is the report schema; build `device/01`.
- Collect browser, user agent, display, viewport, input, locale, hardware hints, network hints, preferences, WebGL caps/extensions, Canvas 2D rendering hash, codec probes, API availability, storage estimate, performance timing, and navigation details.
- Benchmark is opt-in and measures requestAnimationFrame cadence for approximately 2 seconds, **not GPU throughput**.
- 👁 Copy JSON to clipboard; fallback to downloadable JSON. Dedicated download button.
- API presence does not establish permission, hardware existence, or device uniqueness. Renderer strings and timing are privacy-sensitive and browser-dependent.
- Read before write, verify source after deployment, return cache-busted URL. Browser execution is not established by source verification.

## Cold boot

Read README and CHRONICLE; fetch current index.html from master. Inspect an actual Eye report before extending probes. Preserve permissionless behavior and local-only data handling.
