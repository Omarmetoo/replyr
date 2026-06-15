import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createWorkspace, findWorkspacesByOwner } from '@/models/workspaces'
import { nanoid } from 'nanoid'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const bots = await findWorkspacesByOwner(userId)
  return NextResponse.json(bots)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name } = await req.json()
  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const publicKey = `ws_live_${nanoid(20)}`
  const bot = await createWorkspace(userId, name.trim(), publicKey)
  return NextResponse.json(bot, { status: 201 })
}
