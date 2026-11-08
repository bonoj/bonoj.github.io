-- Application-level ciphertext only; the AES key is a Sites runtime secret.
CREATE TABLE IF NOT EXISTS jit_gateway_config (
  name TEXT PRIMARY KEY CHECK (name = 'gateway_secret'),
  value TEXT NOT NULL CHECK (value LIKE 'v1.%'),
  owner_id TEXT NOT NULL
);
