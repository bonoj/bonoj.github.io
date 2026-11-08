ALTER TABLE device_sessions ADD COLUMN last_snapshot_time TEXT;
--> statement-breakpoint
CREATE TABLE jit_registry (
 user_id TEXT PRIMARY KEY NOT NULL,
 revision INTEGER NOT NULL,
 entries TEXT NOT NULL
);
--> statement-breakpoint
CREATE TABLE jit_activity (
 user_id TEXT PRIMARY KEY NOT NULL,
 window INTEGER NOT NULL,
 calls INTEGER NOT NULL,
 action TEXT,
 outcome TEXT,
 recorded_at INTEGER
);
