import { Heart, Sparkles } from 'lucide-react'
import { useState } from 'react'
import type { Settings } from '../types'

const DEFAULT_WEDDING_DATE = '2026-10-31'

export function Onboarding({ onComplete }: { onComplete: (settings: Settings) => void }) {
  const [startWeight, setStartWeight] = useState('')
  const [weddingDate, setWeddingDate] = useState(DEFAULT_WEDDING_DATE)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const w = Number(startWeight)
    if (!startWeight || Number.isNaN(w) || w <= 0) {
      setError('現在の体重を正しく入力してね')
      return
    }
    if (!weddingDate) {
      setError('結婚式の日付を入力してね')
      return
    }
    onComplete({ startWeight: w, weddingDate })
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="animate-pop-in w-full max-w-sm rounded-3xl border border-blossom-100 bg-white/90 p-7 shadow-xl shadow-blossom-100">
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blossom-200 to-lilac-200">
            <Heart className="text-white" size={28} fill="white" />
          </div>
          <h1 className="text-xl font-extrabold text-blossom-600">Kirei Countdown</h1>
          <p className="mt-1 text-sm text-blossom-400">
            結婚式までのカウントダウンと一緒に
            <br />
            楽しく −2kg &amp; 肩まわりすっきりを目指そう
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-blossom-500">現在の体重 (kg)</span>
            <input
              type="number"
              inputMode="decimal"
              step="0.1"
              placeholder="例）52.0"
              value={startWeight}
              onChange={(e) => setStartWeight(e.target.value)}
              className="rounded-2xl border border-blossom-200 bg-blossom-50/60 px-4 py-3 text-base outline-none focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
            />
            <span className="text-xs text-blossom-400">目標は自動で −2kg に設定されるよ</span>
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
            className="mt-1 flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-blossom-400 to-lilac-400 py-3.5 text-base font-bold text-white shadow-lg shadow-blossom-200 transition-transform active:scale-95"
          >
            <Sparkles size={18} />
            はじめる
          </button>
        </form>
      </div>
    </div>
  )
}
