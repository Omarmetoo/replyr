'use client'

import { useEffect, useState, useRef } from 'react'
import { UploadIcon, TrashIcon, FileTextIcon, LinkIcon, ClipboardIcon } from 'lucide-react'
import type { Document } from '@/models/types'

export function DocumentsTab({ botId }: { botId: string }) {
  const [docs, setDocs] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [tab, setTab] = useState<'pdf' | 'text' | 'url'>('pdf')
  const [textValue, setTextValue] = useState('')
  const [urlValue, setUrlValue] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function loadDocs() {
    const res = await fetch(`/api/ingest?workspaceId=${botId}`)
    if (res.ok) setDocs(await res.json())
    setLoading(false)
  }

  useEffect(() => { loadDocs() }, [botId])

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    setUploading(true)
    setUploadError('')

    const fd = new FormData()
    fd.append('workspaceId', botId)
    fd.append('sourceType', tab)

    if (tab === 'pdf') {
      const file = fileRef.current?.files?.[0]
      if (!file) { setUploadError('Select a PDF file'); setUploading(false); return }
      fd.append('file', file)
    } else if (tab === 'text') {
      if (!textValue.trim()) { setUploadError('Enter some text'); setUploading(false); return }
      fd.append('text', textValue)
    } else {
      if (!urlValue.trim()) { setUploadError('Enter a URL'); setUploading(false); return }
      fd.append('url', urlValue)
    }

    const res = await fetch('/api/ingest', { method: 'POST', body: fd })
    if (res.ok) {
      if (fileRef.current) fileRef.current.value = ''
      setTextValue('')
      setUrlValue('')
      await loadDocs()
      // Poll for status update
      setTimeout(loadDocs, 3000)
    } else {
      const data = await res.json()
      setUploadError(data.error || 'Upload failed')
    }
    setUploading(false)
  }

  async function handleDelete(docId: string) {
    if (!confirm('Delete this document and all its chunks?')) return
    await fetch(`/api/ingest/${docId}`, { method: 'DELETE' })
    await loadDocs()
  }

  const statusColor: Record<Document['status'], string> = {
    processing: 'bg-yellow-50 text-yellow-700',
    ready: 'bg-green-50 text-green-700',
    failed: 'bg-red-50 text-red-700',
  }

  return (
    <div className="space-y-6">
      {/* Upload card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900">Add document</h2>

        {/* Source type tabs */}
        <div className="mt-4 flex gap-3 border-b border-gray-100">
          {(['pdf', 'text', 'url'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {t === 'pdf' ? 'PDF' : t === 'text' ? 'Paste text' : 'URL'}
            </button>
          ))}
        </div>

        <form onSubmit={handleUpload} className="mt-4 space-y-3">
          {tab === 'pdf' && (
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors">
                <UploadIcon className="h-4 w-4" />
                Choose PDF
                <input ref={fileRef} type="file" accept=".pdf" className="hidden" />
              </label>
            </div>
          )}
          {tab === 'text' && (
            <textarea
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              rows={5}
              placeholder="Paste your FAQ or documentation text here…"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          )}
          {tab === 'url' && (
            <input
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              type="url"
              placeholder="https://your-site.com/faq"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          )}

          {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading…' : 'Upload & process'}
          </button>
        </form>
      </div>

      {/* Documents list */}
      <div>
        <h2 className="mb-3 text-base font-semibold text-gray-900">Documents</h2>
        {loading ? (
          <p className="text-sm text-gray-400">Loading…</p>
        ) : docs.length === 0 ? (
          <p className="text-sm text-gray-400">No documents yet. Upload one above.</p>
        ) : (
          <div className="space-y-2">
            {docs.map((doc) => (
              <div
                key={doc._id}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4"
              >
                {doc.sourceType === 'pdf' ? (
                  <FileTextIcon className="h-5 w-5 shrink-0 text-red-400" />
                ) : doc.sourceType === 'url' ? (
                  <LinkIcon className="h-5 w-5 shrink-0 text-blue-400" />
                ) : (
                  <ClipboardIcon className="h-5 w-5 shrink-0 text-gray-400" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{doc.filename}</p>
                  {doc.charCount > 0 && (
                    <p className="text-xs text-gray-400">{doc.charCount.toLocaleString()} chars</p>
                  )}
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[doc.status]}`}>
                  {doc.status}
                </span>
                <button
                  onClick={() => handleDelete(doc._id!)}
                  className="shrink-0 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
