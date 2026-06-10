import { OpenRouter } from '@openrouter/sdk'
import { loadTeamContext } from '@/lib/coach/loadTeamContext'

const MODEL = 'openrouter/owl-alpha'

export type CoachMessage = {
  role: 'user' | 'assistant'
  content: string
}

function teamFocusHint(teamId: string): string {
  if (teamId === 'team-design') {
    return 'The user is currently viewing the Design Squad team in the dashboard. Prioritize Design Squad data unless they ask about Product Engineering.'
  }
  return 'The user is currently viewing the Product Engineering team in the dashboard. Prioritize Product Engineering data unless they ask about Design Squad.'
}

export async function askFlowSightCoach(
  userMessage: string,
  teamId: string,
  history: CoachMessage[] = []
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured. Add it to .env.local (see .env.example).')
  }

  const openrouter = new OpenRouter({
    apiKey,
    appTitle: 'FlowSight Coach',
  })

  const systemPrompt = `${loadTeamContext()}\n\nACTIVE VIEW: ${teamFocusHint(teamId)}`

  const response = await openrouter.chat.send({
    chatRequest: {
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.slice(-12).map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage },
      ],
      temperature: 0.35,
      maxTokens: 900,
    },
  })

  const raw = response.choices[0]?.message?.content
  if (!raw) {
    throw new Error('The model returned an empty response.')
  }

  return typeof raw === 'string' ? raw : JSON.stringify(raw)
}
