import type { Project, Skill, Experience, SocialLink, ContactInfo, Stats, NavItem } from './types'

export const navItems: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const stats: Stats[] = [
  { label: 'Years Experience', value: '4', suffix: '+' },
  { label: 'Projects Delivered', value: '50', suffix: '+' },
  { label: 'Happy Clients', value: '30', suffix: '+' },
  { label: 'Social Reach', value: '2', suffix: 'M+' },
]

export const skills: Skill[] = [
  // Video Editing
  { id: 'premiere', name: 'Adobe Premiere Pro', category: 'editing', proficiency: 95, icon: 'film', description: 'Advanced timeline editing, multicam, proxy workflows' },
  { id: 'after-effects', name: 'Adobe After Effects', category: 'motion', proficiency: 90, icon: 'square-mouse-pointer', description: 'Motion graphics, VFX, expressions, templating' },
  { id: 'davinci', name: 'DaVinci Resolve', category: 'color', proficiency: 88, icon: 'palette', description: 'Professional color grading, Fusion, Fairlight audio' },
  { id: 'capcut', name: 'CapCut Pro', category: 'editing', proficiency: 85, icon: 'scissors-line-dashed', description: 'Short-form content, trending effects, templates' },
  // Motion & Design
  { id: 'photoshop', name: 'Adobe Photoshop', category: 'creative', proficiency: 92, icon: 'image', description: 'Retouching, compositing, matte painting, thumbnails' },
  { id: 'illustrator', name: 'Adobe Illustrator', category: 'creative', proficiency: 85, icon: 'pen-tool', description: 'Vector graphics, logos, motion design assets' },
  { id: 'cinema4d', name: 'Cinema 4D Lite', category: 'motion', proficiency: 70, icon: 'box', description: '3D motion graphics integration with After Effects' },
  // Social Media
  { id: 'content-strategy', name: 'Content Strategy', category: 'social', proficiency: 90, icon: 'target', description: 'Viral content frameworks, audience growth, monetization' },
  { id: 'social-analytics', name: 'Analytics & Growth', category: 'social', proficiency: 85, icon: 'bar-chart-3', description: 'Data-driven optimization, A/B testing, ROI tracking' },
  { id: 'platform-management', name: 'Multi-Platform Management', category: 'social', proficiency: 92, icon: 'layout-grid', description: 'Instagram, TikTok, YouTube, LinkedIn, Twitter/X' },
  { id: 'community-building', name: 'Community Building', category: 'social', proficiency: 88, icon: 'users', description: 'Engagement strategies, brand loyalty, UGC campaigns' },
  // Creative & Technical
  { id: 'cinematography', name: 'Cinematography', category: 'creative', proficiency: 85, icon: 'video', description: 'Camera operation, lighting, composition, visual storytelling' },
  { id: 'directing', name: 'Directing', category: 'creative', proficiency: 80, icon: 'clapperboard', description: 'Creative direction, talent management, shot planning' },
  { id: 'scriptwriting', name: 'Script Writing', category: 'creative', proficiency: 82, icon: 'file-text', description: 'Commercial scripts, documentary narratives, social hooks' },
  { id: 'photography', name: 'Photography', category: 'creative', proficiency: 80, icon: 'camera', description: 'Portrait, product, event, behind-the-scenes' },
  { id: 'sound-design', name: 'Sound Design', category: 'technical', proficiency: 75, icon: 'music', description: 'Audio mixing, SFX, music licensing, voiceover direction' },
  { id: 'live-streaming', name: 'Live Streaming', category: 'technical', proficiency: 70, icon: 'broadcast', description: 'OBS, StreamYard, multi-camera live production' },
]

export const projects: Project[] = [
  {
    id: 'nejashi-tv',
    title: 'Nejashi TV - Broadcast Identity',
    client: 'Nejashi TV',
    category: 'Broadcast Design',
    description: 'Complete visual identity package for a major television network including lower thirds, transitions, bumpers, and show packaging. Delivered 200+ motion assets in 6 weeks.',
    thumbnail: '/projects/nejashi-tv.jpg',
    images: [
      '/projects/nejashi-tv-1.jpg',
      '/projects/nejashi-tv-2.jpg',
      '/projects/nejashi-tv-3.jpg',
    ],
    tags: ['Broadcast', 'Motion Graphics', 'After Effects', 'Cinema 4D', 'Brand Identity'],
    videoId: 'eRsGyueVLvQ',
    role: 'Lead Motion Designer & Video Editor',
    year: 2024,
    featured: true,
  },
  {
    id: 'shadow-battery',
    title: 'Shadow Battery - Product Launch Campaign',
    client: 'Shadow Battery',
    category: 'Commercial',
    description: 'High-energy product launch campaign featuring 3D product visualization, kinetic typography, and multi-platform deliverables. Generated 500K+ views in first week.',
    thumbnail: '/projects/shadow-battery.jpg',
    images: [
      '/projects/shadow-battery-1.jpg',
      '/projects/shadow-battery-2.jpg',
    ],
    tags: ['Product Launch', '3D Animation', 'Commercial', 'Social Media', 'Sound Design'],
    videoId: 'aqz-KE-bpKQ',
    role: 'Video Editor & Motion Designer',
    year: 2024,
    featured: true,
  },
  {
    id: 'lawyer-addiss',
    title: 'Lawyer Addiss Mohammed - Personal Brand',
    client: 'Lawyer Addiss Mohammed',
    category: 'Personal Branding',
    description: 'Built complete personal brand video strategy including educational series, client testimonials, and short-form content. Increased consultation requests by 300%.',
    thumbnail: '/projects/lawyer-addiss.jpg',
    images: [
      '/projects/lawyer-addiss-1.jpg',
      '/projects/lawyer-addiss-2.jpg',
    ],
    tags: ['Personal Brand', 'Educational Content', 'Short-form', 'YouTube', 'LinkedIn'],
    videoId: 'R6MlUcmOul8',
    role: 'Video Editor & Social Media Strategist',
    year: 2023,
    featured: true,
  },
  {
    id: 'misoso-academy',
    title: 'Misoso Academy - Course Platform',
    client: 'Misoso Academy',
    category: 'Educational',
    description: 'Produced 50+ hours of premium course content including motion graphics explainers, screen recordings, and interactive elements. Platform launched with 2000+ students.',
    thumbnail: '/projects/misoso-academy.jpg',
    images: [
      '/projects/misoso-1.jpg',
      '/projects/misoso-2.jpg',
    ],
    tags: ['Educational', 'Course Production', 'Motion Graphics', 'Screen Recording', 'LMS'],
    videoId: 'TLkA0RELQ1g',
    role: 'Senior Video Editor & Producer',
    year: 2023,
    featured: true,
  },
  {
    id: 'dana-production',
    title: 'Dana Production - Documentary Series',
    client: 'Dana Production',
    category: 'Documentary',
    description: 'Edited 6-episode documentary series with complex narrative structure, archival footage integration, and multilingual subtitles. Selected for international film festival.',
    thumbnail: '/projects/dana-production.jpg',
    images: [
      '/projects/dana-1.jpg',
      '/projects/dana-2.jpg',
      '/projects/dana-3.jpg',
    ],
    tags: ['Documentary', 'Long-form', 'Color Grading', 'Subtitling', 'Festival'],
    videoId: '1La4QzGeaaQ',
    role: 'Senior Video Editor & Colorist',
    year: 2022,
    featured: true,
  },
  {
    id: 'togt-travel',
    title: 'TOGT Tour & Travel - Destination Campaigns',
    client: 'TOGT Tour & Travel',
    category: 'Travel & Tourism',
    description: 'Created seasonal destination campaigns for 10+ locations combining drone cinematography, cultural storytelling, and conversion-focused CTAs. Boosted bookings 45%.',
    thumbnail: '/projects/togt-travel.jpg',
    images: [
      '/projects/togt-1.jpg',
      '/projects/togt-2.jpg',
      '/projects/togt-3.jpg',
    ],
    tags: ['Travel', 'Drone Cinematography', 'Campaign', 'Instagram Reels', 'TikTok'],
    videoId: 'WhWc3b3KhnY',
    role: 'Video Editor & Content Strategist',
    year: 2022,
    featured: false,
  },
]

export const experiences: Experience[] = [
  {
    id: 'freelance-current',
    company: 'Freelance / Agency Partner',
    role: 'Senior Video Editor & Social Media Strategist',
    period: '2022 - Present',
    location: 'Addis Ababa, Ethiopia (Remote Global)',
    description: 'Leading video production and social media strategy for diverse clients across broadcast, corporate, and creator economies. Managing end-to-end production from concept to distribution.',
    achievements: [
      'Delivered 50+ projects across broadcast, commercial, and social media',
      'Grew client social accounts from 0 to 2M+ combined followers',
      'Reduced production turnaround by 40% through optimized workflows',
      'Won "Best Editor" award at Addis Film Festival 2023',
    ],
    technologies: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop', 'Illustrator', 'CapCut', 'Notion', 'Frame.io'],
    type: 'freelance',
  },
  {
    id: 'nejashi-tv-exp',
    company: 'Nejashi TV',
    role: 'Senior Video Editor & Motion Designer',
    period: '2021 - 2022',
    location: 'Addis Ababa, Ethiopia',
    description: 'Led post-production for prime-time shows and network branding. Collaborated with creative directors to establish visual standards.',
    achievements: [
      'Designed and animated complete network rebrand (200+ assets)',
      'Edited daily 2-hour live broadcast with 4-camera setup',
      'Mentored 3 junior editors on advanced Premiere/After Effects workflows',
    ],
    technologies: ['Premiere Pro', 'After Effects', 'Cinema 4D', 'DaVinci Resolve', 'Vizrt'],
    type: 'full-time',
  },
  {
    id: 'dana-production-exp',
    company: 'Dana Production',
    role: 'Video Editor & Assistant Director',
    period: '2020 - 2021',
    location: 'Addis Ababa, Ethiopia',
    description: 'Worked on documentary and commercial productions. Gained hands-on experience in on-set production and post-production pipeline.',
    achievements: [
      'Edited award-winning 6-episode documentary series',
      'Managed post-production for 10+ commercial projects',
      'Developed efficient proxy workflow for 4K/6K footage',
    ],
    technologies: ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Final Cut Pro'],
    type: 'full-time',
  },
]

export const socialLinks: SocialLink[] = [
  { platform: 'Instagram', url: 'https://instagram.com/khalidmubarek', icon: 'instagram', label: 'Follow on Instagram' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/khalidmubarek', icon: 'linkedin', label: 'Connect on LinkedIn' },
  { platform: 'YouTube', url: 'https://youtube.com/@khalidmubarek', icon: 'youtube', label: 'Subscribe on YouTube' },
  { platform: 'TikTok', url: 'https://tiktok.com/@khalidmubarek', icon: 'music', label: 'Follow on TikTok' },
  { platform: 'Twitter', url: 'https://twitter.com/khalidmubarek', icon: 'twitter', label: 'Follow on Twitter' },
  { platform: 'Behance', url: 'https://behance.net/khalidmubarek', icon: 'behance', label: 'View on Behance' },
]

export const contactInfo: ContactInfo = {
  email: 'kalamubarek1@gmail.com',
  phone: ['+251 97 912 3265', '+251 97 628 2424'],
  location: 'Addis Ababa, Ethiopia',
  socialLinks,
}

export const bio = `Senior Video Editor & Social Media Strategist with 4+ years of experience crafting compelling visual narratives for broadcast networks, global brands, and high-growth creators. I specialize in transforming raw footage into polished, platform-optimized content that drives engagement and converts viewers into loyal audiences.

My expertise spans the full production pipeline: from pre-production planning and on-set direction through advanced post-production including color grading, motion graphics, and sound design. I combine technical mastery of industry-standard tools with a deep understanding of social algorithms and audience psychology.

Whether it's a 30-second viral Reel, a 6-episode documentary series, or a complete broadcast network rebrand, I bring the same level of craft, creativity, and strategic thinking to every project.`

export const skillCategories = [
  { id: 'editing', label: 'Video Editing', icon: 'film', color: 'luxury-gold' },
  { id: 'motion', label: 'Motion Graphics', icon: 'square-mouse-pointer', color: 'luxury-amber' },
  { id: 'color', label: 'Color Grading', icon: 'palette', color: 'luxury-teal' },
  { id: 'social', label: 'Social Media', icon: 'layout-grid', color: 'luxury-gold' },
  { id: 'creative', label: 'Creative Direction', icon: 'clapperboard', color: 'luxury-amber' },
  { id: 'technical', label: 'Technical', icon: 'cpu', color: 'luxury-teal' },
] as const