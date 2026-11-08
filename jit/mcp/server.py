"""Minimal tool-only MCP integration probe. Not an Android device bridge.

Run: pip install -r requirements.txt
     python server.py

Requires a ChatGPT-supported remote MCP integration to be useful. Do not expose
this development server directly to the public Internet without authentication.
"""
from datetime import datetime, timezone
import secrets
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("JIT MCP Integration Probe", host="127.0.0.1", port=8765)

@mcp.tool()
def integration_ping() -> dict:
    """Prove that ChatGPT invoked this server; does NOT claim device access."""
    return {
        "source": "jit-mcp-server",
        "connected_device": False,
        "observed_at": datetime.now(timezone.utc).isoformat(),
        "nonce": secrets.token_hex(12),
        "next_gate": "invoke from ordinary ChatGPT Android chat",
    }

if __name__ == "__main__":
    mcp.run(transport="streamable-http")
