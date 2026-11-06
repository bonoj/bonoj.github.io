# Subversion change control

## Why this exists
SOMEWARE failed because approved image identities were silently substituted, external images were not checked, CSS patches accumulated, and commits were described as visually repaired without rendered QA. This is a build contract, not a design style.

## Immutable decisions
Every image-led project must carry an `assets.lock.json` next to its implementation, with exact approved asset paths and SHA-256 digests. Local repository assets are preferred. An image URL is a source reference, not a deployable asset. If a remote source fails, **stop and report the failure**; never replace it with a visually similar image. Approval is not permission to improvise alternatives.

Run `python3 jit/subversion/verify_assets.py path/to/project` before shipping. It checks the locked files and hashes and rejects remote image references in HTML/CSS. The checker does not certify copyright, accessibility, or visual quality.

## Change scope
Before editing, classify the request: copy, layout, imagery, behavior, or deployment. Change only that dimension unless the user explicitly asks for a redesign. When an asset is approved, do not change its identity during layout work. If the approved asset cannot be retrieved or bundled, stop rather than substitute.

## Render evidence
No claims of mobile/desktop visual success without opening and inspecting actual renders at narrow and wide viewports. Test image delivery, crop/focal point, overflow, seam, typography, keyboard/touch interaction, and console/network errors. A successful GitHub commit or Pages pipeline is **not** a successful visual test.

## Reporting
Report separately: source committed; deployment status verified or not; rendered visual QA verified or not. Name remaining defects. Never use “fixed”, “working”, or “deployed” to imply unperformed checks.

## Cleanup
When a project is retired, remove its implementation, spec, and index entry, while preserving general lessons in this shared contract.
