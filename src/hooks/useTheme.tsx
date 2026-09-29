import { useEffect, useState, createContext, useContext, ReactNode } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  // Sync with the class applied by the inline script in index.html
  useEffect(() => {
    const current = document.documentElement.classList.contains('light') ? 'light' : 'dark'
    setTheme(current)
  }, [])

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* private mode */
    }
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
