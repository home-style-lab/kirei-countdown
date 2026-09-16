import type { LogMap, Stage } from '../types'

export const STARS_PER_SONG = 10

export const STAGES: Stage[] = [
  { level: 1, name: '準備中', threshold: 0, nextThreshold: 50, emoji: '🌱' },
  { level: 2, name: 'すっきりライン', threshold: 50, nextThreshold: 150, emoji: '🌸' },
  { level: 3, name: 'ドレス完成', threshold: 150, nextThreshold: 300, emoji: '👗' },
  { level: 4, name: '最高の輝き', threshold: 300, nextThreshold: null, emoji: '✨' },
]

export function totalStars(logs: LogMap): number {
  return Object.values(logs).reduce((sum, log) => sum + log.songs * STARS_PER_SONG, 0)
}

export function getStage(stars: number): Stage {
  let current = STAGES[0]
  for (const stage of STAGES) {
    if (stars >= stage.threshold) current = stage
  }
  return current
}

export function getStageProgress(stars: number): { current: Stage; progressPct: number; starsToNext: number | null } {
  const current = getStage(stars)
  if (current.nextThreshold === null) {
    return { current, progressPct: 100, starsToNext: null }
  }
  const span = current.nextThreshold - current.threshold
  const gained = stars - current.threshold
  const progressPct = Math.min(100, Math.max(0, (gained / span) * 100))
  return { current, progressPct, starsToNext: current.nextThreshold - stars }
}
