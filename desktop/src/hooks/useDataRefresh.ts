import { useEffect, useCallback } from 'react'
import { useProjectStore } from '@/store/projectStore'
import { useBackend } from '@/providers/DataProvider'

const POLL_INTERVAL = 30_000 // 30 seconds

/**
 * Auto-refreshes project data:
 * - Polls every 30s for updated project metadata
 * - Refetches on window focus (tab switch, alt-tab back)
 */
export function useDataRefresh() {
  const { setProjects } = useProjectStore()
  const backend = useBackend()

  const refresh = useCallback(() => {
    backend.getProjects()
      .then((data) => {
        setProjects(data)
      })
      .catch(() => {
        // Silent — don't overwrite error state on background poll failures
      })
  }, [setProjects, backend])

  useEffect(() => {
    const interval = setInterval(refresh, POLL_INTERVAL)

    const onFocus = () => refresh()
    window.addEventListener('focus', onFocus)

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
