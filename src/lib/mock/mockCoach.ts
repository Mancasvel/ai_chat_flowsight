import type { ProactiveInsight } from '@/lib/buildProactiveInsights'
import type { DemoTeam } from '@/lib/mock/demoData'

const THINK_MS = 650

export async function mockCoachReply(
  prompt: string,
  team: DemoTeam,
  insights: ProactiveInsight[]
): Promise<string> {
  await new Promise((r) => setTimeout(r, THINK_MS))

  const lower = prompt.toLowerCase()
  const { flow, meetings, planning, workflow, context } = team

  if (lower.includes('who') && (lower.includes('deep') || lower.includes('flow') || lower.includes('working'))) {
    const active = workflow.members.filter((m) => m.currentActivity)
    if (active.length === 0) {
      return `No one is in an active tracked block right now. Team flow score is ${flow.teamFlowScore}% today — check back after the morning standup.`
    }
    const lines = active.map((m) => {
      const a = m.currentActivity!
      return `• ${m.displayName}: ${a.description}${a.jiraTicketId ? ` (${a.jiraTicketId})` : ''}`
    })
    return `Right now ${active.length} teammate${active.length > 1 ? 's are' : ' is'} in flow:\n\n${lines.join('\n')}\n\nTeam flow score: ${flow.teamFlowScore}%.`
  }

  if (lower.includes('meeting') || lower.includes('calendar')) {
    const w = meetings.suggestedWindows[0]
    return `Meeting load is ${meetings.impact.meetingPct}% of tracked time this week — above the 30% threshold. Average post-meeting recovery is ${meetings.impact.avgRecoveryMin} minutes.\n\nBest focus window: ${w?.dayName ?? 'Tuesday'} ${w?.hour ?? 10}:00 — ${w?.reason ?? 'lowest meeting density'}.`
  }

  if (lower.includes('sprint') || lower.includes('plan') || lower.includes('delivery')) {
    const s = planning.sprints[planning.sprints.length - 1]
    if (!s) return 'No sprint data in this demo.'
    const pct = Math.round(s.efficiencyRatio * 100)
    return `${s.label} is at ${pct}% delivery efficiency. Committed ${s.committedHours}h, expected delivery ${s.expectedDelivery}h. Deep work accounts for ${s.deepHours}h so far — meetings ${s.meetingHours}h.`
  }

  if (lower.includes('burnout') || lower.includes('overload') || lower.includes('attention')) {
    const atRisk = context.members.filter((m) => m.burnoutIndex >= 60)
    if (atRisk.length === 0) return 'No burnout flags today — team cognitive load looks healthy.'
    const lines = atRisk.map(
      (m) => `• ${m.displayName}: burnout index ${m.burnoutIndex}${m.suggestion ? ` — ${m.suggestion}` : ''}`
    )
    return `Members needing attention:\n\n${lines.join('\n')}`
  }

  if (lower.includes('next') || lower.includes("what's next")) {
    const top = insights.slice(0, 3)
    return `Here's what I'd prioritise for ${team.name}:\n\n${top.map((i, n) => `${n + 1}. ${i.title} — ${i.body}`).join('\n\n')}`
  }

  const focus = insights.find((i) => i.kind === 'focus')
  if (focus) return `${focus.title}. ${focus.body}`

  const pick = insights[Math.floor(Math.random() * Math.min(insights.length, 3))]
  return pick
    ? `${pick.title}. ${pick.body}`
    : `Team flow is at ${flow.teamFlowScore}% today. Ask me about meetings, sprint delivery, or who's in deep work.`
}

export const MOCK_USAGE = {
  used: 42,
  limit: 250,
  remaining: 208,
  planId: 'teams_pro',
}
