'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { DEMO_TEAMS, type DemoTeam } from '@/lib/mock/demoData'

type DemoTeamContextValue = {
  teams: { id: string; name: string }[]
  activeTeamId: string
  activeTeam: DemoTeam
  setActiveTeamId: (id: string) => void
}

const DemoTeamContext = createContext<DemoTeamContextValue | null>(null)

export function DemoTeamProvider({ children }: { children: ReactNode }) {
  const [activeTeamId, setActiveTeamId] = useState(DEMO_TEAMS[0].id)
  const activeTeam = DEMO_TEAMS.find((t) => t.id === activeTeamId) ?? DEMO_TEAMS[0]

  return (
    <DemoTeamContext.Provider
      value={{
        teams: DEMO_TEAMS.map((t) => ({ id: t.id, name: t.name })),
        activeTeamId,
        activeTeam,
        setActiveTeamId,
      }}
    >
      {children}
    </DemoTeamContext.Provider>
  )
}

export function useDemoTeam() {
  const ctx = useContext(DemoTeamContext)
  if (!ctx) throw new Error('useDemoTeam must be used within DemoTeamProvider')
  return ctx
}
