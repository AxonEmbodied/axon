import { RollupCard } from '@/components/timeline/RollupCard'
import { useProjectStore } from '@/store/projectStore'
import type { RollupEpisode, RollupFrontmatter } from '@/lib/types'

// Mock data for development
const mockRollups: RollupEpisode[] = [
  {
    filename: '2026-03-10_rollup.md',
    frontmatter: {
      type: 'rollup',
      date: '2026-03-10',
      project: 'eat-ai-sar-portal',
      headline: 'Battle-hardened coupon engine — 97 tests, ghost redemption fixed',
      tags: ['hardening', 'testing', 'concurrency'],
      energy: 'high',
      commits: 34,
      decisions: 6,
      openLoops: 7,
    },
    summary: 'Implemented atomic coupon redemption with row-level locking to prevent ghost redemptions. Added 97 tests across unit, integration, and E2E layers. Fixed critical concurrency bug in basket validation.',
    body: '',
  },
  {
    filename: '2026-03-09_rollup.md',
    frontmatter: {
      type: 'rollup',
      date: '2026-03-09',
      project: 'eat-ai-sar-portal',
      headline: 'Coupon model + redemption flow — from zero to working prototype',
      tags: ['shipping', 'architecture'],
      energy: 'high',
      commits: 28,
      decisions: 4,
      openLoops: 5,
    },
    summary: 'Built the full coupon lifecycle: creation, assignment, validation, redemption. Added partner portal endpoints and mobile deep linking support.',
    body: '',
  },
  {
    filename: '0000_genesis.md',
    frontmatter: {
      type: 'genesis',
      date: '2026-03-08',
      project: 'eat-ai-sar-portal',
    } as RollupFrontmatter,
    summary: 'Genesis rollup — reconstructed project history from 1,751 commits across FastAPI backend, React Native mobile, and React web. Identified 12 major architectural decisions.',
    body: '',
  },
]

export function TimelineView() {
  const activeProject = useProjectStore((s) => s.activeProject)

  return (
    <div>
      <header className="mb-10">
        <h1 className="font-serif text-display text-ax-text-primary">Timeline</h1>
        <p className="text-body text-ax-text-secondary mt-2">
          {activeProject ? `Rollup history for ${activeProject}` : 'Select a project'}
        </p>
      </header>

      <div className="space-y-4">
        {mockRollups.map((rollup, i) => (
          <RollupCard key={rollup.filename} rollup={rollup} index={i} />
        ))}
      </div>
    </div>
  )
}
