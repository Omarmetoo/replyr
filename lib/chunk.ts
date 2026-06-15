const CHUNK_SIZE = 500
const CHUNK_OVERLAP = 50

function approximateTokenCount(text: string): number {
  // ~4 chars per token approximation
  return Math.ceil(text.length / 4)
}

export function splitIntoChunks(text: string): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const chunks: string[] = []
  let start = 0

  while (start < words.length) {
    const slice: string[] = []
    let tokens = 0
    let i = start

    while (i < words.length && tokens < CHUNK_SIZE) {
      slice.push(words[i])
      tokens += approximateTokenCount(words[i]) + 0.25 // +0.25 for space
      i++
    }

    const chunk = slice.join(' ').trim()
    if (chunk) chunks.push(chunk)

    // Move start forward by (CHUNK_SIZE - CHUNK_OVERLAP) tokens worth of words
    const overlapWords = Math.floor((CHUNK_OVERLAP / CHUNK_SIZE) * slice.length)
    start = i - overlapWords
    if (start >= i) start = i // safety: always advance
  }

  return chunks
}
