'use client'

import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'mint' | 'outline'
  size?: 'sm' | 'md'
  dot?: boolean
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot = false, children, ...props }, ref) => {
    const variants = {
      default: 'border-line-strong bg-raised text-ink-soft',
      accent: 'border-flame/40 bg-flame/10 text-flame',
      mint: 'border-mint/40 bg-mint/10 text-mint',
      outline: 'border-line-strong bg-transparent text-ink-soft',
    }

    const sizes = {
      sm: 'px-2.5 py-0.5 text-[10px]',
      md: 'px-3 py-1 text-[11px]',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border font-mono font-medium uppercase tracking-[0.12em] transition-colors duration-300',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && <span className="h-1.5 w-1.5 animate-blink rounded-full bg-current" aria-hidden="true" />}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
