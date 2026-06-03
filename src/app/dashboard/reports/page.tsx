'use client'

import { FileBarChart, TrendingUp, AlertTriangle, Calendar } from 'lucide-react'
import { useDemoTeam } from '@/context/DemoTeamContext'
import { buildProactiveInsights } from '@/lib/buildProactiveInsights'

export default function ReportsPage() {
  const { activeTeam } = useDemoTeam()
  const insights = buildProactiveInsights({
    flow: activeTeam.flow,
    context: activeTeam.context,
    planning: activeTeam.planning,
    meetings: activeTeam.meetings,
    workflow: activeTeam.workflow,
  })
  const sprint = activeTeam.planning.sprints[activeTeam.planning.sprints.length - 1]
  const atRisk = activeTeam.context.members.filter((m) => m.burnoutIndex >= 60)

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Team Report</h1>
        <p className="text-sm text-zinc-500">
          Weekly cognitive health summary · {activeTeam.name} · Demo data
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Team flow', value: `${activeTeam.flow.teamFlowScore}%`, icon: TrendingUp },
          { label: 'Meeting load', value: `${activeTeam.meetings.impact.meetingPct}%`, icon: Calendar },
          { label: 'Sprint efficiency', value: sprint ? `${Math.round(sprint.efficiencyRatio * 100)}%` : '—', icon: FileBarChart },
          { label: 'At-risk members', value: String(atRisk.length), icon: AlertTriangle },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-card">
            <Icon size={18} className="mb-2 text-zinc-400" />
            <p className="text-2xl font-bold text-zinc-900">{value}</p>
            <p className="text-xs text-zinc-500">{label}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-card">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">Executive summary</h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          {activeTeam.name} is at {activeTeam.flow.teamFlowScore}% collective flow today.
          {atRisk.length > 0
            ? ` ${atRisk.map((m) => m.displayName.split(' ')[0]).join(', ')} show elevated cognitive load — consider async updates and protected focus blocks.`
            : ' Cognitive load is healthy across the team.'}
          {sprint &&
            ` ${sprint.label} is tracking at ${Math.round(sprint.efficiencyRatio * 100)}% delivery efficiency.`}
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-card">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">Proactive insights</h2>
        <ul className="space-y-4">
          {insights.slice(0, 6).map((i) => (
            <li key={i.id} className="border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
              <p className="text-sm font-medium text-zinc-900">{i.title}</p>
              <p className="mt-1 text-sm text-zinc-600">{i.body}</p>
              <p className="mt-1 text-[11px] text-zinc-400">{i.timeLabel}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6">
        <h2 className="mb-2 text-lg font-semibold text-indigo-950">Teams Pro feature</h2>
        <p className="text-sm text-indigo-900/80">
          In production, this report is emailed every Monday as a full executive digest with AI
          narrative — included in FlowSight Teams Pro.
        </p>
      </section>
    </div>
  )
}
