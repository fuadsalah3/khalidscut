'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoEmbedProps {
  videoId: string
  title: string
  className?: string
}

/**
 * Custom-styled YouTube embed. Uses youtube-nocookie with the brand-free
 * player (controls=0, modestbranding, no share/upload chips) and a custom
 * poster layer, so it reads as part of the portfolio rather than YouTube.
 * Click the poster to load and autoplay the iframe (keeps page load fast).
 */
export function VideoEmbed({ videoId, title, className }: VideoEmbedProps) {
  const [active, setActive] = useState(false)

  return (
    <div className={cn('group/video relative aspect-video w-full overflow-hidden bg-raised', className)}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&iv_load_policy=3&playsinline=1&color=white`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          {/* Custom poster layer — hqdefault always exists (maxres 404s on some videos) */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 group-hover/video:scale-[1.03] group-hover/video:opacity-100"
          />
          {/* Readability + brand tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/20 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 bg-flame/0 transition-colors duration-500 group-hover/video:bg-flame/10" aria-hidden="true" />

          {/* Center play button */}
          <span
            className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-flame/50 bg-base/70 text-flame backdrop-blur-md transition-all duration-500 group-hover/video:scale-110 group-hover/video:bg-flame group-hover/video:text-on-flame"
            aria-hidden="true"
          >
            <Play className="ml-0.5 h-6 w-6 fill-current" />
          </span>

          {/* Bottom-left "showreel" chip instead of YouTube branding */}
          <span className="absolute bottom-3.5 left-3.5 flex items-center gap-2 rounded-lg border border-line bg-base/80 px-3 py-1.5 backdrop-blur-md" aria-hidden="true">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-flame" />
            <span className="font-mono text-[11px] tracking-[0.18em] text-ink-soft">PLAY SHOWREEL</span>
          </span>
        </button>
      )}
    </div>
  )
}
