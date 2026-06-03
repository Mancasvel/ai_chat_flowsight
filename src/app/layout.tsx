import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FlowSight Demo — AI Team Coach',
  description:
    'Interactive demo of the FlowSight dashboard: cognitive health, focus signals, and AI coach for your team.',
  openGraph: {
    title: 'FlowSight Demo',
    description: 'See how FlowSight helps teams protect focus and spot burnout early.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen bg-[#FAFAFA] font-sans antialiased">{children}</body>
    </html>
  )
}
