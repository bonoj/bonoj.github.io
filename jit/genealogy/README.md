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

## Research notes — 2026-10-24 (documentation only)

**User instruction:** Persist research here, not in the live interactive deployment. Do not modify index.html or publish new living-relative nodes.

### Family testimony (unverified connection)
- Saroj Sinha reports Sarala Devi Chaudhurani was her great-grandmother.
- Saroj and Pankaj Sinha are siblings; Kamla and Lalit Sinha are their parents; Sinha is the paternal surname. These are user-supplied relationships, not independently corroborated historical records.
- Kamla's maiden name and the intermediate generations connecting Saroj to Sarala are unknown. Search BOTH Kamla's and Lalit's ancestry; do not infer that the connection follows a surname.
- If the reported generation count is literal, a grandparent of Saroj would be a child of Sarala. This is a testable hypothesis, not a verified edge.

### Historical research leads
- Sarala's parents: Swarnakumari Devi and Janakinath Ghosal; maternal grandfather Debendranath Tagore. Source: https://en.wikipedia.org/wiki/Sarala_Devi_Chaudhurani
- Sarala married Rambhuj/Rambhaj Dutt Chaudhuri in 1905; their son Dipak (also Deepak, Datta Choudhri, Dutt Chaudhry) married Radha, daughter of Maganlal Gandhi. Sources: https://indianexpress.com/article/lifestyle/sarala-devi-tagore-family-swadeshi-movement-bengali-revolutionary-6302759/ ; https://dokumen.pub/lost-letters-and-feminist-history-the-political-friendship-of-mohandas-k-gandhi-and-sarala-devi-chaudhurani-1.html
- Historian Geraldine Forbes received copies of Sarala/Gandhi correspondence from Dipak in 1976. Her book explicitly discusses spelling variations and states Radha was Maganlal Gandhi's daughter, and that Maganlal was the son of Gandhi's cousin Khushaldas. Do not simplistically describe Radha as Gandhi's biological granddaughter. Source: https://www.mkgandhi.org/nbook/lost-letters-and-feminist-history.html
- Rambhuj's father is identified as Radha Krishan Dutt in an Asiatic Society Kolkata paper. Source: https://asiaticsocietykolkata.org/uploads/Asiatic%20Society%20Journal%2C%20Vol.-3%20%28N%29.pdf
- Rambhuj had a son from an earlier marriage; research Randhirsen/Dhirsen and Jagdish as **unreconciled candidate names**, not necessarily separate verified people or biological descendants of Sarala.
- No reliably documented children of Dipak and Radha were identified in this pass. No verified Sinha–Tagore link has been established.

### Research work queue
1. Trace Lalit Sinha's parents and grandparents with records, dates, locations and alternate spellings.
2. Trace Kamla's maiden family and parents; obtain maiden surname if possible.
3. Search Dipak/Deepak Datta/Dutt Chaudhry and Radha Gandhi descendants, court/legal biographies, obituaries and archives.
4. Check Geraldine Forbes' book notes, the Forbes Collection (British Library Mss Eur F341), and relevant Gandhi archives for family names.
5. Resolve Rambhuj's earlier children and distinguish biological from step relations.
6. Record every asserted edge with source, confidence, and relation type. Keep living persons out of the public interactive graph pending explicit publication consent.

**Status:** research persisted in documentation only; historical leads require edge-level corroboration. No claim of a verified bloodline joining the Sinha and Tagore branches.

## Next investigation — generational constraint and falsifiable paths (2026-10-24)

The family assertion is **Sarala → [child] → [grandchild] → Saroj**. Since Saroj's parents are Kamla and Lalit, a literal great-grandmother relationship requires **either Kamla or Lalit to be Sarala's grandchild**, not Sarala's child. Accordingly, a child of Sarala (Dipak, based on currently identified biological descendants) would be a **parent of Kamla or Lalit**, and thus a **grandparent of Saroj**. This corrects the earlier inaccurate note saying Saroj's grandparent must have been Sarala's child.

Candidate paths, explicitly unproven:
- Sarala → Dipak → Kamla → Saroj (requires Dipak to be Kamla's father).
- Sarala → Dipak → Lalit → Saroj (requires Dipak to be Lalit's father; surname difference demands independent evidence, not rejection).
- Sarala → currently undocumented child → parent of Saroj → Saroj (requires corroborating records).
- Nonliteral use of 'great-grandmother', step/adoptive relation, or collateral relationship (do not label biological).

**Most discriminating evidence:** names and birth/maiden surnames of Kamla's and Lalit's parents, approximate dates/places, and any family documents mentioning Dipak/Deepak or Radha. No public search result yet bridges the families. Keep all speculative edges out of the live graph. Do not publish additional identifying details of living relatives without consent.
