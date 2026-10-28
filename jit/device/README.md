# JIT Device Observatory

**Live:** https://bonoj.github.io/jit/device/

## Purpose

A self-contained static, permissionless browser capability inventory. User collects an Eye JSON and returns it for analysis. No telemetry, external fetches, persistent storage writes, or permission prompts in the executable JavaScript. Loading the HTML from GitHub Pages necessarily involves a network request.

## Contract

- `index.html` is the executable source; `jit-device-eye/v1` is the report schema; build `device/02`.
- Collect browser, user agent, display, viewport, input, locale, hardware hints, network hints, preferences, WebGL caps/extensions, Canvas 2D rendering hash, codec probes, API availability, storage estimate, performance timing, and navigation details.
- Frame-cadence benchmark is opt-in and measures requestAnimationFrame cadence for approximately 2 seconds, **not GPU throughput**.
- 👁 Copy JSON to clipboard; fallback to downloadable JSON. Dedicated download button.
- API presence does not establish permission, hardware existence, or device uniqueness. Renderer strings and timing are privacy-sensitive and browser-dependent.
- Read before write, verify source after deployment, return cache-busted URL. Browser execution is not established by source verification.

## Cold boot

Read README and CHRONICLE; fetch current index.html from master. Inspect an actual Eye report before extending probes. Preserve permissionless behavior and local-only data handling.

## Device/02 active probes

Opt-in ⚙ Active probes runs WebGPU adapter/limits query, a small Web Worker compute task, and a bounded WebGL2 fragment-shader workload at three pixel resolutions (about 1.1 seconds each). ■ Stop halts between frames and tests. Maximum render dimensions 1280 px. GPU results include rAF frame intervals and should **not** be interpreted as GPU-only timings or thermal measurements. All results appear under `activeProbes` in the existing Eye export. No new permissions or uploads. Avoid claiming thermal data or power measurements; browsers do not expose them here.
