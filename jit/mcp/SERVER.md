# Tool-only MCP server — integration probe

Source: [server.py](server.py), [requirements.txt](requirements.txt).

This is a **minimal, non-device MCP tool server**. Its only purpose is to establish that a ChatGPT conversation can call our own server and receive a fresh response. It does **not** communicate with Android, inspect Chrome, or perform device actions.

## Local development

Python 3.11+:

```sh
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python server.py
```

The server binds to loopback on port 8765. The MCP endpoint is normally `http://127.0.0.1:8765/mcp` using Streamable HTTP. A loopback endpoint is not reachable by ChatGPT's hosted service; a supported, authenticated tunnel/hosting integration is required. Do not publicly expose this development endpoint as-is.

Tool: `integration_ping()`. Every call generates a UTC timestamp and random nonce. `connected_device: false` is deliberately hardcoded to prevent confusing MCP connectivity with actual Android connectivity.

## Acceptance criteria

1. MCP inspector can discover and invoke `integration_ping` locally.
2. An officially supported ChatGPT custom integration can register the server.
3. A **normal Android ChatGPT conversation, without Work**, invokes the tool and receives a fresh nonce.
4. Only after (3) is verified, implement an authenticated Android transport and a genuine `device_ping`.

No steps are marked complete merely because source exists. If ChatGPT custom tools are not available on the account/client, record the limitation in EXPERIMENTS.md. The static GitHub Pages directory cannot execute Python.
