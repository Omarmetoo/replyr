import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/db'
import type { Message } from './types'

const COL = 'messages'

export async function createMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string,
  sources: { documentId: string; snippet: string }[] = []
): Promise<Message> {
  const db = await getDb()
  const doc: Omit<Message, '_id'> = {
    conversationId,
    role,
    content,
    sources,
    createdAt: new Date(),
  }
  const result = await db.collection(COL).insertOne(doc as never)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function findMessagesByConversation(conversationId: string): Promise<Message[]> {
  const db = await getDb()
  const docs = await db.collection(COL).find({ conversationId }).sort({ createdAt: 1 }).toArray()
  return docs.map((d) => ({ ...d, _id: d._id.toString() })) as Message[]
}

export async function findRecentMessages(
  conversationId: string,
  limit = 10
): Promise<Message[]> {
  const db = await getDb()
  const docs = await db
    .collection(COL)
    .find({ conversationId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray()
  return docs.reverse().map((d) => ({ ...d, _id: d._id.toString() })) as Message[]
}

export async function deleteMessage(id: string): Promise<void> {
  const db = await getDb()
  await db.collection(COL).deleteOne({ _id: new ObjectId(id) })
}
