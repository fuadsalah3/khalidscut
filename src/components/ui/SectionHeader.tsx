'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: 'center' | 'left'
  index?: string
  className?: string
}

export function SectionHeader({ eyebrow, title, description, align = 'center', index, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn('mb-14 md:mb-20', align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', className)}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="chip mb-5 border-flame/40 text-flame"
      >
        <Sparkles className="h-3 w-3" aria-hidden="true" />
        {index && <span className="text-ink-faint">{index}</span>}
        {eyebrow}
      </motion.span>
      <h2 className="display-title text-3xl leading-[1.1] sm:text-4xl md:text-5xl">{title}</h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-5 text-[15px] leading-relaxed text-ink-soft md:text-base"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
