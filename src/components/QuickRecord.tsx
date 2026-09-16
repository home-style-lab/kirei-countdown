import { Music2, Plus } from 'lucide-react'
import { useState } from 'react'

export function QuickRecord({
  todaySongs,
  onRecord,
}: {
  todaySongs: number | undefined
  onRecord: (songs: number) => void
}) {
  const [customOpen, setCustomOpen] = useState(false)
  const [customValue, setCustomValue] = useState('')

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const n = Number(customValue)
    if (!customValue || Number.isNaN(n) || n < 0) return
    onRecord(n)
    setCustomValue('')
    setCustomOpen(false)
  }

  return (
    <div className="animate-pop-in rounded-3xl border border-blossom-100 bg-white/90 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-sm font-bold text-blossom-500">
          <Music2 size={16} />
          今日何曲踊った？
        </h2>
        {typeof todaySongs === 'number' && (
          <span className="rounded-full bg-lilac-100 px-3 py-1 text-xs font-bold text-lilac-600">
            今日: {todaySongs}曲
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2.5">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => onRecord(n)}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-2xl py-4 font-bold transition-all active:scale-95 ${
              todaySongs === n
                ? 'bg-gradient-to-br from-blossom-400 to-lilac-400 text-white shadow-md shadow-blossom-200'
                : 'bg-blossom-50 text-blossom-500'
            }`}
          >
            <span className="text-xl">{n}</span>
            <span className="text-[11px]">曲</span>
          </button>
        ))}
        <button
          onClick={() => setCustomOpen((v) => !v)}
          className={`flex flex-col items-center justify-center gap-0.5 rounded-2xl py-4 font-bold transition-all active:scale-95 ${
            customOpen ? 'bg-lilac-200 text-lilac-700' : 'bg-blossom-50 text-blossom-500'
          }`}
        >
          <Plus size={18} />
          <span className="text-[11px]">自由</span>
        </button>
      </div>

      {customOpen && (
        <form onSubmit={handleCustomSubmit} className="mt-3 flex gap-2">
          <input
            autoFocus
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="曲数を入力"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            className="flex-1 rounded-2xl border border-blossom-200 bg-blossom-50/60 px-4 py-2.5 text-base outline-none focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
          />
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-blossom-400 to-lilac-400 px-5 py-2.5 text-sm font-bold text-white active:scale-95"
          >
            記録
          </button>
        </form>
      )}
    </div>
  )
}
