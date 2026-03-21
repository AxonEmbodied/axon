import { useState } from 'react'
import { Coffee, Brain, Clock, GitBranch, CheckSquare, Terminal, Settings, Search, MoreHorizontal, X, Sun, Moon, HelpCircle } from 'lucide-react'
import { useUIStore, type ViewId } from '@/store/uiStore'
import { useProjectStore } from '@/store/projectStore'

/* ── Bottom Tab Bar ─────────────────────────────────────────── */

const TABS: { id: ViewId; icon: typeof Clock; label: string }[] = [
  { id: 'morning', icon: Coffee, label: 'Morning' },
  { id: 'agents', icon: Brain, label: 'Agents' },
  { id: 'timeline', icon: Clock, label: 'Timeline' },
  { id: 'source', icon: GitBranch, label: 'Source' },
  { id: 'todos', icon: CheckSquare, label: 'Tasks' },
]

export function BottomTabBar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const activeView = useUIStore(s => s.activeView)
  const setView = useUIStore(s => s.setView)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-ax-elevated/95 backdrop-blur-md border-t border-ax-border-subtle safe-area-bottom"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around px-2">
          {TABS.map(({ id, icon: Icon, label }) => {
            const isActive = activeView === id
            return (
              <button
                key={id}
                onClick={() => setView(id)}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] min-h-[44px] transition-colors
                  ${isActive ? 'text-ax-brand' : 'text-ax-text-tertiary'}`}
              >
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-[9px] font-mono">{label}</span>
              </button>
            )
          })}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="More options"
            className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] min-h-[44px] transition-colors
              ${drawerOpen ? 'text-ax-brand' : 'text-ax-text-tertiary'}`}
          >
            <MoreHorizontal size={20} strokeWidth={1.5} />
            <span className="text-[9px] font-mono">More</span>
          </button>
        </div>
      </nav>

      {/* More drawer */}
      {drawerOpen && <MoreDrawer onClose={() => setDrawerOpen(false)} onOpenPalette={() => { setDrawerOpen(false); onOpenPalette() }} />}
    </>
  )
}

/* ── More Drawer ────────────────────────────────────────────── */

function MoreDrawer({ onClose, onOpenPalette }: { onClose: () => void; onOpenPalette: () => void }) {
  const setView = useUIStore(s => s.setView)
  const { theme, toggleTheme } = useUIStore()

  const items: { id: string; icon: typeof Clock; label: string; action: () => void }[] = [
    { id: 'search', icon: Search, label: 'Search', action: () => { onOpenPalette(); onClose() } },
    { id: 'terminal', icon: Terminal, label: 'Terminal', action: () => { setView('terminal'); onClose() } },
    { id: 'settings', icon: Settings, label: 'Settings', action: () => { setView('settings'); onClose() } },
    { id: 'about', icon: HelpCircle, label: 'About', action: () => { setView('about'); onClose() } },
    { id: 'theme', icon: theme === 'light' ? Moon : Sun, label: theme === 'light' ? 'Dark mode' : 'Light mode', action: () => { toggleTheme(); onClose() } },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[45] animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-[46] bg-ax-elevated rounded-t-2xl border-t border-ax-border shadow-[0_-10px_40px_rgba(0,0,0,0.15)] safe-area-bottom animate-slide-up-in">
        <div className="flex items-center justify-between px-5 py-3 border-b border-ax-border-subtle">
          <span className="font-mono text-micro uppercase tracking-widest text-ax-text-tertiary">More</span>
          <button onClick={onClose} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-ax-text-tertiary" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="py-2">
          {items.map(({ id, icon: Icon, label, action }) => (
            <button
              key={id}
              onClick={action}
              className="w-full flex items-center gap-4 px-5 py-3 min-h-[48px] text-left text-ax-text-secondary hover:bg-ax-sunken transition-colors"
            >
              <Icon size={20} strokeWidth={1.5} className="text-ax-text-tertiary shrink-0" />
              <span className="text-body">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

/* ── Mobile Top Bar ─────────────────────────────────────────── */

export function MobileTopBar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const activeProject = useProjectStore(s => s.activeProject)
  const switchProject = useProjectStore(s => s.switchProject)

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-ax-elevated/95 backdrop-blur-md border-b border-ax-border-subtle safe-area-top min-h-[48px]">
      {/* Project name — tap to cycle */}
      <button
        onClick={() => switchProject('right')}
        className="flex items-center gap-2 min-h-[44px] text-left"
        aria-label={`Current project: ${activeProject || 'None'}. Tap to switch.`}
      >
        <span className="w-2 h-2 rounded-full bg-ax-accent shrink-0" />
        <span className="font-mono text-small text-ax-text-primary truncate max-w-[200px]">
          {activeProject || 'No project'}
        </span>
      </button>

      {/* Search */}
      <button
        onClick={onOpenPalette}
        className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-ax-text-tertiary hover:text-ax-text-primary transition-colors"
        aria-label="Search"
      >
        <Search size={18} />
      </button>
    </div>
  )
}
