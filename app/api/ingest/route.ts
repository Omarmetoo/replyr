import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { findWorkspaceById } from '@/models/workspaces'
import { createDocument, updateDocumentStatus } from '@/models/documents'
import { insertChunks, deleteChunksByDocument } from '@/models/chunks'
import { splitIntoChunks } from '@/lib/chunk'
import { embedTexts } from '@/lib/embeddings'
async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require('pdf-parse') as (buf: Buffer) => Promise<{ text: string }>
  const data = await pdfParse(buffer)
  return data.text
}

async function extractTextFromUrl(url: string): Promise<string> {
  const { JSDOM } = await import('jsdom')
  const { Readability } = await import('@mozilla/readability')
  const res = await fetch(url, { headers: { 'User-Agent': 'Replyr/1.0 (bot)' } })
  const html = await res.text()
  const dom = new JSDOM(html, { url })
  const article = new Readability(dom.window.document).parse()
  return article?.textContent ?? ''
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const workspaceId = formData.get('workspaceId') as string
  const sourceType = formData.get('sourceType') as 'pdf' | 'text' | 'url'
  const file = formData.get('file') as File | null
  const text = formData.get('text') as string | null
  const url = formData.get('url') as string | null

  if (!workspaceId || !sourceType) {
    return NextResponse.json({ error: 'workspaceId and sourceType are required' }, { status: 400 })
  }

  const workspace = await findWorkspaceById(workspaceId, userId)
  if (!workspace) return NextResponse.json({ error: 'Bot not found' }, { status: 404 })

  let rawText = ''
  let filename = ''

  if (sourceType === 'pdf' && file) {
    filename = file.name
    const buffer = Buffer.from(await file.arrayBuffer())
    rawText = await extractTextFromPdf(buffer)
  } else if (sourceType === 'text' && text) {
    filename = 'pasted-text.txt'
    rawText = text
  } else if (sourceType === 'url' && url) {
    filename = url
    rawText = await extractTextFromUrl(url)
  } else {
    return NextResponse.json({ error: 'Missing content for the given sourceType' }, { status: 400 })
  }

  if (!rawText.trim()) {
    return NextResponse.json({ error: 'Could not extract text from the provided source' }, { status: 422 })
  }

  const doc = await createDocument(workspaceId, filename, sourceType)
  const documentId = doc._id!

  // Process async (don't block the response for large docs)
  processDocument(documentId, workspaceId, rawText).catch(async (err) => {
    console.error('Ingest error:', err)
    await updateDocumentStatus(documentId, 'failed')
  })

  return NextResponse.json({ documentId, status: 'processing' }, { status: 202 })
}

async function processDocument(
  documentId: string,
  workspaceId: string,
  rawText: string
): Promise<void> {
  await deleteChunksByDocument(documentId)

  const chunkTexts = splitIntoChunks(rawText)
  const embeddings = await embedTexts(chunkTexts)

  const now = new Date()
  const chunks = chunkTexts.map((text, i) => ({
    workspaceId,
    documentId,
    text,
    embedding: embeddings[i],
    tokenCount: Math.ceil(text.length / 4),
    createdAt: now,
  }))

  await insertChunks(chunks)
  await updateDocumentStatus(documentId, 'ready', rawText.length)
}

// Get documents for a bot
export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const workspaceId = req.nextUrl.searchParams.get('workspaceId')
  if (!workspaceId) return NextResponse.json({ error: 'workspaceId required' }, { status: 400 })

  const workspace = await findWorkspaceById(workspaceId, userId)
  if (!workspace) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { findDocumentsByWorkspace } = await import('@/models/documents')
  const docs = await findDocumentsByWorkspace(workspaceId)
  return NextResponse.json(docs)
}
