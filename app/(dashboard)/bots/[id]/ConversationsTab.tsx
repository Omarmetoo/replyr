'use client'

import { useEffect, useState } from 'react'
import type { Conversation, Message, Lead } from '@/models/types'

type Detail = {
  conversation: Conversation
  messages: Message[]
  lead: Lead | null
}

const STATUS_STYLE: Record<Conversation['status'], string> = {
  open: 'bg-green-100 text-green-700',
  handoff_requested: 'bg-orange-100 text-orange-700',
  closed: 'bg-gray-100 text-gray-500',
}
const STATUS_LABEL: Record<Conversation['status'], string> = {
  open: 'Open',
  handoff_requested: 'Handoff',
  closed: 'Closed',
}

export function ConversationsTab({ botId }: { botId: string }) {
  const [convs, setConvs] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<Detail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [marking, setMarking] = useState(false)

  useEffect(() => {
    fetch(`/api/bots/${botId}/conversations`)
      .then((r) => r.json())
      .then((data) => { setConvs(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [botId])

  async function openConversation(conv: Conversation) {
    setDetailLoading(true)
    try {
      const res = await fetch(`/api/bots/${botId}/conversations/${conv._id}`)
      setDetail(await res.json())
    } finally {
      setDetailLoading(false)
    }
  }

  async function markHandled() {
    if (!detail?.lead) return
    setMarking(true)
    try {
      await fetch(`/api/bots/${botId}/conversations/${detail.conversation._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: detail.lead._id, leadStatus: 'handled' }),
      })
      setDetail((d) => d && d.lead ? { ...d, lead: { ...d.lead, status: 'handled' } } : d)
    } finally {
      setMarking(false)
    }
  }

  if (loading) {
    return <div className="py-10 text-center text-gray-400 text-sm">Loading conversations…</div>
  }

  if (convs.length === 0) {
    return (
      <div className="py-16 text-center text-gray-400">
        <p className="text-4xl mb-3">💬</p>
        <p className="font-medium text-gray-700">No conversations yet</p>
        <p className="text-sm mt-1">Conversations appear here once visitors chat with your bot.</p>
      </div>
    )
  }

  return (
    <div className="flex gap-4" style={{ height: '600px' }}>
      {/* Sidebar list */}
      <div className="w-64 flex-shrink-0 border border-gray-200 rounded-xl overflow-y-auto">
        {convs.map((conv) => (
          <button
            key={conv._id}
            onClick={() => openConversation(conv)}
            className={`w-full text-left p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${
              detail?.conversation._id === conv._id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLE[conv.status]}`}
              >
                {STATUS_LABEL[conv.status]}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(conv.lastMessageAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono truncate">{conv.visitorId}</p>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="flex-1 border border-gray-200 rounded-xl flex flex-col overflow-hidden min-w-0">
        {detailLoading && (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Loading…</div>
        )}

        {!detailLoading && !detail && (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Select a conversation
          </div>
        )}

        {!detailLoading && detail && (
          <>
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <div>
                <p className="text-sm font-semibold text-gray-900">Visitor</p>
                <p className="text-xs text-gray-400 font-mono">{detail.conversation.visitorId}</p>
              </div>
              {detail.lead?.status === 'new' && (
                <button
                  onClick={markHandled}
                  disabled={marking}
                  className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {marking ? 'Marking…' : 'Mark as handled'}
                </button>
              )}
              {detail.lead?.status === 'handled' && (
                <span className="text-xs text-green-600 font-medium">✓ Handled</span>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {detail.messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Lead card */}
            {detail.lead && (
              <div className="border-t border-orange-100 p-4 flex-shrink-0 bg-orange-50">
                <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-2">
                  Handoff request
                </p>
                <p className="text-sm font-medium text-gray-900">{detail.lead.email}</p>
                {detail.lead.message && (
                  <p className="text-sm text-gray-600 mt-1">{detail.lead.message}</p>
                )}
                <p className="text-xs text-gray-400 mt-1.5">
                  {new Date(detail.lead.createdAt).toLocaleString()}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
