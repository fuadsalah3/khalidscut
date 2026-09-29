'use client'

import { motion } from 'framer-motion'
import { Briefcase, Award, Star, MapPin, Calendar, CheckCircle, Building2, Zap, Target } from 'lucide-react'
import { experiences } from '@/lib/data'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

const typeIcons = {
  'full-time': Building2,
  freelance: Zap,
  project: Target,
}

const typeLabels = {
  'full-time': 'Full-time',
  freelance: 'Freelance',
  project: 'Project-based',
}

const ease = [0.16, 1, 0.3, 1] as const

export function Experience() {
  return (
    <section id="experience" className="u-section relative bg-panel/40" aria-labelledby="experience-title">
      <div className="u-container">
        <SectionHeader
          index="04"
          eyebrow="Experience"
          title={
            <>
              The professional <span className="text-gradient-flame">journey.</span>
            </>
          }
          description="From broadcast control rooms to global creator economies — four years of shipping work that performs on every screen."
        />

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute bottom-0 left-[7px] top-0 w-px bg-gradient-to-b from-transparent via-line-strong to-transparent md:left-[9px]"
            aria-hidden="true"
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => {
              const TypeIcon = typeIcons[exp.type]
              return (
                <motion.article
                  key={exp.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease }}
                  className="relative pl-10 md:pl-14"
                >
                  {/* Node */}
                  <span
                    className="absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-flame bg-base md:h-[19px] md:w-[19px]"
                    aria-hidden="true"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-flame" />
                  </span>

                  <div className="panel panel-hover p-6 md:p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <Badge variant="accent">
                        <TypeIcon className="h-3 w-3" aria-hidden="true" />
                        {typeLabels[exp.type]}
                      </Badge>
                      <Badge variant="outline">
                        <Calendar className="h-3 w-3" aria-hidden="true" />
                        {exp.period}
                      </Badge>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-ink md:text-xl">{exp.role}</h3>
                    <p className="mt-1 font-medium text-flame">{exp.company}</p>

                    <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-faint">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {exp.location}
                    </p>

                    <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mt-6">
                      <h4 className="mono-tag mb-3 flex items-center gap-2">
                        <Award className="h-3.5 w-3.5 text-flame" aria-hidden="true" />
                        Key achievements
                      </h4>
                      <ul className="space-y-2.5" role="list">
                        {exp.achievements.map((achievement) => (
                          <li key={achievement} className="flex items-start gap-3 text-sm text-ink-soft">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-flame" aria-hidden="true" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech */}
                    <div className="mt-6 border-t border-line pt-5">
                      <h4 className="mono-tag mb-3 flex items-center gap-2">
                        <Star className="h-3.5 w-3.5 text-flame" aria-hidden="true" />
                        Tools
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="rounded border border-line px-2 py-0.5 text-[11px] text-ink-soft">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          {/* Available now card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="relative mt-10 pl-10 md:pl-14"
          >
            <span
              className="absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-mint bg-base md:h-[19px] md:w-[19px]"
              aria-hidden="true"
            >
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-mint" />
            </span>

            <div className={cn('rounded-2xl border border-mint/30 bg-mint/5 p-6 md:p-8')}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint text-base">
                  <Zap className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">Currently available</h3>
                  <p className="text-sm text-mint">Open for freelance & contract work worldwide</p>
                </div>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Based in Addis Ababa, collaborating globally. Specializing in high-end editing, motion
                graphics, color grading and social strategy that drives measurable results.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:kalamubarek1@gmail.com"
                  className="btn bg-mint px-6 py-3 text-base hover:bg-mint-deep"
                >
                  Start a project
                </a>
                <a
                  href="https://linkedin.com/in/khalidmubarek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-6 py-3 hover:border-mint/60 hover:text-mint"
                >
                  <Briefcase className="h-4 w-4" aria-hidden="true" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
