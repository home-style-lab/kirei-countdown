import { X } from 'lucide-react'
import type { ReactNode } from 'react'

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/30 px-0 pb-0 backdrop-blur-sm sm:items-center sm:px-4 sm:pb-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-pop-in w-full max-w-sm rounded-t-3xl border border-blossom-100 bg-white p-6 shadow-2xl sm:rounded-3xl"
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-extrabold text-blossom-600">{title}</h3>
          <button onClick={onClose} className="rounded-full p-1.5 text-blossom-300 active:scale-90">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
