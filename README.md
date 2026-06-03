# FlowSight AI Chat — Interactive Demo

Public demo of the **FlowSight team dashboard**: AI coach, focus signals, meeting load, sprint pulse, and burnout alerts — **no login, no database**.

🔗 **Live demo:** deploy to Vercel or run locally (see below)

## What you can try

- **AI Coach** — ask about focus, meetings, sprint delivery, burnout risk
- **Team switcher** — Product Engineering vs Design Squad (mock data)
- **Team Report** — weekly-style summary with proactive insights
- **Quick prompts** — one-click questions to explore the coach

All responses use **realistic sample data** and the same insight engine as production (`buildProactiveInsights`).

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## Stack

- Next.js 16 · React 18 · Tailwind CSS
- No Supabase, Stripe, or API keys required

## Production product

This repo is a **demo slice** of [FlowSight](https://flowsight.site) — privacy-first cognitive health for teams.

---

MIT · FlowSight
