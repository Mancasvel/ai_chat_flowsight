'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { CoachMode } from '@/lib/coach/loadCoachContext'

type CoachModeContextValue = {
  mode: CoachMode
  setMode: (mode: CoachMode) => void
}

const CoachModeContext = createContext<CoachModeContextValue | null>(null)

export function CoachModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<CoachMode>('mock-team')

  return (
    <CoachModeContext.Provider value={{ mode, setMode }}>
      {children}
    </CoachModeContext.Provider>
  )
}

export function useCoachMode() {
  const ctx = useContext(CoachModeContext)
  if (!ctx) throw new Error('useCoachMode must be used within CoachModeProvider')
  return ctx
}
