export interface Settings {
  startWeight: number
  weddingDate: string // 'YYYY-MM-DD'
}

export interface DailyLog {
  date: string // 'YYYY-MM-DD'
  songs: number
  weight?: number
  memo?: string
}

export type LogMap = Record<string, DailyLog>

export interface AppData {
  settings: Settings | null
  logs: LogMap
}

export interface Stage {
  level: 1 | 2 | 3 | 4
  name: string
  threshold: number
  nextThreshold: number | null
  emoji: string
}
