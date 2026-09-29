import { useEffect, useState, createContext, useContext, ReactNode } from 'react'
import {
  defaultBio,
  defaultHeroImage,
  defaultProjects,
  defaultSocials,
  defaultSkills,
  type AdminProject,
  type AdminSocial,
  type AdminSkill,
} from './content'

export interface Overrides {
  bio?: string
  heroImage?: string
  videoLinks?: Record<string, string> // projectId -> full YouTube url or id
  projects?: Record<string, Partial<AdminProject>> // projectId -> field edits
  socials?: AdminSocial[]
  skills?: AdminSkill[]
}

const LS_KEY = 'khalidscut:overrides'
const API_ENDPOINT = '/api/overrides'

/* ------------------------------------------------------------------ */
/* YouTube helpers                                                     */
/* ------------------------------------------------------------------ */

/** Accepts a full YouTube URL (watch, youtu.be, shorts, embed, live) or a raw ID */
export function extractYouTubeId(input: string): string | null {
  if (!input) return null
  const trimmed = input.trim()
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed
  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
    const host = url.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') return url.pathname.slice(1).split('/')[0] || null
    if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      if (url.pathname === '/watch') return url.searchParams.get('v')
      const m = url.pathname.match(/\/(embed|shorts|live|v)\/([\w-]{11})/)
      return m?.[2] ?? null
    }
  } catch {
    /* not a URL */
  }
  const bare = trimmed.match(/[\w-]{11}/)
  return bare?.[0] ?? null
}

/** Any direct image/video URL (used for hero profile image) */
export function isSafeMediaUrl(url: string): boolean {
  return /^https?:\/\//i.test(url) || url.startsWith('/')
}

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

function loadLocal(): Overrides {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? (JSON.parse(raw) as Overrides) : {}
  } catch {
    return {}
  }
}

async function loadRemote(): Promise<Overrides> {
  /* The overrides API only exists on the Vercel deployment. In local dev the
   * request would fail with 404/500 and spam the console, so skip it. */
  if (import.meta.env.DEV) return {}
  try {
    const res = await fetch(`${API_ENDPOINT}?t=${Date.now()}`, { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      return (json.overrides ?? {}) as Overrides
    }
  } catch {
    /* static hosting without API — fine */
  }
  return {}
}

function mergeOverrides(local: Overrides, remote: Overrides): Overrides {
  return {
    bio: remote.bio ?? local.bio,
    heroImage: remote.heroImage ?? local.heroImage,
    videoLinks: { ...local.videoLinks, ...remote.videoLinks },
    projects: { ...local.projects, ...remote.projects },
    socials: remote.socials ?? local.socials,
    skills: remote.skills ?? local.skills,
  }
}

export interface SiteData {
  bio: string
  heroImage: string
  videoLinks: Record<string, string>
  projects: AdminProject[]
  socials: AdminSocial[]
  skills: AdminSkill[]
}

function computeData(o: Overrides): SiteData {
  const projects = defaultProjects.map((p) => {
    const edit = o.projects?.[p.id] ?? {}
    const rawVideo = o.videoLinks?.[p.id] ?? edit.videoUrl ?? p.videoUrl
    return {
      ...p,
      ...edit,
      videoUrl: rawVideo,
      videoId: (rawVideo ? extractYouTubeId(rawVideo) : null) ?? undefined,
    }
  })
  return {
    bio: o.bio ?? defaultBio,
    heroImage: o.heroImage ?? defaultHeroImage,
    videoLinks: o.videoLinks ?? {},
    projects,
    socials: o.socials ?? defaultSocials,
    skills: o.skills ?? defaultSkills,
  }
}

const SiteDataContext = createContext<SiteData>(computeData({}))

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>({})

  useEffect(() => {
    let cancelled = false
    Promise.all([loadLocal(), loadRemote()]).then(([local, remote]) => {
      if (!cancelled) setOverrides(mergeOverrides(local, remote))
    })
    return () => {
      cancelled = true
    }
  }, [])

  const data = computeData(overrides)

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>
}

export function useSiteData(): SiteData {
  return useContext(SiteDataContext)
}

/** True when the current browser has unpublished local edits waiting for deploy */
export function useHasLocalEdits(): boolean {
  try {
    return !!localStorage.getItem(LS_KEY)
  } catch {
    return false
  }
}
