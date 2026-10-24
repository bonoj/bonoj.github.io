# JIT Genealogy — Sarala Devi Chaudhurani

Canonical target: https://bonoj.github.io/jit/genealogy/

## COLD BOOT — READ FIRST (2026-10-24)

**Mission:** Research whether the user's maternal family (Sinha) connects by descent or another kinship path to Sarala Devi Chaudhurani and thus the Tagore family. Explore ancestors, descendants and collateral branches; **do not manufacture a connection**. User advances investigations with ➡️ and wants each meaningful finding **persisted in this README**, not deployed to the live graph.

**Immediate operating instructions**
1. Read this summary and the latest numbered investigation, then pursue **one genuinely new archival lead**. Avoid repeating broad surname searches or merely restating the known missing link.
2. Cross-check new facts with a named source; distinguish primary documents, scholarly interpretations, community history and unsourced trees. Preserve exact URL, quoted identifier, date, and confidence. An absent web result is not proof of no descendants.
3. Append a numbered investigation with findings, source links, what remains uncertain and the next discriminating step. Re-fetch README SHA before updating to avoid conflicts. If blocked, disclose failure; never claim persistence without a successful commit.
4. **Documentation only:** edit `jit/genealogy/README.md`; do not modify `index.html`, deploy, or alter other JIT projects unless explicitly instructed. Repository `bonoj/bonoj.github.io`, canonical app https://bonoj.github.io/jit/genealogy/ . Commit != live verification.
5. This README is **public**. Family-supplied names already appear below; do not add further living-person identifiers, contacts, addresses, or private records without clear permission. Prefer redacted notes for future sensitive discoveries.

**Confirmed historical core / source-backed working model**
- Sarala (1872–1945), daughter of Swarnakumari Devi and Janakinath Ghosal; Swarnakumari was Debendranath Tagore's daughter. Historical Tagore lineage is not the disputed part.
- Rambhaj/Rambhuj Dutt Chaudhary had **at least three sons**, working birth order **Jagdish (eldest), Dhirsen/Randhirsen (second; Sarala's stepson), Dipak Datta/Dutt Choudhri (third; Sarala's documented biological son)**. Jagdish from *Mohyal Mitter* (Aug 2022); Dhirsen from Geraldine Forbes; Dipak 'third son' from *South Asians at the Inns* register transcription (1935). Maternal identity of Jagdish not independently proven; original register still needs inspection.
- Dipak (aged 27 in Nov 1935, born c. 1907–08) became a barrister/advocate, appears in Indian Supreme Court reports, supplied Forbes correspondence in 1976, and married **Radha, daughter of Maganlal Gandhi**, after 1948. No verified children of Dipak/Radha identified yet.
- Family testimony: Saroj Sinha calls Sarala her great-grandmother. Saroj and Pankaj are siblings; Kamla and Lalit are their parents. A possible surname change leading to **Sinha** was mentioned, with **no known date**. These are **unverified private-family assertions**, not proof of an edge to Sarala.
- **Correct generation math:** If 'great-grandmother' is literal, Sarala → her child (candidate Dipak) → Kamla **or** Lalit → Saroj. Thus Dipak would be Saroj's grandparent. The relationship could also be step/adoptive/collateral or the generational label could be imprecise.

**Critical unknowns:** identities of Kamla's and Lalit's parents; Kamla's maiden surname; any verifiable offspring of Dipak, Jagdish or Dhirsen; whether, where and when a surname actually changed to Sinha. **No documented Sinha–Tagore bridge exists yet.** Do not assume Partition caused a name change.

**High-value next leads (ranked)**
1. Inspect original *South Asians at the Inns* entry and its Inn of Court archives; look for next-of-kin, probate and family notices linked to Dipak and Rambhaj. Transcription: https://www.yumpu.com/en/document/view/19003948/henry-f-uw-law-school/146
2. Read *Mohyal Mitter* August 2022 p. 11 in full; trace references to eldest son Jagdish, later issues, and verify attribution. https://www.mohyal.com/mm/mitter/Aug22/MM%20Aug%202022.pdf
3. Check Geraldine Forbes, *Lost Letters and Feminist History*, notes and correspondence collection for Dipak's biographical sketch and the letter to Dhirsen; clarify 1921/1922 date discrepancy. https://dokumen.pub/lost-letters-and-feminist-history-the-political-friendship-of-mohandas-k-gandhi-and-sarala-devi-chaudhurani-1.html
4. Search historical legal directories, marriage/obituary records and Gandhi family correspondence for descendants. Use Sinha/Singha and Dutt/Datta/Choudhri spellings as **search variants only**, not evidence of identity.

**Known pitfalls:** Earlier investigation 10 attempted to save the 'third son' Inns finding but was blocked; its core is subsequently preserved in investigation 11 and this summary. Older notes below may call Jagdish 'unresolved' or state that only two sons are known; those passages are **superseded** by investigation 11. An early generational statement saying a grandparent of Saroj must be Sarala's child is **incorrect** and superseded by the corrected chain above. The 19 Aug 1945 Gandhi letter vs Sarala's commonly cited 18 Aug death date is unresolved. Treat source claims as leads until rechecked.

**Handoff instruction for next model:** Continue with a fresh, discriminating archival investigation; persist an evidence-conscious numbered update; report exactly what changed and the commit SHA. Do not ask the user to re-explain the family or to know the date of the alleged name change.

---

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

## Investigation 09 — date unknown; name-change search stays open (2026-10-24)

User does not know when the possible surname change occurred. **Do not anchor it to Partition (1947)** or request a date as a prerequisite. Run date-agnostic searches and distinguish surname changes from transcription variants and surnames acquired by marriage.

Fresh source cross-check:
- Geraldine Forbes's *Lost Letters and Feminist History*, introduction note 1, says Dipak personally supplied **Dipak Datta Choudhri** in his bio-sketch; Forbes standardized to **Dipak Dutt Chaudhry** from the *Collected Works of Mahatma Gandhi*. Note 7 enumerates multiple spellings of Rambhaj Dutt Choudhary. https://dokumen.pub/lost-letters-and-feminist-history-the-political-friendship-of-mohandas-k-gandhi-and-sarala-devi-chaudhurani-1.html . This is **spelling variation**, not proof of a change to Sinha.
- *StreeShakti*'s historical profile explicitly states Sarala and Rambhuj had **one son, Dipak**: https://www.streeshakti.com/bookS.aspx?author=7 . This makes direct biological descent through a different child unsupported without new evidence.
- An online Dipak/Radha genealogy has **no cited sources and no listed descendants**: https://www.genealogieonline.nl/en/mehlbaum-stamboom/I4315.php . Negative listing does not mean the couple had no children.

**Method:** Construct an identity table for historical individuals with distinct fields for birth name, married name, honorific, transliteration, legal alias, and undocumented oral-history alias. Search both Sinha/Singha and Chaudhuri/Choudhri/Dutt/Datta/Ghosal independently; only merge identities on stronger corroborators (parents, dates, places, records). The two key unknowns remain Kamla's and Lalit's parents. No new verifiable Sinha–Tagore bridge was found in this search. Keep live index.html unchanged.

## Investigation 11 — three sons independently cross-checked (2026-10-24)

New finding: *Mohyal Mitter* August 2022 explicitly calls **Jagdish** Rambhaj Dutt Choudhary's **eldest son**, sent to a gurukul: https://www.mohyal.com/mm/mitter/Aug22/MM%20Aug%202022.pdf . The 1935 *South Asians at the Inns* register calls **Dipak Datta Choudhri** Rambhaj's **third son**, age 27, admitted 13 November 1935 and called to the Bar 21 June 1939: https://www.yumpu.com/en/document/view/19003948/henry-f-uw-law-school/146 . Geraldine Forbes identifies **Dhirsen (Randhirsen)** as Rambhaj's **second son and Sarala's stepson**: https://dokumen.pub/lost-letters-and-feminist-history-the-political-friendship-of-mohandas-k-gandhi-and-sarala-devi-chaudhurani-1.html . Together, these support the birth order **Jagdish (first), Dhirsen/Randhirsen (second), Dipak (third)**, pending review of original documents. Jagdish's maternal identity is not independently established by these three citations; do not infer he was Sarala's biological child. 

**Source distinction:** *Mohyal Mitter* is a later community history, the Inns register is a historical record transcription, and Forbes is a scholarly account based on family correspondence. Keep confidence levels distinct. This resolves the earlier 'Jagdish' name question and the earlier failed documentation attempt without asserting a Sinha bridge. No live index.html changes.

## Investigation 12 — forward search, false-positive control (2026-10-24)

Ran public searches for combined **Jagdish / Dhirsen / Dipak / Rambhaj**, **Jagdish Rambhaj Sinha Chaudhary**, and **Randhirsen Sinha family**. No independently corroborated descendant or Sinha surname-transition record emerged. Broad results returned unrelated contemporary individuals; do not import name-only matches into the genealogy.

**Source-backed anchor:** Geraldine Forbes explicitly identifies **Dhirsen (Randhirsen)** as Rambhaj's second son and Sarala's stepson. In her account, the DC Collection contained a Gandhi letter to him. Source: https://dokumen.pub/lost-letters-and-feminist-history-the-political-friendship-of-mohandas-k-gandhi-and-sarala-devi-chaudhurani-1.html . Note a **date ambiguity**: the introduction calls it a 1921 letter, while a later chapter says 5 January, year unspecified, possibly 1922. Treat the letter date as unresolved until consulting the underlying document.

**Method shift:** Stop using surname co-occurrence as evidence. Search three sons' marriages, probate, obituaries, educational records and descendants independently. Test any proposed Sinha link using parental names, chronology, geography and original documents. Keep family testimony distinct from verified genealogy; no runtime modifications.

## Investigation 13 — oral-history surname clue (2026-10-24)

New family testimony introduces a possible grandfather named **Jagdish Mohan** and the name **Lalit Mohan Sinha** in the next generation. The speaker was the user's mother, not the user. Do not mistake the named father in her message for the user's father. These are unverified family recollections, not proven identifications with historical persons.

The historical **Jagdish**, documented as Rambhaj Dutt Choudhary's eldest son, may or may not be the same person as the newly mentioned Jagdish Mohan. The shared name element **Mohan** is a clue, not evidence of a surname change. Do not presume which generation adopted **Sinha** or that any change occurred.

Next: seek independent period records linking the two names through dates, parentage, geography or school/civil records. Preserve distinction between biological descent and step relationships. No change to live graph.

## Investigation 14 — disambiguation after Jagdish Mohan clue (2026-10-24)

Fresh searches combining 'Jagdish Mohan', 'Lalit Mohan Sinha', Rambhaj and Chaudhary did **not** reveal a document joining these specific generations. The August 2022 *Mohyal Mitter* historical account does confirm Rambhaj's eldest son was named **Jagdish** and attended a gurukul: https://www.mohyal.com/mm/mitter/Aug22/MM%20Aug%202022.pdf . An independent 2018 Mohyal-history repost repeats the same passage, but likely derives from the same community narrative and is **not independent proof**: https://jaymohyal.blogspot.com/2018/ .

**Important false-positive control:** Searching the full name 'Lalit Mohan Sinha' returns multiple unrelated people in public administrative/court documents. Do **not** equate any of these with Saroj's father without corroborating age, residence, parent or spouse. Do not copy identifiers of possible living relatives into this public README.

**Hypothesis under test:** Was Saroj's remembered 'Jagdish Mohan' the historical Jagdish son of Rambhaj? Neither 'Mohan' nor a Sinha surname transition is attested for historical Jagdish in the checked account. Next evidence needed: historical birthplace, dates or an old document naming Jagdish Mohan and Lalit Mohan Sinha as father and son. Keep alternate hypotheses open, including a separate Jagdish family and the Tagore connection through Kamla's line. No changes to runtime.

## Investigation 15 — name-pair search (2026-10-24)

Searched public indexes for exact pairings of **Jagdish Mohan** and **Lalit Mohan Sinha**, plus historical **Jagdish / Rambhaj / Mohan / Chaudhary** combinations. No source establishing Jagdish Mohan as Lalit's father, or linking him to Rambhaj's eldest son, surfaced. The clearest historical account continues to identify Rambhaj's eldest son simply as **Jagdish**, sent to a gurukul: https://jaymohyal.blogspot.com/2018/04/pandit-rambhaj-dutt-choudhry.html . It is attributed to Ashok Datta Choudhary and predates the 2022 *Mohyal Mitter* reproduction; do not count the two as independent attestations.

**Research discipline:** The given-name component **Mohan** appearing in both reported names does not itself demonstrate a hereditary surname or a legal name change. The question 'why did Jagdish change his name?' is premature until evidence establishes that a change happened and identifies the individual. Preserve two distinct Jagdish identity records pending corroboration. Search for historical documents explicitly naming the father of Lalit Mohan Sinha; the maternal Kamla line remains open. No live graph changes.

## Investigation 16 — archival name-index lead (2026-10-24)

**New source lead:** Ancestry's preview for England, United Grand Lodge of England Freemason Membership Registers (1751–1921) indexes entries under **'Sinha Lalit Mohan'**. Preview obscures dates and identifying details; this is **not an identity match**. Source: https://www.ancestry.co.uk/search/categories/dir_society?name=Seena_Mohan . Next: inspect original register image/entry for date, age, occupation, lodge and place; test chronology before associating with Saroj's father. Do not infer he was a Freemason.

**Strong false-positive warning:** The Bangladesh Supreme Court 2015 annual report documents **another Lalit Mohan Sinha**, father of Justice Surendra Kumar Sinha, with wife **Dhanabati Sinha**, associated with Tilakpur, Moulvibazar. Source: https://www.supremecourt.gov.bd/resources/contents/Annual_Report_2015.pdf . This distinct family is **not proven related** to Saroj's family. A Patna court index also mentions a Lalit Mohan Sinha with wife Vidyawati; no connection established: https://indiankanoon.org/search/?formInput=vidyawati++++++sortby%3A+leastrecent+doctypes%3Apatna .

Searches for direct 'Jagdish Mohan'–'Lalit Mohan Sinha' pairings still lack a verifiable parent-child source. Avoid collapsing people on names alone. No live runtime changes.

## Investigation 17 — military-service research lead

Family oral history now identifies **Lalit Mohan Sinha** as a **colonel in the Indian Army**. This has not yet been verified against military records. Search period officer lists, Gazette of India notices and regimental histories; rank and service chronology can distinguish homonymous individuals. Initial public name searches did not establish a matching officer record. Do not merge unrelated name matches or assume a surname change. The Jagdish identity remains unresolved. No runtime changes.

## Investigation 18 — military and archival disambiguation

Wide searches for the reported colonel did not yield a verified officer record. Several **historical namesakes** appeared: a Lalit Mohan Sinha supplied plants from Monghyr in 1911 (USDA bulletin: https://www.ars-grin.gov/npgs/pi_books/scans/pi027.pdf ); a Lalit Mohan Sinha Raya was mentioned as a Chakdighi landowner in an older Theosophical account (https://theosophy.ph/resources/online-books-and-articles/old-diary-leaves-second-series-1878-83-by-henry-steel-olcott/chapter-xxviii-florid-compliments/ ); and a separate judicial-family autobiography describes a Lalit Mohan Sinha as a schoolteacher (https://www.peterlang.com/document/1058793 ). None establishes a match to the family-reported Indian Army colonel. Next: period military officer lists and Gazette of India Part I Section 4, using service dates and unit if established. Do not merge namesakes or infer a name change. Runtime unchanged.

## Investigation 19 — primary military archive paths

Verified source collections for the colonel lead: British Library Indian Army List, 1889–1947 (https://searcharchives.bl.uk/catalog/038-000792611); British Library Indian Army Records, including promotions and service statements (https://searcharchives.bl.uk/catalog/036-000755035); Gazette of India digitized 1950–2002 (https://www.csl.nic.in/page/innerpage/gazette-of-india.php); Indian Ministry of Defence's retired-officer record interface RODRA (https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1573452). These confirm where records may exist, **not** that a matching officer has been identified. Use approximate service period to choose pre- or post-1947 route. No live changes.
