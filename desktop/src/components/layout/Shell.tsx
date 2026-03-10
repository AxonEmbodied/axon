import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { NeuralBackground } from '@/components/shared/NeuralBackground'
import { useThemeSync } from '@/hooks/useThemeSync'
import { useDataRefresh } from '@/hooks/useDataRefresh'

export function Shell({ children }: { children: ReactNode }) {
  useThemeSync()
  useDataRefresh()

  return (
    <div className="flex h-screen overflow-hidden">
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-ax-base relative" role="main" aria-label="Main content" id="main-content">
        <NeuralBackground />
        <div className="relative max-w-3xl mx-auto px-8 py-10 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  )
}
