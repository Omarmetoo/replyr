import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="text-xl font-bold text-blue-600 tracking-tight">Replyr</span>
          <div className="flex items-center gap-4">
            <Link href="/demo" className="hidden text-sm text-gray-500 hover:text-gray-900 transition-colors sm:block">
              Live demo
            </Link>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          Powered by Claude AI + MongoDB Atlas Vector Search
        </div>
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-6xl">
          AI support that knows<br />your product
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
          Upload your docs. Paste one script tag. Your visitors get instant, accurate answers 24/7 — grounded in your content, not hallucinations.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/sign-up"
            className="w-full rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors sm:w-auto"
          >
            Start for free →
          </Link>
          <Link
            href="/demo"
            className="w-full rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors sm:w-auto"
          >
            See live demo
          </Link>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">Up and running in 5 minutes</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Upload your docs',
                body: 'Paste a URL, upload a PDF, or drop in plain text. We chunk and embed everything automatically.',
                color: 'bg-blue-100 text-blue-700',
              },
              {
                step: '2',
                title: 'Customize the widget',
                body: 'Set your bot\'s name, greeting, and brand color. Preview changes in real time before saving.',
                color: 'bg-violet-100 text-violet-700',
              },
              {
                step: '3',
                title: 'Paste one script tag',
                body: 'Copy the embed snippet and drop it before </body> on any page. The chat bubble appears instantly.',
                color: 'bg-emerald-100 text-emerald-700',
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col">
                <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${s.color}`}>
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">Everything included</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '🤖', title: 'RAG-powered answers', body: 'Claude reads your docs on every question — answers are always grounded in your content.' },
              { icon: '⚡', title: 'Streaming responses', body: 'Tokens stream to the visitor in real time, just like ChatGPT. No waiting for a full response.' },
              { icon: '🧑‍💼', title: 'Human handoff', body: "When the AI can't help, it offers to capture the visitor's email so you can follow up." },
              { icon: '📁', title: 'Multi-source ingestion', body: 'PDF, plain text, or live URLs — all chunked, embedded, and kept in sync.' },
              { icon: '🎨', title: 'Full customization', body: 'Bot name, greeting, color, and position. Preview updates live before you save.' },
              { icon: '🔒', title: 'Secure by design', body: 'API keys never leave the server. The widget authenticates with a scoped public key.' },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Embed snippet preview ── */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">One line of code</h2>
          <p className="mt-3 text-gray-500">No npm installs. No build steps. Works on any stack.</p>
          <div className="mt-8 overflow-hidden rounded-xl bg-gray-900 p-5 text-left shadow-lg">
            <p className="text-xs text-gray-500 mb-2">HTML</p>
            <code className="text-sm font-mono text-green-400">
              {'<script src="https://app.replyr.ai/widget.js"'}
              <br />
              {'        data-public-key="ws_live_xxxxxxxxxxxxxxxxxxxx"></script>'}
            </code>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Ready to add AI support?</h2>
          <p className="mt-4 text-lg text-gray-500">Free to start. No credit card required.</p>
          <Link
            href="/sign-up"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-10 py-4 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors"
          >
            Create your free account →
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-gray-400 sm:flex-row">
          <span className="font-semibold text-gray-600">Replyr</span>
          <div className="flex gap-6">
            <Link href="/demo" className="hover:text-gray-700 transition-colors">Demo</Link>
            <Link href="/sign-in" className="hover:text-gray-700 transition-colors">Sign in</Link>
            <Link href="/sign-up" className="hover:text-gray-700 transition-colors">Sign up</Link>
          </div>
          <span>© {new Date().getFullYear()} Replyr</span>
        </div>
      </footer>
    </div>
  )
}
