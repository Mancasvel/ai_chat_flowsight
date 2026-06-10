import { NextResponse } from 'next/server'
import { askFlowSightCoach, type CoachMessage } from '@/lib/coach/flowsightCoach'

type ChatRequestBody = {
  message?: string
  teamId?: string
  history?: CoachMessage[]
}

export async function POST(request: Request) {
  let body: ChatRequestBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const message = body.message?.trim()
  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }

  const teamId = body.teamId ?? 'team-product'
  const history = Array.isArray(body.history) ? body.history : []

  try {
    const reply = await askFlowSightCoach(message, teamId, history)
    return NextResponse.json({ reply })
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'Unknown error'
    const status = detail.includes('OPENROUTER_API_KEY') ? 503 : 502
    return NextResponse.json({ error: detail }, { status })
  }
}
