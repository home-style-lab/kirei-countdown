import { ChevronLeft, ChevronRight, Music2, Scale } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { DailyLog, LogMap } from '../types'
import { getMonthMatrix, todayKey, weekdayLabelsJp } from '../utils/date'
import { LogEditModal } from './LogEditModal'

export function CalendarView({
  logs,
  onSaveLog,
  onDeleteLog,
}: {
  logs: LogMap
  onSaveLog: (log: DailyLog) => void
  onDeleteLog: (dateKey: string) => void
}) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const cells = useMemo(() => getMonthMatrix(year, month), [year, month])
  const today = todayKey()

  const goPrevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1)
      setMonth(11)
    } else {
      setMonth((m) => m - 1)
    }
  }
  const goNextMonth = () => {
    if (month === 11) {
      setYear((y) => y + 1)
      setMonth(0)
    } else {
      setMonth((m) => m + 1)
    }
  }

  const monthLogs = useMemo(
    () =>
      Object.values(logs)
        .filter((l) => {
          const [ly, lm] = l.date.split('-').map(Number)
          return ly === year && lm === month + 1
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1)),
    [logs, year, month],
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="animate-pop-in rounded-3xl border border-blossom-100 bg-white/90 p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <button onClick={goPrevMonth} className="rounded-full p-2 text-blossom-400 active:scale-90">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-base font-extrabold text-blossom-600">
            {year}年 {month + 1}月
          </h2>
          <button onClick={goNextMonth} className="rounded-full p-2 text-blossom-400 active:scale-90">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-blossom-300">
          {weekdayLabelsJp().map((w) => (
            <div key={w}>{w}</div>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((cell) => {
            const log = logs[cell.dateKey]
            const achieved = log && log.songs > 0
            return (
              <button
                key={cell.dateKey}
                onClick={() => setSelectedDate(cell.dateKey)}
                disabled={!cell.inMonth}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-xs transition-colors ${
                  !cell.inMonth
                    ? 'pointer-events-none text-transparent'
                    : cell.dateKey === today
                      ? 'bg-lilac-100 font-bold text-lilac-600 ring-1 ring-lilac-300'
                      : achieved
                        ? 'bg-blossom-50 font-bold text-blossom-600'
                        : 'text-blossom-400 hover:bg-blossom-50/60'
                }`}
              >
                <span>{cell.date.getDate()}</span>
                {achieved && <span className="absolute bottom-0.5 text-[10px]">🌸</span>}
              </button>
            )
          })}
        </div>
      </div>

      <div className="animate-pop-in rounded-3xl border border-blossom-100 bg-white/90 p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-bold text-blossom-500">この月の記録</h3>
        {monthLogs.length === 0 ? (
          <p className="py-4 text-center text-sm text-blossom-300">まだ記録がありません</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {monthLogs.map((log) => {
              const [, , d] = log.date.split('-')
              return (
                <li key={log.date}>
                  <button
                    onClick={() => setSelectedDate(log.date)}
                    className="flex w-full items-center justify-between rounded-2xl bg-blossom-50/60 px-4 py-3 text-left active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-blossom-500 shadow-sm">
                        {Number(d)}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-blossom-500">
                          <span className="flex items-center gap-1">
                            <Music2 size={12} /> {log.songs}曲
                          </span>
                          {log.weight != null && (
                            <span className="flex items-center gap-1">
                              <Scale size={12} /> {log.weight}kg
                            </span>
                          )}
                        </div>
                        {log.memo && <p className="mt-0.5 max-w-[180px] truncate text-[11px] text-blossom-400">{log.memo}</p>}
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-blossom-300" />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {selectedDate && (
        <LogEditModal
          dateKey={selectedDate}
          existingLog={logs[selectedDate]}
          onClose={() => setSelectedDate(null)}
          onSave={(log) => {
            onSaveLog(log)
            setSelectedDate(null)
          }}
          onDelete={() => {
            onDeleteLog(selectedDate)
            setSelectedDate(null)
          }}
        />
      )}
    </div>
  )
}
