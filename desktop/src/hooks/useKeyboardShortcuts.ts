import { useEffect } from 'react'
import { useUIStore, type ViewId } from '@/store/uiStore'

const CAROUSEL: ViewId[] = ['morning', 'agents', 'timeline']

/**
 * Global keyboard shortcuts:
 * - Cmd+Left/Right: slide between carousel desktops
 * - Cmd+K: toggle command palette
 * - Cmd+1-5: switch views
 */
export function useKeyboardShortcuts(onTogglePalette: () => void) {
  const setView = useUIStore((s) => s.setView)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey

      // Cmd+K: command palette
      if (meta && e.key === 'k') {
        e.preventDefault()
        onTogglePalette()
        return
      }

      // Cmd+Left/Right: slide carousel desktops
      if (meta && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault()
        const active = useUIStore.getState().activeView
        const idx = CAROUSEL.indexOf(active)
        if (idx < 0) return // not on a carousel view
        const next = e.key === 'ArrowLeft' ? idx - 1 : idx + 1
        if (next >= 0 && next < CAROUSEL.length) setView(CAROUSEL[next])
        return
      }

      // Cmd+1-5: switch views
      if (meta && e.key >= '1' && e.key <= '5') {
        e.preventDefault()
        const views: ViewId[] = ['morning', 'agents', 'timeline', 'terminal', 'settings']
        const idx = parseInt(e.key) - 1
        if (views[idx]) setView(views[idx])
        return
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setView, onTogglePalette])
}
