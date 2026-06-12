import { Router } from 'express'
import { db as defaultDb } from '../db/connection.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/

function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 254 && EMAIL_RE.test(email)
}

const rateLimitMap = new Map()

function rateLimit(req, res, next) {
  const ip = req.ip || 'unknown'
  const now = Date.now()
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + 60_000 }

  if (now > entry.resetAt) {
    entry.count = 0
    entry.resetAt = now + 60_000
  }

  entry.count++
  rateLimitMap.set(ip, entry)

  if (entry.count > 5) {
    return res.status(429).json({ status: 'error', message: 'Too many requests. Please try again later.' })
  }

  next()
}

export function createWaitlistRouter(db) {
  const router = Router()

  router.post('/', rateLimit, (req, res) => {
    const { email } = req.body || {}

    if (!isValidEmail(email)) {
      return res.status(422).json({ status: 'error', message: 'Please enter a valid email address.' })
    }

    const source = (req.headers.referer || req.query.utm_source || null)

    try {
      db.prepare('INSERT INTO waitlist (email, source) VALUES (?, ?)').run(email, source)
      return res.status(201).json({ status: 'created', message: "You're on the list! We'll let you know when we launch." })
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(200).json({ status: 'duplicate', message: "You're already on the list!" })
      }
      console.error(err)
      return res.status(500).json({ status: 'error', message: 'Something went wrong. Please try again later.' })
    }
  })

  return router
}

export const waitlistRouter = createWaitlistRouter(defaultDb)
