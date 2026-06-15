import Anthropic from '@anthropic-ai/sdk'

let client: Anthropic | null = null

function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')
    client = new Anthropic({ apiKey })
  }
  return client
}

const MODEL = 'claude-haiku-4-5'

export function streamAnswer(
  systemPrompt: string,
  messages: { role: 'user' | 'assistant'; content: string }[]
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  return new ReadableStream({
    async start(controller) {
      try {
        const stream = getClient().messages.stream({
          model: MODEL,
          max_tokens: 1024,
          system: systemPrompt,
          messages,
        })
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
        controller.close()
      } catch (err) {
        controller.error(err)
      }
    },
  })
}
