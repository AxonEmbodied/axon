import { useState, useRef, useCallback, useEffect } from 'react'

export type TerminalStatus = 'idle' | 'spawning' | 'connecting' | 'connected' | 'exited' | 'error'

export function useTerminalSession() {
  const [terminalId, setTerminalId] = useState<string | null>(null)
  const [status, setStatus] = useState<TerminalStatus>('idle')
  const [exitCode, setExitCode] = useState<number | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const dataHandlerRef = useRef<((data: string) => void) | null>(null)
  const terminalIdRef = useRef<string | null>(null)

  const onData = useCallback((handler: (data: string) => void) => {
    dataHandlerRef.current = handler
  }, [])

  const spawn = useCallback(async (project: string, sessionId?: string) => {
    setStatus('spawning')
    setExitCode(null)

    try {
      const res = await fetch('/api/axon/terminal/spawn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project, sessionId: sessionId || null }),
      })

      if (!res.ok) throw new Error(`Spawn failed: ${res.status}`)
      const { terminalId: id } = await res.json()
      setTerminalId(id)
      terminalIdRef.current = id
      setStatus('connecting')

      // Connect WebSocket
      const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
      const ws = new WebSocket(`${protocol}//${location.host}/api/axon/terminal/ws?id=${id}`)

      ws.onopen = () => {
        setStatus('connected')
      }

      ws.onmessage = (event) => {
        const data = event.data as string
        // Check for JSON control messages (exit)
        if (data.startsWith('{')) {
          try {
            const msg = JSON.parse(data)
            if (msg.type === 'exit') {
              setExitCode(msg.exitCode)
              setStatus('exited')
              return
            }
          } catch {
            // Not JSON — treat as terminal output
          }
        }
        dataHandlerRef.current?.(data)
      }

      ws.onerror = () => {
        setStatus('error')
      }

      ws.onclose = (event) => {
        // Only set error if we didn't already handle exit
        setStatus(prev => prev === 'exited' ? prev : 'error')
        wsRef.current = null
        // Code 1000 = normal close (process exited), don't log
        if (event.code !== 1000) {
          console.log(`[Terminal WS] Closed: code=${event.code} reason=${event.reason}`)
        }
      }

      wsRef.current = ws
    } catch (e) {
      console.error('Terminal spawn error:', e)
      setStatus('error')
    }
  }, [])

  const sendInput = useCallback((data: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(data)
    }
  }, [])

  const sendResize = useCallback((cols: number, rows: number) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'resize', cols, rows }))
    }
  }, [])

  const disconnect = useCallback(() => {
    wsRef.current?.close()
    wsRef.current = null
    const id = terminalIdRef.current
    if (id) {
      fetch(`/api/axon/terminal/${id}`, { method: 'DELETE' }).catch(() => {})
    }
    terminalIdRef.current = null
    setTerminalId(null)
    setStatus('idle')
    setExitCode(null)
  }, [])

  // Cleanup on unmount
  useEffect(() => () => {
    wsRef.current?.close()
    const id = terminalIdRef.current
    if (id) {
      fetch(`/api/axon/terminal/${id}`, { method: 'DELETE' }).catch(() => {})
    }
  }, [])

  return { terminalId, status, exitCode, spawn, sendInput, sendResize, disconnect, onData }
}
