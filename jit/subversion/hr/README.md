# Human Resources™

A corporate livestock catalog: heterogeneous corporate people classified as human resources.

## Portrait bank

**Professional Headshots (initial reference)**
- Gallery / source: https://github.com/visualizevalue/headshots
- Full-resolution images: https://github.com/visualizevalue/headshots/tree/main/full
- Manifest: https://raw.githubusercontent.com/visualizevalue/headshots/main/manifest.json
- Direct embed example: https://cdn.jsdelivr.net/gh/visualizevalue/headshots@main/full/01.png
- License: CC0 (see source repository).

Use externally hosted image URLs; do not commit portrait binaries. Retain highest available source resolution and crop/resize in the presentation layer.

No site implementation yet.

## Sigils People

- Gallery: https://ambravo.github.io/sigils-people/
- Structured index (3,960 records; fields include ID, country, name, sex, age, heritage): https://raw.githubusercontent.com/ambravo/sigils-people/main/people/index.json
- Deterministic 1024px portrait URL: `https://ambravo.github.io/sigils-people/portraits/l/{id}.avif`
- 512px: `https://ambravo.github.io/sigils-people/portraits/m/{id}.avif`
- 256px: `https://ambravo.github.io/sigils-people/portraits/s/{id}.avif`
- License: CC BY 4.0; preserve source and license attribution in project documentation.

Sample IDs from ten countries, balanced by the source's sex field: `br-07`, `jp-08`, `ng-03`, `fr-08`, `in-09`, `za-06`, `mx-01`, `kr-08`, `eg-13`, `nz-02`.

These are reusable livestock sources for future projects, not a commitment to build an HR application.
