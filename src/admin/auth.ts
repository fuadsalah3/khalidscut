const SESSION_KEY = 'khalidscut:admin-session'
const SESSION_TTL = 1000 * 60 * 60 * 8 // 8 hours

export function createSession(): void {
  try {
    localStorage.setItem(SESSION_KEY, String(Date.now() + SESSION_TTL))
  } catch {
    /* private mode */
  }
}

export function destroySession(): void {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    /* noop */
  }
}

export function hasSession(): boolean {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return false
    return Number(raw) > Date.now()
  } catch {
    return false
  }
}
