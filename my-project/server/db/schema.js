export const CREATE_WAITLIST_TABLE = `
  CREATE TABLE IF NOT EXISTS waitlist (
    id          INTEGER  PRIMARY KEY AUTOINCREMENT,
    email       TEXT     NOT NULL UNIQUE CHECK(length(email) <= 254),
    source      TEXT     CHECK(source IS NULL OR length(source) <= 128),
    created_at  DATETIME NOT NULL DEFAULT (datetime('now'))
  )
`

export const CREATE_WAITLIST_INDEX = `
  CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at)
`
