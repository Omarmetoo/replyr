'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PlusIcon, BotIcon, ArrowRightIcon } from 'lucide-react'
import type { Workspace } from '@/models/types'

export default function BotsPage() {
  const [bots, setBots] = useState<Workspace[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  async function loadBots() {
    setLoading(true)
    const res = await fetch('/api/bots')
    if (res.ok) setBots(await res.json())
    setLoading(false)
  }

  useEffect(() => { loadBots() }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return
    setCreating(true)
    setError('')
    const res = await fetch('/api/bots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    })
    if (res.ok) {
      setNewName('')
      setShowCreate(false)
      await loadBots()
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create bot')
    }
    setCreating(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Bots</h1>
          <p className="mt-1 text-sm text-gray-500">Create and manage your AI support bots.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
          Create bot
        </button>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">Create a new bot</h2>
            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bot name</label>
                <input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Acme Support"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowCreate(false); setNewName(''); setError('') }}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !newName.trim()}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {creating ? 'Creating…' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bot list */}
      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center py-16 text-gray-400">Loading…</div>
        ) : bots.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-20 text-center">
            <BotIcon className="h-10 w-10 text-gray-300" />
            <p className="mt-3 text-sm font-medium text-gray-500">No bots yet</p>
            <p className="mt-1 text-xs text-gray-400">Create your first bot to get started.</p>
            <button
              onClick={() => setShowCreate(true)}
              className="mt-5 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4" /> Create bot
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bots.map((bot) => (
              <Link
                key={bot._id}
                href={`/bots/${bot._id}`}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-white text-sm font-bold"
                    style={{ backgroundColor: bot.widgetConfig.primaryColor }}
                  >
                    {bot.name[0]?.toUpperCase()}
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="mt-3 font-semibold text-gray-900">{bot.name}</h3>
                <p className="mt-1 text-xs text-gray-400 font-mono truncate">{bot.publicKey}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    bot.status === 'active'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {bot.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
