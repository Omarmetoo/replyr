import Groq from 'groq-sdk'

let client: Groq | null = null

function getClient(): Groq {
  if (!client) {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY is not set')
    client = new Groq({ apiKey })
  }
  return client
}

const MODEL = 'llama-3.3-70b-versatile'

export function streamAnswer(
  systemPrompt: string,
  messages: { role: 'user' | 'assistant'; content: string }[]
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  return new ReadableStream({
    async start(controller) {
      try {
        const stream = await getClient().chat.completions.create({
          model: MODEL,
          max_tokens: 1024,
          stream: true,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages,
          ],
        })
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? ''
          if (text) controller.enqueue(encoder.encode(text))
        }
        controller.close()
      } catch (err) {
        controller.error(err)
      }
    },
  })
}
