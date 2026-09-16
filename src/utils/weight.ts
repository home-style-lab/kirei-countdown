import type { LogMap } from '../types'

export function getCurrentWeight(logs: LogMap, startWeight: number): number {
  const dated = Object.values(logs)
    .filter((l) => typeof l.weight === 'number')
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  return dated.length > 0 ? (dated[0].weight as number) : startWeight
}
