import { DemoTeamProvider } from '@/context/DemoTeamContext'
import { DemoBanner } from '@/components/DemoBanner'
import AnalyticsSidebar from '@/components/dashboard/AnalyticsSidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoTeamProvider>
      <div id="dashboard-shell" className="min-h-screen bg-[#FAFAFA] font-sans antialiased">
        <DemoBanner />
        <AnalyticsSidebar />
        <main className="min-h-screen overflow-auto pt-[6.5rem] dark-scrollbar">
          <div className="px-4 pb-6 sm:px-6 lg:px-10 lg:pb-8">{children}</div>
        </main>
      </div>
    </DemoTeamProvider>
  )
}
