import type { WebSocketServer, WebSocket } from 'ws'
import {
  getTerminal,
  setWsConnected,
  killTerminal,
  resizeTerminal,
} from './terminalManager'

export function setupTerminalWs(wss: WebSocketServer): void {
  wss.on('connection', (ws: WebSocket, _req: unknown, termId: string) => {
    const instance = getTerminal(termId)
    if (!instance) {
      ws.close(1008, 'Terminal not found')
      return
    }

    setWsConnected(termId, true)

    // PTY output → WebSocket
    const dataHandler = instance.pty.onData((data: string) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(data)
      }
    })

    // PTY exit → WebSocket
    const exitHandler = instance.pty.onExit(({ exitCode }) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: 'exit', exitCode }))
        ws.close(1000, 'Process exited')
      }
      killTerminal(termId)
    })

    // WebSocket messages → PTY
    ws.on('message', (data: Buffer | string) => {
      const msg = data.toString()
      // Check for JSON control messages (resize)
      if (msg.startsWith('{')) {
        try {
          const parsed = JSON.parse(msg)
          if (parsed.type === 'resize' && parsed.cols && parsed.rows) {
            resizeTerminal(termId, parsed.cols, parsed.rows)
            return
          }
        } catch {
          // Not JSON — treat as raw input
        }
      }
      // Raw terminal input
      instance.pty.write(msg)
    })

    // WebSocket close → mark disconnected (heartbeat cleans up after 60s)
    ws.on('close', () => {
      dataHandler.dispose()
      exitHandler.dispose()
      setWsConnected(termId, false)
    })

    ws.on('error', () => {
      setWsConnected(termId, false)
    })
  })
}
