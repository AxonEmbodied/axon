import { createContext, useContext, type ReactNode } from 'react'
import type { Project, RollupEpisode } from '@/lib/types'

export interface Backend {
  getProjects(): Promise<Project[]>
  getRollups(project: string): Promise<RollupEpisode[]>
  getRollup(project: string, filename: string): Promise<RollupEpisode | null>
  getState(project: string): Promise<string>
  getStream(project: string): Promise<string>
}

const BackendContext = createContext<Backend | null>(null)

export function useBackend(): Backend {
  const ctx = useContext(BackendContext)
  if (!ctx) throw new Error('useBackend must be used within DataProvider')
  return ctx
}

// Mock backend for development without Tauri
function createMockBackend(): Backend {
  return {
    async getProjects() {
      return [
        { name: 'eat-ai-sar-portal', path: '~/Github/eat-ai-org/eat-ai-sar-portal', status: 'active', createdAt: '2026-03-10', lastRollup: '2026-03-10', episodeCount: 2, openLoopCount: 7 },
        { name: 'axon', path: '~/Github/axon-jarvis', status: 'active', createdAt: '2026-03-10', lastRollup: null, episodeCount: 1, openLoopCount: 10 },
      ]
    },
    async getRollups() { return [] },
    async getRollup() { return null },
    async getState() { return '# State\n\nNo state loaded.' },
    async getStream() { return '' },
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const backend = createMockBackend()
  return (
    <BackendContext.Provider value={backend}>
      {children}
    </BackendContext.Provider>
  )
}
