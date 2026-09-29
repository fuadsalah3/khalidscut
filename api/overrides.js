/**
 * Vercel serverless functions for admin content persistence.
 *
 * GET  /api/overrides -> { overrides }
 * POST /api/overrides -> saves the overrides payload
 *
 * Storage: Vercel Edge Config or Upstash Redis via VERCEL_KV_* env vars
 * (Vercel Marketplace → Upstash → add REST tokens). Without storage
 * configured the site simply falls back to its bundled defaults, so
 * nothing breaks on a plain static deploy.
 */

const KEY = 'site-overrides'

export default async function handler(req, res) {
  if (req.method === 'GET') return getHandler(res)
  if (req.method === 'POST') return postHandler(req, res)
  return res.status(405).json({ ok: false, error: 'Method not allowed' })
}

async function getHandler(res) {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { createClient } = await import('@vercel/kv')
      const data = await createClient({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN }).get(KEY)
      return res.status(200).json({ ok: true, overrides: data ?? {} })
    }
  } catch (err) {
    console.error('overrides GET failed', err)
  }
  return res.status(200).json({ ok: true, overrides: {} })
}

async function postHandler(req, res) {
  try {
    const payload = req.body || {}
    if (typeof payload !== 'object') {
      return res.status(400).json({ ok: false, error: 'Invalid payload' })
    }
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { createClient } = await import('@vercel/kv')
      await createClient({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN }).set(KEY, payload)
      return res.status(200).json({ ok: true })
    }
    // No KV configured — accept but report not persisted
    return res.status(200).json({ ok: true, persisted: false })
  } catch (err) {
    console.error('overrides POST failed', err)
    return res.status(500).json({ ok: false, error: 'Save failed' })
  }
}
