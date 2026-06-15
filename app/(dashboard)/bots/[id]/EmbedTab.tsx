'use client'

import { useState } from 'react'
import type { Workspace } from '@/models/types'

export function EmbedTab({ bot }: { bot: Workspace }) {
  const appUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL ?? 'https://your-domain.com')

  const snippet = `<script src="${appUrl}/widget.js" data-public-key="${bot.publicKey}"></script>`

  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select the text
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      {/* Snippet card */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Embed snippet</h3>
        <p className="text-sm text-gray-500 mb-4">
          Paste this snippet just before the <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">&lt;/body&gt;</code> tag
          on any webpage where you want the chat widget to appear.
        </p>

        <div className="relative rounded-xl bg-gray-900 p-4 pr-24">
          <code className="text-sm text-green-400 font-mono break-all leading-relaxed">
            {snippet}
          </code>
          <button
            onClick={copy}
            className={`absolute top-3 right-3 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Public key */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Public key</h3>
        <p className="text-sm text-gray-500 mb-3">
          This key is safe to expose in public HTML — it only allows chatting with this specific bot.
        </p>
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
          <code className="flex-1 text-sm font-mono text-gray-700">{bot.publicKey}</code>
        </div>
      </div>

      {/* How it works */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">How it works</h3>
        <ol className="space-y-3">
          {[
            'Paste the snippet into any HTML page — no build step required.',
            'The widget loads asynchronously so it never slows down your site.',
            'Visitors see a chat bubble. Their messages are answered by your AI bot.',
            'When the bot can\'t answer, it offers to connect them with a human — you\'ll see the request in the Conversations tab.',
            'Changes to appearance take effect immediately — no re-deploy needed.',
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-sm text-gray-600 pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
