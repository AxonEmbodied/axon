import type { RollupEpisode } from '@/lib/types'

const energyColors = {
  low: 'bg-ax-energy-low',
  medium: 'bg-ax-energy-medium',
  high: 'bg-ax-energy-high',
}

export function RollupCard({ rollup, index }: { rollup: RollupEpisode; index: number }) {
  const { frontmatter, summary } = rollup

  return (
    <article
      className="bg-ax-elevated rounded-xl border border-ax-border p-6 hover:shadow-lg
        transition-all duration-200 cursor-pointer group"
      style={{ animationDelay: `${Math.min(index, 4) * 50}ms` }}
    >
      {/* Date + Energy */}
      <div className="flex items-center justify-between mb-3">
        <time className="font-mono text-small text-ax-text-tertiary">
          {frontmatter.date}
        </time>
        {frontmatter.energy && (
          <span className={`w-2.5 h-2.5 rounded-full ${energyColors[frontmatter.energy]}`} />
        )}
      </div>

      {/* Headline */}
      <h2 className="font-serif text-h3 text-ax-text-primary mb-3 group-hover:text-ax-brand transition-colors">
        {frontmatter.headline || (frontmatter.type === 'genesis' ? 'Genesis Rollup' : 'Daily Rollup')}
      </h2>

      {/* Tags */}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {frontmatter.tags.map((tag) => (
            <span key={tag} className="font-mono text-micro px-2 py-0.5 rounded-full
              bg-ax-sunken text-ax-text-secondary">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-ax-border-subtle my-4" />

      {/* Summary */}
      {summary && (
        <p className="text-body text-ax-text-secondary line-clamp-3 mb-4">
          {summary}
        </p>
      )}

      {/* Metrics */}
      <div className="flex gap-6 font-mono text-small text-ax-text-tertiary">
        {frontmatter.commits != null && (
          <span>{frontmatter.commits} commits</span>
        )}
        {frontmatter.decisions != null && (
          <span>{frontmatter.decisions} decisions</span>
        )}
        {frontmatter.openLoops != null && (
          <span>{frontmatter.openLoops} open</span>
        )}
      </div>
    </article>
  )
}
