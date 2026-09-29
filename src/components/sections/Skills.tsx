'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Film,
  Sparkles,
  Palette,
  LayoutGrid,
  Clapperboard,
  Cpu,
  BarChart3,
  Target,
  Users,
  PenTool,
  Image as ImageIcon,
  Video,
  Camera,
  Music,
  Radio,
  Box,
  ScissorsLineDashed,
  FileText,
} from 'lucide-react'
import { skills, skillCategories } from '@/lib/data'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionDivider } from '@/components/ui/Separator'
import { cn } from '@/lib/utils'

const categoryIcons: Record<string, React.ReactNode> = {
  editing: <Film className="h-4 w-4" />,
  motion: <Sparkles className="h-4 w-4" />,
  color: <Palette className="h-4 w-4" />,
  social: <LayoutGrid className="h-4 w-4" />,
  creative: <Clapperboard className="h-4 w-4" />,
  technical: <Cpu className="h-4 w-4" />,
}

const skillIcons: Record<string, React.ReactNode> = {
  'Adobe Premiere Pro': <Film className="h-4 w-4" />,
  'Adobe After Effects': <Sparkles className="h-4 w-4" />,
  'DaVinci Resolve': <Palette className="h-4 w-4" />,
  'CapCut Pro': <ScissorsLineDashed className="h-4 w-4" />,
  'Adobe Photoshop': <ImageIcon className="h-4 w-4" />,
  'Adobe Illustrator': <PenTool className="h-4 w-4" />,
  'Cinema 4D Lite': <Box className="h-4 w-4" />,
  'Content Strategy': <Target className="h-4 w-4" />,
  'Analytics & Growth': <BarChart3 className="h-4 w-4" />,
  'Multi-Platform Management': <LayoutGrid className="h-4 w-4" />,
  'Community Building': <Users className="h-4 w-4" />,
  Cinematography: <Video className="h-4 w-4" />,
  Directing: <Clapperboard className="h-4 w-4" />,
  'Script Writing': <FileText className="h-4 w-4" />,
  Photography: <Camera className="h-4 w-4" />,
  'Sound Design': <Music className="h-4 w-4" />,
  'Live Streaming': <Radio className="h-4 w-4" />,
}

const ease = [0.16, 1, 0.3, 1] as const

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = ['all', ...skillCategories.map((c) => c.id)]
  const filteredSkills =
    activeCategory === 'all' ? skills : skills.filter((s) => s.category === activeCategory)

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
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              className={cn(
                'flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-all duration-300',
                activeCategory === cat
                  ? 'border-flame bg-flame text-on-flame'
                  : 'border-line text-ink-soft hover:border-flame/50 hover:text-flame'
              )}
            >
              {cat !== 'all' && categoryIcons[cat]}
              {cat === 'all' ? 'All skills' : skillCategories.find((c) => c.id === cat)?.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
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
                    {skillIcons[skill.name] || categoryIcons[skill.category]}
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-semibold leading-tight text-ink">{skill.name}</h3>
                    <span className="mono-tag">{skillCategories.find((c) => c.id === skill.category)?.label}</span>
                  </div>
                  <span className="ml-auto font-mono text-sm font-medium text-flame">{skill.proficiency}%</span>
                </div>

                {skill.description && (
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-ink-soft">{skill.description}</p>
                )}

                {/* Proficiency */}
                <div className="h-1 overflow-hidden rounded-full bg-raised" role="progressbar" aria-valuenow={skill.proficiency} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
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
