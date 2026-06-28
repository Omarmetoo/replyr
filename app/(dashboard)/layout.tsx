import { ClerkProvider, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { BotIcon, SettingsIcon } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="flex w-56 flex-col border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center px-5 border-b border-gray-200">
          <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
            Replyr
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          <Link
            href="/bots"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <BotIcon className="h-4 w-4 text-gray-500" />
            Bots
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <SettingsIcon className="h-4 w-4 text-gray-500" />
            Settings
          </Link>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <UserButton showName />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
    </ClerkProvider>
  )
}
