import { Scale } from 'lucide-react'

export function WeightProgress({
  startWeight,
  currentWeight,
  onEditWeight,
}: {
  startWeight: number
  currentWeight: number
  onEditWeight: () => void
}) {
  const targetWeight = Math.round((startWeight - 2) * 10) / 10
  const lost = Math.round((startWeight - currentWeight) * 10) / 10
  const totalGoal = 2
  const progressPct = Math.min(100, Math.max(0, (lost / totalGoal) * 100))

  return (
    <div className="animate-pop-in rounded-3xl border border-blossom-100 bg-white/90 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-sm font-bold text-blossom-500">
          <Scale size={16} />
          体重プログレス
        </h2>
        <button
          onClick={onEditWeight}
          className="rounded-full bg-blossom-50 px-3 py-1 text-xs font-bold text-blossom-500 active:scale-95"
        >
          記録する
        </button>
      </div>

      <div className="mt-4 flex items-end justify-between text-center">
        <div>
          <p className="text-[11px] text-blossom-300">スタート</p>
          <p className="text-lg font-bold text-blossom-400">{startWeight}kg</p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-lilac-500">現在</p>
          <p className="text-2xl font-extrabold text-lilac-600">{currentWeight}kg</p>
        </div>
        <div>
          <p className="text-[11px] text-blossom-300">目標</p>
          <p className="text-lg font-bold text-blossom-400">{targetWeight}kg</p>
        </div>
      </div>

      <div className="relative mt-4 h-3.5 w-full overflow-hidden rounded-full bg-blossom-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blossom-300 to-lilac-400 transition-all duration-700"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <p className="mt-2 text-center text-xs font-bold text-blossom-500">
        {lost > 0 ? `−${lost}kg 達成中！目標まであと${Math.max(0, Math.round((totalGoal - lost) * 10) / 10)}kg` : 'まずは記録からはじめよう'}
      </p>
    </div>
  )
}
