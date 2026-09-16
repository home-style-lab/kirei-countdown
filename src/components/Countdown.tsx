import { Heart } from 'lucide-react'
import { daysUntil, formatJpDate } from '../utils/date'

export function Countdown({ weddingDate }: { weddingDate: string }) {
  const remaining = daysUntil(weddingDate)
  const isPast = remaining < 0
  const isToday = remaining === 0

  return (
    <div className="animate-pop-in relative overflow-hidden rounded-3xl bg-gradient-to-br from-blossom-400 via-blossom-400 to-lilac-400 p-6 text-white shadow-lg shadow-blossom-200">
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-white/10" />
      <div className="relative flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-white/85">
            <Heart size={13} fill="white" />
            <span>結婚式まで</span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            {isPast ? (
              <span className="text-3xl font-extrabold">おめでとう！</span>
            ) : isToday ? (
              <span className="text-3xl font-extrabold">今日は本番日！</span>
            ) : (
              <>
                <span className="text-5xl font-extrabold leading-none">{remaining}</span>
                <span className="text-lg font-bold">日</span>
              </>
            )}
          </div>
          <p className="mt-1.5 text-xs text-white/80">{formatJpDate(weddingDate)}</p>
        </div>
        <div className="animate-float text-5xl">💍</div>
      </div>
    </div>
  )
}
