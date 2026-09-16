import { ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'
import type { LogMap, Settings } from '../types'
import { todayKey } from '../utils/date'
import { getStageProgress, totalStars } from '../utils/growth'
import { getCurrentWeight } from '../utils/weight'
import { Countdown } from './Countdown'
import { QuickRecord } from './QuickRecord'
import { WeightEditModal } from './WeightEditModal'
import { WeightProgress } from './WeightProgress'

export function Dashboard({
  settings,
  logs,
  onRecordSongs,
  onRecordWeight,
  onGoGrowth,
}: {
  settings: Settings
  logs: LogMap
  onRecordSongs: (songs: number) => void
  onRecordWeight: (weight: number) => void
  onGoGrowth: () => void
}) {
  const [weightModalOpen, setWeightModalOpen] = useState(false)
  const today = todayKey()
  const todayLog = logs[today]
  const currentWeight = getCurrentWeight(logs, settings.startWeight)
  const stars = totalStars(logs)
  const { current } = getStageProgress(stars)

  return (
    <div className="flex flex-col gap-4">
      <Countdown weddingDate={settings.weddingDate} />

      <WeightProgress
        startWeight={settings.startWeight}
        currentWeight={currentWeight}
        onEditWeight={() => setWeightModalOpen(true)}
      />

      <QuickRecord todaySongs={todayLog?.songs} onRecord={(songs) => onRecordSongs(songs)} />

      <button
        onClick={onGoGrowth}
        className="animate-pop-in flex items-center justify-between rounded-3xl border border-lilac-100 bg-gradient-to-r from-lilac-50 to-blossom-50 p-4 text-left active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
            {current.emoji}
          </span>
          <div>
            <p className="text-xs font-bold text-lilac-400">現在のステージ</p>
            <p className="text-sm font-extrabold text-lilac-600">{current.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-blossom-500">
            <Star size={12} fill="currentColor" />
            {stars}
          </span>
          <ChevronRight size={18} className="text-lilac-300" />
        </div>
      </button>

      {weightModalOpen && (
        <WeightEditModal
          currentWeight={currentWeight}
          onClose={() => setWeightModalOpen(false)}
          onSave={(w) => {
            onRecordWeight(w)
            setWeightModalOpen(false)
          }}
        />
      )}
    </div>
  )
}
