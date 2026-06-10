'use client'

import { useCoachMode } from '@/context/CoachModeContext'
import type { CoachMode } from '@/lib/coach/loadCoachContext'

const options: { id: CoachMode; label: string }[] = [
  { id: 'individual-pro', label: 'Individual' },
  { id: 'mock-team', label: 'Teams' },
]

export default function CoachModeSelector() {
  const { mode, setMode } = useCoachMode()
  const isIndividual = mode === 'individual-pro'

  return (
    <div className="mb-6 flex justify-center">
      <div
        className="relative grid w-full max-w-[280px] grid-cols-2 rounded-full bg-[#eef2f6] p-1"
        role="tablist"
        aria-label="Coach mode"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: isIndividual ? 'translateX(0)' : 'translateX(100%)' }}
        />

        {options.map(({ id, label }) => {
          const active = mode === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setMode(id)}
              className={`relative z-10 rounded-full px-4 py-2 text-[13px] font-medium tracking-tight transition-colors duration-300 ${
                active ? 'text-slate-900' : 'text-slate-500 hover:text-slate-600'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
