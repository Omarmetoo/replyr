'use client'

import { useState } from 'react'
import type { Workspace, WidgetConfig } from '@/models/types'

interface Props {
  bot: Workspace
  onUpdate: (b: Workspace) => void
}

export function AppearanceTab({ bot, onUpdate }: Props) {
  const [form, setForm] = useState<WidgetConfig>({ ...bot.widgetConfig })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function set<K extends keyof WidgetConfig>(key: K, value: WidgetConfig[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  async function save() {
    setSaving(true)
    try {
      const res = await fetch(`/api/bots/${bot._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ widgetConfig: form }),
      })
      if (!res.ok) throw new Error('save failed')
      onUpdate({ ...bot, widgetConfig: form })
      setSaved(true)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex gap-10 items-start">
      {/* ── Form ── */}
      <div className="flex-1 space-y-6 max-w-md">
        {/* Bot name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Bot Name</label>
          <input
            type="text"
            value={form.botName}
            onChange={(e) => set('botName', (e.target as HTMLInputElement).value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Support Bot"
          />
        </div>

        {/* Greeting */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Greeting Message</label>
          <textarea
            value={form.greeting}
            onChange={(e) => set('greeting', (e.target as HTMLTextAreaElement).value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Hi! How can I help you today?"
          />
        </div>

        {/* Primary color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={form.primaryColor}
              onChange={(e) => set('primaryColor', (e.target as HTMLInputElement).value)}
              className="h-9 w-14 cursor-pointer rounded border border-gray-300 p-0.5"
            />
            <input
              type="text"
              value={form.primaryColor}
              onChange={(e) => {
                const val = (e.target as HTMLInputElement).value
                if (/^#[0-9a-fA-F]{0,6}$/.test(val)) set('primaryColor', val)
              }}
              className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#2563eb"
            />
          </div>
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Widget Position</label>
          <div className="flex gap-3">
            {(['bottom-right', 'bottom-left'] as const).map((pos) => (
              <button
                key={pos}
                onClick={() => set('position', pos)}
                className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                  form.position === pos
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {pos === 'bottom-right' ? '↘ Bottom Right' : '↙ Bottom Left'}
              </button>
            ))}
          </div>
        </div>

        {/* Logo URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Logo URL <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input
            type="url"
            value={form.logoUrl ?? ''}
            onChange={(e) => set('logoUrl', (e.target as HTMLInputElement).value || undefined)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/logo.png"
          />
        </div>

        <button
          onClick={save}
          disabled={saving}
          className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-colors ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
          }`}
        >
          {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save changes'}
        </button>
      </div>

      {/* ── Live preview ── */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Preview</p>
        <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
          {/* Mini chat panel */}
          <div className="absolute bottom-16 right-3 w-56 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col" style={{ height: '280px' }}>
            {/* Header */}
            <div
              className="px-3 py-2.5 flex items-center justify-between flex-shrink-0"
              style={{ background: form.primaryColor }}
            >
              <div className="flex items-center gap-2">
                {form.logoUrl && (
                  <img src={form.logoUrl} alt="" className="h-5 w-5 rounded-full object-cover" />
                )}
                <span className="text-white text-xs font-semibold truncate">{form.botName || 'Bot'}</span>
              </div>
              <span className="text-white text-xs opacity-75 cursor-pointer">✕</span>
            </div>

            {/* Message area */}
            <div className="flex-1 p-3 space-y-2 overflow-hidden">
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-3 py-1.5 text-xs text-gray-800 max-w-[80%]">
                  {form.greeting || 'Hi! How can I help?'}
                </div>
              </div>
              <div className="flex justify-end">
                <div
                  className="rounded-2xl rounded-br-sm px-3 py-1.5 text-xs text-white max-w-[80%]"
                  style={{ background: form.primaryColor }}
                >
                  How does this work?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-3 py-1.5 text-xs text-gray-800 max-w-[80%]">
                  I'm happy to help! What would you like to know?
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 px-2 py-2 flex gap-1.5 flex-shrink-0">
              <div className="flex-1 bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-400">
                Type a message…
              </div>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                style={{ background: form.primaryColor }}
              >
                ↑
              </div>
            </div>
          </div>

          {/* FAB */}
          <div
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shadow-lg"
            style={{ background: form.primaryColor }}
          >
            💬
          </div>
        </div>
      </div>
    </div>
  )
}
