import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { findWorkspaceById, updateWorkspace, deleteWorkspace } from '@/models/workspaces'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const bot = await findWorkspaceById(id, userId)
  if (!bot) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(bot)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const updates = await req.json()
  await updateWorkspace(id, userId, updates)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await deleteWorkspace(id, userId)
  return NextResponse.json({ ok: true })
}
