import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { deleteDocument } from '@/models/documents'
import { deleteChunksByDocument } from '@/models/chunks'

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ docId: string }> }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { docId } = await params
  await deleteChunksByDocument(docId)
  await deleteDocument(docId)
  return NextResponse.json({ ok: true })
}
