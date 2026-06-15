import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { findWorkspaceById } from '@/models/workspaces'
import { findConversationsByWorkspace } from '@/models/conversations'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const workspace = await findWorkspaceById(id, userId)
  if (!workspace) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const conversations = await findConversationsByWorkspace(workspace._id!)
  return NextResponse.json(conversations)
}
