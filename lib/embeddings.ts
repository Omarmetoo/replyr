// Cohere embed-english-v3.0 — 1024 dimensions (matches MongoDB vector index)
const COHERE_URL = 'https://api.cohere.com/v1/embed'
const MODEL = 'embed-english-v3.0'
const BATCH_SIZE = 96

async function cohereEmbed(texts: string[], inputType: 'search_document' | 'search_query'): Promise<number[][]> {
  const apiKey = process.env.COHERE_API_KEY
  if (!apiKey) throw new Error('COHERE_API_KEY is not set')

  const res = await fetch(COHERE_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ texts, model: MODEL, input_type: inputType }),
  })
  if (!res.ok) throw new Error(`Cohere embed error: ${res.status} ${await res.text()}`)
  const data = await res.json() as { embeddings: number[][] }
  return data.embeddings
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const results: number[][] = []
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE)
    results.push(...await cohereEmbed(batch, 'search_document'))
  }
  return results
}

export async function embedQuery(text: string): Promise<number[]> {
  const [embedding] = await cohereEmbed([text], 'search_query')
  return embedding
}
