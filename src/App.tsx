'use client'

import { ThemeProvider } from '@/hooks/useTheme'
import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Work } from '@/components/sections/Work'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Contact />
      </Layout>
    </ThemeProvider>
  )
}