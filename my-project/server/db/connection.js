import Database from 'better-sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'
import { CREATE_WAITLIST_TABLE, CREATE_WAITLIST_INDEX } from './schema.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

function openDatabase(filepath) {
  const db = new Database(filepath)
  db.pragma('journal_mode = WAL')
  db.exec(CREATE_WAITLIST_TABLE)
  db.exec(CREATE_WAITLIST_INDEX)
  return db
}

function createConnection(dbPath) {
  if (dbPath === ':memory:') return openDatabase(':memory:')
  mkdirSync(dirname(dbPath), { recursive: true })
  return openDatabase(dbPath)
}

const defaultPath = join(__dirname, '../data/waitlist.db')
export const db = createConnection(process.env.DB_PATH || defaultPath)
