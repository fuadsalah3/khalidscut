'use client'

import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-base text-ink">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
