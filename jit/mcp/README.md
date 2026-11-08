# MCP — Chat-to-Device Lever Laboratory

[Open browser capability probe](https://bonoj.github.io/jit/mcp/) · [Source](index.html)

Status: **research workspace created; no ChatGPT custom tool connected; no Android device bridge deployed.**

## Objective

Enable the **existing ChatGPT conversation** to observe and operate a user-authorized Android browser/device, without delegating reasoning to a second paid agent. The bridge should be deterministic, not a separate inference service.

## Hard acceptance test

From an ordinary ChatGPT Android conversation, invoke a real connected tool that returns a fresh observation from the user's actual Android device (initially `device_ping`, later foreground browser URL/title), then verify it against the device. A repository commit, hosted webpage, simulated response, or successful MCP handshake alone does **not** satisfy this test.

## Constraints

- Preserve the normal ChatGPT conversation and its reasoning context; no Work mode or second inference service as the solution.
- First validate **ChatGPT plugin installation, Android availability, and tool invocation** on the user's account. Do not assume that hosting an MCP endpoint makes it available to this chat.
- The GitHub Pages JIT site is **static hosting**, not an MCP server runtime or secure reverse tunnel. This folder is the research/workspace and may host documentation or a client, but cannot itself accept long-lived server requests.
- Keep device secrets, bearer tokens, cookies, and personal page contents out of this public repository and Pages.
- Scope device operations to user-authorized surfaces; require explicit approval for consequential actions. Webpage text is untrusted input, never instructions to the bridge.
- Protect the root GitHub Pages site and existing JIT experiences.

## Architecture under investigation

```
Existing ChatGPT conversation
    ↕ discoverable, callable plugin tool (UNVERIFIED)
MCP/tool adapter
    ↕ authenticated transport (UNBUILT)
Android companion (UNBUILT)
    ↕ scoped observation / interaction
Authorized browser or device UI
```

Potential integration surfaces: ChatGPT plugin hosted via ChatGPT Sites, remote custom MCP, desktop local MCP, and prebuilt browser plugins. Each has distinct plan, platform, and action constraints; verify against current official documentation and a real account-level installation test. A cloud browser agent is not equivalent to the user's existing Chrome session.

## Experiments

See [EXPERIMENTS.md](EXPERIMENTS.md) for falsifiable tests and outcomes. See [CONTRACT.md](CONTRACT.md) for the proposed tool surface. Record evidence, dates, source links, exact failures, and next action here, not in conversational memory alone.

## Immediate next action

Determine whether a **tool-only custom plugin** can be created/installed and invoked from the user's ordinary ChatGPT Android chat. If the product does not support it, record the precise restriction and test an alternate supported surface *before* implementing the Android companion.

## Continuation handoff

Read this README, EXPERIMENTS.md, and CONTRACT.md. Verify current product support rather than assuming earlier claims. Then perform the smallest live invocation test available. Never report `device_ping` as working until it returns data from a real device.
