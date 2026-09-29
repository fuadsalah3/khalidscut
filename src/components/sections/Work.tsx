'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ArrowUpRight, Tv, Clapperboard, Image as ImageIcon, Youtube, Film, Globe } from 'lucide-react'
import { projects } from '@/lib/data'
import { Badge } from '@/components/ui/Badge'
import { VideoEmbed } from '@/components/ui/VideoEmbed'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

const categoryIcons: Record<string, React.ReactNode> = {
  'Broadcast Design': <Tv className="h-3 w-3" />,
  Commercial: <Clapperboard className="h-3 w-3" />,
  'Personal Branding': <ImageIcon className="h-3 w-3" />,
  Educational: <Youtube className="h-3 w-3" />,
  Documentary: <Film className="h-3 w-3" />,
  'Travel & Tourism': <Globe className="h-3 w-3" />,
}

const ease = [0.16, 1, 0.3, 1] as const

export function Work() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))]
  const filteredProjects =
    activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="work" className="u-section relative bg-panel/40" aria-labelledby="work-title">
      <div className="u-container">
        <SectionHeader
          index="02"
          eyebrow="Selected work"
          title={
            <>
              Projects that <span className="text-gradient-flame">speak volumes.</span>
            </>
          }
          description="Broadcast identities, launch campaigns, documentaries and short-form — a curated cut of client work across six years of screens."
        />

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Project categories"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              className={cn(
                'rounded-full border px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-all duration-300',
                activeCategory === cat
                  ? 'border-flame bg-flame text-on-flame'
                  : 'border-line text-ink-soft hover:border-flame/50 hover:text-flame'
              )}
            >
              {cat === 'all' ? 'All work' : cat}
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
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            role="tabpanel"
          >
            {filteredProjects.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.55, ease }}
                className="group panel panel-hover cursor-pointer overflow-hidden"
                tabIndex={0}
              >
                {/* Thumb — real video embed when available, styled poster otherwise */}
                {project.videoId ? (
                  <VideoEmbed videoId={project.videoId} title={project.title} />
                ) : (
                  <div className="relative aspect-video overflow-hidden bg-raised">
                    <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-flame/40 bg-flame/10 text-flame transition-all duration-500 group-hover:scale-110 group-hover:bg-flame group-hover:text-on-flame">
                        <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
                      </span>
                    </div>
                    <span className="absolute bottom-3.5 left-3.5 font-mono text-[11px] text-ink-faint">
                      {project.year}
                    </span>
                  </div>
                )}

                {/* Body */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-flame">
                        {project.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-ink-soft">{project.client}</p>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-flame" aria-hidden="true" />
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded border border-line px-2 py-0.5 text-[11px] text-ink-soft">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="rounded border border-line px-2 py-0.5 text-[11px] text-ink-faint">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Category / featured overlays */}
                <div className="pointer-events-none absolute left-3.5 top-3.5 z-10">
                  <Badge variant="default">
                    {categoryIcons[project.category]}
                    {project.category}
                  </Badge>
                </div>
                {project.featured && (
                  <div className="pointer-events-none absolute right-3.5 top-3.5 z-10">
                    <Badge variant="accent">Featured</Badge>
                  </div>
                )}
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
