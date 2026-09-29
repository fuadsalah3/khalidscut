'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, User, ArrowLeft, AlertCircle, Clapperboard } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createSession } from './auth'

/* Credentials are checked client-side by design — this dashboard can only
 * edit content that is already public on the site, and the gate exists to
 * keep visitors out rather than to protect secrets. */
const ADMIN_USER = 'khalidedit79@okra.com'
const ADMIN_PASS = 'Kalam1'

export function Login({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim().toLowerCase() === ADMIN_USER && password === ADMIN_PASS) {
      createSession()
      onSuccess()
    } else {
      setError('Incorrect username or password')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base px-5 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, x: shake ? [0, -8, 8, -6, 6, 0] : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="panel w-full max-w-md p-8"
      >
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-flame text-on-flame">
            <Clapperboard className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="display-title text-2xl">Studio Access</h1>
          <p className="mono-tag mt-2">Sign in to manage content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-[38px] h-4 w-4 text-ink-faint" aria-hidden="true" />
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError(null)
              }}
              placeholder="you@example.com"
              autoComplete="username"
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-[38px] h-4 w-4 text-ink-faint" aria-hidden="true" />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(null)
              }}
              placeholder="••••••••"
              autoComplete="current-password"
              className="pl-10"
            />
          </div>

          {error && (
            <p className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500" role="alert">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full">
            <Lock className="h-4 w-4" aria-hidden="true" />
            Sign in
          </Button>
        </form>

        <a
          href="#home"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-faint transition-colors hover:text-flame"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to site
        </a>
      </motion.div>
    </div>
  )
}
