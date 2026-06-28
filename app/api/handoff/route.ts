import { NextRequest, NextResponse } from 'next/server'
import { findWorkspaceByPublicKey } from '@/models/workspaces'
import { findConversationById, updateConversationStatus } from '@/models/conversations'
import { createLead } from '@/models/leads'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { headers: CORS })
}

export async function POST(req: NextRequest) {
  try {
    let body: { publicKey?: string; conversationId?: string; email?: string; message?: string }
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400, headers: CORS })
    }

    const { publicKey, conversationId, email, message } = body

    if (!publicKey || !conversationId || !email) {
      return NextResponse.json(
        { error: 'publicKey, conversationId, and email are required' },
        { status: 400, headers: CORS },
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400, headers: CORS })
    }

    const workspace = await findWorkspaceByPublicKey(publicKey)
    if (!workspace || workspace.status !== 'active') {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404, headers: CORS })
    }

    const conv = await findConversationById(conversationId)
    if (!conv || conv.workspaceId !== workspace._id) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404, headers: CORS })
    }

    await createLead(workspace._id!, conversationId, email, message ?? '')
    await updateConversationStatus(conversationId, 'handoff_requested')

    return NextResponse.json({ ok: true }, { status: 201, headers: CORS })
  } catch (err) {
    console.error('POST /api/handoff error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500, headers: CORS })
  }
}
