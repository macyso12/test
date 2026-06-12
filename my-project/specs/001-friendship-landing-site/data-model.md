# Data Model: Friendship App Landing Website

**Feature**: 001-friendship-landing-site
**Date**: 2026-06-12

---

## Entities

### WaitlistEntry

Represents a visitor who submitted their email to be notified when the app
launches on the App Store / Google Play.

| Field       | Type     | Constraints                        | Notes                              |
|-------------|----------|------------------------------------|------------------------------------|
| id          | integer  | PRIMARY KEY, AUTOINCREMENT         | Internal surrogate key             |
| email       | text     | NOT NULL, UNIQUE, max 254 chars    | RFC 5321 compliant email address   |
| source      | text     | nullable, max 128 chars            | utm_source or HTTP Referer header  |
| created_at  | datetime | NOT NULL, default = now (UTC)      | ISO 8601 timestamp                 |

**Validation rules**:
- `email` MUST match a basic email pattern (`x@y.z`) before insert.
- Duplicate `email` submissions MUST be rejected with a user-friendly message
  ("You're already on the list!") rather than an error.
- `source` is captured automatically from the request; not user-supplied input.

**State transitions**: None — a WaitlistEntry is immutable after creation.

---

### SiteConfig (in-memory / build-time, not persisted)

Controls feature flags rendered at build time (e.g., whether app store links
are live or the waitlist form is shown instead).

| Field              | Type    | Default | Notes                                     |
|--------------------|---------|---------|-------------------------------------------|
| appStoreLive       | boolean | false   | When true, show App Store badge CTA       |
| googlePlayLive     | boolean | false   | When true, show Google Play badge CTA     |
| waitlistEnabled    | boolean | true    | When true, show email capture form        |
| analyticsEnabled   | boolean | false   | When true, inject analytics snippet       |

Configured via environment variables at build time (`.env` file); not stored in
SQLite.

---

## Relationships

```
WaitlistEntry   (standalone — no foreign keys)
SiteConfig      (build-time config — not persisted to SQLite)
```

---

## SQLite Schema

```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id          INTEGER  PRIMARY KEY AUTOINCREMENT,
  email       TEXT     NOT NULL UNIQUE CHECK(length(email) <= 254),
  source      TEXT     CHECK(source IS NULL OR length(source) <= 128),
  created_at  DATETIME NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);
```

Database file location: `server/data/waitlist.db` (excluded from version
control via `.gitignore`).
