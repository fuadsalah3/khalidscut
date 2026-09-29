'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Clapperboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/data'
import { useTheme } from '@/hooks/useTheme'
import { useScrollProgress } from '@/hooks/useScroll'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const progress = useScrollProgress()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-line bg-base/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      {/* Scroll progress — like an editor's playhead */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-flame via-flame to-mint"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <nav className="u-container" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between md:h-[72px]">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-3" aria-label="Khalid Mubarek - Home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-flame text-on-flame transition-transform duration-500 group-hover:rotate-[15deg]">
              <Clapperboard className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-base font-bold tracking-tight text-ink md:text-lg">
              KHALID<span className="text-flame">.</span>MUBAREK
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-ink-soft transition-colors duration-300 hover:text-flame"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <span className="mono-tag hidden items-center gap-2 lg:flex">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-mint" aria-hidden="true" />
              Available
            </span>
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors duration-300 hover:border-flame/50 hover:text-flame"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                  className="flex"
                >
                  {theme === 'dark' ? <Moon className="h-4 w-4" aria-hidden="true" /> : <Sun className="h-4 w-4" aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:border-flame/50 hover:text-flame md:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-line bg-base/95 backdrop-blur-xl md:hidden"
          >
            <div className="u-container flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-raised hover:text-flame"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
