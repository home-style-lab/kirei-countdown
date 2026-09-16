import { Heart, Settings as SettingsIcon } from 'lucide-react'
import { useState } from 'react'
import { CalendarView } from './components/CalendarView'
import { Dashboard } from './components/Dashboard'
import { GrowthPanel } from './components/GrowthPanel'
import { Nav, type Tab } from './components/Nav'
import { Onboarding } from './components/Onboarding'
import { PraiseModal } from './components/PraiseModal'
import { SettingsModal } from './components/SettingsModal'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { DailyLog, LogMap, Settings, Stage } from './types'
import { todayKey } from './utils/date'
import { getStage, totalStars } from './utils/growth'
import { pickPraiseMessage } from './utils/praise'

const TAB_TITLES: Record<Tab, string> = {
  dashboard: 'ホーム',
  calendar: 'カレンダー',
  growth: '育成',
}

function App() {
  const [settings, setSettings] = useLocalStorage<Settings | null>('kirei-countdown-settings', null)
  const [logs, setLogs] = useLocalStorage<LogMap>('kirei-countdown-logs', {})
  const [tab, setTab] = useState<Tab>('dashboard')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [praise, setPraise] = useState<{ message: string; songs: number; starsEarned: number; stageUp: Stage | null } | null>(
    null,
  )

  if (!settings) {
    return <Onboarding onComplete={setSettings} />
  }

  const handleRecordSongs = (songs: number) => {
    const today = todayKey()
    const prevStars = totalStars(logs)
    const prevLog = logs[today]
    const newLogs: LogMap = { ...logs, [today]: { ...prevLog, date: today, songs } }
    const newStars = totalStars(newLogs)
    const prevStage = getStage(prevStars)
    const newStage = getStage(newStars)
    setLogs(newLogs)

    if (songs > 0) {
      setPraise({
        message: pickPraiseMessage(songs),
        songs,
        starsEarned: songs * 10,
        stageUp: newStage.level > prevStage.level ? newStage : null,
      })
    }
  }

  const handleRecordWeight = (weight: number) => {
    const today = todayKey()
    const prevLog = logs[today]
    setLogs({ ...logs, [today]: { ...prevLog, date: today, songs: prevLog?.songs ?? 0, weight } })
  }

  const handleSaveLog = (log: DailyLog) => {
    setLogs({ ...logs, [log.date]: log })
  }

  const handleDeleteLog = (dateKey: string) => {
    const next = { ...logs }
    delete next[dateKey]
    setLogs(next)
  }

  return (
    <div className="min-h-screen pb-28">
      <header className="sticky top-0 z-20 border-b border-blossom-100/70 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-1.5">
            <Heart size={16} className="text-blossom-400" fill="currentColor" />
            <span className="text-sm font-extrabold text-blossom-600">Kirei Countdown</span>
          </div>
          {tab === 'dashboard' && (
            <button onClick={() => setSettingsOpen(true)} className="rounded-full p-1.5 text-blossom-300 active:scale-90">
              <SettingsIcon size={18} />
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-md px-5 pt-5">
        <h1 className="sr-only">{TAB_TITLES[tab]}</h1>
        {tab === 'dashboard' && (
          <Dashboard
            settings={settings}
            logs={logs}
            onRecordSongs={handleRecordSongs}
            onRecordWeight={handleRecordWeight}
            onGoGrowth={() => setTab('growth')}
          />
        )}
        {tab === 'calendar' && <CalendarView logs={logs} onSaveLog={handleSaveLog} onDeleteLog={handleDeleteLog} />}
        {tab === 'growth' && <GrowthPanel logs={logs} />}
      </main>

      <Nav active={tab} onChange={setTab} />

      {settingsOpen && (
        <SettingsModal
          settings={settings}
          onClose={() => setSettingsOpen(false)}
          onSave={(s) => {
            setSettings(s)
            setSettingsOpen(false)
          }}
        />
      )}

      {praise && (
        <PraiseModal
          message={praise.message}
          songs={praise.songs}
          starsEarned={praise.starsEarned}
          stageUp={praise.stageUp}
          onClose={() => setPraise(null)}
        />
      )}
    </div>
  )
}

export default App
