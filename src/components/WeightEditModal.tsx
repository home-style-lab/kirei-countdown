import { useState } from 'react'
import { Modal } from './Modal'

export function WeightEditModal({
  currentWeight,
  onSave,
  onClose,
}: {
  currentWeight: number
  onSave: (weight: number) => void
  onClose: () => void
}) {
  const [value, setValue] = useState(String(currentWeight))
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const n = Number(value)
    if (!value || Number.isNaN(n) || n <= 0) {
      setError('正しい体重を入力してね')
      return
    }
    onSave(Math.round(n * 10) / 10)
  }

  return (
    <Modal title="今日の体重を記録" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-blossom-500">体重 (kg)</span>
          <input
            autoFocus
            type="number"
            inputMode="decimal"
            step="0.1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
