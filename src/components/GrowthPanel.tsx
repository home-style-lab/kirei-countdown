import { Lock, Star } from 'lucide-react'
import type { LogMap } from '../types'
import { getStageProgress, STAGES, totalStars } from '../utils/growth'

const STAGE_MESSAGES: Record<number, string> = {
  1: 'まずは1曲から。あなたの準備がはじまるよ！',
  2: '肩まわりがほぐれて、ラインがすっきりしてきた！',
  3: 'ドレスに袖を通す日が、もうすぐそこに！',
  4: 'もう完成！結婚式当日、最高に輝いてね！',
}

export function GrowthPanel({ logs }: { logs: LogMap }) {
  const stars = totalStars(logs)
  const { current, progressPct, starsToNext } = getStageProgress(stars)

  return (
    <div className="flex flex-col gap-4">
      <div className="animate-pop-in relative overflow-hidden rounded-3xl border border-lilac-100 bg-gradient-to-b from-white to-lilac-50 p-7 text-center shadow-sm">
        <div className="animate-sparkle absolute left-6 top-6 text-lg">✨</div>
        <div className="animate-sparkle absolute right-8 top-10 text-sm" style={{ animationDelay: '0.6s' }}>
          ✨
        </div>
        <div className="animate-sparkle absolute bottom-8 left-10 text-sm" style={{ animationDelay: '1.2s' }}>
          ⭐
        </div>

        <div className="animate-float text-7xl">{current.emoji}</div>
        <p className="mt-3 text-xs font-bold text-lilac-400">LEVEL {current.level}</p>
        <h2 className="text-xl font-extrabold text-lilac-600">{current.name}</h2>
        <p className="mx-auto mt-2 max-w-xs text-sm text-blossom-400">{STAGE_MESSAGES[current.level]}</p>

        <div className="mt-5 flex items-center justify-center gap-1.5 text-sm font-bold text-blossom-500">
          <Star size={15} fill="currentColor" />
          {stars} Star
        </div>

        {current.nextThreshold !== null && (
          <div className="mt-3">
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-lilac-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blossom-300 to-lilac-400 transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-bold text-lilac-400">次のステージまであと {starsToNext} Star</p>
          </div>
        )}
      </div>

      <div className="animate-pop-in rounded-3xl border border-blossom-100 bg-white/90 p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-bold text-blossom-500">ステージ一覧</h3>
        <ul className="flex flex-col gap-2.5">
          {STAGES.map((stage) => {
            const unlocked = stars >= stage.threshold
            const isCurrent = stage.level === current.level
            return (
              <li
                key={stage.level}
                className={`flex items-center gap-3 rounded-2xl border p-3 transition-colors ${
                  isCurrent
                    ? 'border-lilac-300 bg-lilac-50'
                    : unlocked
                      ? 'border-blossom-100 bg-blossom-50/50'
                      : 'border-blossom-50 bg-blossom-50/20 opacity-60'
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  {unlocked ? stage.emoji : <Lock size={16} className="text-blossom-300" />}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-blossom-600">{stage.name}</p>
                  <p className="text-[11px] text-blossom-400">累計 {stage.threshold} Star〜</p>
                </div>
                {isCurrent && <span className="rounded-full bg-lilac-400 px-2.5 py-1 text-[10px] font-bold text-white">NOW</span>}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
