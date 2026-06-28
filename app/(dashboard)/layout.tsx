'use client'
import { ClerkProvider, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { BotIcon, SettingsIcon, MenuIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

function DashboardSidebar({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-full w-56 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-5 border-b border-gray-200">
        <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight" onClick={onClose}>
          Replyr
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 md:hidden">
            <XIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        <Link
          href="/bots"
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <BotIcon className="h-4 w-4 text-gray-500" />
          Bots
        </Link>
        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <SettingsIcon className="h-4 w-4 text-gray-500" />
          Settings
        </Link>
      </nav>
      <div className="border-t border-gray-200 p-4">
        <UserButton showName />
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ClerkProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex md:shrink-0">
          <DashboardSidebar />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <aside className="relative z-50 flex flex-col">
              <DashboardSidebar onClose={() => setSidebarOpen(false)} />
            </aside>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile top bar */}
          <div className="flex h-14 items-center gap-3 border-b border-gray-200 bg-white px-4 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
            <Link href="/" className="text-lg font-bold text-blue-600 tracking-tight">Replyr</Link>
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
        </div>
      </div>
    </ClerkProvider>
  )
}
