import express from 'express'
import { waitlistRouter } from './routes/waitlist.js'

const app = express()
const PORT = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

app.use(express.json())

app.use((req, res, next) => {
  if (isProd) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '')
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*')
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/waitlist', waitlistRouter)

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`)
})

export { app }
