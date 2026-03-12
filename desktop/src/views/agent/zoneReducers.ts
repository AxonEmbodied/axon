// Shared zone/tile types, reducers, helpers, and layout computation.
// Ported from AXON-release/app/src/renderer/src/lib/zoneReducers.ts
// Only change: ZONE_COLORS swapped to warm Axon palette.

// === Constants ===
export const GRID = 20
export const TILE_W = 240
export const TILE_H = 160
export const ZONE_PAD = 24
export const ZONE_GAP = 16
export const ZONE_HEADER_H = 40
export const ZONE_MIN_W = TILE_W + ZONE_PAD * 2
export const ZONE_MIN_H = ZONE_HEADER_H + TILE_H / 2 + ZONE_PAD
export const ZONE_COLORS = [
  '#C8956C', // copper (ax-brand)
  '#7B9E7B', // sage (ax-accent)
  '#6B8FAD', // steel (ax-info)
  '#C4933B', // amber (ax-warning)
  '#B85450', // brick (ax-error)
  '#8B7B6B', // warm gray
]

// Compact mode constants
export const COMPACT_TILE_W = 200
export const COMPACT_TILE_H = 72
export const COMPACT_ZONE_PAD = 16
export const COMPACT_ZONE_GAP = 8
export const COMPACT_ZONE_HEADER_H = 28
export const COMPACT_ZONE_MIN_W = COMPACT_TILE_W + COMPACT_ZONE_PAD * 2
export const COMPACT_ZONE_MIN_H = COMPACT_ZONE_HEADER_H + COMPACT_TILE_H / 2 + COMPACT_ZONE_PAD

// === Types ===
export interface TileState {
  sessionId: string
  x: number
  y: number
  width: number
  height: number
  zoneId?: string | null
  order?: number
}

export interface ZoneState {
  id: string
  label: string
  x: number
  y: number
  color: string
  parentZoneId?: string | null
  order?: number
}

export type TileAction =
  | { type: 'SET_ALL'; tiles: TileState[] }
  | { type: 'MOVE'; sessionId: string; x: number; y: number }
  | { type: 'ADD'; sessionId: string; x: number; y: number }
  | { type: 'REMOVE'; sessionId: string }
  | { type: 'ASSIGN_ZONE'; sessionId: string; zoneId: string | null }
  | { type: 'REORDER'; updates: { sessionId: string; order: number }[] }

export type ZoneAction =
  | { type: 'SET_ALL'; zones: ZoneState[] }
  | { type: 'ADD'; zone: ZoneState }
  | { type: 'MOVE'; id: string; x: number; y: number }
  | { type: 'RENAME'; id: string; label: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'REPARENT'; id: string; parentZoneId: string | null }
  | { type: 'REORDER'; updates: { id: string; order: number }[] }
  | { type: 'MOVE_DESCENDANTS'; id: string; dx: number; dy: number }

// === Helpers ===
export function snap(v: number): number {
  return Math.round(v / GRID) * GRID
}

export function getZoneDepth(zoneId: string, zones: ZoneState[]): number {
  let depth = 0
  let current = zones.find((z) => z.id === zoneId)
  while (current?.parentZoneId) {
    depth++
    current = zones.find((z) => z.id === current!.parentZoneId)
    if (depth > 10) break // safety
  }
  return depth
}

export function getDescendantZoneIds(zoneId: string, zones: ZoneState[]): Set<string> {
  const result = new Set<string>()
  const collect = (parentId: string): void => {
    for (const z of zones) {
      if (z.parentZoneId === parentId && !result.has(z.id)) {
        result.add(z.id)
        collect(z.id)
      }
    }
  }
  collect(zoneId)
  return result
}

export function isAncestorOf(ancestorId: string, childId: string, zones: ZoneState[]): boolean {
  let current = zones.find((z) => z.id === childId)
  let depth = 0
  while (current?.parentZoneId && depth < 10) {
    if (current.parentZoneId === ancestorId) return true
    current = zones.find((z) => z.id === current!.parentZoneId)
    depth++
  }
  return false
}

// === Reducers ===
export function tilesReducer(state: TileState[], action: TileAction): TileState[] {
  switch (action.type) {
    case 'SET_ALL':
      return action.tiles
    case 'MOVE':
      return state.map((t) =>
        t.sessionId === action.sessionId
          ? { ...t, x: snap(action.x), y: snap(action.y) }
          : t
      )
    case 'ADD':
      if (state.some((t) => t.sessionId === action.sessionId)) return state
      return [
        ...state,
        {
          sessionId: action.sessionId,
          x: snap(action.x),
          y: snap(action.y),
          width: TILE_W,
          height: TILE_H
        }
      ]
    case 'REMOVE':
      return state.filter((t) => t.sessionId !== action.sessionId)
    case 'ASSIGN_ZONE':
      return state.map((t) =>
        t.sessionId === action.sessionId ? { ...t, zoneId: action.zoneId } : t
      )
    case 'REORDER': {
      const updateMap = new Map(action.updates.map(u => [u.sessionId, u.order]))
      return state.map(t => updateMap.has(t.sessionId) ? { ...t, order: updateMap.get(t.sessionId) } : t)
    }
    default:
      return state
  }
}

export function zonesReducer(state: ZoneState[], action: ZoneAction): ZoneState[] {
  switch (action.type) {
    case 'SET_ALL':
      return action.zones
    case 'ADD':
      return [...state, action.zone]
    case 'MOVE':
      return state.map((z) =>
        z.id === action.id ? { ...z, x: snap(action.x), y: snap(action.y) } : z
      )
    case 'RENAME':
      return state.map((z) =>
        z.id === action.id ? { ...z, label: action.label } : z
      )
    case 'REMOVE':
      // When removing a zone, promote its children to top-level
      return state
        .filter((z) => z.id !== action.id)
        .map((z) => z.parentZoneId === action.id ? { ...z, parentZoneId: null } : z)
    case 'REPARENT':
      return state.map((z) =>
        z.id === action.id ? { ...z, parentZoneId: action.parentZoneId } : z
      )
    case 'REORDER': {
      const updateMap = new Map(action.updates.map(u => [u.id, u.order]))
      return state.map(z => updateMap.has(z.id) ? { ...z, order: updateMap.get(z.id) } : z)
    }
    case 'MOVE_DESCENDANTS': {
      // Move all descendants of a zone by dx, dy
      const descendants = new Set<string>()
      const collectDescendants = (parentId: string): void => {
        for (const z of state) {
          if (z.parentZoneId === parentId && !descendants.has(z.id)) {
            descendants.add(z.id)
            collectDescendants(z.id)
          }
        }
      }
      collectDescendants(action.id)
      if (descendants.size === 0) return state
      return state.map((z) =>
        descendants.has(z.id)
          ? { ...z, x: snap(z.x + action.dx), y: snap(z.y + action.dy) }
          : z
      )
    }
    default:
      return state
  }
}

// === Zone layout computation ===
export interface ZoneLayout {
  width: number
  height: number
  tilePositions: Map<string, { x: number; y: number }>
}

export function computeZoneLayouts(
  zones: ZoneState[],
  tiles: TileState[],
  compact = false,
  sessionRecency?: Map<string, string>
): Map<string, ZoneLayout> {
  const layouts = new Map<string, ZoneLayout>()

  const tileW = compact ? COMPACT_TILE_W : TILE_W
  const tileH = compact ? COMPACT_TILE_H : TILE_H
  const pad = compact ? COMPACT_ZONE_PAD : ZONE_PAD
  const gap = compact ? COMPACT_ZONE_GAP : ZONE_GAP
  const headerH = compact ? COMPACT_ZONE_HEADER_H : ZONE_HEADER_H
  const minW = compact ? COMPACT_ZONE_MIN_W : ZONE_MIN_W
  const minH = compact ? COMPACT_ZONE_MIN_H : ZONE_MIN_H

  // Sort zones by depth (leaves first) so children are computed before parents
  const sortedZones = [...zones].sort(
    (a, b) => getZoneDepth(b.id, zones) - getZoneDepth(a.id, zones)
  )

  for (const zone of sortedZones) {
    let zoneTiles = tiles.filter((t) => t.zoneId === zone.id)
    const childZones = zones.filter((z) => z.parentZoneId === zone.id)

    // In compact mode, sort tiles by recency (most recent first)
    if (compact && sessionRecency) {
      zoneTiles = [...zoneTiles].sort((a, b) => {
        const aTime = sessionRecency.get(a.sessionId) || ''
        const bTime = sessionRecency.get(b.sessionId) || ''
        return bTime.localeCompare(aTime)
      })
    }

    // Compute tile grid — compact uses wider grids for landscape tiles
    const cols = compact
      ? Math.max(1, Math.ceil(Math.sqrt(zoneTiles.length * 2.5)))
      : Math.max(1, Math.ceil(Math.sqrt(zoneTiles.length)))
    const rows = Math.max(1, Math.ceil(zoneTiles.length / cols))

    const tilePositions = new Map<string, { x: number; y: number }>()
    zoneTiles.forEach((t, i) => {
      tilePositions.set(t.sessionId, {
        x: zone.x + pad + (i % cols) * (tileW + gap),
        y: zone.y + headerH + pad + Math.floor(i / cols) * (tileH + gap)
      })
    })

    // Base size from tiles
    let width =
      zoneTiles.length > 0
        ? cols * (tileW + gap) - gap + pad * 2
        : minW
    let height =
      zoneTiles.length > 0
        ? headerH + rows * (tileH + gap) - gap + pad * 2
        : minH

    // Expand to contain child zones
    if (childZones.length > 0) {
      let maxRight = zone.x + width
      let maxBottom = zone.y + height
      for (const child of childZones) {
        const childLayout = layouts.get(child.id)
        if (childLayout) {
          maxRight = Math.max(maxRight, child.x + childLayout.width + pad)
          maxBottom = Math.max(maxBottom, child.y + childLayout.height + pad)
        }
      }
      width = Math.max(width, maxRight - zone.x)
      height = Math.max(height, maxBottom - zone.y)
    }

    layouts.set(zone.id, { width, height, tilePositions })
  }

  return layouts
}

export function computeTilePositionMap(
  tiles: TileState[],
  zoneLayouts: Map<string, ZoneLayout>
): Map<string, { x: number; y: number }> {
  const map = new Map<string, { x: number; y: number }>()

  for (const tile of tiles) {
    if (tile.zoneId) {
      const layout = zoneLayouts.get(tile.zoneId)
      if (layout) {
        const pos = layout.tilePositions.get(tile.sessionId)
        if (pos) {
          map.set(tile.sessionId, pos)
          continue
        }
      }
    }
    // Free tile or fallback
    map.set(tile.sessionId, { x: tile.x, y: tile.y })
  }

  return map
}
