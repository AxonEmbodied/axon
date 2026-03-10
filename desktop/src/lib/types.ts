export type ProjectStatus = 'active' | 'paused' | 'archived'
export type EnergyLevel = 'low' | 'medium' | 'high'

export interface Project {
  name: string
  path: string
  status: ProjectStatus
  createdAt: string
  lastRollup: string | null
  episodeCount: number
  openLoopCount: number
}

export interface RollupFrontmatter {
  type: 'rollup' | 'catchup' | 'genesis'
  date: string
  project: string
  headline?: string
  tags?: string[]
  energy?: EnergyLevel
  commits?: number
  decisions?: number
  openLoops?: number
  previous?: string
}

export interface RollupEpisode {
  filename: string
  frontmatter: RollupFrontmatter
  summary?: string
  body: string
}

export interface DecisionTrace {
  id: string
  title: string
  input: string
  constraint: string
  tradeoff: string
  decision: string
  date: string
  rollupFile: string
}

export interface OpenLoop {
  text: string
  status: 'open' | 'carried' | 'done'
  carriedDays?: number
}

export interface StreamEntry {
  timestamp: string
  source: string
  message: string
}
