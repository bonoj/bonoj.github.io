# JIT Affirm — Scheduled Persistence Experiment

Purpose: test a scheduled ChatGPT invocation that reads existing GitHub state, makes one small update, persists it to GitHub, and reads back the result. This is a machinery test, not trading advice or a production market-data pipeline.

Repository: `bonoj/bonoj.github.io` · branch `master` · directory `jit/affirm/`.

## Scheduled run contract

1. Fetch this README and `state.json` from GitHub before changing anything.
2. Increment `run_count` by one; set `last_run_utc` to the actual invocation timestamp and `last_result` to `write_pending`.
3. Update `state.json` using the fetched blob SHA, preserving existing fields. If a conflict occurs, refetch and retry once; never overwrite blindly.
4. Fetch `state.json` again and confirm the increment and timestamp match. Report the commit SHA and verification outcome; if a step fails, report the failure instead of claiming success.
5. Do not touch other JIT projects, the root site, or AFRM trading/report automations. Do not fabricate prices or fetch market data for this minimal test.

The test succeeds only when the scheduled invocation actually performs a GitHub read → write → readback. Creating this file or scheduling a task alone is not proof.
