'use client'

import { Clapperboard, Mail, MapPin, ArrowUpRight, Lock } from 'lucide-react'
import { useSiteData } from '@/lib/store'
import { CONTACT_EMAIL } from '@/lib/content'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { Button } from '@/components/ui/Button'
import { navItems } from '@/lib/data'

export function Footer() {
  const year = new Date().getFullYear()
  const { socials } = useSiteData()

  return (
    <footer className="relative border-t border-line bg-base">
      <div className="u-container py-16 md:py-20">
        {/* Top row */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <a href="#home" className="flex items-center gap-3" aria-label="Khalid Mubarek - Home">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-flame text-on-flame">
                <Clapperboard className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-base font-bold tracking-tight text-ink md:text-lg">
                KHALID<span className="text-flame">.</span>MUBAREK
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
              Senior video editor & social media strategist crafting visual stories that captivate,
              engage, and convert. 4+ years turning raw footage into award-winning content.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-flame/50 hover:text-flame"
                  aria-label={social.label}
                >
                  <SocialIcon id={social.id} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-2">
            <h3 className="mono-tag mb-5">Menu</h3>
            <ul className="space-y-2.5" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-ink-soft transition-colors hover:text-flame">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="mono-tag mb-5">Services</h3>
            <ul className="space-y-2.5" role="list">
              {['Video Editing', 'Motion Graphics', 'Color Grading', 'Social Strategy', 'Sound Design'].map(
                (service) => (
                  <li key={service} className="flex items-center gap-2 text-sm text-ink-soft">
                    <span className="h-px w-3 bg-flame/60" aria-hidden="true" />
                    {service}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="mono-tag mb-5">Contact</h3>
            <address className="space-y-3 not-italic">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-flame"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{CONTACT_EMAIL}</span>
              </a>
              <a
                href="https://t.me/Khalid_4mubarek"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-flame"
              >
                <SocialIcon id="telegram" className="h-4 w-4 shrink-0" />
                @Khalid_4mubarek
              </a>
              <div className="flex items-center gap-3 text-sm text-ink-soft">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                Addis Ababa, Ethiopia
              </div>
            </address>
            <Button size="sm" className="mt-6" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start a project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Timecode divider */}
        <div className="mt-14 flex items-center gap-4" aria-hidden="true">
          <span className="mono-tag shrink-0">TC 00:00:00:00</span>
          <div className="rail-ticks h-4 flex-1 opacity-60" />
          <span className="mono-tag shrink-0">END OF REEL</span>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-ink-faint md:flex-row">
          <p>© {year} Khalid Mubarek. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Cut with <span className="text-flame">♥</span> in Addis Ababa
          </p>
          <a
            href="#/login"
            className="flex items-center gap-1.5 text-ink-faint transition-colors hover:text-flame"
            aria-label="Admin login"
          >
            <Lock className="h-3 w-3" aria-hidden="true" />
            Log in
          </a>
        </div>
      </div>
    </footer>
  )
}
