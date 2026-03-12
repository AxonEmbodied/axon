import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

const META_PATH = join(homedir(), '.claude', 'session-manager-meta.json')

export interface SessionMetaEntry {
  tags: string[]
  pinned: boolean
  archived: boolean
  nickname: string | null
}

interface SessionMetaFile {
  sessions: Record<string, Partial<SessionMetaEntry>>
  knownTags: string[]
}

function readMeta(): SessionMetaFile {
  if (!existsSync(META_PATH)) {
    return { sessions: {}, knownTags: [] }
  }
  try {
    return JSON.parse(readFileSync(META_PATH, 'utf-8'))
  } catch {
    return { sessions: {}, knownTags: [] }
  }
}

function getEntry(meta: SessionMetaFile, sessionId: string): SessionMetaEntry {
  const raw = meta.sessions[sessionId] || {}
  return {
    tags: raw.tags || [],
    pinned: raw.pinned || false,
    archived: raw.archived || false,
    nickname: raw.nickname || null
  }
}

export function getSessionMeta(sessionId: string): SessionMetaEntry {
  return getEntry(readMeta(), sessionId)
}

export function getAllSessionMeta(): Record<string, SessionMetaEntry> {
  const meta = readMeta()
  const result: Record<string, SessionMetaEntry> = {}
  for (const [id, raw] of Object.entries(meta.sessions)) {
    result[id] = {
      tags: raw.tags || [],
      pinned: raw.pinned || false,
      archived: raw.archived || false,
      nickname: raw.nickname || null
    }
  }
  return result
}

export function getKnownTags(): string[] {
  return readMeta().knownTags
}
