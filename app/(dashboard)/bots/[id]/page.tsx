'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'
import type { Workspace } from '@/models/types'
import { DocumentsTab } from './DocumentsTab'
import { ConversationsTab } from './ConversationsTab'
import { AppearanceTab } from './AppearanceTab'
import { EmbedTab } from './EmbedTab'

type Tab = 'documents' | 'appearance' | 'conversations' | 'embed'

export default function BotDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [bot, setBot] = useState<Workspace | null>(null)
  const [tab, setTab] = useState<Tab>('documents')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/bots/${id}`)
      .then((r) => r.json())
      .then((data) => { setBot(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="flex justify-center py-20 text-gray-400">Loading…</div>
  }
  if (!bot) {
    return (
      <div className="flex flex-col items-center py-20 text-gray-500">
        <p>Bot not found.</p>
        <Link href="/bots" className="mt-3 text-sm text-blue-600 hover:underline">← Back to bots</Link>
      </div>
    )
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'documents', label: 'Documents' },
    { key: 'appearance', label: 'Appearance' },
    { key: 'conversations', label: 'Conversations' },
    { key: 'embed', label: 'Embed' },
  ]

  return (
    <div>
      <Link href="/bots" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors w-fit">
        <ChevronLeftIcon className="h-4 w-4" /> Bots
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white font-bold text-lg"
          style={{ backgroundColor: bot.widgetConfig.primaryColor }}
        >
          {bot.name[0]?.toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{bot.name}</h1>
          <p className="text-xs text-gray-400 font-mono">{bot.publicKey}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b border-gray-200">
        <nav className="flex gap-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {tab === 'documents' && <DocumentsTab botId={id} key={id} />}
        {tab === 'appearance' && <AppearanceTab bot={bot} onUpdate={setBot} />}
        {tab === 'conversations' && <ConversationsTab botId={id} key={id} />}
        {tab === 'embed' && <EmbedTab bot={bot} />}
      </div>
    </div>
  )
}


