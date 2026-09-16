import { useState } from 'react'
import type { Settings } from '../types'
import { Modal } from './Modal'

export function SettingsModal({
  settings,
  onSave,
  onClose,
}: {
  settings: Settings
  onSave: (settings: Settings) => void
  onClose: () => void
}) {
  const [startWeight, setStartWeight] = useState(String(settings.startWeight))
  const [weddingDate, setWeddingDate] = useState(settings.weddingDate)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const w = Number(startWeight)
    if (!startWeight || Number.isNaN(w) || w <= 0 || !weddingDate) {
      setError('内容を確認してね')
      return
    }
    onSave({ startWeight: w, weddingDate })
  }

  return (
    <Modal title="設定" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-blossom-500">スタート体重 (kg)</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            value={startWeight}
            onChange={(e) => setStartWeight(e.target.value)}
            className="rounded-2xl border border-blossom-200 bg-blossom-50/60 px-4 py-3 text-base outline-none focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-blossom-500">結婚式の日付</span>
          <input
            type="date"
            value={weddingDate}
            onChange={(e) => setWeddingDate(e.target.value)}
            className="rounded-2xl border border-blossom-200 bg-blossom-50/60 px-4 py-3 text-base outline-none focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
          />
        </label>
        {error && <p className="text-sm font-bold text-rose-500">{error}</p>}
        <button
          type="submit"
          className="rounded-2xl bg-gradient-to-r from-blossom-400 to-lilac-400 py-3 text-base font-bold text-white active:scale-95"
        >
          保存する
        </button>
      </form>
    </Modal>
  )
}
