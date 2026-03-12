import { useEffect, useRef, useMemo } from 'react'
import type { AgentEvent, AgentStatus } from './types'
import { UserMessageCard, TextCard, ThinkingCard, ToolUseCard, ResultCard, ErrorCard, TypingIndicator, SessionDivider } from './AgentCards'

export function AgentTimeline({ events, status, onEditMessage }: {
  events: AgentEvent[]
  status: AgentStatus
  onEditMessage?: (eventIndex: number) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new events
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [events.length, status])

  // Map tool_use_id → tool_result for pairing
  const resultMap = useMemo(() => {
    const map = new Map<string, AgentEvent>()
    for (const evt of events) {
      if (evt.kind === 'tool_result' && evt.toolUseId) {
        map.set(evt.toolUseId, evt)
      }
    }
    return map
  }, [events])

  // Skip tool_result events — they render inside ToolUseCard
  const visible = useMemo(
    () => events.filter(e => e.kind !== 'tool_result'),
    [events]
  )

  // Show typing indicator when running and the last visible event isn't a pending tool_use
  const lastVisible = visible[visible.length - 1]
  const showTyping = status === 'running' && (
    !lastVisible ||
    lastVisible.kind === 'result' ||
    lastVisible.kind === 'user_message' ||
    lastVisible.kind === 'text' ||
    lastVisible.kind === 'thinking' ||
    (lastVisible.kind === 'tool_use' && resultMap.has(lastVisible.id))
  )

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 scrollbar-hide">
      <div className="space-y-1 pb-4 pt-1">
        {visible.map(evt => {
          switch (evt.kind) {
            case 'user_message':
              return (
                <UserMessageCard
                  key={evt.id}
                  event={evt}
                  onEdit={onEditMessage && status !== 'running'
                    ? () => {
                        const idx = events.findIndex(e => e.id === evt.id)
                        if (idx >= 0) onEditMessage(idx)
                      }
                    : undefined}
                />
              )
            case 'text':
              return <TextCard key={evt.id} event={evt} />
            case 'thinking':
              return <ThinkingCard key={evt.id} event={evt} />
            case 'tool_use':
              return <ToolUseCard key={evt.id} event={evt} result={resultMap.get(evt.id)} />
            case 'result':
              return <ResultCard key={evt.id} event={evt} />
            case 'error':
              return <ErrorCard key={evt.id} event={evt} />
            case 'session_divider':
              return <SessionDivider key={evt.id} />
            default:
              return null
          }
        })}
        {showTyping && <TypingIndicator />}
      </div>
    </div>
  )
}
