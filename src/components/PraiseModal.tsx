import type { Stage } from '../types'

const CONFETTI = ['💗', '✨', '🌸', '💫', '🎀']

export function PraiseModal({
  message,
  songs,
  starsEarned,
  stageUp,
  onClose,
}: {
  message: string
  songs: number
  starsEarned: number
  stageUp: Stage | null
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-pop-in relative w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-b from-white to-blossom-50 p-7 text-center shadow-2xl"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-4">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className="animate-confetti text-xl"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {c}
            </span>
          ))}
        </div>

        <div className="animate-float mt-2 text-6xl">🎉</div>

        <p className="mt-3 text-xs font-bold uppercase tracking-wide text-lilac-400">AIベタ褒めタイム</p>
        <p className="mt-2 text-lg font-extrabold leading-relaxed text-blossom-600">{message}</p>

        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="rounded-full bg-lilac-100 px-3 py-1 text-xs font-bold text-lilac-600">
            今日 {songs}曲
          </span>
          <span className="rounded-full bg-blossom-100 px-3 py-1 text-xs font-bold text-blossom-500">
            +{starsEarned} Star
          </span>
        </div>

        {stageUp && (
          <div className="animate-pop-in mt-4 rounded-2xl border border-lilac-200 bg-lilac-50 p-3">
            <p className="text-sm font-extrabold text-lilac-600">
              {stageUp.emoji} ステージアップ！「{stageUp.name}」になったよ！
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-blossom-400 to-lilac-400 py-3 text-base font-bold text-white active:scale-95"
        >
          ありがとう！
        </button>
      </div>
    </div>
  )
}
