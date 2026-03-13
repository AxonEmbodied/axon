import { useState, useRef, useCallback, useEffect } from 'react'
import { useTerminalStore, type TerminalStatus } from '@/store/terminalStore'

export type { TerminalStatus }

/**
 * Hook that wraps the global terminal store for use in a single component.
 * attach/detach handles the data listener lifecycle.
 * On unmount: detaches listener but does NOT kill the PTY (persistence!).
 * Call `kill()` explicitly to destroy the terminal.
 */
export function useTerminalSession() {
  const [terminalId, setTerminalId] = useState<string | null>(null)
  const terminalIdRef = useRef<string | null>(null)
  const dataHandlerRef = useRef<((data: string) => void) | null>(null)
  const listenerRef = useRef<((data: string) => void) | null>(null)

  const store = useTerminalStore

  // Derive status from global store
  const entry = useTerminalStore(s => terminalId ? s.terminals[terminalId] : undefined)
  const status: TerminalStatus | 'idle' = entry?.status ?? 'idle'
  const exitCode = entry?.exitCode ?? null

  const onData = useCallback((handler: (data: string) => void) => {
    dataHandlerRef.current = handler
    // If already attached, update the listener
    if (terminalIdRef.current && listenerRef.current) {
      store.getState().detach(terminalIdRef.current, listenerRef.current)
    }
    const listener = (data: string) => handler(data)
    listenerRef.current = listener
    if (terminalIdRef.current) {
      store.getState().attach(terminalIdRef.current, listener)
    }
  }, [store])

  const spawn = useCallback(async (project: string, sessionId?: string) => {
    const id = await store.getState().spawn(project, sessionId)
    setTerminalId(id)
    terminalIdRef.current = id
    // Attach listener if one was registered
    if (listenerRef.current) {
      store.getState().attach(id, listenerRef.current)
    }
    return id
  }, [store])

  const sendInput = useCallback((data: string) => {
    const id = terminalIdRef.current
    if (id) store.getState().sendInput(id, data)
  }, [store])

  const sendResize = useCallback((cols: number, rows: number) => {
    const id = terminalIdRef.current
    if (id) store.getState().sendResize(id, cols, rows)
  }, [store])

  const kill = useCallback(() => {
    const id = terminalIdRef.current
    if (id) {
      store.getState().kill(id)
      terminalIdRef.current = null
      setTerminalId(null)
    }
  }, [store])

  // Legacy disconnect = kill (for backward compat with TerminalView)
  const disconnect = kill

  // On unmount: detach listener only, do NOT kill
  useEffect(() => () => {
    const id = terminalIdRef.current
    const listener = listenerRef.current
    if (id && listener) {
      store.getState().detach(id, listener)
    }
  }, [store])

  return { terminalId, status, exitCode, spawn, sendInput, sendResize, disconnect, kill, onData }
}
