import { MongoClient, Db } from 'mongodb'

const dbName = 'replyr'

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient> | null = null

function createClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI environment variable is not set')
  const p = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000, // fail fast after 10s instead of hanging forever
    connectTimeoutMS: 10000,
  }).connect()
  // If connection fails, clear cache so next call retries
  p.catch(() => { clientPromise = null })
  return p
}

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) return clientPromise

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClientPromise()
    }
    clientPromise = global._mongoClientPromise
  } else {
    clientPromise = createClientPromise()
  }
  return clientPromise
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise()
  return client.db(dbName)
}

export default { getClientPromise }
