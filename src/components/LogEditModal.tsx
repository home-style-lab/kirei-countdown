import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { DailyLog } from '../types'
import { formatJpDate } from '../utils/date'
import { Modal } from './Modal'

export function LogEditModal({
  dateKey,
  existingLog,
  onSave,
  onDelete,
  onClose,
}: {
  dateKey: string
  existingLog: DailyLog | undefined
  onSave: (log: DailyLog) => void
  onDelete: () => void
  onClose: () => void
}) {
  const [songs, setSongs] = useState(String(existingLog?.songs ?? 0))
  const [weight, setWeight] = useState(existingLog?.weight != null ? String(existingLog.weight) : '')
  const [memo, setMemo] = useState(existingLog?.memo ?? '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const songsNum = Math.max(0, Number(songs) || 0)
    const weightNum = weight ? Number(weight) : undefined
    onSave({
      date: dateKey,
      songs: songsNum,
      weight: weightNum && !Number.isNaN(weightNum) ? weightNum : undefined,
      memo: memo.trim() || undefined,
    })
  }

  return (
    <Modal title={formatJpDate(dateKey)} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-blossom-500">踊った曲数</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={songs}
            onChange={(e) => setSongs(e.target.value)}
            className="rounded-2xl border border-blossom-200 bg-blossom-50/60 px-4 py-3 text-base outline-none focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-blossom-500">体重 (kg・任意)</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="未入力でもOK"
            className="rounded-2xl border border-blossom-200 bg-blossom-50/60 px-4 py-3 text-base outline-none focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-blossom-500">一言メモ</span>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={2}
            placeholder="今日の気分や気づきなど"
            className="resize-none rounded-2xl border border-blossom-200 bg-blossom-50/60 px-4 py-3 text-sm outline-none focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
          />
        </label>

        <div className="flex gap-2">
          {existingLog && (
            <button
              type="button"
              onClick={onDelete}
              className="flex items-center justify-center gap-1 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-500 active:scale-95"
            >
              <Trash2 size={16} />
              削除
            </button>
          )}
          <button
            type="submit"
            className="flex-1 rounded-2xl bg-gradient-to-r from-blossom-400 to-lilac-400 py-3 text-base font-bold text-white active:scale-95"
          >
            保存する
          </button>
        </div>
      </form>
    </Modal>
  )
}
