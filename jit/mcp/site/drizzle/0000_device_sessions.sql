CREATE TABLE device_sessions (
 user_id TEXT PRIMARY KEY NOT NULL,
 session_id TEXT NOT NULL,
 token_hash TEXT NOT NULL,
 code_hash TEXT,
 created_at INTEGER NOT NULL,
 expires_at INTEGER NOT NULL,
 pair_expires_at INTEGER NOT NULL,
 attempts INTEGER NOT NULL DEFAULT 0,
 paired INTEGER NOT NULL DEFAULT 0,
 last_seen INTEGER,
 device_time TEXT,
 nonce TEXT,
 platform TEXT,
 visibility TEXT
);
CREATE INDEX device_sessions_expiry ON device_sessions(expires_at);
