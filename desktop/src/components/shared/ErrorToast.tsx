import { AlertTriangle, X, ExternalLink } from 'lucide-react'
import { useErrorStore, buildIssueUrl } from '@/store/errorStore'

export function ErrorToast() {
  const toast = useErrorStore(s => s.toast)
  const dismiss = useErrorStore(s => s.dismissToast)

  if (!toast) return null

  const issueUrl = buildIssueUrl(toast)

  return (
    <div className="fixed bottom-6 right-6 z-[100] max-w-sm animate-fade-in-up">
      <div className="bg-ax-elevated rounded-xl border border-[var(--ax-error)]/30 shadow-[0_8px_30px_rgba(0,0,0,0.2)] overflow-hidden">
        <div className="flex items-start gap-3 px-4 py-3">
          <AlertTriangle size={16} className="text-[var(--ax-error)] shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-ax-text-primary font-medium leading-snug">{toast.message}</p>
            {toast.detail && (
              <p className="text-[10px] font-mono text-ax-text-tertiary mt-1 truncate">{toast.detail}</p>
            )}
            <div className="flex items-center gap-3 mt-2">
              <span className="font-mono text-[9px] text-ax-text-ghost uppercase tracking-wider">{toast.source}</span>
              <a
                href={issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-[9px] text-ax-brand hover:underline"
              >
                Report issue <ExternalLink size={8} />
              </a>
            </div>
          </div>
          <button
            onClick={dismiss}
            className="text-ax-text-ghost hover:text-ax-text-secondary transition-colors shrink-0"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
