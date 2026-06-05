export type DemoChatMessage = {
  id: string
  role: 'assistant' | 'user'
  content: string
}

const productEngineeringConversation: DemoChatMessage[] = [
  {
    id: 'demo-u-1',
    role: 'user',
    content:
      'Morning — sprint review is Thursday and I owe stakeholders a delivery update Friday. What should I know about Product Engineering before I prep?',
  },
  {
    id: 'demo-a-1',
    role: 'assistant',
    content: `Here's your pulse for Product Engineering going into Thursday:

**Team flow: 74% today** — up over the last week. Most of the team is in sustained work, but it's uneven.

**Sprint 24 · Cognitive dashboard** is tracking at **78% delivery efficiency** (218h expected of 280h committed). Deep work accounts for 98h so far; meetings have consumed 42h.

**Watch list**
• Sofia Lindström — 38% flow today, burnout index **78**. Four active backlogs and 44% of her week in meetings.
• James Okonkwo — warning zone (58). PROD-412 may slip if his Mon–Wed meeting load doesn't ease.

**Bright spot**
Yuki Tanaka is at **88% flow** — longest deep-work streak on the team this week (128 min).

Want me to go deeper on any of these, or sketch talking points for Friday?`,
  },
  {
    id: 'demo-u-2',
    role: 'user',
    content: "Who's actually in deep work right now?",
  },
  {
    id: 'demo-a-2',
    role: 'assistant',
    content: `Three teammates are in active tracked blocks:

• **Yuki Tanaka** — Auth middleware refactor (PROD-388) · ~70 min in flow
• **Maria Santos** — Dashboard wireframes v2 (DES-102) · ~45 min
• **Alex Chen** — PR #847 sprint API review (PROD-401) · ~15 min

James, Sofia, Tom, and Elena have no active block right now — Sofia and James both had fragmented mornings (short bursts under 25 min).

Team flow score: **74%**. Good moment for async updates instead of pulling people into another sync.`,
  },
  {
    id: 'demo-u-3',
    role: 'user',
    content: 'Sofia keeps slipping on PROD-412. What\'s actually going on with her?',
  },
  {
    id: 'demo-a-3',
    role: 'assistant',
    content: `Sofia's pattern this sprint points to **cognitive overload**, not capacity:

| Signal | Sofia | Team avg |
|--------|-------|----------|
| Flow score today | 38% | 74% |
| Burnout index | 78 (danger) | ~48 |
| Active backlogs | 4 | 2.1 |
| Context switches/day | 9 | 4.6 |
| Meeting ratio | 44% | 24% |

Her longest focus streak today was **22 minutes** — recovery after meetings averages **28 min** for her vs 16 min team-wide.

**What FlowSight suggests**
→ Protect a focus block **tomorrow 9:00–12:00** for PROD-412
→ Move stakeholder syncs to **Friday afternoon** when the team meeting density drops
→ Consider deferring PROD-412 to Thursday for James too — his Mon–Wed calendar is similarly packed

She's not underperforming; she's **context-switched out of delivery**. A calendar intervention will move the needle faster than a status ping.`,
  },
  {
    id: 'demo-u-4',
    role: 'user',
    content: 'How bad is meeting load hurting us this week?',
  },
  {
    id: 'demo-a-4',
    role: 'assistant',
    content: `Meeting load is **above the healthy threshold** for Product Engineering:

• **34%** of tracked time is in meetings (target: <30%)
• **38h** total meeting hours across the team
• **19 min** average post-meeting recovery before deep work resumes
• **6.5h** lost to fragmented "wasted" gaps between meetings

**Best focus windows I've found**
1. **Tuesday 10:00** — lowest meeting density; team averages 82% focus score at this hour
2. **Thursday 14:00** — post-lunch deep-work window before standup spillover

**Standup health:** avg 14 min (healthy), but **3 blockers raised vs 2 resolved** — one is still open going into mid-sprint.

**Cognitive cost this sprint (so far)**
Meetings $2,100 · Interruptions $890 · Context switching $1,200 → **$4,190 total**

If you protect Tuesday 10:00 as a no-meeting block, FlowSight estimates you'd recover ~4h of deep work across the team.`,
  },
  {
    id: 'demo-u-5',
    role: 'user',
    content: 'Can we still hit sprint commitments?',
  },
  {
    id: 'demo-a-5',
    role: 'assistant',
    content: `**Sprint 24 · Cognitive dashboard** — mid-sprint forecast:

| Metric | Value |
|--------|-------|
| Committed | 280h |
| Logged so far | 156h |
| Deep work | 98h (63% of logged) |
| Meetings | 42h |
| Interrupted work | 16h |
| **Delivery efficiency** | **78%** |
| **Expected delivery** | **218h of 280h** |

**Verdict:** You'll likely land **~78% of committed scope** unless you intervene before Thursday's review.

**Gap drivers**
1. Sofia + James — meeting-heavy calendars eating PROD-412 and related work
2. 16h of interrupted work — mostly Tue/Wed when sync density peaks
3. Standup blockers — one unresolved item may cascade into integration work

**Stress-test option:** If you descope the reporting polish items (~22h), delivery efficiency jumps to ~86% with current pace. I can break that down by ticket if useful.`,
  },
  {
    id: 'demo-u-6',
    role: 'user',
    content: 'If you were me, what would you do this week?',
  },
  {
    id: 'demo-a-6',
    role: 'assistant',
    content: `Here's the plan I'd run as PM for Product Engineering:

**Today**
1. Async standup — don't pull Yuki or Maria out of flow; they're your highest-output pair right now.
2. 15-min 1:1 with Sofia — not about status, about **calendar surgery**: move 2 recurring syncs to Friday PM.

**Tuesday**
3. **Protect 10:00–12:00 as team focus block** — lowest meeting density, highest historical flow scores.
4. Unblock the open standup item before it hits integration.

**Before Thursday review**
5. Stress-test scope with James on PROD-412 — defer to Thu or pair with Yuki (88% flow, same codebase area).
6. Prep stakeholder narrative: "78% delivery, cognitive dashboard core is on track, polish items at risk."

**Friday stakeholder sync**
Lead with: team flow up week-over-week, $4.2k cognitive cost visible and actionable, and a concrete experiment (Tuesday focus block) you're running next sprint.

You've got the data — this is a **calendar and scope** problem, not a people problem.`,
  },
]

const designSquadConversation: DemoChatMessage[] = [
  {
    id: 'demo-u-1',
    role: 'user',
    content: 'Quick check on Design Squad — we have a design review Friday. Anything I should flag?',
  },
  {
    id: 'demo-a-1',
    role: 'assistant',
    content: `Design Squad pulse for your Friday review:

**Team flow: 68%** — slightly below Product Engineering but stable.

**Sprint 8 · Design system** at **72% delivery efficiency** (86h expected of 120h committed). Deep work: 48h · meetings: 22h.

**Watch:** Lucas Meyer — burnout index **62**, 7 context switches/day, 35% meeting ratio. He's bouncing between Figma and Slack feedback loops.

**Bright spot:** Nina Park at **85% flow**, currently on component library tokens (DES-88).

Meeting load is **28%** — under threshold, but design reviews cluster Mon/Fri. **Wednesday 11:00** is your best focus window.`,
  },
  {
    id: 'demo-u-2',
    role: 'user',
    content: "What's Lucas struggling with specifically?",
  },
  {
    id: 'demo-a-2',
    role: 'assistant',
    content: `Lucas's friction is **async feedback fragmentation**:

• 3 active backlogs with overlapping stakeholder input
• 7 context switches/day (team avg: 5)
• Longest focus streak: **45 min** vs Nina's 102 min
• 35% of tracked time in meetings — mostly ad-hoc reviews

FlowSight suggests **batching feedback sessions** into two fixed windows (Tue/Thu PM) instead of continuous Slack pings. That alone could recover ~3h of deep design work this sprint.

His flow score (62%) is recoverable — this isn't burnout yet, it's **interrupt-driven**.`,
  },
  {
    id: 'demo-u-3',
    role: 'user',
    content: 'What would you recommend before Friday?',
  },
  {
    id: 'demo-a-3',
    role: 'assistant',
    content: `Three moves for Design Squad before Friday's review:

1. **Let Nina finish DES-88 uninterrupted** — she's your anchor deliverable and in flow right now.
2. **Batch Lucas's feedback** — one 30-min session Wed 11:00 (your quietest window) instead of async dribbles.
3. **Frame Friday around system tokens + components** — descope exploratory explorations if Lucas hasn't recovered 2+ focus blocks by Thu.

Cognitive cost so far: **$2,200** (meetings $1,100 · interruptions $420 · context $680). Cheaper than Product Engineering, but Lucas is where it's concentrating.`,
  },
]

const conversationsByTeam: Record<string, DemoChatMessage[]> = {
  'team-product': productEngineeringConversation,
  'team-design': designSquadConversation,
}

export function getDemoConversation(teamId: string): DemoChatMessage[] {
  return conversationsByTeam[teamId] ?? productEngineeringConversation
}
