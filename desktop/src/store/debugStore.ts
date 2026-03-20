import { create } from 'zustand'

export interface DebugAction {
  id: string
  label: string
  active: boolean
  toggle: () => void
}

interface DebugStore {
  actions: Map<string, DebugAction>
  screenshotMode: boolean
  hiddenProjects: Set<string>
  register: (action: DebugAction) => void
  unregister: (id: string) => void
  isActive: (id: string) => boolean
  toggleScreenshotMode: () => void
  toggleHiddenProject: (name: string) => void
}

/** Check if a project is hidden in screenshot mode */
export function isProjectHidden(name: string, hiddenSet: Set<string>): boolean {
  return hiddenSet.has(name)
}

export const useDebugStore = create<DebugStore>((set, get) => ({
  actions: new Map(),
  screenshotMode: false,
  hiddenProjects: new Set(),
  register: (action) => set((s) => {
    const next = new Map(s.actions)
    next.set(action.id, action)
    return { actions: next }
  }),
  unregister: (id) => set((s) => {
    const next = new Map(s.actions)
    next.delete(id)
    return { actions: next }
  }),
  isActive: (id) => get().actions.get(id)?.active ?? false,
  toggleScreenshotMode: () => set(s => {
    if (s.screenshotMode) return { screenshotMode: false, hiddenProjects: new Set() }
    return { screenshotMode: !s.screenshotMode }
  }),
  toggleHiddenProject: (name) => set(s => {
    const next = new Set(s.hiddenProjects)
    if (next.has(name)) next.delete(name); else next.add(name)
    return { hiddenProjects: next }
  }),
}))
