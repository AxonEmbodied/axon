import { create } from 'zustand'
import type { Project } from '@/lib/types'

interface ProjectStore {
  projects: Project[]
  activeProject: string | null
  setProjects: (projects: Project[]) => void
  setActiveProject: (name: string) => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  activeProject: null,
  setProjects: (projects) => set({ projects }),
  setActiveProject: (name) => set({ activeProject: name }),
}))
