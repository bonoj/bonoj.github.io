# JIT Affirm — Scheduled GitHub Maintenance Campaign

Purpose: prove an unattended scheduled ChatGPT invocation can read multiple GitHub files, produce an AFRM checkpoint, write multiple files, verify them, and deliver the user-facing report. This is a test harness, not an automated trading system.

Repository: `bonoj/bonoj.github.io`, branch `master`, confined to `jit/affirm/`.
Dashboard: https://bonoj.github.io/jit/affirm/

## Each scheduled AFRM checkpoint

1. **Always send the user a report**, even if the market is closed, the price is unchanged, or a GitHub operation fails. Quote timestamps and source delays; never fabricate prices.
2. Fetch `README.md`, `state.json`, `history.json`, and `index.html` from GitHub before modifying files. Read back existing state to avoid replacing concurrent changes.
3. Generate the exact user-facing checkpoint as Markdown and create `updates/YYYY-MM-DDTHH-MM-SSZ-<session>.md`, with a unique UTC timestamp and session label (opening, midday, closing). Include market data only if verifiable.
4. Update `state.json`: increment `run_count`, set `last_run_utc`, `last_result`, and `latest_report_path`. Preserve unknown fields. Use the fetched blob SHA. On conflict, refetch and retry once.
5. Update `history.json` with a newest-first entry `{timestamp_utc, label, path}` and retain the most recent 30 entries. Use the fetched blob SHA; refetch and retry once on conflict.
6. Update `index.html` **each run** by changing only the `data-last-maintained-utc` attribute on the `<main>` element. This tests scheduled HTML writes without redesigning the page. Use its fetched blob SHA.
7. Fetch the report, `state.json`, `history.json`, and `index.html` again to verify the report content, increment, history entry, and HTML timestamp. Report commit SHA(s) and readback status in the user-facing message. Never claim persistence without verification.
8. Do not touch other JIT projects or root site. Do not place trades. A GitHub commit is not proof that Pages deployment or browser rendering succeeded.

The first scheduled run is not yet proven. A task being enabled is not evidence that its execution and delivery succeeded.
