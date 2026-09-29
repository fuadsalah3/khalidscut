'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useSiteData } from '@/lib/store'
import { stats } from '@/lib/data'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

const NODE_COLORS = ['#ff6a2e', '#e2570e', '#2dd4bf', '#f4f1ea']

export function Hero({ className }: { className?: string }) {
  const { heroImage } = useSiteData()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const rafRef = useRef<number>(0)

  const { scrollY } = useScroll()

  /*
   * Fade timing must track the hero's actual height — a fixed pixel range fades
   * too fast on short/mobile viewports where the hero is ~1.4x taller than the
   * screen. Measure the hero and remap the animation range on resize.
   */
  const sectionRef = useRef<HTMLElement>(null)
  const [fadeRange, setFadeRange] = useState(600)

  useEffect(() => {
    const measure = () => {
      const h = sectionRef.current?.offsetHeight ?? 0
      // Start fading at 25% scrolled, fully gone just before the hero leaves view
      if (h > 0) setFadeRange(Math.max(320, Math.round(h * 0.9)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const contentY = useTransform(scrollY, [0, fadeRange], [0, fadeRange * 0.16])
  const contentOpacity = useTransform(scrollY, [0, fadeRange * 0.28, fadeRange], [1, 1, 0])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let resizeTimer: ReturnType<typeof setTimeout>

    const initNodes = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = parent.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(90, Math.floor((width * height) / 14000))
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.6,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
      }))
    }

    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const nodes = nodesRef.current
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, width, height)

      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        if (node.x <= node.radius || node.x >= width - node.radius) node.vx *= -1
        if (node.y <= node.radius || node.y >= height - node.radius) node.vy *= -1
        node.x = Math.max(node.radius, Math.min(width - node.radius, node.x))
        node.y = Math.max(node.radius, Math.min(height - node.radius, node.y))

        if (mouse.active) {
          const dx = mouse.x - node.x
          const dy = mouse.y - node.y
          const dist = Math.hypot(dx, dy)
          if (dist < 160 && dist > 0.01) {
            const force = ((160 - dist) / 160) * 0.06
            node.vx -= (dx / dist) * force
            node.vy -= (dy / dist) * force
          }
        }

        const speed = Math.hypot(node.vx, node.vy)
        if (speed > 1.4) {
          node.vx *= 0.96
          node.vy *= 0.96
        }
      }

      // Connections — sparse constellation
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(255, 106, 46, ${(1 - dist / 110) * 0.07})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.globalAlpha = 0.35
        ctx.fill()
      }
      ctx.globalAlpha = 1

      rafRef.current = requestAnimationFrame(animate)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false }
    }

    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(initNodes, 150)
    }

    initNodes()
    rafRef.current = requestAnimationFrame(animate)
    window.addEventListener('resize', onResize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <section
      ref={sectionRef}
      id="home"
      className={cn('relative flex min-h-screen items-center overflow-hidden', className)}
      aria-labelledby="hero-title"
    >
      {/* Backdrop layers */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="absolute -right-32 -top-32 h-[480px] w-[480px] animate-float rounded-full bg-flame/10 blur-[120px]" />
        <div
          className="absolute -bottom-40 -left-32 h-[480px] w-[480px] animate-float rounded-full bg-mint/10 blur-[120px]"
          style={{ animationDelay: '4s' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-base to-transparent" />
      </div>

      <motion.div
        className="u-container relative z-10 pb-24 pt-32 md:pt-36"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Left — copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <Badge variant="accent" dot>
                Open for projects
              </Badge>
              <span className="mono-tag">Rec · 4K · 24fps</span>
            </motion.div>

            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="display-title text-[13vw] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            >
              Cutting stories
              <br />
              that <span className="text-gradient-flame">stay seen.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
            >
              Khalid Mubarek — senior video editor & social media strategist. I turn raw footage
              into broadcast packages, launch campaigns, and scroll-stopping short-form that
              converts viewers into audiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-9 flex flex-col gap-3.5 sm:flex-row"
            >
              <Button
                size="lg"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                View my work
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Get in touch
              </Button>
            </motion.div>

            {/* Stats rail */}
            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="mt-14 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
              aria-label="Key statistics"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="bg-panel px-4 py-5">
                  <dt className="mono-tag mb-1.5">{stat.label}</dt>
                  <dd className="font-display text-2xl font-bold text-ink md:text-3xl">
                    {stat.value}
                    <span className="text-flame">{stat.suffix}</span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right — portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Corner brackets */}
              <div className="absolute -left-3 -top-3 h-14 w-14 rounded-tl-2xl border-l-2 border-t-2 border-flame/60" aria-hidden="true" />
              <div className="absolute -bottom-3 -right-3 h-14 w-14 rounded-br-2xl border-b-2 border-r-2 border-mint/60" aria-hidden="true" />

              <div className="relative overflow-hidden rounded-2xl border border-line">
                <img
                  src={heroImage}
                  alt="Khalid Mubarek — video editor"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent" aria-hidden="true" />

                {/* Timecode chip */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg border border-line bg-base/80 px-3 py-1.5 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 animate-blink rounded-full bg-red-500" aria-hidden="true" />
                  <span className="font-mono text-[11px] tracking-wider text-ink-soft">REC 00:04:12:07</span>
                </div>

                {/* Spec chip */}
                <div className="absolute right-4 top-4 rounded-lg border border-line bg-base/80 px-3 py-1.5 backdrop-blur-md">
                  <span className="font-mono text-[11px] tracking-wider text-ink-soft">4K · 60fps</span>
                </div>
              </div>

              {/* Floating render bar */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease }}
                className="panel absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 px-4 py-3 shadow-lift backdrop-blur-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="mono-tag">Rendering</span>
                  <span className="font-mono text-[11px] text-flame">86%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-raised">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-flame to-mint"
                    initial={{ width: '0%' }}
                    animate={{ width: '86%' }}
                    transition={{ duration: 1.6, delay: 1.1, ease }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-flame"
        aria-label="Scroll to work section"
      >
        <span className="mono-tag">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </motion.button>
    </section>
  )
}
