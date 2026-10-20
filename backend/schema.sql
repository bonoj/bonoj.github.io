CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, namespace TEXT NOT NULL, item_key TEXT NOT NULL, payload TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')));
CREATE INDEX IF NOT EXISTS events_lookup ON events(namespace,item_key,id DESC);
CREATE TABLE IF NOT EXISTS quotas (namespace TEXT NOT NULL, minute TEXT NOT NULL, count INTEGER NOT NULL, PRIMARY KEY(namespace,minute));
