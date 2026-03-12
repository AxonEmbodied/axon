import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Terminal, Send, Square, Clock, RotateCcw, Shield } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'
import { useAgentSession } from './agent/useAgentSession'
import { AgentTimeline } from './agent/AgentTimeline'
import { FileTree } from './agent/FileTree'
import { FileAutocomplete } from './agent/FileAutocomplete'
import { useFileSearch } from './agent/useFileSearch'
import type { AgentStatus, PermissionMode } from './agent/types'
import { PERMISSION_MODES } from './agent/types'

const STATUS_DOT: Record<AgentStatus, string> = {
  idle: 'bg-ax-text-tertiary', running: 'bg-ax-brand animate-pulse-dot',
  complete: 'bg-ax-success', error: 'bg-ax-error',
}

/* ── Extract @query from cursor position ────────────────────────── */

function extractAtQuery(text: string, cursorPos: number): string | null {
  // Walk backwards from cursor to find @
  const before = text.slice(0, cursorPos)
  const atIdx = before.lastIndexOf('@')
  if (atIdx === -1) return null
  // Must be at start or preceded by whitespace
  if (atIdx > 0 && !/\s/.test(before[atIdx - 1])) return null
  const query = before.slice(atIdx + 1)
  // No spaces allowed in the query
  if (/\s/.test(query)) return null
  return query
}

export function AgentView() {
  const activeProject = useProjectStore((s) => s.activeProject)
  const [prompt, setPrompt] = useState('')
  const [permissionMode, setPermissionMode] = useState<PermissionMode>('auto')
  const [acQuery, setAcQuery] = useState<string | null>(null)
  const [acSelected, setAcSelected] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { events, status, elapsed, error, sessionId, send, stop, reset, editFromIndex } = useAgentSession()

  // File search for autocomplete
  const { results: acResults, loading: acLoading } = useFileSearch(acQuery || '', activeProject)

  // Accumulate cost + tokens across all result events
  const { totalCost, totalTokens } = useMemo(() => {
    let cost = 0
    let tokens = 0
    for (const evt of events) {
      if (evt.kind === 'result') {
        if (evt.cost != null) cost += evt.cost
        if (evt.usage) tokens += evt.usage.input_tokens + evt.usage.output_tokens
      }
    }
    return { totalCost: cost, totalTokens: tokens }
  }, [events])

  // Current permission mode info
  const currentMode = PERMISSION_MODES.find(m => m.key === permissionMode) || PERMISSION_MODES[0]

  // Cycle permission mode
  const cyclePermissionMode = useCallback(() => {
    setPermissionMode(prev => {
      const idx = PERMISSION_MODES.findIndex(m => m.key === prev)
      return PERMISSION_MODES[(idx + 1) % PERMISSION_MODES.length].key
    })
  }, [])

  // Global Shift+Tab listener for permission mode cycling
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault()
        if (status !== 'running' && status !== 'awaiting_permission') {
          cyclePermissionMode()
        }
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [status, cyclePermissionMode])

  // Focus input when status returns to idle/complete
  useEffect(() => {
    if (status === 'complete' || status === 'idle') {
      inputRef.current?.focus()
    }
  }, [status])

  // Reset autocomplete selection when results change
  useEffect(() => { setAcSelected(0) }, [acResults])

  // Update @-query detection on prompt change
  const handlePromptChange = useCallback((value: string) => {
    setPrompt(value)
    const textarea = inputRef.current
    if (!textarea) return
    const query = extractAtQuery(value, textarea.selectionStart)
    setAcQuery(query)
  }, [])

  // Insert a file reference at the cursor
  const insertFileRef = useCallback((path: string) => {
    const textarea = inputRef.current
    if (!textarea) return
    const cursorPos = textarea.selectionStart
    const before = prompt.slice(0, cursorPos)
    const after = prompt.slice(cursorPos)
    // Find the @ that triggered this
    const atIdx = before.lastIndexOf('@')
    if (atIdx === -1) return
    const newPrompt = before.slice(0, atIdx) + `@${path} ` + after
    setPrompt(newPrompt)
    setAcQuery(null)
    // Set cursor after the inserted reference
    const newPos = atIdx + path.length + 2 // @path + space
    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(newPos, newPos)
    })
  }, [prompt])

  // Handle file reference from file tree @ button
  const handleFileReference = useCallback((path: string) => {
    const ref = `@${path} `
    setPrompt(prev => prev + ref)
    requestAnimationFrame(() => {
      inputRef.current?.focus()
      const len = (prompt + ref).length
      inputRef.current?.setSelectionRange(len, len)
    })
  }, [prompt])

  const isActive = status === 'running'

  const handleSubmit = () => {
    if (!prompt.trim() || !activeProject || isActive) return
    send(prompt.trim(), activeProject, permissionMode)
    setPrompt('')
    setAcQuery(null)
  }

  // Edit and resend from a past user message
  const handleEditMessage = useCallback((eventIndex: number) => {
    const text = editFromIndex(eventIndex)
    if (text != null) {
      setPrompt(text)
      requestAnimationFrame(() => {
        const ta = inputRef.current
        if (ta) {
          ta.focus()
          ta.setSelectionRange(text.length, text.length)
          ta.style.height = 'auto'
          ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'
        }
      })
    }
  }, [editFromIndex])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Shift+Tab handled globally (window listener above)
    if (e.key === 'Tab' && e.shiftKey) return

    // Autocomplete keyboard handling
    if (acQuery !== null && acResults.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setAcSelected(p => (p + 1) % acResults.length)
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setAcSelected(p => (p - 1 + acResults.length) % acResults.length)
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        if (acResults[acSelected]) insertFileRef(acResults[acSelected])
        return
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        setAcQuery(null)
        return
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        if (acResults[acSelected]) insertFileRef(acResults[acSelected])
        return
      }
    }

    // Normal Enter to send
    if (e.key === 'Enter') {
      if (e.shiftKey || e.metaKey || e.ctrlKey) return
      e.preventDefault()
      handleSubmit()
    }
  }

  const showAutocomplete = acQuery !== null && acQuery.length >= 0 && acResults.length > 0

  return (
    <div className="flex h-full">
      {/* File tree sidebar — opaque, flush, VS Code style */}
      {activeProject && (
        <div className="w-56 shrink-0 border-r border-ax-border bg-ax-elevated overflow-hidden">
          <FileTree project={activeProject} onFileReference={handleFileReference} />
        </div>
      )}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Compact header bar */}
        <div className="shrink-0 flex items-center gap-2 px-4 py-1.5 border-b border-ax-border-subtle bg-ax-base">
          <Terminal size={12} className="text-ax-text-tertiary" />
          {activeProject && (
            <span className="font-mono text-[10px] text-ax-text-secondary truncate max-w-[120px]">
              {activeProject}
            </span>
          )}
          <div className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
          {(status === 'running' || status === 'awaiting_permission') && (
            <span className="font-mono text-[10px] text-ax-text-tertiary flex items-center gap-1">
              <Clock size={9} /> {elapsed}s
            </span>
          )}
          {sessionId && (
            <span className="font-mono text-[10px] text-ax-text-ghost">
              session
            </span>
          )}
          {totalCost > 0 && (
            <span className="font-mono text-[10px] text-ax-text-tertiary">
              ${totalCost.toFixed(4)}
            </span>
          )}
          {totalTokens > 0 && (
            <span className="font-mono text-[10px] text-ax-text-ghost">
              {(totalTokens / 1000).toFixed(1)}k
            </span>
          )}
          <div className="flex-1" />
          {/* Permission mode selector */}
          <button
            onClick={cyclePermissionMode}
            disabled={isActive}
            title={`${currentMode.desc} · Shift+Tab to cycle`}
            className={`flex items-center gap-1 font-mono text-[10px] transition-colors
              disabled:opacity-50
              ${permissionMode === 'auto' ? 'text-ax-success' :
                permissionMode === 'plan' ? 'text-ax-info' :
                permissionMode === 'ask' ? 'text-ax-warning' :
                'text-ax-accent'
              } hover:brightness-125`}
          >
            <Shield size={10} />
            <span>{currentMode.label}</span>
            <span className="text-ax-text-ghost text-[8px]">⇧⇥</span>
          </button>
          {events.length > 0 && !isActive && (
            <button
              onClick={reset}
              className="flex items-center gap-1 font-mono text-[10px] text-ax-text-tertiary
                hover:text-ax-text-secondary transition-colors ml-1"
            >
              <RotateCcw size={9} /> New
            </button>
          )}
        </div>

        {/* Timeline — takes all available space */}
        {events.length > 0 ? (
          <AgentTimeline events={events} status={status} onEditMessage={handleEditMessage} />
        ) : (
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="text-center">
              <Terminal size={20} className="text-ax-text-ghost mx-auto mb-2" />
              <p className="text-micro text-ax-text-tertiary max-w-xs">
                {activeProject
                  ? 'Type a prompt below to start. Use @filename to reference files.'
                  : 'Select a project in the sidebar first.'}
              </p>
            </div>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="shrink-0 mx-3 mb-2 bg-ax-error-subtle border border-ax-error/20 rounded px-3 py-1">
            <p className="text-[10px] text-ax-error font-mono">{error}</p>
          </div>
        )}

        {/* Chat input at bottom */}
        <div className="shrink-0 relative border-t border-ax-border-subtle px-3 pt-2 pb-1.5">
          {/* File autocomplete dropdown */}
          {showAutocomplete && activeProject && (
            <FileAutocomplete
              results={acResults}
              loading={acLoading}
              query={acQuery!}
              selected={acSelected}
              onSelect={insertFileRef}
              onHover={setAcSelected}
              onClose={() => setAcQuery(null)}
            />
          )}

          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={prompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={() => {
                // Re-check @-query on click (cursor may have moved)
                const textarea = inputRef.current
                if (textarea) {
                  setAcQuery(extractAtQuery(prompt, textarea.selectionStart))
                }
              }}
              placeholder={
                !activeProject ? 'Select a project first...'
                : isActive ? 'Waiting for agent...'
                : sessionId ? 'Follow-up message...'
                : 'What should the agent do? Use @ to reference files'
              }
              disabled={!activeProject || isActive}
              rows={1}
              className="flex-1 bg-ax-elevated border border-ax-border rounded-lg px-3 py-2
                text-small text-ax-text-primary placeholder:text-ax-text-tertiary resize-none
                focus:outline-none focus:border-ax-brand
                disabled:opacity-40 transition-colors"
              style={{ minHeight: 36, maxHeight: 120 }}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement
                t.style.height = 'auto'
                t.style.height = Math.min(t.scrollHeight, 120) + 'px'
              }}
            />
            {isActive ? (
              <button
                onClick={stop}
                className="shrink-0 p-2 bg-ax-error/10 text-ax-error rounded-lg
                  hover:bg-ax-error/20 transition-colors
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-ax-error"
                aria-label="Stop agent"
              >
                <Square size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!prompt.trim() || !activeProject}
                className="shrink-0 p-2 bg-ax-brand text-white rounded-lg
                  hover:bg-ax-brand-hover transition-colors
                  disabled:opacity-30 disabled:cursor-not-allowed
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-ax-brand"
                aria-label="Send prompt"
              >
                <Send size={16} />
              </button>
            )}
          </div>
          <span className="text-[9px] text-ax-text-tertiary px-1 mt-0.5 block">Enter to send · Shift+Enter for newline · @ to reference files · Shift+Tab to change mode</span>
        </div>
      </div>
    </div>
  )
}
