import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/db'
import type { Lead, LeadStatus } from './types'

const COL = 'leads'

export async function createLead(
  workspaceId: string,
  conversationId: string,
  email: string,
  message: string
): Promise<Lead> {
  const db = await getDb()
  const doc: Omit<Lead, '_id'> = {
    workspaceId,
    conversationId,
    email,
    message,
    status: 'new',
    createdAt: new Date(),
  }
  const result = await db.collection(COL).insertOne(doc as never)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function findLeadsByWorkspace(workspaceId: string): Promise<Lead[]> {
  const db = await getDb()
  const docs = await db.collection(COL).find({ workspaceId }).sort({ createdAt: -1 }).toArray()
  return docs.map((d) => ({ ...d, _id: d._id.toString() })) as Lead[]
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const db = await getDb()
  await db.collection(COL).updateOne({ _id: new ObjectId(id) }, { $set: { status } })
}
