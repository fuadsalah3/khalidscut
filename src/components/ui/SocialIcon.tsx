'use client'

import { Instagram, Linkedin, Youtube, Facebook, Send } from 'lucide-react'

/** TikTok isn't in lucide — inline brand path (simple-icons) */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.74-.88-.02 3.23.01 6.45-.02 9.68-.05 1.56-.6 3.16-1.75 4.25-1.29 1.27-3.24 1.79-5.02 1.44-1.74-.34-3.22-1.65-3.87-3.29-.62-1.5-.52-3.26.14-4.72.71-1.52 2.14-2.66 3.78-3.02 1.28-.28 2.63-.11 3.83.5-.01-2.51-.01-5.02 0-7.53-.49-.09-1-.16-1.53-.18.01-.4.01-.8.02-1.2z" />
    </svg>
  )
}

const icons: Record<string, (props: { className?: string }) => React.ReactNode> = {
  instagram: (p) => <Instagram {...p} />,
  telegram: (p) => <Send {...p} />,
  facebook: (p) => <Facebook {...p} />,
  youtube: (p) => <Youtube {...p} />,
  tiktok: (p) => <TikTokIcon {...p} />,
  linkedin: (p) => <Linkedin {...p} />,
}

export function SocialIcon({ id, className }: { id: string; className?: string }) {
  const Icon = icons[id]
  return <>{Icon ? Icon({ className }) : <Instagram {...{ className }} />}</>
}
