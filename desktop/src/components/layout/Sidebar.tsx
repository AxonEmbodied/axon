import { useProjectStore } from '@/store/projectStore'
import { useBackend } from '@/providers/DataProvider'
import { useEffect } from 'react'
import { Layers, Clock, Brain, Settings, Search } from 'lucide-react'

const navItems = [
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'state', label: 'State', icon: Layers },
  { id: 'decisions', label: 'Decisions', icon: Brain },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const { projects, activeProject, setProjects, setActiveProject } = useProjectStore()
  const backend = useBackend()

  useEffect(() => {
    backend.getProjects().then(setProjects)
  }, [backend, setProjects])

  return (
    <aside className="w-64 h-screen bg-ax-sidebar flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6">
        <h1 className="font-serif text-h3 text-[var(--ax-text-on-dark)]">axon</h1>
      </div>

      {/* Project Switcher */}
      <div className="px-3 mb-4">
        <div className="text-micro font-mono uppercase tracking-wider text-[var(--ax-text-on-dark-muted)] px-2 mb-2">
          Projects
        </div>
        {projects.map((p) => (
          <button
            key={p.name}
            onClick={() => setActiveProject(p.name)}
            className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center gap-3 transition-colors duration-150
              ${activeProject === p.name
                ? 'bg-white/10 text-[var(--ax-text-on-dark)]'
                : 'text-[var(--ax-text-on-dark-muted)] hover:bg-white/5 hover:text-[var(--ax-text-on-dark)]'
              }`}
          >
            <span className={`w-2 h-2 rounded-full ${
              p.status === 'active' ? 'bg-ax-accent' :
              p.status === 'paused' ? 'bg-ax-warning' : 'bg-ax-text-tertiary'
            }`} />
            <span className="font-mono text-small truncate">{p.name}</span>
            {p.openLoopCount > 0 && (
              <span className="ml-auto font-mono text-micro bg-white/10 px-1.5 py-0.5 rounded">
                {p.openLoopCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <nav className="px-3 flex-1">
        <div className="text-micro font-mono uppercase tracking-wider text-[var(--ax-text-on-dark-muted)] px-2 mb-2">
          Views
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            className="w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center gap-3
              text-[var(--ax-text-on-dark-muted)] hover:bg-white/5 hover:text-[var(--ax-text-on-dark)]
              transition-colors duration-150"
          >
            <item.icon size={16} strokeWidth={1.5} />
            <span className="text-small">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Search */}
      <div className="px-3 pb-4">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg
          text-[var(--ax-text-on-dark-muted)] hover:bg-white/5 transition-colors text-small">
          <Search size={14} strokeWidth={1.5} />
          <span>Search</span>
          <span className="ml-auto font-mono text-micro opacity-50">&#x2318;K</span>
        </button>
      </div>
    </aside>
  )
}
