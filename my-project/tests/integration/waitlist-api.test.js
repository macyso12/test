import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Database from 'better-sqlite3'
import { CREATE_WAITLIST_TABLE, CREATE_WAITLIST_INDEX } from '../../server/db/schema.js'

let app, server

beforeAll(async () => {
  // Use in-memory DB for tests
  process.env.DB_PATH = ':memory:'
  const testDb = new Database(':memory:')
  testDb.exec(CREATE_WAITLIST_TABLE)
  testDb.exec(CREATE_WAITLIST_INDEX)

  const express = (await import('express')).default
  const { createWaitlistRouter } = await import('../../server/routes/waitlist.js')
  app = express()
  app.use(express.json())
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
  app.use('/api/waitlist', createWaitlistRouter(testDb))
  server = app.listen(0)
})

afterAll(() => server.close())

function post(path, body) {
  const port = server.address().port
  return fetch(`http://localhost:${port}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}

function get(path) {
  const port = server.address().port
  return fetch(`http://localhost:${port}${path}`)
}

describe('GET /api/health', () => {
  it('returns 200 ok', async () => {
    const res = await get('/api/health')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.status).toBe('ok')
  })
})

describe('POST /api/waitlist', () => {
  it('returns 201 for new valid email', async () => {
    const res = await post('/api/waitlist', { email: 'new@example.com' })
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.status).toBe('created')
  })

  it('returns 200 for duplicate email', async () => {
    await post('/api/waitlist', { email: 'dup@example.com' })
    const res = await post('/api/waitlist', { email: 'dup@example.com' })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.status).toBe('duplicate')
  })

  it('returns 422 for invalid email', async () => {
    const res = await post('/api/waitlist', { email: 'notanemail' })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.status).toBe('error')
  })

  it('returns 422 for missing email', async () => {
    const res = await post('/api/waitlist', {})
    expect(res.status).toBe(422)
  })
})
