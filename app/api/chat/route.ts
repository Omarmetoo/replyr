import { NextRequest } from 'next/server'
import { nanoid } from 'nanoid'
import { findWorkspaceByPublicKey } from '@/models/workspaces'
import { findConversationById, createConversation, touchConversation } from '@/models/conversations'
import { createMessage, findRecentMessages } from '@/models/messages'
import { answerWithRAG } from '@/lib/rag'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
} as const

// In-memory rate limit: 20 requests per minute per publicKey+IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20
const RATE_WINDOW = 60_000

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(key)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
}

export async function OPTIONS() {
  return new Response(null, { headers: CORS })
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  let body: { publicKey?: string; conversationId?: string; message?: string; visitorId?: string }
  try {
    body = await req.json()
  } catch {
    return jsonError('Invalid JSON', 400)
  }

  const { publicKey, conversationId, visitorId } = body
  const message = body.message?.trim()

  if (!publicKey || !message) {
    return jsonError('publicKey and message are required', 400)
  }

  if (isRateLimited(`${publicKey}:${ip}`)) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { ...CORS, 'Content-Type': 'application/json', 'Retry-After': '60' },
    })
  }

  const workspace = await findWorkspaceByPublicKey(publicKey)
  if (!workspace || workspace.status !== 'active') {
    return jsonError('Workspace not found or inactive', 404)
  }

  const workspaceId = workspace._id!
  let conv
  let actualVisitorId = visitorId ?? nanoid()

  if (conversationId) {
    conv = await findConversationById(conversationId)
    if (!conv || conv.workspaceId !== workspaceId) {
      return jsonError('Conversation not found', 404)
    }
    actualVisitorId = conv.visitorId
  } else {
    conv = await createConversation(workspaceId, actualVisitorId)
  }

  const convId = conv._id!

  // Fetch history before saving current message so RAG receives clean prior context
  const prior = await findRecentMessages(convId, 10)
  const history = prior.map((m) => ({ role: m.role, content: m.content }))

  await createMessage(convId, 'user', message)

  const { stream, sources } = await answerWithRAG(workspaceId, message, history)
  const [streamA, streamB] = stream.tee()

  // Persist assistant reply asynchronously after streaming completes
  ;(async () => {
    try {
      const reader = streamB.getReader()
      const dec = new TextDecoder()
      let full = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += dec.decode(value, { stream: true })
      }
      full += dec.decode()
      const srcDocs = sources.map((s) => ({
        documentId: s.documentId,
        snippet: s.text.slice(0, 200),
      }))
      await createMessage(convId, 'assistant', full, srcDocs)
      await touchConversation(convId)
    } catch (err) {
      console.error('Failed to persist assistant message:', err)
    }
  })()

  return new Response(streamA, {
    headers: {
      ...CORS,
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Conversation-Id': convId,
      'X-Visitor-Id': actualVisitorId,
    },
  })
}
