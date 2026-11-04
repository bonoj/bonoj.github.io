# Leaf — Apple reference graph, pass 2

Observed 2026-11-04. The source site changes; preserve architecture, not launch-specific SKUs.

## Verified deep links
- https://www.apple.com/ — campaign entry and category navigation.
- https://www.apple.com/store — retail discovery.
- https://www.apple.com/iphone/ — family landing.
- https://www.apple.com/iphone/compare/ — multi-model comparison with selectors, specification rows, shop and tech-specs links. The modelList query parameter permits shareable comparison selections.
- https://www.apple.com/mac/ — family landing, lineup filtering and guided choosing.
- https://support.apple.com/ — distinct support entry.

## Critical interaction to adopt: shareable comparisons
Apple comparison pages accept selected models in a URL query parameter. Leaf's /compare/ should accept `?models=leaf,leaf-pro,leaf-air`; decode only allowlisted IDs, render selected cards and comparison rows, update browser history on selection, and provide a shareable link. Default to three configurations. Direct reload must restore selections. Never use product claims that confuse a fold with a separate species.

## Comparison row groups
Price ($0), source (banana plant), surface area (varies by specimen), flexibility (varies), liquid handling (fold dependent), shade (orientation dependent), durability (condition dependent), connectivity (stem), service (compost / replace), environmental impact (harvest context matters). Show genuine uncertainty instead of fabricated measurements.

## Information architecture principle
A real Apple-style page is not a hero and two links. Each family has its own local rail, long editorial sections, comparison, specifications, store, accessories, support and footer. Maintain a data-driven link registry with inbound/outbound edges. Every CTA is a destination or state transition.

## Remaining inspection queue
Product detail subnavigation; configuration and bag; global search and footer; newsroom; environment; individual support article. Log source URL, observed UI element, Leaf equivalent and verification date. Do not claim a full Apple crawl from search snippets alone.


## Verified comparison details — 2026-11-04

Apple's [iPhone comparison page](https://www.apple.com/iphone/compare/?modelList=iphone-15%2Ciphone-14%2Ciphone-SE-2nd-gen) demonstrates a shareable `modelList` query, a model-selection interface, a summary and deep specification rows, plus links toward shopping and technical specifications. Search extraction may contain template artifacts, so use the actual browser rendering for visual measurements.

**Leaf implementation implication:** comparison is a first-class product route, not a table hidden on a landing page. Keep selected products in the URL; include links back to each overview, specs, support and acquisition route. Treat the comparison rows as structured data, not copy pasted into markup.
