import type {
  FlowStateData,
  ContextLoadData,
  PlanningData,
  MeetingsData,
  WorkflowData,
} from '@/lib/types/dashboard'

export type DemoTeam = {
  id: string
  name: string
  flow: FlowStateData
  context: ContextLoadData
  planning: PlanningData
  meetings: MeetingsData
  workflow: WorkflowData
}

function trend30d(base: number): FlowStateData['trend30d'] {
  const days: FlowStateData['trend30d'] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const noise = Math.sin(i * 0.4) * 8 + (29 - i) * 0.3
    days.push({
      date: d.toISOString().slice(0, 10),
      score: Math.round(Math.min(92, Math.max(48, base + noise))),
    })
  }
  return days
}

const productEngineering: DemoTeam = {
  id: 'team-product',
  name: 'Product Engineering',
  flow: {
    teamFlowScore: 74,
    trend30d: trend30d(62),
    members: [
      { userId: 'u1', displayName: 'Alex Chen', avatarUrl: '', flowScoreToday: 82, timelineToday: [], longestStreakMin: 94, recoveryTimeAvg: 12 },
      { userId: 'u2', displayName: 'Maria Santos', avatarUrl: '', flowScoreToday: 78, timelineToday: [], longestStreakMin: 110, recoveryTimeAvg: 15 },
      { userId: 'u3', displayName: 'James Okonkwo', avatarUrl: '', flowScoreToday: 71, timelineToday: [], longestStreakMin: 67, recoveryTimeAvg: 18 },
      { userId: 'u4', displayName: 'Sofia Lindström', avatarUrl: '', flowScoreToday: 38, timelineToday: [], longestStreakMin: 22, recoveryTimeAvg: 28 },
      { userId: 'u5', displayName: 'Tom Bradley', avatarUrl: '', flowScoreToday: 69, timelineToday: [], longestStreakMin: 55, recoveryTimeAvg: 14 },
      { userId: 'u6', displayName: 'Yuki Tanaka', avatarUrl: '', flowScoreToday: 88, timelineToday: [], longestStreakMin: 128, recoveryTimeAvg: 10 },
      { userId: 'u7', displayName: 'Elena Rossi', avatarUrl: '', flowScoreToday: 76, timelineToday: [], longestStreakMin: 88, recoveryTimeAvg: 16 },
    ],
  },
  context: {
    members: [
      { userId: 'u1', displayName: 'Alex Chen', avatarUrl: '', activeBacklogs: 2, contextSwitchesPerDay: 4, focusStreakHistory: [3, 4, 5, 4], burnoutIndex: 42, burnoutLevel: 'healthy', meetingRatio: 0.22, suggestion: null },
      { userId: 'u2', displayName: 'Maria Santos', avatarUrl: '', activeBacklogs: 2, contextSwitchesPerDay: 3, focusStreakHistory: [5, 5, 4, 5], burnoutIndex: 35, burnoutLevel: 'healthy', meetingRatio: 0.18, suggestion: null },
      { userId: 'u3', displayName: 'James Okonkwo', avatarUrl: '', activeBacklogs: 3, contextSwitchesPerDay: 6, focusStreakHistory: [2, 3, 3, 4], burnoutIndex: 58, burnoutLevel: 'warning', meetingRatio: 0.31, suggestion: 'Consider deferring PROD-412 until Thursday — meeting load is high Mon–Wed.' },
      { userId: 'u4', displayName: 'Sofia Lindström', avatarUrl: '', activeBacklogs: 4, contextSwitchesPerDay: 9, focusStreakHistory: [1, 2, 1, 2], burnoutIndex: 78, burnoutLevel: 'danger', meetingRatio: 0.44, suggestion: 'Sofia has 4 active backlogs and 9 context switches/day. A focus block tomorrow 9–12 would help.' },
      { userId: 'u5', displayName: 'Tom Bradley', avatarUrl: '', activeBacklogs: 2, contextSwitchesPerDay: 5, focusStreakHistory: [3, 3, 4, 3], burnoutIndex: 48, burnoutLevel: 'healthy', meetingRatio: 0.25, suggestion: null },
      { userId: 'u6', displayName: 'Yuki Tanaka', avatarUrl: '', activeBacklogs: 1, contextSwitchesPerDay: 2, focusStreakHistory: [6, 5, 6, 5], burnoutIndex: 28, burnoutLevel: 'healthy', meetingRatio: 0.12, suggestion: null },
      { userId: 'u7', displayName: 'Elena Rossi', avatarUrl: '', activeBacklogs: 2, contextSwitchesPerDay: 4, focusStreakHistory: [4, 4, 3, 4], burnoutIndex: 45, burnoutLevel: 'healthy', meetingRatio: 0.2, suggestion: null },
    ],
  },
  planning: {
    sprints: [
      {
        label: 'Sprint 24 · Cognitive dashboard',
        sprintId: 's24',
        committedHours: 280,
        actualHours: 156,
        deepHours: 98,
        meetingHours: 42,
        interruptedHours: 16,
        efficiencyRatio: 0.78,
        expectedDelivery: 218,
      },
    ],
    estimations: [],
    costBreakdown: { meetingsCost: 2100, interruptionCost: 890, contextCost: 1200, total: 4190 },
    perPersonGap: [],
    costPerHour: 50,
  },
  meetings: {
    impact: {
      totalMeetingHours: 38,
      meetingPct: 34,
      avgRecoveryMin: 19,
      wastedFragmentsHours: 6.5,
    },
    focusHeatmap: [],
    suggestedWindows: [
      { day: 2, dayName: 'Tuesday', hour: 10, intensity: 0.88, reason: 'Lowest meeting density · team avg 82% focus score at 10:00.' },
      { day: 4, dayName: 'Thursday', hour: 14, intensity: 0.79, reason: 'Post-lunch deep work window before standup spillover.' },
    ],
    flaggedWindows: [],
    standupHealth: { avgDurationMin: 14, blockersRaised: 3, blockersResolved: 2 },
  },
  workflow: {
    members: [
      {
        userId: 'u6',
        displayName: 'Yuki Tanaka',
        avatarUrl: '',
        currentActivity: { category: 'Coding', description: 'Auth middleware refactor', jiraTicketId: 'PROD-388', capturedAt: new Date().toISOString(), durationSeconds: 4200 },
        entries: [],
      },
      {
        userId: 'u2',
        displayName: 'Maria Santos',
        avatarUrl: '',
        currentActivity: { category: 'Design', description: 'Dashboard wireframes v2', jiraTicketId: 'DES-102', capturedAt: new Date().toISOString(), durationSeconds: 2700 },
        entries: [],
      },
      {
        userId: 'u1',
        displayName: 'Alex Chen',
        avatarUrl: '',
        currentActivity: { category: 'CodeReview', description: 'PR #847 — sprint API', jiraTicketId: 'PROD-401', capturedAt: new Date().toISOString(), durationSeconds: 900 },
        entries: [],
      },
      { userId: 'u3', displayName: 'James Okonkwo', avatarUrl: '', currentActivity: null, entries: [] },
      { userId: 'u4', displayName: 'Sofia Lindström', avatarUrl: '', currentActivity: null, entries: [] },
      { userId: 'u5', displayName: 'Tom Bradley', avatarUrl: '', currentActivity: null, entries: [] },
      { userId: 'u7', displayName: 'Elena Rossi', avatarUrl: '', currentActivity: null, entries: [] },
    ],
  },
}

const designSquad: DemoTeam = {
  id: 'team-design',
  name: 'Design Squad',
  flow: {
    teamFlowScore: 68,
    trend30d: trend30d(58),
    members: [
      { userId: 'd1', displayName: 'Nina Park', avatarUrl: '', flowScoreToday: 85, timelineToday: [], longestStreakMin: 102, recoveryTimeAvg: 11 },
      { userId: 'd2', displayName: 'Lucas Meyer', avatarUrl: '', flowScoreToday: 62, timelineToday: [], longestStreakMin: 45, recoveryTimeAvg: 22 },
      { userId: 'd3', displayName: 'Amira Hassan', avatarUrl: '', flowScoreToday: 58, timelineToday: [], longestStreakMin: 38, recoveryTimeAvg: 20 },
    ],
  },
  context: {
    members: [
      { userId: 'd1', displayName: 'Nina Park', avatarUrl: '', activeBacklogs: 1, contextSwitchesPerDay: 3, focusStreakHistory: [5, 5, 4], burnoutIndex: 32, burnoutLevel: 'healthy', meetingRatio: 0.15, suggestion: null },
      { userId: 'd2', displayName: 'Lucas Meyer', avatarUrl: '', activeBacklogs: 3, contextSwitchesPerDay: 7, focusStreakHistory: [2, 2, 3], burnoutIndex: 62, burnoutLevel: 'warning', meetingRatio: 0.35, suggestion: 'Lucas is context-switching heavily between Figma and Slack — batch feedback sessions.' },
      { userId: 'd3', displayName: 'Amira Hassan', avatarUrl: '', activeBacklogs: 2, contextSwitchesPerDay: 5, focusStreakHistory: [3, 3, 2], burnoutIndex: 55, burnoutLevel: 'warning', meetingRatio: 0.28, suggestion: null },
    ],
  },
  planning: {
    sprints: [
      {
        label: 'Sprint 8 · Design system',
        sprintId: 'ds8',
        committedHours: 120,
        actualHours: 72,
        deepHours: 48,
        meetingHours: 22,
        interruptedHours: 8,
        efficiencyRatio: 0.72,
        expectedDelivery: 86,
      },
    ],
    estimations: [],
    costBreakdown: { meetingsCost: 1100, interruptionCost: 420, contextCost: 680, total: 2200 },
    perPersonGap: [],
    costPerHour: 50,
  },
  meetings: {
    impact: { totalMeetingHours: 18, meetingPct: 28, avgRecoveryMin: 16, wastedFragmentsHours: 3.2 },
    focusHeatmap: [],
    suggestedWindows: [
      { day: 3, dayName: 'Wednesday', hour: 11, intensity: 0.85, reason: 'Design reviews cluster on Mon/Fri — Wed mid-morning is quietest.' },
    ],
    flaggedWindows: [],
    standupHealth: { avgDurationMin: 12, blockersRaised: 1, blockersResolved: 1 },
  },
  workflow: {
    members: [
      {
        userId: 'd1',
        displayName: 'Nina Park',
        avatarUrl: '',
        currentActivity: { category: 'Design', description: 'Component library tokens', jiraTicketId: 'DES-88', capturedAt: new Date().toISOString(), durationSeconds: 3600 },
        entries: [],
      },
    ],
  },
}

export const DEMO_USER = {
  avatarUrl: null as string | null,
  role: 'pm' as const,
}

export const DEMO_TEAMS: DemoTeam[] = [productEngineering, designSquad]

export function getDemoTeam(teamId: string): DemoTeam {
  return DEMO_TEAMS.find((t) => t.id === teamId) ?? DEMO_TEAMS[0]
}

export const WEEKLY_REPORT_MOCK = {
  teamName: 'Product Engineering',
  weekLabel: '17 Mar – 23 Mar 2026',
  teamFlowScore: 74,
  trend: '+8 pts vs last week',
  meetingPct: 34,
  sprintEfficiency: 78,
  highlights: [
    'Yuki Tanaka led the team with 88% flow score — sustained deep work on PROD-388.',
    'Sprint 24 is tracking at 78% delivery efficiency with 218h expected of 280h committed.',
    'Sofia Lindström needs attention: burnout index 78, 4 backlogs, 44% meeting ratio.',
  ],
  recommendations: [
    'Protect Tuesday 10:00 as a team focus block — lowest meeting density.',
    'Move Sofia’s stakeholder syncs to Friday afternoon.',
    'Stress-test remaining sprint scope before mid-sprint review Thursday.',
  ],
}
