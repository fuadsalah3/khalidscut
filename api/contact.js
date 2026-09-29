/**
 * Vercel serverless function: POST /api/contact
 * Delivers contact-form messages to BOTH:
 *   1. Telegram  -> chat with @Khalid_4mubarek (needs TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID env vars)
 *   2. Email     -> khalidmubarek99@gmail.com   (needs RESEND_API_KEY env var, free tier)
 *
 * Configure in Vercel → Project → Settings → Environment Variables.
 */

const EMAIL_TO = 'khalidmubarek99@gmail.com'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { name = '', email = '', subject = '', message = '' } = req.body || {}

  if (!name.trim() || !message.trim()) {
    return res.status(400).json({ ok: false, error: 'Name and message are required' })
  }

  const text = [
    '🎬 New message from khalidscut',
    '────────────────────────',
    `👤 Name: ${name}`,
    `✉️  Email: ${email}`,
    `📋 Subject: ${subject || '—'}`,
    '',
    message,
  ].join('\n')

  const results = await Promise.allSettled([sendToTelegram(text), sendToEmail(name, email, subject, message)])
  const sentAny = results.some((r) => r.status === 'fulfilled' && r.value)

  if (!sentAny) {
    return res.status(502).json({ ok: false, error: 'No delivery channel configured' })
  }

  return res.status(200).json({ ok: true })
}

async function sendToTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return false

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
    return res.ok
  } catch {
    return false
  }
}

async function sendToEmail(name, email, subject, message) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [EMAIL_TO],
        reply_to: email || undefined,
        subject: `Portfolio contact: ${subject || name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    })
    return res.ok
  } catch {
    return false
  }
}
