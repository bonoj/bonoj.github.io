# LEAF — Site Architecture and Experience Specification

Status: **SPECIFICATION ONLY — no site implementation or deployment yet.**
Location: `bonoj/bonoj.github.io`, `jit/leaf/`.
Source inspiration: Apple public website inspected 2026-11-04; structure and interaction patterns are references, not copied code or media.

## Premise
**Leaf. The original interface.**
**Available at a banana tree near you.**

A fully navigable, premium, deadpan parody of a global consumer-technology company. The thing being sold is a freely available banana leaf. The site takes its product seriously; the visitor gradually discovers there is nothing to buy. The interface should be beautifully executed, not an endless collection of punchlines. Preserve the line between parody and impersonation: own brand, original copy, original/licensed imagery, no Apple trademarks in Leaf branding.

The first product is the leaf, not the logo. Favor premium photography of mature banana plants: heavy, drooping, naturally split leaves; prominent arched midrib; real folds, translucence, wind damage, and texture. Avoid generic narrow leaf icons, cartoon bananas, AI-polished perfect foliage, and water-drop icon gimmicks. Logo deferred.

## Work order — essential
1. **Reference map and link graph first.** Inspect Apple homepage, store, product category, individual product, comparison, buying, support, environmental, newsroom and footer flows. Capture structural patterns, not copied page text.
2. **Image selection second.** Start with the strongest banana-plant imagery from the creative references: huge drooping, naturally split leaves, dramatic backlight, authentic texture. Record exact source URLs, intended placements, and crops before building. Treat reference images as references until reuse rights are checked; do not let paperwork displace art direction.
3. **Navigation skeleton third.** Build all route destinations and back-links before writing long copy. A route must not be an empty dead end. Verify direct URL loads and mobile navigation.
4. **Visual fidelity fourth.** Recreate the *experience grammar*: restrained global nav, typographic hierarchy, enormous photo-driven hero, edge-to-edge product stories, airy grids, comparison tables, sticky local nav, polished transitions, footer depth.
5. **Editorial fifth.** Fill with deadpan original Leaf product language only after the navigation works.
6. **Test, publish, verify.** JIT root is protected. No speculative changes to Pages workflow; verify commit separately from deploy and live behavior.

## Reference URLs — verified source architecture
- https://www.apple.com/ — global navigation, editorial campaign homepage, promo tile grid, footer, search and bag.
- https://www.apple.com/store — commerce landing: category icons, latest product cards, help, store difference, offers, quick links.
- https://www.apple.com/iphone/ — category landing: model nav, flagship campaigns, lineup, compare, purchase, benefits, cross-device ecosystem.
- https://support.apple.com/ — separate but connected support entrypoint, product families, topic search and help.
- https://www.apple.com/icloud/find-my/ — service feature landing with many functional sections.
Additional Apple pages must be inspected and logged before claiming exact correspondence. Reference site evolves; do not hardcode current promotional SKUs.

## Leaf information architecture (canonical route contract)
All links local to `/jit/leaf/` except explicit credits or external references. Each listed route must render a useful page and expose the global navigation and footer.

Global nav: Leaf [home], Store, Leaf, Leaf Pro, Leaf Air, Ecosystem, Accessories, Support, Search, Bag.

| Route | Purpose | Inbound/outbound |
| --- | --- | --- |
| `/` | Cinematic homepage, launch tiles, editorial teasers | All top-level categories; Learn more -> /leaf/; Find a tree -> /store/find/ |
| `/store/` | Retail theater: lineup, $0 pricing, specialist, availability, pickup | Product details, compare, locator, bag, help |
| `/leaf/` | Core product overview: flatware, wrapping, shade, rain, compost | /leaf/specs/, /compare/, /store/leaf/ |
| `/leaf/specs/` | Technical specifications, honestly absurd | /leaf/, /support/leaf/ |
| `/leaf-pro/` | Folded liquid-holding configuration; same leaf | /leaf-pro/specs/, /compare/, /store/leaf-pro/ |
| `/leaf-pro/specs/` | Volume varies with fold, handling and integrity | /leaf-pro/, /support/folding/ |
| `/leaf-air/` | Air-cooled, naturally ventilated shade configuration | /compare/, /store/leaf-air/ |
| `/compare/` | Feature-by-feature product comparison | All products, store routes |
| `/ecosystem/` | The banana plant and surrounding actual ecology | /environment/, /store/find/, /support/ |
| `/accessories/` | Stem, fiber, rain, sunlight, folds; no manufactured accessories | Product routes and support |
| `/store/leaf/` | Product configuration / acquisition journey | /bag/, /store/find/, /leaf/ |
| `/store/leaf-pro/` | Product acquisition, $0, no upgrade fee | /bag/, /store/find/, /leaf-pro/ |
| `/store/leaf-air/` | Product acquisition, same sourcing | /bag/, /store/find/, /leaf-air/ |
| `/store/find/` | The central reveal: available at a banana tree near you | /ecosystem/, /support/availability/, /store/ |
| `/bag/` | Cart experience, zero monetary transaction; no checkout/payment collection | /store/find/, /store/ |
| `/support/` | Support portal, search, topic tiles, repair/replacement | /support/folding/, /support/care/, /support/availability/ |
| `/support/folding/` | Practical fold ideas with caveats; no promise of potable water | /leaf-pro/, /support/ |
| `/support/care/` | Splits, wilting, replacement, compost | /environment/, /store/find/ |
| `/support/availability/` | Geography and seasonal limitations, no false nearest-tree claims | /store/find/, /support/ |
| `/environment/` | Materials, biodegradability, responsible harvest, ecology | /ecosystem/, /newsroom/ |
| `/newsroom/` | Press releases / company news parody | /newsroom/introducing-leaf/, / |
| `/newsroom/introducing-leaf/` | Launch story, original editorial image | /leaf/, /newsroom/ |
| `/about/` | Brand story: no founding date asserted; nature did the work | /environment/, /newsroom/ |
| `/legal/` | Parody disclosure, trademark clarity, safety disclaimers | All footer destinations |

Route names are proposed Leaf architecture, not claims about exact Apple URL equivalents. Do not present unbuilt routes as live.

## Page behavior and interaction contract
- Global header sticky, narrow, subdued, responsive. Desktop category links; mobile accessible drawer. Search opens local indexed site search; no fake inert search.
- Product pages have a local sticky subnav with Overview, Tech Specs, Compare, Find a Tree. Crosslinks and breadcrumbs work from direct loads.
- All CTA actions lead somewhere meaningful. 'Buy' is replaced contextually by 'Get Leaf', 'Find a tree', or a deliberately functional $0 bag.
- Bag has add/remove quantity and subtotal $0; final action points to a clear instruction to locate a suitable banana plant, not a fake payment flow.
- Locator must **not** invent nearby trees or collect location without permission. Initial version is an informative availability page. Later optional geolocation requires a real verified botanical dataset, fallback and accuracy labeling.
- Search indexes all site routes and returns real matches.
- Support is a full navigable branch, not a one-line joke. Practical information must be accurate; leaf cups are not certified safe drinking vessels, and harvesting must respect landowners and ecology.
- Back/forward browser history, deep linking, focus, reduced motion, keyboard navigation, responsive image loading, and 404 handling.
- Footer deep-link families: Shop & Learn, Services, Help, About, Environment, Legal. Every link must resolve or be explicitly labeled external.

## Imagery inventory — to source before implementation
This is noncommercial satire, and photographic excellence is essential. Start with the compelling banana-tree images already explored; identify exact originals rather than replacing them with generic stock. Noncommercial parody does not automatically authorize copying or hotlinking third-party photographs. Keep a lightweight `MEDIA.md`: exact image URL, creator/source when known, intended placement, crop, whether embedding or reuse is permitted, and status. Rights questions should be handled pragmatically, not by abandoning the visual direction.

| Asset ID | Intended shot | Ratio / treatment | Routes |
| --- | --- | --- | --- |
| HERO-01 | Mature banana plant with arching, drooping, wind-split leaves, luminous natural backlight | 16:9 desktop + 4:5 mobile | / |
| HERO-02 | Single torn banana leaf photographed side-on, dramatically arched central rib | 16:9 and 1:1 | /leaf/ |
| HERO-03 | Leaf folded into functional cup, natural light, visibly authentic | 4:5 | /leaf-pro/ |
| HERO-04 | Large leaf casting shade, human-scale outdoor context | 16:9 | /leaf-air/ |
| DETAIL-01 | Translucent leaf vascular texture / rib detail | 3:2 macro | /leaf/specs/ |
| DETAIL-02 | Torn segments fluttering, natural imperfections | 3:2 | /leaf/, /support/care/ |
| USE-01 | Banana leaf as plate | 4:5 | /store/, /leaf/ |
| USE-02 | Fold/wrap sequence, safe and comprehensible | 3:2 sequence | /support/folding/ |
| ECO-01 | Entire banana plant and environment | 16:9 | /ecosystem/, /environment/ |
| SHOP-01 | Clean studio leaf on neutral backdrop | 1:1 transparent/neutral | /store/, /compare/, /bag/ |
| NEWS-01 | Product-launch hero photo, original | 16:9 | /newsroom/ |

Image discovery: recover the exact beautiful banana-tree reference images from the prior exploration first; investigate their source pages and whether embedding is permitted. Other candidates include Wikimedia Commons, Unsplash, Pexels, and original/generated imagery. Preserve the art direction regardless of sourcing. Do not silently hotlink sites that prohibit it. If media is hosted locally, optimize responsive images without losing the natural detail.

## Navigation acceptance matrix
- Home -> every category -> product detail -> specs -> compare -> store -> find a tree -> support -> home.
- Store -> product -> bag -> remove -> store -> support.
- Search -> matching route -> related route -> footer -> legal.
- Every top-nav and footer link resolves. Every page can reach home within one click/tap.
- No placeholder href='#', silent dead links, dead-end CTAs, empty pages, or Apple links mistakenly presented as Leaf links.
- Check direct deep-link reload under GitHub Pages `/jit/leaf/` (prefer real static directory routes or verified fallback).
- Test mobile width 360px, tablet 768px, desktop 1440px, keyboard and reduced-motion modes.
- Automated link crawler validates every internal route, asset and canonical URL; generate report before publish.
- Source evidence, commit SHA, Pages status, and actual live checks reported distinctly.

## Creative tone
The satire is structural: extravagant digital merchandising of a naturally occurring, freely replaceable object. Product labels may exist as categories of *use*, not falsely distinct proprietary inventions. Favor restrained copy and excellent imagery. No misleading claims of a real Apple affiliation. No actual payment, sign-up, or data collection.

## Implementation boundaries
This document is a build contract, not permission to start implementing. Do not alter JIT index, root site, deployment config, or unrelated projects during specification. Next task: expand the Apple page reference/link map and populate MEDIA.md with **the actual visually excellent image candidates and their source URLs**, noting practical reuse/embedding status; then implement the navigation skeleton once imagery is selected.
