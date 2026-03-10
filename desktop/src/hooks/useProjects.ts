import { useEffect } from 'react'
import { useProjectStore } from '@/store/projectStore'
import { useBackend } from '@/providers/DataProvider'

export function useProjects() {
  const { projects, setProjects, activeProject, setActiveProject, loading, error, setError } = useProjectStore()
  const backend = useBackend()

  useEffect(() => {
    backend.getProjects()
      .then((data) => {
        setProjects(data)
        // Auto-select first active project if none selected
        if (!activeProject && data.length > 0) {
          const first = data.find(p => p.status === 'active') || data[0]
          setActiveProject(first.name)
        }
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Failed to load projects')
      })
  }, [])

  return { projects, activeProject, setActiveProject, loading, error }
}
