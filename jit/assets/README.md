# JIT Assets — Machine-Readable Inventory

> Canonical source inventory for `bonoj/bonoj.github.io/jit/assets/`. This README describes **repository source**, not a verified live-browser smoke test.

## Contract for agents

- **Enumerate first:** `GET https://api.github.com/repos/bonoj/bonoj.github.io/contents/jit/assets` via the connected GitHub **fetch** operation; `fetch_file` is for files, not directories.
- **Discover recursively:** inspect each directory's Contents API endpoint. As inspected, each of the five project directories contains exactly one `index.html`.
- **Source of truth:** repository paths and HTML source, not previous conversation, semantic code search, or this potentially stale index. When a discrepancy appears, inspect the repository and update this README.
- **Paths:** directory entries have trailing slashes and resolve through their `index.html`; standalone entries are explicit `.html` files.
- **Use:** link to `live_url` for experiments; use `source_url` to inspect or modify; read source before making assumptions about runtime behavior.
- **Provenance:** descriptions, controls, and technology were derived from inspecting the HTML files on the default `master` branch on 2026-10-25. SHA fields for directories are Git **tree** SHAs; for standalone files, Git **blob** SHAs.
- **Limitations:** deployment availability, runtime success, mobile rendering, and interaction correctness were **not** independently tested. A directory listing is not a smoke test.
- **Index drift:** `jit/assets/index.html` is an independent hand-built visual cabinet and its “006 specimens” heading is **not** an authoritative total. Do not infer the complete inventory from that UI.
- **No automatic mutation:** read-only inventory unless explicitly requested to edit; preserve experiments and existing structure.

## Counts

> Added `living-forest-card/` on 2026-10-29. Historical counts and JSON snapshot below have not been fully re-enumerated.\n\n> Inventory snapshot counts below are historical; the Cartographer's Room was added 2026-10-28.\n

- **24** top-level entries: **13** experiment directories, **10** standalone experiment HTML files, **1** visual landing page (`index.html`).
- **23** distinct experiments indexed below; **13** nested `index.html` entrypoints.
- **29** total HTML files including nested entrypoints and the landing page; this README is additional.
- Earlier five directories were enumerated directly; the newer directories contain one entrypoint each. Re-enumerate for a fully refreshed snapshot.

> **Inventory maintenance note (2026-10-27):** Parchment Highlands was added after the inventory snapshot above. The historic counts and tree/blob SHAs in this README require a full re-enumeration; do not treat them as current.

## Human-readable experiment index

| Experiment | Type | Source | Live | What it does |
|---|---|---|---|---|
| Forest · Living Land | interactive-3d-study | [`living-forest-card/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/living-forest-card/index.html) | [Open](https://bonoj.github.io/jit/assets/living-forest-card/) | Archived Three.js WebGL Forest land card, raised terrain, branching trees, orbit/pinch zoom. Source committed 2026-10-29; runtime not verified. |
| The Cartographer's Last Mistake | css-perspective-reading-toy | [\`cartographers-room/\`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/cartographers-room/index.html) | [Open](https://bonoj.github.io/jit/assets/cartographers-room/) | Original short fable in a CSS 3D foreshortened reading room; drag to orbit, double-tap or button to face text. |\n| Parchment Highlands | interactive-3d-study | [\`parchment-highlands/\`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/parchment-highlands/index.html) | [Open](https://bonoj.github.io/jit/assets/parchment-highlands/) | Three.js faceted snow-capped mountain chain and conifer forest on a parchment slab; drag to orbit, pinch/wheel to zoom, regrow forest. |
| BB Cake · Cascade | interactive-toy | [\`bb-cake/\`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/bb-cake/index.html) | [Open](https://bonoj.github.io/jit/assets/bb-cake/) | Two-tier BB cake; tap to blast fragments that bounce and burst into smaller BBs, drag to orbit, reset. |\n| The Eternal Pasture · Musical Ecology | procedural-music-toy | [`eternal-pasture.html`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/eternal-pasture.html) | [Open](https://bonoj.github.io/jit/assets/eternal-pasture.html) | Zero-asset, seven-stage sheep → meat → mushrooms → sprouts → trees → clouds → sheep cycle; Web Audio music changes with each stage. |\n| Für Elise · Self-playing Piano | musical-toy | [`fur-elise.html`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/fur-elise.html) | [Open](https://bonoj.github.io/jit/assets/fur-elise.html) | Touch-playable animated piano that autonomously performs the recognizable opening theme with lightweight Web Audio synthesis. |\n| Corporate Friction Garden v2 · Cat Patrol | interactive-toy | [`friction-garden-v2.html`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/friction-garden-v2.html) | [Open](https://bonoj.github.io/jit/assets/friction-garden-v2.html) | Preserves hold-to-deform with a grounded 🐈 that hops between bar tops, faces travel direction, and excavates independently. Deliberately naive left-right patrol, not tallest-stack priority. V1 preserved. |
| Corporate Friction Garden | interactive-toy | [`friction-garden.html`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/friction-garden.html) | [Open](https://bonoj.github.io/jit/assets/friction-garden.html) | Six independently growing corporate-friction stacks; sustained touch excavates the held stack and sheds emoji particles; release resumes growth. Hold-to-deform primitive. |
| Ant Axe Log Study | svg-animation | [`ant-axe-log-study.html`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/ant-axe-log-study.html) | [Open](https://bonoj.github.io/jit/assets/ant-axe-log-study.html) | Exploratory animated SVG composition of ant, axe and log; explicitly archived, not final art. |
| Ash and Root | generative-environment | [`ash-and-root/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/ash-and-root/index.html) | [Open](https://bonoj.github.io/jit/assets/ash-and-root/) | Organic growth, wind, fire, sand and embers; touch-reactive full-screen 2D environment. |
| Ball-Bearing Worm | interactive-simulation | [`ball-bearing-worm.html`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/ball-bearing-worm.html) | [Open](https://bonoj.github.io/jit/assets/ball-bearing-worm.html) | 3D segmented worm; orbit and tap to guide, feed mushrooms, introduce eagle, reset, adjust segment count. |
| Pocket Apiary | interactive-simulation | [`bees.html`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/bees.html) | [Open](https://bonoj.github.io/jit/assets/bees.html) | Canvas bee-foraging simulation with nectar, colony size, bloom and reset controls. |
| Daily Bread | autonomous-diorama | [`daily-bread/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/daily-bread/index.html) | [Open](https://bonoj.github.io/jit/assets/daily-bread/) | Blind pedestrian walks from home to bakery and back, untouched by autonomous car crashes, fires, meteor impacts and building collapses; silent looping emoji Canvas scene. |
| Evermore II D20 | interactive-toy | [`evermore-d20.html`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/evermore-d20.html) | [Open](https://bonoj.github.io/jit/assets/evermore-d20.html) | Tap-to-roll twenty-sided emoji die rendered in canvas. |
| Finger · Shared Switch (Original) | interactive-toy | [`finger-switch/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/finger-switch/index.html) | [Open](https://bonoj.github.io/jit/assets/finger-switch/) | Original unconstrained FABRIK finger autonomously presses a shared binary switch; user can toggle it too, with a separate autonomous-finger toggle. Preserved before correction attempts. |
| Fossil Cathedral | generative-environment | [`fossil-cathedral/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/fossil-cathedral/index.html) | [Open](https://bonoj.github.io/jit/assets/fossil-cathedral/) | Structural/growth study with wind, structural-view toggle, regenerate and pause. |
| The Cannon | interactive-physics-toy | [`cannon/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/cannon/index.html) | [Open](https://bonoj.github.io/jit/assets/cannon/) | Full-body emoji animals march into a cannon, becoming ballistic meat, bones and feathers with mass-dependent bounces, wall collisions, settling and gradual decay. |
| Chromatic Garden | generative-art | [`fractal-garden/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/fractal-garden/index.html) | [Open](https://bonoj.github.io/jit/assets/fractal-garden/) | Touch-reactive branching fractal garden with color palettes and bloom regeneration. |
| WordPrefect | hostile-productivity-toy | [`wordprefect/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/wordprefect/index.html) | [Open](https://bonoj.github.io/jit/assets/wordprefect/) | Credible rich-text editor that develops adversarial editorial intentions, resists deletion, revises prose, and contests saving. |
| The House of Spite | interactive-toy | [`house-of-spite/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/house-of-spite/index.html) | [Open](https://bonoj.github.io/jit/assets/house-of-spite/) | Six tappable household toggles; a resident walks to reverse disturbances and returns to eating spaghetti. |
| Leviathan II Planetbreaker | interactive-simulation | [`leviathan/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/leviathan/index.html) | [Open](https://bonoj.github.io/jit/assets/leviathan/) | Three.js planet and tentacles with RAVAGE action, deforming/damaging crust, reset. |
| Pocket Magnetarium | interactive-simulation | [`magnetarium.html`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/magnetarium.html) | [Open](https://bonoj.github.io/jit/assets/magnetarium.html) | Touch-steered dipoles, affinities and chain behavior; particle count, gold and reset controls. |
| Last Light Redshift Observatory | interactive-toy | [`redshift.html`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/redshift.html) | [Open](https://bonoj.github.io/jit/assets/redshift.html) | Cosmological redshift/time contemplation with adjustable slider and return control. |
| Sheepocalypse | interactive-toy | [`sheepocalypse/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/sheepocalypse/index.html) | [Open](https://bonoj.github.io/jit/assets/sheepocalypse/) | Roaming sheep herds and diving hawks explode into tumbling meat and feather fragments; surviving sheep collect landed meat. |
| Steak · Emoji Asset Study | static-asset-study | [`steak-study/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/steak-study/index.html) | [Open](https://bonoj.github.io/jit/assets/steak-study/) | Original static emoji scale study: 🥩 steak on a white elliptical plate, 🍖 meat and 🍗 drumstick; no animation. |
| THAW | interactive-toy | [`thaw/`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/thaw/index.html) | [Open](https://bonoj.github.io/jit/assets/thaw/) | Touch-and-hold melting ice with solid fraction meter, droplets and ripples. |

Visual cabinet: [`index.html`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/index.html) · [live](https://bonoj.github.io/jit/assets/)

## Structured inventory (JSON)\n\nNew additions: `jit/assets/fur-elise.html` and `jit/assets/eternal-pasture.html` (2026-10-26); the older JSON snapshot below is historical and should be refreshed by full enumeration.

This JSON is the canonical machine-friendly snapshot. `path` is repository-relative. `source_sha` is the observed blob/tree SHA, not the latest commit SHA. `runtime_verified` is deliberately false. External dependencies are declared only when detected in source.

```json
{
  "schema": "jit-assets-inventory/v1",
  "repository": "bonoj/bonoj.github.io",
  "branch": "master",
  "root": "jit/assets",
  "inspected_on": "2026-10-25",
  "verification": "repository-source-inspected;live-runtime-not-verified",
  "count": {
    "top_level_entries": 20,
    "experiment_directories": 13,
    "standalone_experiments": 6,
    "experiments": 19,
    "landing_pages": 1
  },
  "index": {
    "path": "jit/assets/index.html",
    "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/index.html",
    "live_url": "https://bonoj.github.io/jit/assets/",
    "source_sha": "0f1adbbcf31f3335dcaf8aa9194aa23aeebf71fe",
    "runtime_verified": false
  },
  "assets": [
    {
      "id": "wordprefect",
      "name": "WordPrefect",
      "kind": "hostile-productivity-toy",
      "path": "jit/assets/wordprefect/",
      "entrypoint": "jit/assets/wordprefect/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/wordprefect/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/wordprefect/",
      "description": "Functional contenteditable document editor whose autonomous editorial agenda emerges through hostile revisions, deletion resistance, and save conflict.",
      "renderer": "HTML,CSS,JavaScript",
      "controls": [
        "rich-text-editor",
        "format-toolbar",
        "undo-redo",
        "save",
        "document-title",
        "menus"
      ],
      "external_dependencies": [],
      "runtime_verified": false
    },
    {
      "id": "house-of-spite",
      "name": "The House of Spite",
      "kind": "interactive-toy",
      "path": "jit/assets/house-of-spite/",
      "entrypoint": "jit/assets/house-of-spite/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/house-of-spite/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/house-of-spite/",
      "description": "Six household toggles and an autonomous spaghetti-eating resident who walks to reverse user changes.",
      "renderer": "SVG,JavaScript",
      "controls": [
        "light",
        "window",
        "fan",
        "tv",
        "tap",
        "door"
      ],
      "external_dependencies": [],
      "runtime_verified": false
    },
    {
      "id": "finger-switch",
      "name": "Finger · Shared Switch (Original)",
      "kind": "interactive-toy",
      "path": "jit/assets/finger-switch/",
      "entrypoint": "jit/assets/finger-switch/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/finger-switch/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/finger-switch/",
      "description": "Original pre-correction autonomous finger and shared binary switch. Unconstrained FABRIK motion; scheduled finger actuation, not geometric contact detection.",
      "renderer": "SVG,JavaScript",
      "controls": [
        "shared-switch",
        "autonomous-finger-toggle"
      ],
      "external_dependencies": [],
      "runtime_verified": false
    },
    {
      "id": "cannon",
      "name": "The Cannon · Emoji Material Study",
      "kind": "interactive-physics-toy",
      "path": "jit/assets/cannon/",
      "entrypoint": "jit/assets/cannon/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/cannon/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/cannon/",
      "description": "Full-body emoji animals enter a cannon and convert to mass-dependent ballistic meats, bones and feathers; bounce off wall, settle and decay.",
      "renderer": "DOM,CSS,JavaScript",
      "controls": [
        "add-animal",
        "reset"
      ],
      "external_dependencies": [],
      "runtime_verified": false
    },
    {
      "id": "steak-study",
      "name": "Steak · Emoji Asset Study",
      "kind": "static-asset-study",
      "path": "jit/assets/steak-study/",
      "entrypoint": "jit/assets/steak-study/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/steak-study/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/steak-study/",
      "description": "Original static emoji asset scale study: steak on white elliptical plate, meat-on-bone and drumstick; no animation.",
      "renderer": "SVG,system-emoji",
      "controls": [
        "none"
      ],
      "external_dependencies": [],
      "runtime_verified": false
    },
    {
      "id": "sheepocalypse",
      "name": "Sheepocalypse",
      "kind": "interactive-toy",
      "path": "jit/assets/sheepocalypse/",
      "entrypoint": "jit/assets/sheepocalypse/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/sheepocalypse/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/sheepocalypse/",
      "description": "Roaming sheep herds, autonomous and tap-summoned hawk dives, tumbling meat and feathers, and sheep collecting landed meat.",
      "renderer": "DOM,CSS,JavaScript",
      "controls": [
        "tap-sheep",
        "add-sheep",
        "reset"
      ],
      "external_dependencies": [],
      "runtime_verified": false
    },
    {
      "id": "ant-axe-log-study",
      "name": "Ant Axe Log Study",
      "kind": "svg-animation",
      "path": "jit/assets/ant-axe-log-study.html",
      "entrypoint": "jit/assets/ant-axe-log-study.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/ant-axe-log-study.html",
      "live_url": "https://bonoj.github.io/jit/assets/ant-axe-log-study.html",
      "description": "Exploratory animated SVG composition of ant, axe and log; explicitly archived, not final art.",
      "renderer": "SVG,CSS",
      "controls": [
        "none"
      ],
      "external_dependencies": [],
      "source_sha": "ae03834be337351689ced01e04bc8ff89c6f1655",
      "source_sha_type": "blob",
      "runtime_verified": false
    },
    {
      "id": "ash-and-root",
      "name": "Ash and Root",
      "kind": "generative-environment",
      "path": "jit/assets/ash-and-root/",
      "entrypoint": "jit/assets/ash-and-root/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/ash-and-root/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/ash-and-root/",
      "description": "Organic growth, wind, fire, sand and embers; touch-reactive full-screen 2D environment.",
      "renderer": "Canvas2D",
      "controls": [
        "regrow",
        "wind",
        "fire",
        "pause"
      ],
      "external_dependencies": [],
      "source_sha": "10aed38301dc28a086521915be6bbcb75b3050ea",
      "source_sha_type": "tree",
      "runtime_verified": false
    },
    {
      "id": "ball-bearing-worm",
      "name": "Ball-Bearing Worm",
      "kind": "interactive-simulation",
      "path": "jit/assets/ball-bearing-worm.html",
      "entrypoint": "jit/assets/ball-bearing-worm.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/ball-bearing-worm.html",
      "live_url": "https://bonoj.github.io/jit/assets/ball-bearing-worm.html",
      "description": "3D segmented worm; orbit and tap to guide, feed mushrooms, introduce eagle, reset, adjust segment count.",
      "renderer": "Three.js/WebGL",
      "controls": [
        "feed",
        "eagle",
        "reset",
        "segments"
      ],
      "external_dependencies": [
        "https://esm.sh/three@0.180.0"
      ],
      "source_sha": "c252b90ff96a10d22515f2fc4bc1e99ce1250320",
      "source_sha_type": "blob",
      "runtime_verified": false
    },
    {
      "id": "bees",
      "name": "Pocket Apiary",
      "kind": "interactive-simulation",
      "path": "jit/assets/bees.html",
      "entrypoint": "jit/assets/bees.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/bees.html",
      "live_url": "https://bonoj.github.io/jit/assets/bees.html",
      "description": "Canvas bee-foraging simulation with nectar, colony size, bloom and reset controls.",
      "renderer": "Canvas2D",
      "controls": [
        "bee-count",
        "bloom",
        "reset"
      ],
      "external_dependencies": [],
      "source_sha": "bb784b34b0d9bfdd41a7584676d354de2d512134",
      "source_sha_type": "blob",
      "runtime_verified": false
    },
    {
      "id": "daily-bread",
      "name": "Daily Bread",
      "kind": "autonomous-diorama",
      "path": "jit/assets/daily-bread/",
      "entrypoint": "jit/assets/daily-bread/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/daily-bread/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/daily-bread/",
      "description": "Silent looping emoji catastrophe diorama: blind pedestrian makes an untouched bakery bread run while cars crash, meteors fall, buildings collapse, and smoke/fire/debris spread.",
      "renderer": "Canvas2D",
      "controls": [
        "none"
      ],
      "external_dependencies": [],
      "source_sha": "3786af7bf3fba93890ca3f17e231a2ed31db2cd3",
      "source_sha_type": "blob",
      "runtime_verified": false
    },
    {
      "id": "evermore-d20",
      "name": "Evermore II D20",
      "kind": "interactive-toy",
      "path": "jit/assets/evermore-d20.html",
      "entrypoint": "jit/assets/evermore-d20.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/evermore-d20.html",
      "live_url": "https://bonoj.github.io/jit/assets/evermore-d20.html",
      "description": "Tap-to-roll twenty-sided emoji die rendered in canvas.",
      "renderer": "Canvas2D",
      "controls": [
        "tap-roll"
      ],
      "external_dependencies": [],
      "source_sha": "53257d52c04704c206319109f19d2b5519f1a93a",
      "source_sha_type": "blob",
      "runtime_verified": false
    },
    {
      "id": "fossil-cathedral",
      "name": "Fossil Cathedral",
      "kind": "generative-environment",
      "path": "jit/assets/fossil-cathedral/",
      "entrypoint": "jit/assets/fossil-cathedral/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/fossil-cathedral/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/fossil-cathedral/",
      "description": "Structural/growth study with wind, structural-view toggle, regenerate and pause.",
      "renderer": "Canvas2D",
      "controls": [
        "regenerate",
        "structural-view",
        "wind",
        "pause"
      ],
      "external_dependencies": [],
      "source_sha": "a5a4b287a15c3f1f0653c462bbfb294795e83a1d",
      "source_sha_type": "tree",
      "runtime_verified": false
    },
    {
      "id": "fractal-garden",
      "name": "Chromatic Garden",
      "kind": "generative-art",
      "path": "jit/assets/fractal-garden/",
      "entrypoint": "jit/assets/fractal-garden/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/fractal-garden/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/fractal-garden/",
      "description": "Touch-reactive branching fractal garden with color palettes and bloom regeneration.",
      "renderer": "Canvas2D",
      "controls": [
        "touch",
        "palette",
        "new-bloom",
        "pause"
      ],
      "external_dependencies": [],
      "source_sha": "a474611a486c0dbbd22ef8a4b58b2120da1a8359",
      "source_sha_type": "tree",
      "runtime_verified": false
    },
    {
      "id": "leviathan",
      "name": "Leviathan II Planetbreaker",
      "kind": "interactive-simulation",
      "path": "jit/assets/leviathan/",
      "entrypoint": "jit/assets/leviathan/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/leviathan/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/leviathan/",
      "description": "Three.js planet and tentacles with RAVAGE action, deforming/damaging crust, reset.",
      "renderer": "Three.js/WebGL",
      "controls": [
        "ravage",
        "reset"
      ],
      "external_dependencies": [
        "https://esm.sh/three@0.180.0"
      ],
      "source_sha": "3c66189b476a25926209a578b4653a89b83b1f4a",
      "source_sha_type": "tree",
      "runtime_verified": false
    },
    {
      "id": "magnetarium",
      "name": "Pocket Magnetarium",
      "kind": "interactive-simulation",
      "path": "jit/assets/magnetarium.html",
      "entrypoint": "jit/assets/magnetarium.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/magnetarium.html",
      "live_url": "https://bonoj.github.io/jit/assets/magnetarium.html",
      "description": "Touch-steered dipoles, affinities and chain behavior; particle count, gold and reset controls.",
      "renderer": "Canvas2D",
      "controls": [
        "steer",
        "count",
        "gold",
        "reset"
      ],
      "external_dependencies": [],
      "source_sha": "f5b39d7e820b0258abb34fd93b97023ef8644480",
      "source_sha_type": "blob",
      "runtime_verified": false
    },
    {
      "id": "redshift",
      "name": "Last Light Redshift Observatory",
      "kind": "interactive-toy",
      "path": "jit/assets/redshift.html",
      "entrypoint": "jit/assets/redshift.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/redshift.html",
      "live_url": "https://bonoj.github.io/jit/assets/redshift.html",
      "description": "Cosmological redshift/time contemplation with adjustable slider and return control.",
      "renderer": "Canvas2D",
      "controls": [
        "range",
        "return"
      ],
      "external_dependencies": [],
      "source_sha": "9011d9cbb349be5f5a0db3495bbbc5766adbee80",
      "source_sha_type": "blob",
      "runtime_verified": false
    },
    {
      "id": "thaw",
      "name": "THAW",
      "kind": "interactive-toy",
      "path": "jit/assets/thaw/",
      "entrypoint": "jit/assets/thaw/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/thaw/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/thaw/",
      "description": "Touch-and-hold melting ice with solid fraction meter, droplets and ripples.",
      "renderer": "Canvas2D",
      "controls": [
        "touch-hold"
      ],
      "external_dependencies": [],
      "source_sha": "a4d22897cc063b46cd19079e79f502e6efb3e372",
      "source_sha_type": "tree",
      "runtime_verified": false
    },
    {
      "id": "bb-cake",
      "name": "BB Cake · Cascade",
      "kind": "interactive-toy",
      "path": "jit/assets/bb-cake/",
      "entrypoint": "jit/assets/bb-cake/index.html",
      "source_url": "https://github.com/bonoj/bonoj.github.io/blob/master/jit/assets/bb-cake/index.html",
      "live_url": "https://bonoj.github.io/jit/assets/bb-cake/",
      "description": "Two-tier BB cake; tap to scatter fragments which bounce and burst into smaller BBs.",
      "renderer": "Canvas2D",
      "controls": [
        "tap-blast",
        "drag-orbit",
        "reset"
      ],
      "external_dependencies": [],
      "source_sha": "788e3e9020ca5e3f1003c0d05abb1cfe2fb1896e",
      "source_sha_type": "blob",
      "runtime_verified": false
    }
  ]
}
```

## Maintenance procedure

1. Enumerate the root with the GitHub Contents API and inspect any directories recursively.
2. Read each experiment's HTML entrypoint and identify title, controls, rendering stack, dependencies, and actual behavior.
3. Update both the table and JSON manifest; preserve stable IDs for existing experiments.
4. Reconcile counts and SHA values, distinguishing tree SHAs from blob SHAs.
5. If a live browser test is performed, record its outcome separately; never infer runtime success from GitHub presence.
6. Commit the README and read it back to verify the write.
