-- Apply to the EXISTING JIT MCP Site D1 database before deploying /setup.
-- Server-only gateway configuration; never expose this table via public API.
CREATE TABLE IF NOT EXISTS jit_gateway_config (
  name TEXT PRIMARY KEY CHECK (name = 'gateway_secret'),
  value TEXT NOT NULL,
  owner_id TEXT NOT NULL
);
