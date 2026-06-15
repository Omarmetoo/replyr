import { getDb } from '@/lib/db'
import type { Chunk } from './types'

const COL = 'chunks'

export async function insertChunks(chunks: Omit<Chunk, '_id'>[]): Promise<void> {
  if (chunks.length === 0) return
  const db = await getDb()
  await db.collection(COL).insertMany(chunks)
}

export async function deleteChunksByDocument(documentId: string): Promise<void> {
  const db = await getDb()
  await db.collection(COL).deleteMany({ documentId })
}

export async function deleteChunksByWorkspace(workspaceId: string): Promise<void> {
  const db = await getDb()
  await db.collection(COL).deleteMany({ workspaceId })
}

export async function vectorSearch(
  workspaceId: string,
  embedding: number[],
  topK = 6
): Promise<Pick<Chunk, '_id' | 'text' | 'documentId'>[]> {
  const db = await getDb()
  const results = await db.collection(COL).aggregate([
    {
      $vectorSearch: {
        index: 'vector_index',
        path: 'embedding',
        queryVector: embedding,
        numCandidates: topK * 10,
        limit: topK,
        filter: { workspaceId },
      },
    },
    { $project: { text: 1, documentId: 1, score: { $meta: 'vectorSearchScore' } } },
  ]).toArray()

  return results.map((r) => ({
    _id: r._id.toString(),
    text: r.text as string,
    documentId: r.documentId as string,
  }))
}
