# JIT MCP — E5 handoff (2026-11-08)

E2–E4 passed in ordinary Android ChatGPT. E5's stable interface and local dispatch work. Production Supabase baseline and backend-only iteration are pending owner provisioning.

- [Owner setup](https://jit-mcp.bracedbuddy1.chatgpt.site/setup) · [Companion](https://jit-mcp.bracedbuddy1.chatgpt.site/device)
- Site deployment `appgdep_6af0f31770ac81919529f9aa65973a71`, saved version `appgprj_6af07fda46ec8191a71e9df6f4bc9e75~appgver_b3cff6a1709481919adbd2fd6bd778f6`, source `c9d1098a4bed385de35017866f0064846f39e58c`, environment revision `2`.
- Private plugin `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`, six unchanged tool signatures.
- Supabase project `iqglyokmcobegledbfcm`, function `jit-mcp-capabilities` v2. The user confirmed the shared credential was set in Supabase.

## Resume here

1. Sign in to setup with the Site owner account. Pair the companion in a separate tab if prompted. Paste the original Supabase credential in the setup form and save. The Site validates it with Supabase before saving a write-once encrypted D1 row. The encryption key is held in Sites secrets. The response contains only configuration status.
2. In ordinary ChatGPT, call `jit_capabilities`, then invoke `echo_text_v1` with `{text:"e5-baseline"}` and the observed revision. Record the UTC result and current Site deployment/plugin release.
3. After that baseline succeeds, deploy only the Supabase capability function with a distinct typed read-only capability, such as `text_length_v1` with `input_kind:"text"` and `output_kind:"integer"`. Increment the backend catalog revision. Verify ordinary-chat discovery and invocation with the Site and plugin release fixed.
4. Log exact results in [EXPERIMENTS.md](EXPERIMENTS.md).

The setup page uses the existing Site and database. Keep the original secret out of chat, repository content, client storage and logs.
