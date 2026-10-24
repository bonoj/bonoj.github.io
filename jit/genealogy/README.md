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

## Investigation 02 — independent Dipak records (2026-10-24)

New public documentary anchors:
- Supreme Court of India, *State of Punjab v. Major Singh* (1966), lists **Dipak Dutt Chaudhuri** as advocate: https://www.casemine.com/judgement/in/5609ab46e4b014971140c15d
- Supreme Court Reports, *Inder Singh & Anr v. State of Punjab* (1967), lists **Dipak Dutt Chaudhuri** for respondents: https://gujarathighcourt.nic.in/hccms/sites/default/files/scgujaratijudgments/eng/SC_CA_92_of_1966.pdf
- Rajmohan Gandhi, *Bapu's Human Tryst*, notes Dipak married Radha, daughter of Maganlal Gandhi, after Sarala's death: https://www.outlookindia.com/books/bapus-human-tryst-news-233539

**Interpretation:** These court appearances corroborate Dipak's professional identity and spelling, but do not establish his descendants or a Sinha connection. Public web searches combining Lalit/Kamla/Pankaj/Saroj Sinha with Tagore, Sarala, Dipak and Radha yielded no trustworthy bridge. Do not merge similarly named people.

**Next archival strategy:** use Supreme Court advocate records and biographical notices to seek Dipak's full name, dates and family references; inspect Geraldine Forbes's endnotes and the correspondence provenance for heirs; seek Kamla and Lalit's parents through consented family records. No change to live runtime.

## Investigation 03 — independent search and source hygiene (2026-10-24)

Searches attempted: exact variants of Dipak Dutt Chaudhuri + Radha + children/family; Deepak Dutt Chaudhuri + Sinha + Sarala; Kamla Sinha + Lalit Sinha + Tagore. No corroborated descendant or Sinha bridge found. Do not infer an absence of descendants from negative web results.

**Source anchors:**
- Indian Supreme Court Reports 1967, *Inder Singh & Anr. v. State of Punjab & Ors.*, printed page 604, counsel **Dipak Dutt Chaudhuri**: https://gujarathighcourt.nic.in/hccms/sites/default/files/scgujaratijudgments/eng/SC_CA_92_of_1966.pdf . Court report independently supports a professional name, not ancestry or offspring.
- *State of Punjab v. Major Singh* (1966), counsel named **Dipak Dutt Chaudhuri**: https://www.casemine.com/judgement/in/5609ab46e4b014971140c15d .
- Rajmohan Gandhi's historical account explicitly says Dipak married Radha, daughter of Maganlal Gandhi, **after Sarala and Gandhi had both died**: https://www.outlookindia.com/books/bapus-human-tryst-news-233539 . Chronology caution: earlier note said only 'after Sarala's death', which is true but less precise.
- Wikipedia's Sarala Devi biography names Dipak as her child and identifies Debendranath Tagore as maternal grandfather; treat as orientation, not primary evidence: https://en.wikipedia.org/wiki/Sarala_Devi_Chaudhurani .

**Important disambiguation:** Some low-quality sites call Radha 'Mahatma Gandhi's granddaughter', which is misleading; Rajmohan Gandhi describes her as **Maganlal Gandhi's daughter**. No source here proves that the lawyer in the court reports and Sarala's son are identical beyond the strong name/profession match; seek corroborating biographical material.

**Next actionable searches:** historical bar association directories, Supreme Court advocate obituaries and memorial references; archives of Maganlal Gandhi/Radha correspondence; Kamla and Lalit's parent names and dates via family records. Keep runtime untouched and avoid adding living-family information to public-facing graph.

## Investigation 04 — chronology and third-party genealogy (2026-10-24)

- Rajmohan Gandhi, first-person historical family account in *The Telegraph* (2024), says Radha Gandhi (Maganlal's daughter) married Sarala's only son Dipak **after Gandhi and Sarala had both died**. Gandhi died in 1948, so marriage postdates 1948; he also says the couple's romance was known to them beforehand. https://www.telegraphindia.com/culture/a-brief-romance-a-never-ending-friendship-the-brave-yet-sad-story-of-mahatma-gandhi-sarala-devi/cid/1996632
- Paul Mehlbaum's public genealogy entry names Dipak Dutt as child of Rambhuj Dutt Chaudhary and Sarala Ghosal and spouse of Radha Gandhi, but expressly states **'The data shown has no sources.'** It does not identify offspring. Treat as unsourced tertiary corroboration only, not proof: https://www.genealogieonline.nl/en/mehlbaum-stamboom/I4315.php
- **Chronology test:** If Kamla or Lalit was born before 1948, a Dipak–Radha marriage after 1948 does not by itself exclude Dipak as a parent, but one must not assume Radha was the biological mother. Their birth years, parents' names and records are decisive. Do not assert either is Dipak's child.
- Public search of Dipak/Radha offspring and Lalit/Kamla Sinha links produced no trustworthy bridge in this pass. No living relatives added to the live site.

## Investigation 05 — primary correspondence and collateral lead (2026-10-24)

**New archival lead:** The *Collected Works of Mahatma Gandhi*, volume 81, item 223, reproduces a letter dated **19 August 1945** addressed to Sarala Devi, saying Dipak had given Gandhi news of her illness. Footnote identifies Dipak Dutt as her son. Primary document link: https://gandhipedia150.in/static/data/highlighted_pdfs_output/Poona_volume81_book_221.pdf . **Date discrepancy:** Sarala is generally recorded as dying 18 August 1945, one day before the letter date. Do not silently harmonize this: verify edition, chronology, and whether the letter was written before news of death arrived.

**New collateral-family lead:** A review of Geraldine Forbes's *Lost Letters and Feminist History* describes the 79-item 'DC Collection': 75 letters to Sarala, three to Rambhuj, **one to Sarala's stepson**. This establishes a distinct documentary route to the stepfamily. Source: https://www.telegraphindia.com/amp/culture/books/review-lost-letters-and-feminist-history-the-political-friendship-of-mohandas-k-gandhi-and-sarala-devi-chaudhurani-by-geraldine-forbes/cid/1806458 . Retrieve the book's appendix or letter transcription to identify the stepson by name; do not merge unverified Randhirsen/Dhirsen/Jagdish variants.

**Age estimate (not birth record):** A 2021 account says Dipak was 12 when sent to Sabarmati Ashram around the Gandhi–Sarala relationship in 1919–1920, suggesting birth circa 1907–1908. Source: https://www.livemint.com/mint-lounge/ideas/understanding-mk-gandhi-s-love-for-his-spiritual-wife-111634531386676.html . Approximate only.

**Results:** Further exact-name searches found no sourced children of Dipak and Radha and no documentary Sinha–Tagore bridge. The court and correspondence records provide higher-value archival search targets, not proof of descendants. Preserve public runtime unchanged.

## Investigation 06 — stepson resolved in Forbes's text (2026-10-24)

**Direct source inspected:** Geraldine Forbes, *Lost Letters and Feminist History* (2020), Introduction, freely indexed text: https://dokumen.pub/lost-letters-and-feminist-history-the-political-friendship-of-mohandas-k-gandhi-and-sarala-devi-chaudhurani-1.html . Forbes explicitly writes that the 79-letter DC Collection included **one letter to Dhirsen (Randhirsen, Rambhaj Dutt's second son and Sarala Devi's stepson), written in 1921**. Thus Dhirsen and Randhirsen are two forms of one person's name; do not count as separate children. The previously mentioned Jagdish remains unresolved and should not be merged or counted without a source.

Forbes also states that in 1976 Dipak supplied her typed copies of letters to his mother, saying the originals had been given to 'people from Delhi' and not returned. She pursued the Director of the National Gandhi Museum without recovering the originals. This is a **document provenance** lead, not evidence of Dipak's offspring.

**Additional independent source:** Forbes interviewed by *The Statesman* (8 March 2024) confirms she personally met Dipak and based the book on letters he held: https://www.thestatesman.com/supplements/miscellany/i-would-like-to-see-international-womens-day-maintained-as-a-day-that-honours-working-women-geraldine-forbes-1503278233.html

**Genealogical conclusion:** Rambhaj's children include Dipak (Sarala's biological son) and Dhirsen/Randhirsen (Sarala's stepson); whether additional children existed is not established by this evidence. No Sinha link or Dipak descendants identified. Keep public runtime unchanged.

## Investigation 07 — Mohyal family-history lead (2026-10-24)

**New source:** *Mohyal Mitter*, August 2022, p. 11, a community publication, discusses Rambhaj Dutt Choudhary and Sarala Devi, says a proposed marriage for their son Dipak did not materialize, and that Dipak subsequently married Radha, daughter of Maganlal Gandhi. The same page names **Shri Ashok Datta Choudhary** in a byline/contact-style context. The excerpt does NOT identify Ashok's relationship to Dipak or Sarala, so do not label him a descendant or living relative. https://www.mohyal.com/mm/mitter/Aug22/MM%20Aug%202022.pdf . This is a potentially useful family-history informant trail, but the PDF was too large for full text inspection in this pass; verify page and attribution before making contact or drawing kinship inferences.

**Independent checks:** Rajmohan Gandhi's first-person historical account confirms Dipak married Radha, daughter of Maganlal Gandhi, after both Gandhi and Sarala died: https://www.telegraphindia.com/culture/a-brief-romance-a-never-ending-friendship-the-brave-yet-sad-story-of-mahatma-gandhi-sarala-devi/cid/1996632 . Geraldine Forbes confirms personally meeting Dipak in 1976: https://www.thestatesman.com/supplements/miscellany/i-would-like-to-see-international-womens-day-maintained-as-a-day-that-honours-working-women-geraldine-forbes-1503278233.html .

**Next tasks:** inspect the August 2022 *Mohyal Mitter* article fully and its attribution; search other issues for Rambhaj, Sarala, Dipak, Radha and Ashok Datta Choudhary; seek historical family references, not presumed living-relative identities. No verified Dipak descendants or Sinha–Tagore bridge found. Keep index.html unchanged.

## Investigation 08 — surname discontinuity hypothesis (2026-10-24)

**New family clue from user:** 'There was a name change at some point. Sinha may have suddenly appeared.' Treat as an important oral-history hypothesis, not an established event. Do not require the surname Sinha to occur in every generation, or reject a link on a surname mismatch.

**Verified historical variation:** Geraldine Forbes, *Lost Letters and Feminist History*, introduction and note 1, states Dipak himself supplied the spelling **Dipak Datta Choudhri** in a biographical sketch, whereas the *Collected Works of Mahatma Gandhi* used **Dipak Dutt Chaudhry**. Her note 7 records several variants for Rambhaj's surname and given name, including Dutt Choudhary, Dutta Choudhri, Datta Choudhury, Chowdhry, and Chowdhari. Source: https://dokumen.pub/lost-letters-and-feminist-history-the-political-friendship-of-mohandas-k-gandhi-and-sarala-devi-chaudhurani-1.html . These are transliteration/name variants; **they do not prove a switch to Sinha**.

**Separate source:** Sarala was born Ghosal/Ghoshal and is recorded as Chaudhurani after marriage; the latter is also described as an honorific suffix. Source: https://indianexpress.com/article/lifestyle/sarala-devi-tagore-family-swadeshi-movement-bengali-revolutionary-6302759/ . Again, not evidence of a Sinha name change.

**Parallel tests (all unproven):**
A. A documented person changed surname from Dutt/Datta/Chaudhuri/Ghosal or another family surname to Sinha.
B. A descendant acquired Sinha through marriage, adoption, or a maternal/paternal line that carried a different surname.
C. Sinha appears only in a collateral branch or due to an unrelated same-name family.
D. The reported 'great-grandmother' relationship is colloquial, a step relationship, or a more distant generation.

**Search keys:** Dipak/Deepak/Dipak Datta/Dutt Choudhri/Chaudhry/Choudhury/Chaudhuri; Radha Gandhi; Sinha/Singha/Sinhaa; Kamla/Kamala; Lalit/Lalith; Ghosal/Ghoshal; family migration, partition-era records, legal name change, marriage and school records. Do not treat any alias as identity without independent dates, locations, parents or documents.

**Highest-yield missing facts:** full names of Kamla's and Lalit's parents; approximate birth years and birthplaces; which person allegedly changed their name and approximately when. Continue investigating both branches without requiring the user to know the answer in advance. No verified Sinha–Tagore link established; do not change index.html.
