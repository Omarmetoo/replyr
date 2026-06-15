import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/db'
import type { Workspace, WidgetConfig } from './types'

const COL = 'workspaces'

export async function createWorkspace(
  ownerId: string,
  name: string,
  publicKey: string
): Promise<Workspace> {
  const db = await getDb()
  const now = new Date()
  const doc: Omit<Workspace, '_id'> = {
    ownerId,
    name,
    status: 'active',
    publicKey,
    widgetConfig: {
      botName: name,
      greeting: `Hi! I'm ${name}. How can I help you today?`,
      primaryColor: '#2563eb',
      position: 'bottom-right',
    },
    createdAt: now,
    updatedAt: now,
  }
  const result = await db.collection(COL).insertOne(doc as never)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function findWorkspacesByOwner(ownerId: string): Promise<Workspace[]> {
  const db = await getDb()
  const docs = await db.collection(COL).find({ ownerId }).sort({ createdAt: -1 }).toArray()
  return docs.map((d) => ({ ...d, _id: d._id.toString() })) as Workspace[]
}

export async function findWorkspaceById(id: string, ownerId: string): Promise<Workspace | null> {
  const db = await getDb()
  const doc = await db.collection(COL).findOne({ _id: new ObjectId(id), ownerId })
  if (!doc) return null
  return { ...doc, _id: doc._id.toString() } as Workspace
}

export async function findWorkspaceByPublicKey(publicKey: string): Promise<Workspace | null> {
  const db = await getDb()
  const doc = await db.collection(COL).findOne({ publicKey })
  if (!doc) return null
  return { ...doc, _id: doc._id.toString() } as Workspace
}

export async function updateWorkspace(
  id: string,
  ownerId: string,
  updates: Partial<{ name: string; status: Workspace['status']; widgetConfig: WidgetConfig }>
): Promise<void> {
  const db = await getDb()
  await db.collection(COL).updateOne(
    { _id: new ObjectId(id), ownerId },
    { $set: { ...updates, updatedAt: new Date() } }
  )
}

export async function deleteWorkspace(id: string, ownerId: string): Promise<void> {
  const db = await getDb()
  await db.collection(COL).deleteOne({ _id: new ObjectId(id), ownerId })
}
