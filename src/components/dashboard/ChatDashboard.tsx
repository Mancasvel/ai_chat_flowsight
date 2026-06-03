'use client'

import DashboardChat from '@/components/dashboard/DashboardChat'
import { buildProactiveInsights } from '@/lib/buildProactiveInsights'
import { useDemoTeam } from '@/context/DemoTeamContext'

export default function ChatDashboard() {
  const { activeTeam } = useDemoTeam()
  const insights = buildProactiveInsights({
    flow: activeTeam.flow,
    context: activeTeam.context,
    planning: activeTeam.planning,
    meetings: activeTeam.meetings,
    workflow: activeTeam.workflow,
  })

  return (
    <div className="relative -mx-4 min-h-[calc(100vh-6.5rem)] sm:-mx-6 lg:-mx-10">
      <div
        className="pointer-events-none absolute inset-0 bg-dashboard-grid [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,#000_20%,transparent_100%)]"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-[calc(100vh-6.5rem)] items-center justify-center px-4 pb-6 font-sans sm:px-6 lg:px-10 lg:pb-8">
        <div className="w-full max-w-2xl">
          <DashboardChat insights={insights} />
        </div>
      </div>
    </div>
  )
}
