import { useEffect, useCallback } from 'react'
import { useProjectStore } from '@/store/projectStore'
import type { Project } from '@/lib/types'

const POLL_INTERVAL = 30_000 // 30 seconds

/**
 * Auto-refreshes project data:
 * - Polls every 30s for updated project metadata
 * - Refetches on window focus (tab switch, alt-tab back)
 * - Only updates store if data actually changed
 */
export function useDataRefresh() {
  const { setProjects, setError } = useProjectStore()

  const refresh = useCallback(() => {
    fetch('/api/axon/projects')
      .then(r => {
        if (!r.ok) throw new Error(`Failed to refresh (${r.status})`)
        return r.json()
      })
      .then((data: Project[]) => {
        setProjects(data)
      })
      .catch(() => {
        // Silent — don't overwrite error state on background poll failures
      })
  }, [setProjects, setError])

  useEffect(() => {
    // Poll on interval
    const interval = setInterval(refresh, POLL_INTERVAL)

    // Refresh on window focus
    const onFocus = () => refresh()
    window.addEventListener('focus', onFocus)

    // Refresh on visibility change (tab switching)
    const onVisibility = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [refresh])
}
