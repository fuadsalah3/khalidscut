/**
 * Vite dev middleware: emulates the Vercel /api/overrides + /api/contact
 * serverless functions during `npm run dev`, so the live-update flow can be
 * developed and tested locally.
 *
 * - GET  /api/overrides -> reads .freebuff/dev-overrides.json
 * - POST /api/overrides -> writes it (requires x-admin-key, same as prod)
 * - POST /api/contact   -> logs the message and returns ok (no Telegram/email
 *                          keys locally; the client falls back gracefully)
 */
import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

const STORE_FILE = path.resolve(process.cwd(), '.freebuff/dev-overrides.json')
const ADMIN_KEY = 'khalidscut-admin-2026' // keep in sync with src/lib/store.tsx

function readStore(): Record<string, unknown> {
  try {
    return JSON.parse(fs.readFileSync(STORE_FILE, 'utf8'))
  } catch {
    return {}
  }
}

function writeStore(data: unknown): void {
  fs.mkdirSync(path.dirname(STORE_FILE), { recursive: true })
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2))
}

export function apiDevPlugin(): Plugin {
  return {
    name: 'dev-api-overrides',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) return next()
        const url = req.url.split('?')[0]

        if (url === '/api/overrides' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true, overrides: readStore() }))
          return
        }

        if (url === '/api/overrides' && req.method === 'POST') {
          if (req.headers['x-admin-key'] !== ADMIN_KEY) {
            res.statusCode = 401
            res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }))
            return
          }
          let body = ''
          req.on('data', (chunk: Buffer) => (body += chunk))
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}')
              if (!payload || typeof payload !== 'object') throw new Error('bad payload')
              writeStore(payload)
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true, persisted: true }))
            } catch {
              res.statusCode = 400
              res.end(JSON.stringify({ ok: false, error: 'Invalid payload' }))
            }
          })
          return
        }

        if (url === '/api/contact' && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: Buffer) => (body += chunk))
          req.on('end', () => {
            try {
              const { name, email, subject, message } = JSON.parse(body || '{}')
              console.log('— contact form (dev, not delivered) —')
              console.log(`  name: ${name}  email: ${email}`)
              console.log(`  subject: ${subject}`)
              console.log(`  message: ${String(message).slice(0, 140)}`)
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true, dev: true }))
            } catch {
              res.statusCode = 400
              res.end(JSON.stringify({ ok: false, error: 'Invalid payload' }))
            }
          })
          return
        }

        next()
      })
    },
  }
}
