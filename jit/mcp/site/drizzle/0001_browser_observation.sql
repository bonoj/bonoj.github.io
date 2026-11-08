ALTER TABLE device_sessions ADD COLUMN share_id TEXT;
--> statement-breakpoint
ALTER TABLE device_sessions ADD COLUMN observation TEXT;
--> statement-breakpoint
ALTER TABLE device_sessions ADD COLUMN observation_received_at INTEGER;
