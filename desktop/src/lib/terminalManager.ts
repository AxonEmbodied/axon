import * as pty from 'node-pty'

interface TerminalInstance {
  pty: pty.IPty
  id: string
  cwd: string
  createdAt: number
  wsConnected: boolean
}

const terminals = new Map<string, TerminalInstance>()
let counter = 0
let heartbeatInterval: ReturnType<typeof setInterval> | null = null

export function startHeartbeat(): void {
  if (heartbeatInterval) return
  heartbeatInterval = setInterval(cleanStale, 30_000)
}

export function spawnTerminal(cwd: string, command?: string, sessionId?: string): string {
  const id = `term-${++counter}-${Date.now()}`
  const shell = process.env.SHELL || '/bin/zsh'

  let args: string[]
  if (sessionId) {
    args = ['-c', `claude --resume ${sessionId}`]
  } else if (command) {
    args = ['-c', command]
  } else {
    args = ['-c', 'claude']
  }

  // Clean env: remove CLAUDECODE to prevent nested session guard
  const cleanEnv: Record<string, string> = {}
  for (const [k, v] of Object.entries(process.env)) {
    if (k !== 'CLAUDECODE' && k !== 'CLAUDE_CODE_SESSION' && v != null) {
      cleanEnv[k] = v
    }
  }
  cleanEnv.TERM = 'xterm-256color'
  cleanEnv.COLORTERM = 'truecolor'

  const ptyProcess = pty.spawn(shell, args, {
    name: 'xterm-256color',
    cols: 120,
    rows: 30,
    cwd,
    env: cleanEnv,
  })

  terminals.set(id, {
    pty: ptyProcess,
    id,
    cwd,
    createdAt: Date.now(),
    wsConnected: false,
  })

  startHeartbeat()
  return id
}

export function hasTerminal(id: string): boolean {
  return terminals.has(id)
}

export function getTerminal(id: string): TerminalInstance | undefined {
  return terminals.get(id)
}

export function setWsConnected(id: string, connected: boolean): void {
  const t = terminals.get(id)
  if (t) t.wsConnected = connected
}

export function resizeTerminal(id: string, cols: number, rows: number): void {
  terminals.get(id)?.pty.resize(cols, rows)
}

export function killTerminal(id: string): void {
  const t = terminals.get(id)
  if (t) {
    t.pty.kill()
    terminals.delete(id)
  }
}

export function killAllTerminals(): void {
  for (const [, t] of terminals) {
    t.pty.kill()
  }
  terminals.clear()
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval)
    heartbeatInterval = null
  }
}

function cleanStale(): void {
  const now = Date.now()
  for (const [id, t] of terminals) {
    // Kill terminals disconnected for >60s (but give 10s for initial connection)
    if (!t.wsConnected && now - t.createdAt > 60_000) {
      console.log(`[Axon Terminal] Cleaning stale terminal ${id}`)
      t.pty.kill()
      terminals.delete(id)
    }
  }
}
