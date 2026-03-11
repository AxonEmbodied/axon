import { create } from 'zustand'

export interface DebugAction {
  id: string
  label: string
  active: boolean
  toggle: () => void
}

interface DebugStore {
  actions: Map<string, DebugAction>
  register: (action: DebugAction) => void
  unregister: (id: string) => void
  isActive: (id: string) => boolean
}

export const useDebugStore = create<DebugStore>((set, get) => ({
  actions: new Map(),
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
}))
