# JIT Genealogy — Sarala Devi Chaudhurani

Canonical target: https://bonoj.github.io/jit/genealogy/

## Purpose
Mobile-first interactive relational genealogy, tracing ancestry, descendants, siblings, cousins, marriage and adoption. Initial seed centers Sarala Devi Chaudhurani (1872–1945).

## Current implementation
Standalone index.html with SVG graph, touch pan/pinch, selection details, ancestor filter, recenter and edge types. Seed dataset is embedded in the runtime; first pass is a **research scaffold**, not a comprehensive verified genealogy. The graph currently contains 18 named individuals. Node coordinates are manually authored, not genealogical chronology. Some relationships are simplified and collateral cousin branches remain incomplete.

## Evidence and caveats
Initial source pointers for verification:
- https://en.wikipedia.org/wiki/Sarala_Devi_Chaudhurani
- https://en.wikipedia.org/wiki/Swarnakumari_Devi
- https://en.wikipedia.org/wiki/Tagore_family
- https://en.wikipedia.org/wiki/Dwarkanath_Tagore
- https://en.wikipedia.org/wiki/Maganlal_Gandhi

These are research starting points, not per-edge proof. The app must eventually include source citations and confidence on each edge. Treat Radha Gandhi/Dipak, Cooch Behar royal connection, and early adoption records as research priorities for primary-source confirmation. Do not infer descendants beyond documented records. Do not confuse political intimacy with kinship.

## Next
1. Extract versioned people.json, edges.json and sources.json.
2. Verify every relation individually and mark source/confidence.
3. Add focus mode and graph neighborhood expansion; branch coloring, generation layout, search.
4. Expand Tagore collateral lines, Cooch Behar marriages, Gandhi affinal connection, and documented descendants.
5. Preserve user-observed build identity, deployment verification and mobile behavior.

## Publishing
Host repository bonoj/bonoj.github.io, directory jit/genealogy/. Standard existing GitHub Pages publishing. A Git commit does not prove a deployed live page. Do not touch other JIT experiments.
