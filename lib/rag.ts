import { embedQuery } from '@/lib/embeddings'
import { vectorSearch } from '@/models/chunks'
import { streamAnswer } from '@/lib/claude'

type ChunkResult = { _id?: string; text: string; documentId: string }

const SYSTEM_PREFIX = `You are a helpful AI customer support assistant. Answer the user's question ONLY using the context provided below. Do not use any prior knowledge or make assumptions beyond what is stated in the context. If the answer is not in the context, say "I don't have that information. Would you like me to connect you with a human agent?" Be concise and friendly.`

export async function answerWithRAG(
  workspaceId: string,
  userMessage: string,
  history: { role: 'user' | 'assistant'; content: string }[]
): Promise<{ stream: ReadableStream<Uint8Array>; sources: ChunkResult[] }> {
  const embedding = await embedQuery(userMessage)
  const chunks = await vectorSearch(workspaceId, embedding, 6)

  const context = chunks.length > 0
    ? chunks.map((c, i) => `[${i + 1}] ${c.text}`).join('\n\n')
    : '(No relevant documents found)'

  const systemPrompt = `${SYSTEM_PREFIX}\n\n---\nCONTEXT:\n${context}`

  const messages: { role: 'user' | 'assistant'; content: string }[] = [
    ...history,
    { role: 'user', content: userMessage },
  ]

  const stream = streamAnswer(systemPrompt, messages)
  return { stream, sources: chunks }
}
