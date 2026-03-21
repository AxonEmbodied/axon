import { type ReactNode, useState, useCallback, useEffect, useRef } from 'react'
import { Sidebar } from './Sidebar'
import { MobileTopBar, BottomTabBar } from './MobileNav'
import { NeuralBackground } from '@/components/shared/NeuralBackground'
import { CommandPalette } from '@/components/shared/CommandPalette'
import { useThemeSync } from '@/hooks/useThemeSync'
import { useDataRefresh } from '@/hooks/useDataRefresh'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useProjectStore } from '@/store/projectStore'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { DebugMenu } from '@/components/shared/DebugMenu'

export function Shell({ children }: { children: ReactNode }) {
  useThemeSync()
  useDataRefresh()

  const isMobile = useIsMobile()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const togglePalette = useCallback(() => setPaletteOpen(o => !o), [])
  useKeyboardShortcuts(togglePalette)

  const activeProject = useProjectStore(s => s.activeProject)
  const swipeDirection = useProjectStore(s => s.swipeDirection)
  const [animClass, setAnimClass] = useState('')
  const prevProjectRef = useRef(activeProject)

  useEffect(() => {
    if (activeProject !== prevProjectRef.current && swipeDirection) {
      setAnimClass(
        swipeDirection === 'down' ? 'animate-slide-up-in' :
        swipeDirection === 'up' ? 'animate-slide-down-in' : ''
      )
      const t = setTimeout(() => setAnimClass(''), 450)
      prevProjectRef.current = activeProject
      return () => clearTimeout(t)
    }
    prevProjectRef.current = activeProject
  }, [activeProject, swipeDirection])

  if (isMobile) {
    return (
      <div className="flex flex-col h-[100dvh] overflow-hidden">
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <MobileTopBar onOpenPalette={togglePalette} />
        <main className="flex-1 bg-ax-base relative overflow-hidden" role="main" aria-label="Main content" id="main-content">
          <NeuralBackground />
          <div className={`relative h-full ${animClass}`} key={activeProject || 'none'}>
            {children}
          </div>
        </main>
        <BottomTabBar onOpenPalette={togglePalette} />
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
        <DebugMenu />
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <Sidebar onOpenPalette={togglePalette} />
      <main className="flex-1 bg-ax-base relative h-full overflow-hidden" role="main" aria-label="Main content" id="main-content">
        <div className="absolute top-0 left-0 right-0 h-8 z-50 pointer-events-none" style={{ WebkitAppRegion: 'drag' } as React.CSSProperties} />
        <NeuralBackground />
        <DebugMenu />
        <div className={`relative h-full ${animClass}`} key={activeProject || 'none'}>
          {children}
        </div>
      </main>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}
