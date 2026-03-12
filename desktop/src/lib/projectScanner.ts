import { existsSync, statSync } from 'fs'
import { join } from 'path'

export function resolveProjectFromFolderId(folderId: string): { displayName: string; projectPath: string | null } {
  // Folder ID encodes a path with / replaced by -, e.g.
  // "-Users-you-Github-rare-disease-ai" → "/Users/you/Github/rare-disease-ai"
  // Uses backtracking to handle ambiguity when a shorter path also exists
  // (e.g. both /Github/AXON and /Github/AXON-release exist).
  const segments = folderId.replace(/^-/, '').split('-')

  function getCandidateNames(slice: string[]): string[] {
    const names = [slice.join('-')]
    if (slice.length >= 2) {
      names.push(slice.join('.'))
      if (slice.length >= 3) {
        for (let d = 1; d < slice.length; d++) {
          const left = slice.slice(0, d).join('-')
          const right = slice.slice(d).join('.')
          names.push(`${left}.${right}`)
          const left2 = slice.slice(0, d).join('.')
          const right2 = slice.slice(d).join('-')
          names.push(`${left2}.${right2}`)
        }
      }
    }
    return names
  }

  // Recursive backtracking: try all valid directory splits
  function resolve(segIdx: number, currentPath: string): string | null {
    if (segIdx >= segments.length) return currentPath

    // Try consuming 1..N segments as a single directory name
    for (let len = 1; len <= segments.length - segIdx; len++) {
      const slice = segments.slice(segIdx, segIdx + len)
      const candidates = len === 1 ? [slice[0]] : getCandidateNames(slice)

      for (const name of candidates) {
        const tryPath = join(currentPath, name)
        try {
          if (existsSync(tryPath) && statSync(tryPath).isDirectory()) {
            const result = resolve(segIdx + len, tryPath)
            if (result) return result
          }
        } catch { /* continue */ }
      }
    }

    return null
  }

  const resolved = resolve(0, '/')
  if (resolved) {
    return {
      displayName: resolved.split('/').filter(Boolean).pop() || folderId,
      projectPath: resolved
    }
  }

  // Fallback: couldn't resolve fully
  return {
    displayName: segments[segments.length - 1] || folderId,
    projectPath: null
  }
}
