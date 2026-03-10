import type { ProjectStatus } from '@/lib/types'

const statusColors: Record<ProjectStatus, string> = {
  active: 'bg-ax-accent',
  paused: 'bg-ax-warning',
  archived: 'bg-ax-text-tertiary',
}

export function StatusDot({ status, size = 'sm' }: { status: ProjectStatus; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
  return <span className={`${sizeClass} rounded-full ${statusColors[status]} inline-block`} />
}
