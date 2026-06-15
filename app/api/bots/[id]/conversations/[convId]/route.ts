import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { findWorkspaceById } from '@/models/workspaces'
import { findConversationById } from '@/models/conversations'
import { findMessagesByConversation } from '@/models/messages'
import { findLeadsByWorkspace, updateLeadStatus } from '@/models/leads'
import type { LeadStatus } from '@/models/types'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; convId: string }> },
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, convId } = await params
  const workspace = await findWorkspaceById(id, userId)
  if (!workspace) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const conv = await findConversationById(convId)
  if (!conv || conv.workspaceId !== workspace._id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const [messages, leads] = await Promise.all([
    findMessagesByConversation(convId),
    findLeadsByWorkspace(workspace._id!),
  ])
  const lead = leads.find((l) => l.conversationId === convId) ?? null

  return NextResponse.json({ conversation: conv, messages, lead })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; convId: string }> },
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, convId } = await params
  const workspace = await findWorkspaceById(id, userId)
  if (!workspace) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const conv = await findConversationById(convId)
  if (!conv || conv.workspaceId !== workspace._id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { leadId, leadStatus } = await req.json() as { leadId?: string; leadStatus?: LeadStatus }
  if (leadId && leadStatus) {
    await updateLeadStatus(leadId, leadStatus)
  }

  return NextResponse.json({ ok: true })
}
