import { VoyageAIClient } from 'voyageai'

let client: VoyageAIClient | null = null

function getClient(): VoyageAIClient {
  if (!client) {
    const apiKey = process.env.VOYAGE_API_KEY
    if (!apiKey) throw new Error('VOYAGE_API_KEY environment variable is not set')
    client = new VoyageAIClient({ apiKey })
  }
  return client
}

const MODEL = 'voyage-3-large'
const BATCH_SIZE = 128

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const voyage = getClient()
  const results: number[][] = []

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE)
    const response = await voyage.embed({ input: batch, model: MODEL })
    for (const item of response.data ?? []) {
      results.push(item.embedding as number[])
    }
  }

  return results
}

export async function embedQuery(text: string): Promise<number[]> {
  const [embedding] = await embedTexts([text])
  return embedding
}
