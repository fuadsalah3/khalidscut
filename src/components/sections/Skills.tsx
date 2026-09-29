'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Film, Sparkles, Palette, LayoutGrid, Clapperboard, Cpu, Box } from 'lucide-react'
import { useSiteData } from '@/lib/store'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionDivider } from '@/components/ui/Separator'
import { cn } from '@/lib/utils'

const typeIcons: Record<string, React.ReactNode> = {
  'Video Editing': <Film className="h-4 w-4" />,
  'Motion Graphics': <Sparkles className="h-4 w-4" />,
  'Color Grading': <Palette className="h-4 w-4" />,
  'Social Media': <LayoutGrid className="h-4 w-4" />,
  'Creative Direction': <Clapperboard className="h-4 w-4" />,
  'Technical': <Cpu className="h-4 w-4" />,
}

const ease = [0.16, 1, 0.3, 1] as const

export function Skills() {
  const [activeType, setActiveType] = useState<string>('all')
  const { skills } = useSiteData()

  const types = useMemo(() => Array.from(new Set(skills.map((s) => s.type))), [skills])
  const filteredSkills = activeType === 'all' ? skills : skills.filter((s) => s.type === activeType)

  return (
    <section id="skills" className="u-section relative" aria-labelledby="skills-title">
      <div className="u-container">
        <SectionHeader
          index="03"
          eyebrow="Expertise"
          title={
            <>
              Tools & techniques <span className="text-gradient-flame">I master.</span>
            </>
          }
          description="18 skills spanning editorial, motion, color, social strategy and creative direction — sharpened daily on real client work."
        />

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Skill categories"
        >
          {['all', ...types].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveType(cat)}
              role="tab"
              aria-selected={activeType === cat}
              className={cn(
                'flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-all duration-300',
                activeType === cat
                  ? 'border-flame bg-flame text-on-flame'
                  : 'border-line text-ink-soft hover:border-flame/50 hover:text-flame'
              )}
            >
              {cat !== 'all' && typeIcons[cat]}
              {cat === 'all' ? 'All skills' : cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="tabpanel"
          >
            {filteredSkills.map((skill, i) => (
              <motion.article
                key={skill.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.5, ease }}
                className="panel panel-hover p-5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-raised text-flame">
                    {typeIcons[skill.type] || <Sparkles className="h-4 w-4" />}
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-semibold leading-tight text-ink">{skill.name}</h3>
                    <span className="mono-tag">{skill.type}</span>
                  </div>
                  <span className="ml-auto font-mono text-sm font-medium text-flame">{skill.percent}%</span>
                </div>

                {skill.detail && (
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-ink-soft">{skill.detail}</p>
                )}

                {/* Proficiency */}
                <div className="h-1 overflow-hidden rounded-full bg-raised" role="progressbar" aria-valuenow={skill.percent} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 1.1, delay: 0.2 + i * 0.04, ease }}
                    className="h-full rounded-full bg-gradient-to-r from-flame-deep to-flame"
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Currently exploring */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <SectionDivider>Currently exploring</SectionDivider>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: 'Unreal Engine 5', desc: 'Real-time VFX & virtual production', icon: Box },
              { title: 'Houdini', desc: 'Procedural FX & simulations', icon: Sparkles },
              { title: 'AI Video Tools', desc: 'Runway, Pika & Sora workflows', icon: Cpu },
            ].map((item) => (
              <div key={item.title} className="panel panel-hover group p-5">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-mint/40 bg-mint/10 text-mint transition-colors duration-300 group-hover:bg-mint group-hover:text-on-flame">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h4 className="font-display text-[15px] font-semibold text-ink">{item.title}</h4>
                <p className="mt-1 text-sm text-ink-soft">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
