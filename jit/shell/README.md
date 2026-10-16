# JIT Shell contract

Canonical URL: https://bonoj.github.io/jit/shell/

## Immutable UX rule
JIT experiences are single-page worlds. The document root, html, body, and outer shell **never scroll**. Use 100dvh, overflow:hidden and overscroll containment. Any overflow belongs in a deliberately designed modal or internal panel, never the parent page. Inspectors overlay the world instead of expanding it.

## Release identity
No Jekyll, no invented build labels, no client GitHub API and no background polling. The branch-publishing GitHub Action `.github/workflows/jit-shell-stamp.yml` stamps the triggering source commit SHA into the HTML meta tag, computes an HTML fingerprint, and writes `release.json`. The browser displays its **executing HTML's** stamped SHA, then checks the manifest. A mismatch is explicitly reported as unverified; it never silently substitutes the manifest's SHA for the executing build.

Previously observed verified SHAs are stored locally and compared with the new verified SHA. Cache-busting REFRESH uses a unique `fresh` query parameter and cleans the address bar via `history.replaceState`. CDN propagation can lag. Do not claim live without public verification.

## Publishing
Write small changes, verify committed files, and wait for the Actions stamp commit. Confirm the stamped HTML meta SHA matches `release.json.sha` and fingerprint matches `release.json.htmlSha256`. Confirm the browser observation separately. Preserve this contract for all JIT children.
