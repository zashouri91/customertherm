import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { DashboardSidebar } from '@/components/dashboard-sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard',
  description: 'Manage and analyze your customer feedback',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <>
        <div className="relative flex min-h-screen">
          <DashboardSidebar />
          <main className="flex-1">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
        <Toaster />
      </>
    </ThemeProvider>
  )
}
