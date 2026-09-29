'use client'

import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  variant?: 'default' | 'gradient' | 'dashed'
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-line-strong',
      gradient: 'bg-gradient-to-r from-transparent via-line-strong to-transparent',
      dashed: 'border-t border-dashed border-line-strong',
    }

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={orientation}
        className={cn(
          'shrink-0',
          orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Separator.displayName = 'Separator'

export const SectionDivider = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div className={cn('relative my-12 flex items-center gap-4', className)}>
    <Separator variant="gradient" className="flex-1" />
    {children && (
      <span className="mono-tag relative z-10">{children}</span>
    )}
    <Separator variant="gradient" className="flex-1" />
  </div>
)
