'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Music,
  ArrowUpRight,
} from 'lucide-react'
import { contactInfo, socialLinks } from '@/lib/data'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'

const ease = [0.16, 1, 0.3, 1] as const

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<typeof formData>>({})

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setStatus('submitting')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Replace with a real endpoint in production
    setStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const contactCards = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactInfo.phone[0],
      href: `tel:${contactInfo.phone[0].replace(/\s+/g, '')}`,
    },
    { icon: MapPin, label: 'Location', value: contactInfo.location, href: '#contact' },
  ]

  return (
    <section id="contact" className="u-section relative" aria-labelledby="contact-title">
      <div className="u-container">
        <SectionHeader
          index="05"
          eyebrow="Get in touch"
          title={
            <>
              Let&apos;s create something <span className="text-gradient-flame">amazing.</span>
            </>
          }
          description="A broadcast rebrand, a launch campaign, a documentary series — tell me where you want to go and I'll help you cut the path there."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
            className="space-y-4 lg:col-span-5"
          >
            {contactCards.map((item) => (
              <a key={item.label} href={item.href} className="panel panel-hover group flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-raised text-flame transition-colors duration-300 group-hover:bg-flame group-hover:text-on-flame">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="mono-tag mb-0.5">{item.label}</p>
                  <p className="truncate text-[15px] font-medium text-ink transition-colors group-hover:text-flame">
                    {item.value}
                  </p>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-ink-faint transition-all group-hover:text-flame" aria-hidden="true" />
              </a>
            ))}

            {/* Socials */}
            <div className="panel p-5">
              <span className="mono-tag mb-4 block">Connect socially</span>
              <div className="grid grid-cols-3 gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-line px-3 py-4 text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-flame/40 hover:text-flame"
                  >
                    {getSocialIcon(social.icon)}
                    <span className="text-center text-[11px] font-medium">{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-2xl border border-mint/30 bg-mint/5 p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-2 w-2 animate-blink rounded-full bg-mint" aria-hidden="true" />
                <h3 className="font-display text-[15px] font-semibold text-ink">Available now</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="mint" dot>
                  Open for projects
                </Badge>
                <Badge variant="outline">Remote worldwide</Badge>
                <Badge variant="outline">UTC+3</Badge>
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="lg:col-span-7"
          >
            <Card padding="lg" className="h-full">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid gap-5 md:grid-cols-2">
                  <Input
                    label="Full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    error={errors.name}
                    required
                    autoComplete="name"
                  />
                  <Input
                    label="Email address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    error={errors.email}
                    required
                    autoComplete="email"
                  />
                </div>

                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry, collaboration…"
                  error={errors.subject}
                  required
                />

                <Textarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and budget…"
                  error={errors.message}
                  required
                  minLength={20}
                  rows={5}
                />

                <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-5 sm:flex-row sm:items-center">
                  <p className="flex items-center gap-2 text-sm text-ink-soft">
                    <CheckCircle className="h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                    I typically respond within 24 hours
                  </p>
                  <Button type="submit" loading={status === 'submitting'} className="w-full sm:w-auto">
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle className="h-4 w-4" aria-hidden="true" />
                        Message sent!
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Success */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-start gap-3 rounded-xl border border-mint/30 bg-mint/10 p-4 text-mint"
                      role="alert"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="font-medium">Message sent successfully.</p>
                        <p className="text-sm opacity-80">I&apos;ll get back to you within 24 hours.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-500"
                      role="alert"
                    >
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="font-medium">Something went wrong.</p>
                        <p className="text-sm opacity-80">Please try again or email me directly.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function getSocialIcon(iconName: string) {
  const icons: Record<string, React.ReactNode> = {
    instagram: <Instagram className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    music: <Music className="h-5 w-5" />,
  }
  return icons[iconName] || <Instagram className="h-5 w-5" />
}
