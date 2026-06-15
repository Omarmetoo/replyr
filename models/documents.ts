import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/db'
import type { Document, DocumentStatus, DocumentSourceType } from './types'

const COL = 'documents'

export async function createDocument(
  workspaceId: string,
  filename: string,
  sourceType: DocumentSourceType
): Promise<Document> {
  const db = await getDb()
  const doc: Omit<Document, '_id'> = {
    workspaceId,
    filename,
    sourceType,
    status: 'processing',
    charCount: 0,
    createdAt: new Date(),
  }
  const result = await db.collection(COL).insertOne(doc as never)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function findDocumentsByWorkspace(workspaceId: string): Promise<Document[]> {
  const db = await getDb()
  const docs = await db.collection(COL).find({ workspaceId }).sort({ createdAt: -1 }).toArray()
  return docs.map((d) => ({ ...d, _id: d._id.toString() })) as Document[]
}

export async function updateDocumentStatus(
  id: string,
  status: DocumentStatus,
  charCount?: number
): Promise<void> {
  const db = await getDb()
  await db.collection(COL).updateOne(
    { _id: new ObjectId(id) },
    { $set: { status, ...(charCount !== undefined && { charCount }) } }
  )
}

export async function deleteDocument(id: string): Promise<void> {
  const db = await getDb()
  await db.collection(COL).deleteOne({ _id: new ObjectId(id) })
}
