import { render } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'

// Capture before any async code so it works for sync script tags
const _script = document.currentScript as HTMLScriptElement | null

// ---------------------------------------------------------------------------
// CSS injected into Shadow DOM — completely isolated from the host page
// ---------------------------------------------------------------------------
const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.panel {
  position: absolute;
  bottom: 68px;
  width: 360px;
  height: 540px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slide-up 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.panel.right { right: 0; }
.panel.left  { left: 0; }

@keyframes slide-up {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.header {
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  flex-shrink: 0;
}
.bot-name { font-weight: 600; font-size: 15px; }
.close-btn {
  background: none; border: none; color: #fff;
  cursor: pointer; font-size: 18px; line-height: 1;
  opacity: 0.75; padding: 2px;
}
.close-btn:hover { opacity: 1; }

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.messages::-webkit-scrollbar { width: 4px; }
.messages::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }

.msg { display: flex; }
.msg.user      { justify-content: flex-end; }
.msg.assistant { justify-content: flex-start; }

.bbl {
  max-width: 80%;
  padding: 9px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}
.msg.user      .bbl { color: #fff; border-bottom-right-radius: 3px; }
.msg.assistant .bbl { background: #f3f4f6; color: #1f2937; border-bottom-left-radius: 3px; }

.cursor {
  display: inline-block;
  width: 2px; height: 13px;
  background: currentColor;
  margin-left: 2px;
  vertical-align: middle;
  animation: blink 1s step-end infinite;
}
@keyframes blink { 50% { opacity: 0; } }

.handoff-card {
  margin: 0 12px 10px;
  padding: 12px;
  background: #f8faff;
  border: 1px solid #dbeafe;
  border-radius: 12px;
  flex-shrink: 0;
}
.handoff-card p { font-size: 13px; font-weight: 600; color: #1d4ed8; margin-bottom: 8px; }
.handoff-card input,
.handoff-card textarea {
  width: 100%; padding: 7px 10px;
  border: 1px solid #cbd5e1; border-radius: 8px;
  font-size: 13px; outline: none; font-family: inherit;
  margin-bottom: 6px; display: block;
}
.handoff-card input:focus,
.handoff-card textarea:focus { border-color: #93c5fd; }
.handoff-card textarea { resize: none; height: 52px; }
.handoff-submit {
  width: 100%; padding: 8px;
  border: none; border-radius: 8px;
  color: #fff; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: opacity 0.15s;
}
.handoff-submit:disabled { opacity: 0.5; cursor: default; }
.handoff-done {
  margin: 0 12px 10px;
  padding: 10px 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  font-size: 13px; color: #15803d; font-weight: 500;
  flex-shrink: 0;
}

.input-bar {
  padding: 10px 12px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.txt {
  flex: 1;
  padding: 9px 14px;
  border: 1px solid #d1d5db;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  font-family: inherit;
}
.txt:focus { border-color: #9ca3af; }
.txt:disabled { background: #f9fafb; }

.send {
  width: 38px; height: 38px;
  border-radius: 50%; border: none;
  cursor: pointer; color: #fff;
  font-size: 18px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: opacity 0.15s;
}
.send:disabled { opacity: 0.45; cursor: default; }

.fab {
  position: relative;
  width: 56px; height: 56px;
  border-radius: 50%; border: none;
  cursor: pointer; color: #fff;
  font-size: 22px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.22);
  transition: transform 0.2s;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.fab:hover { transform: scale(1.07); }
`

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface WidgetConfig {
  botName: string
  greeting: string
  primaryColor: string
  position: 'bottom-right' | 'bottom-left'
  logoUrl?: string
}

interface Msg {
  role: 'user' | 'assistant'
  content: string
  streaming?: boolean
}

function needsHandoff(text: string): boolean {
  const lower = text.toLowerCase()
  return lower.includes('human agent') || lower.includes('connect you with')
}

// ---------------------------------------------------------------------------
// Chat component
// ---------------------------------------------------------------------------
function Widget({
  publicKey,
  config,
  apiUrl,
}: {
  publicKey: string
  config: WidgetConfig
  apiUrl: string
}) {
  const side = config.position === 'bottom-left' ? 'left' : 'right'
  const color = config.primaryColor

  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'assistant', content: config.greeting },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [convId, setConvId] = useState<string | undefined>(
    () => sessionStorage.getItem(`replyr-conv-${publicKey}`) ?? undefined,
  )
  const [visitorId, setVisitorId] = useState<string | undefined>(
    () => sessionStorage.getItem(`replyr-visitor-${publicKey}`) ?? undefined,
  )
  const [showHandoff, setShowHandoff] = useState(false)
  const [handoffDone, setHandoffDone] = useState(false)
  const [handoffEmail, setHandoffEmail] = useState('')
  const [handoffNote, setHandoffNote] = useState('')
  const [handoffLoading, setHandoffLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, showHandoff])

  async function send() {
    const text = input.trim()
    if (!text || busy) return

    setInput('')
    setBusy(true)
    setShowHandoff(false)
    setMsgs((m) => [
      ...m,
      { role: 'user', content: text },
      { role: 'assistant', content: '', streaming: true },
    ])

    try {
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicKey, message: text, conversationId: convId, visitorId }),
      })

      if (!res.ok) throw new Error('failed')

      const newConv = res.headers.get('X-Conversation-Id')
      const newVisitor = res.headers.get('X-Visitor-Id')
      if (newConv) {
        setConvId(newConv)
        sessionStorage.setItem(`replyr-conv-${publicKey}`, newConv)
      }
      if (newVisitor) {
        setVisitorId(newVisitor)
        sessionStorage.setItem(`replyr-visitor-${publicKey}`, newVisitor)
      }

      const reader = res.body!.getReader()
      const dec = new TextDecoder()
      let full = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += dec.decode(value, { stream: true })
        const snap = full
        setMsgs((m) => {
          const copy = [...m]
          copy[copy.length - 1] = { role: 'assistant', content: snap, streaming: true }
          return copy
        })
      }
      full += dec.decode()
      setMsgs((m) => {
        const copy = [...m]
        copy[copy.length - 1] = { role: 'assistant', content: full, streaming: false }
        return copy
      })

      if (needsHandoff(full)) {
        setShowHandoff(true)
      }
    } catch {
      setMsgs((m) => {
        const copy = [...m]
        copy[copy.length - 1] = {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
          streaming: false,
        }
        return copy
      })
    } finally {
      setBusy(false)
    }
  }

  async function submitHandoff(e: Event) {
    e.preventDefault()
    if (!handoffEmail || !convId) return
    setHandoffLoading(true)
    try {
      await fetch(`${apiUrl}/api/handoff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicKey,
          conversationId: convId,
          email: handoffEmail,
          message: handoffNote,
        }),
      })
      setShowHandoff(false)
      setHandoffDone(true)
    } catch {
      // fail silently — the visitor can retry
    } finally {
      setHandoffLoading(false)
    }
  }

  return (
    <>
      <style>{CSS}</style>

      {open && (
        <div class={`panel ${side}`}>
          <div class="header" style={{ background: color }}>
            <span class="bot-name">{config.botName}</span>
            <button class="close-btn" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>

          <div class="messages">
            {msgs.map((msg, i) => (
              <div key={i} class={`msg ${msg.role}`}>
                <div
                  class="bbl"
                  style={msg.role === 'user' ? { background: color } : undefined}
                >
                  {msg.content}
                  {msg.streaming && <span class="cursor" />}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Handoff form */}
          {showHandoff && !handoffDone && (
            <form class="handoff-card" onSubmit={submitHandoff}>
              <p>Talk to a human?</p>
              <input
                type="email"
                placeholder="Your email address"
                value={handoffEmail}
                onInput={(e) => setHandoffEmail((e.target as HTMLInputElement).value)}
                required
              />
              <textarea
                placeholder="Optional message…"
                value={handoffNote}
                onInput={(e) => setHandoffNote((e.target as HTMLTextAreaElement).value)}
              />
              <button
                type="submit"
                class="handoff-submit"
                style={{ background: color }}
                disabled={handoffLoading}
              >
                {handoffLoading ? 'Sending…' : 'Contact us'}
              </button>
            </form>
          )}

          {handoffDone && (
            <div class="handoff-done">
              ✓ Got it! We'll reach out to you shortly.
            </div>
          )}

          <div class="input-bar">
            <input
              class="txt"
              value={input}
              onInput={(e) => setInput((e.target as HTMLInputElement).value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Type a message…"
              disabled={busy}
            />
            <button
              class="send"
              style={{ background: color }}
              onClick={send}
              disabled={busy}
              aria-label="Send"
            >
              ↑
            </button>
          </div>
        </div>
      )}

      <button
        class="fab"
        style={{ background: color }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '✕' : '💬'}
      </button>
    </>
  )
}

// ---------------------------------------------------------------------------
// Bootstrap — runs when script is loaded
// ---------------------------------------------------------------------------
function bootstrap() {
  const script =
    _script ?? (document.querySelector('script[data-public-key]') as HTMLScriptElement | null)

  if (!script) {
    console.error('[Replyr] Could not find script tag with data-public-key')
    return
  }

  const publicKey = script.dataset.publicKey
  if (!publicKey) {
    console.error('[Replyr] Missing data-public-key attribute on Replyr script tag')
    return
  }

  const apiUrl = new URL(script.src).origin

  const host = document.createElement('div')
  host.id = 'replyr-widget-host'
  Object.assign(host.style, {
    position: 'fixed',
    bottom: '20px',
    zIndex: '2147483647',
  })
  document.body.appendChild(host)

  const shadow = host.attachShadow({ mode: 'open' })
  const mount = document.createElement('div')
  shadow.appendChild(mount)

  fetch(`${apiUrl}/api/widget-config?publicKey=${encodeURIComponent(publicKey)}`)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${r.status}`))))
    .then((config: WidgetConfig) => {
      if (config.position === 'bottom-left') {
        host.style.left = '20px'
      } else {
        host.style.right = '20px'
      }
      render(<Widget publicKey={publicKey} config={config} apiUrl={apiUrl} />, mount)
    })
    .catch((e) => console.error('[Replyr] Failed to load widget config:', e))
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap)
} else {
  bootstrap()
}
