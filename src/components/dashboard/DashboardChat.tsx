'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { Paperclip, SendHorizonal, Sparkles, User } from 'lucide-react'
import ChatMessageContent from '@/components/dashboard/ChatMessageContent'
import { MOCK_USAGE } from '@/lib/mock/mockCoach'
import { useDemoTeam } from '@/context/DemoTeamContext'

const MAX_CHARS = 500

type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  content: string
}

export default function DashboardChat() {
  const { activeTeam } = useDemoTeam()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([])
  }, [activeTeam.id])

  const quickPrompts = useMemo(
    () => [
      "What's next for my team?",
      "Who's in deep work right now?",
      'How are meetings affecting focus?',
      'Anyone at burnout risk?',
    ],
    []
  )

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    })
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || sending) return

      setSending(true)
      setInput('')
      const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: trimmed }
      const history = messages.map(({ role, content }) => ({ role, content }))
      setMessages((prev) => [...prev, userMsg])
      scrollToBottom()

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            teamId: activeTeam.id,
            history,
          }),
        })

        const data = (await res.json()) as { reply?: string; error?: string }
        const reply =
          res.ok && data.reply
            ? data.reply
            : data.error ?? 'Could not reach FlowSight coach. Check OPENROUTER_API_KEY in .env.local.'

        setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: reply }])
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            content: 'Network error — could not reach the FlowSight coach. Try again in a moment.',
          },
        ])
      }

      setSending(false)
      scrollToBottom()
    },
    [activeTeam.id, messages, scrollToBottom, sending]
  )

  const hasConversation = messages.length > 0
  const usage = MOCK_USAGE

  return (
    <div className="flex w-full flex-col font-sans">
      <p className="mb-3 text-center text-[11px] tabular-nums text-zinc-400">
        Coach: {usage.used}/{usage.limit} prompts · powered by owl-alpha
      </p>

      {hasConversation && (
        <div ref={scrollRef} className="mb-6 max-h-[min(55vh,640px)] space-y-5 overflow-y-auto dark-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.role === 'assistant' ? (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white">
                  <Image src="/flowsight_sinfondo.png" alt="FlowSight" width={16} height={16} />
                </div>
              ) : (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-zinc-500">
                  <User className="h-3.5 w-3.5" strokeWidth={1.75} />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-4 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' ? 'bg-zinc-900 text-white' : 'bg-zinc-50 text-zinc-700'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <ChatMessageContent content={msg.content} />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white">
                <Image
                  src="/flowsight_sinfondo.png"
                  alt="FlowSight"
                  width={16}
                  height={16}
                  className="animate-pulse"
                />
              </div>
              <div className="rounded-xl bg-zinc-50 px-4 py-2.5 text-[13.5px] text-zinc-400">
                Thinking…
              </div>
            </div>
          )}
        </div>
      )}

      {!hasConversation && (
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/flowsight_sinfondo.png"
            alt="FlowSight"
            width={200}
            height={200}
            className="mb-8"
          />
          <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900">
            Ask your team
          </h1>
          <p className="mt-1.5 max-w-sm text-[13px] text-zinc-400">
            Flow, focus, meetings, sprint delivery — ask anything about your team.
          </p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(input)
        }}
        className="relative rounded-2xl border border-zinc-200 bg-white shadow-sm transition-colors focus-within:border-zinc-300"
      >
        <label htmlFor="dashboard-chat-input" className="sr-only">
          Message FlowSight AI
        </label>
        <textarea
          id="dashboard-chat-input"
          rows={2}
          value={input}
          maxLength={MAX_CHARS}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your team anything…"
          className="w-full resize-none bg-transparent px-5 pt-4 pb-14 text-[14px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage(input)
            }
          }}
        />
        <span className="pointer-events-none absolute left-5 bottom-[3.5rem] text-[11px] tabular-nums text-zinc-300">
          {input.length}/{MAX_CHARS}
        </span>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
              aria-label="AI suggestions"
            >
              <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
              aria-label="Add attachment"
            >
              <Paperclip className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 disabled:text-zinc-300 disabled:hover:bg-transparent"
            aria-label="Send message"
          >
            <SendHorizonal className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </form>

      {!hasConversation && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {quickPrompts.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => sendMessage(q)}
              className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
