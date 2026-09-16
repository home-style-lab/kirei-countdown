// ローカルタイムゾーンで 'YYYY-MM-DD' 形式に整形する（toISOString はUTC変換されるため使わない）
export function toDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayKey(): string {
  return toDateKey(new Date())
}

export function daysUntil(targetDateKey: string): number {
  const [ty, tm, td] = targetDateKey.split('-').map(Number)
  const target = new Date(ty, tm - 1, td)
  const now = new Date()
  const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffMs = target.getTime() - todayMid.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

export function formatJpDate(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number)
  return `${y}年${m}月${d}日`
}

const WEEKDAYS_JP = ['日', '月', '火', '水', '木', '金', '土']

export interface CalendarCell {
  date: Date
  dateKey: string
  inMonth: boolean
  isToday: boolean
}

export function getMonthMatrix(year: number, month: number): CalendarCell[] {
  // month: 0-indexed
  const firstOfMonth = new Date(year, month, 1)
  const startOffset = firstOfMonth.getDay() // 0=Sun
  const gridStart = new Date(year, month, 1 - startOffset)
  const todayK = todayKey()

  const cells: CalendarCell[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i)
    const dateKey = toDateKey(d)
    cells.push({
      date: d,
      dateKey,
      inMonth: d.getMonth() === month,
      isToday: dateKey === todayK,
    })
  }
  return cells
}

export function weekdayLabelsJp(): string[] {
  return WEEKDAYS_JP
}
