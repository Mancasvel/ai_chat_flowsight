import Link from 'next/link'
import { CreditCard, Bell, Shield } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>
        <p className="text-sm text-zinc-500">Demo preview — settings are not persisted</p>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center gap-3">
          <CreditCard className="text-indigo-600" size={22} />
          <div>
            <h2 className="font-semibold text-zinc-900">License</h2>
            <p className="text-sm text-zinc-500">Teams Pro · Demo</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-zinc-50 p-3">
            <p className="text-xs text-zinc-500">Plan</p>
            <p className="font-semibold text-zinc-900">Teams Pro</p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3">
            <p className="text-xs text-zinc-500">Members</p>
            <p className="font-semibold text-zinc-900">7 / 15</p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3">
            <p className="text-xs text-zinc-500">Coach</p>
            <p className="font-semibold text-zinc-900">250 / mo</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center gap-3">
          <Bell className="text-indigo-600" size={22} />
          <h2 className="font-semibold text-zinc-900">Weekly report email</h2>
        </div>
        <p className="text-sm text-zinc-600">
          Every Monday at 09:00 · Encrypted recipient list · Full team cognitive health digest
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center gap-3">
          <Shield className="text-indigo-600" size={22} />
          <h2 className="font-semibold text-zinc-900">Privacy</h2>
        </div>
        <p className="text-sm text-zinc-600">
          100% local tracking on device. Cloud receives only text metadata you choose to sync — no
          screenshots, no keystrokes.
        </p>
      </section>

      <p className="text-center text-sm text-zinc-500">
        Ready for your team?{' '}
        <Link href="https://flowsight.site" className="font-medium text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
          Start at flowsight.site
        </Link>
      </p>
    </div>
  )
}
