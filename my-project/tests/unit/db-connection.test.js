import { describe, it, expect } from 'vitest'
import Database from 'better-sqlite3'
import { CREATE_WAITLIST_TABLE, CREATE_WAITLIST_INDEX } from '../../server/db/schema.js'

describe('database schema', () => {
  it('initialises waitlist table without error', () => {
    const db = new Database(':memory:')
    expect(() => db.exec(CREATE_WAITLIST_TABLE)).not.toThrow()
    expect(() => db.exec(CREATE_WAITLIST_INDEX)).not.toThrow()
    db.close()
  })

  it('enforces UNIQUE constraint on email', () => {
    const db = new Database(':memory:')
    db.exec(CREATE_WAITLIST_TABLE)
    db.prepare("INSERT INTO waitlist (email) VALUES (?)").run('a@b.com')
    expect(() =>
      db.prepare("INSERT INTO waitlist (email) VALUES (?)").run('a@b.com')
    ).toThrow()
    db.close()
  })

  it('rejects email longer than 254 chars', () => {
    const db = new Database(':memory:')
    db.exec(CREATE_WAITLIST_TABLE)
    const long = 'a'.repeat(250) + '@b.com'
    expect(() =>
      db.prepare("INSERT INTO waitlist (email) VALUES (?)").run(long)
    ).toThrow()
    db.close()
  })
})
