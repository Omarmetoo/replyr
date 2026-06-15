import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const VECTOR_INDEX_DEFINITION = {
  fields: [
    { type: 'vector', path: 'embedding', numDimensions: 1024, similarity: 'cosine' },
    { type: 'filter', path: 'workspaceId' },
  ],
}

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI not set in .env.local')
    process.exit(1)
  }

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db('replyr')

  console.log('Creating standard indexes...')

  await db.collection('workspaces').createIndexes([
    { key: { ownerId: 1 } },
    { key: { publicKey: 1 }, unique: true },
  ])

  await db.collection('documents').createIndexes([
    { key: { workspaceId: 1 } },
  ])

  await db.collection('chunks').createIndexes([
    { key: { workspaceId: 1 } },
    { key: { documentId: 1 } },
  ])

  await db.collection('conversations').createIndexes([
    { key: { workspaceId: 1 } },
    { key: { lastMessageAt: -1 } },
  ])

  await db.collection('messages').createIndexes([
    { key: { conversationId: 1, createdAt: 1 } },
  ])

  await db.collection('leads').createIndexes([
    { key: { workspaceId: 1 } },
  ])

  console.log('✓ Standard indexes created.')
  console.log('\nAtlas Vector Search index definition (add manually in Atlas UI):')
  console.log('  Collection : replyr.chunks')
  console.log('  Index name : vector_index')
  console.log(JSON.stringify(VECTOR_INDEX_DEFINITION, null, 2))

  await client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
