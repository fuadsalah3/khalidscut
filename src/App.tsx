import { useEffect, useState } from 'react'
import { ThemeProvider } from '@/hooks/useTheme'
import { SiteDataProvider } from '@/lib/store'
import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Work } from '@/components/sections/Work'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'
import { Login } from '@/admin/Login'
import { Dashboard } from '@/admin/Dashboard'
import { hasSession, destroySession } from '@/admin/auth'

type Route = 'site' | 'login' | 'admin'

function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash())
  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

function parseHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, '')
  if (h === 'login') return 'login'
  if (h === 'admin') return hasSession() ? 'admin' : 'login'
  return 'site'
}

export default function App() {
  const route = useHashRoute()

  // Keep the fixed header/footer out of the standalone admin screens
  if (route === 'login') {
    return (
      <ThemeProvider>
        <SiteDataProvider>
          <Login onSuccess={() => (window.location.hash = '#/admin')} />
        </SiteDataProvider>
      </ThemeProvider>
    )
  }

  if (route === 'admin') {
    return (
      <ThemeProvider>
        <SiteDataProvider>
          <Dashboard onLogout={() => (window.location.hash = '#/login')} />
        </SiteDataProvider>
      </ThemeProvider>
    )
  }

  // Leaving the admin area clears the session for the next visit
  destroySession()

  return (
    <ThemeProvider>
      <SiteDataProvider>
        <Layout>
          <Hero />
          <About />
          <Work />
          <Skills />
          <Experience />
          <Contact />
        </Layout>
      </SiteDataProvider>
    </ThemeProvider>
  )
}
