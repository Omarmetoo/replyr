import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/db'
import type { Conversation, ConversationStatus } from './types'

const COL = 'conversations'

export async function createConversation(
  workspaceId: string,
  visitorId: string
): Promise<Conversation> {
  const db = await getDb()
  const now = new Date()
  const doc: Omit<Conversation, '_id'> = {
    workspaceId,
    visitorId,
    status: 'open',
    createdAt: now,
    lastMessageAt: now,
  }
  const result = await db.collection(COL).insertOne(doc as never)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function findConversationById(id: string): Promise<Conversation | null> {
  const db = await getDb()
  const doc = await db.collection(COL).findOne({ _id: new ObjectId(id) })
  if (!doc) return null
  return { ...doc, _id: doc._id.toString() } as Conversation
}

export async function findConversationsByWorkspace(workspaceId: string): Promise<Conversation[]> {
  const db = await getDb()
  const docs = await db.collection(COL).find({ workspaceId }).sort({ lastMessageAt: -1 }).toArray()
  return docs.map((d) => ({ ...d, _id: d._id.toString() })) as Conversation[]
}

export async function updateConversationStatus(
  id: string,
  status: ConversationStatus
): Promise<void> {
  const db = await getDb()
  await db.collection(COL).updateOne(
    { _id: new ObjectId(id) },
    { $set: { status, lastMessageAt: new Date() } }
  )
}

export async function touchConversation(id: string): Promise<void> {
  const db = await getDb()
  await db.collection(COL).updateOne(
    { _id: new ObjectId(id) },
    { $set: { lastMessageAt: new Date() } }
  )
}
