/**
 * Vercel serverless function: GET/POST /api/overrides
 *
 * Storage: Upstash Redis (REST API) — add it from the Vercel Marketplace
 * (Storage → Upstash Redis) and the KV_REST_API_URL / KV_REST_API_TOKEN
 * env vars appear automatically. The REST API is called with plain fetch,
 * so no SDK is needed.
 *
 * GET  -> { overrides } — public; visitors poll this for live updates
 * POST -> full payload replace. Requires the shared admin key header
 *         `x-admin-key` matching ADMIN_PUBLISH_KEY (src/lib/store.tsx).
 *
 * Without Upstash configured, GET returns empty overrides and POST returns
 * persisted:false — the site still works, edits just stay local.
 */

const KEY = 'site-overrides'
const CACHE_CONTROL = 'public, max-age=3, stale-while-revalidate=8'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', CACHE_CONTROL)

  if (req.method === 'GET') return getHandler(res)
  if (req.method === 'POST') return postHandler(req, res)
  return res.status(405).json({ ok: false, error: 'Method not allowed' })
}

function upstashConfig() {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  return { url: url.replace(/\/$/, ''), token }
}

async function upstashCommand(...args) {
  const cfg = upstashConfig()
  if (!cfg) return null
  const res = await fetch(cfg.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
  if (!res.ok) throw new Error(`Upstash ${res.status}`)
  const json = await res.json()
  return json.result
}

async function getHandler(res) {
  try {
    const raw = await upstashCommand('GET', KEY)
    const overrides = raw ? JSON.parse(raw) : {}
    return res.status(200).json({ ok: true, overrides })
  } catch (err) {
    console.error('overrides GET failed', err)
    return res.status(200).json({ ok: true, overrides: {} })
  }
}

async function postHandler(req, res) {
  const adminKey = process.env.ADMIN_PUBLISH_KEY
  if (adminKey && req.headers['x-admin-key'] !== adminKey) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' })
  }

  const payload = req.body
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return res.status(400).json({ ok: false, error: 'Invalid payload' })
  }

  if (!upstashConfig()) {
    return res.status(200).json({ ok: true, persisted: false })
  }

  try {
    await upstashCommand('SET', KEY, JSON.stringify(payload))
    return res.status(200).json({ ok: true, persisted: true })
  } catch (err) {
    console.error('overrides POST failed', err)
    return res.status(500).json({ ok: false, error: 'Save failed' })
  }
}
