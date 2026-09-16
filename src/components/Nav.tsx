import { CalendarDays, Home, Sparkles } from 'lucide-react'

export type Tab = 'dashboard' | 'calendar' | 'growth'

const ITEMS: { tab: Tab; label: string; icon: typeof Home }[] = [
  { tab: 'dashboard', label: 'ホーム', icon: Home },
  { tab: 'calendar', label: 'カレンダー', icon: CalendarDays },
  { tab: 'growth', label: '育成', icon: Sparkles },
]

export function Nav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-blossom-100 bg-white/85 backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2">
        {ITEMS.map(({ tab, label, icon: Icon }) => {
          const isActive = active === tab
          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-xs transition-colors"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-2xl transition-all ${
                  isActive ? 'bg-gradient-to-br from-blossom-300 to-lilac-300 text-white shadow-md shadow-blossom-200' : 'text-blossom-300'
                }`}
              >
                <Icon size={19} strokeWidth={isActive ? 2.4 : 2} />
              </span>
              <span className={isActive ? 'font-bold text-blossom-500' : 'text-blossom-300'}>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
