import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    return NextResponse.json({ error: 'MONGODB_URI is not set in environment variables' }, { status: 500 })
  }

  // Show partial URI to verify format (hide password)
  const safeUri = uri.replace(/:([^@]+)@/, ':<hidden>@')

  try {
    const db = await getDb()
    await db.command({ ping: 1 })
    return NextResponse.json({ ok: true, message: 'MongoDB connected successfully', uri: safeUri })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ ok: false, error: message, uri: safeUri }, { status: 500 })
  }
}
