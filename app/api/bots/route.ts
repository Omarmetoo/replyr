import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createWorkspace, findWorkspacesByOwner } from '@/models/workspaces'
import { nanoid } from 'nanoid'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const bots = await findWorkspacesByOwner(userId)
    return NextResponse.json(bots)
  } catch (err) {
    console.error('GET /api/bots error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { name } = await req.json()
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const publicKey = `ws_live_${nanoid(20)}`
    const bot = await createWorkspace(userId, name.trim(), publicKey)
    return NextResponse.json(bot, { status: 201 })
  } catch (err) {
    console.error('POST /api/bots error:', err)
    return NextResponse.json({ error: 'Failed to create bot. Check your MongoDB connection.' }, { status: 500 })
  }
}
