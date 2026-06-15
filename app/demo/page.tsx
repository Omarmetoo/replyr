import Script from 'next/script'
import Link from 'next/link'

const DEMO_KEY = process.env.NEXT_PUBLIC_DEMO_PUBLIC_KEY

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-violet-600" />
            <span className="font-bold text-gray-900">Acme Software</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-gray-500 sm:flex">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#" className="rounded-lg bg-violet-600 px-4 py-1.5 text-white font-medium hover:bg-violet-700 transition-colors">
              Get started
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
          ✨ Trusted by 2,000+ teams worldwide
        </div>
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900">
          Analytics for people<br />who move fast
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-gray-500">
          Track every user action, understand your growth, and build better products — all without writing SQL.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#"
            className="w-full rounded-xl bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 transition-colors sm:w-auto"
          >
            Start free trial
          </a>
          <a
            href="#features"
            className="w-full rounded-xl border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors sm:w-auto"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* ── Dashboard mockup ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/60">
          <div className="flex h-8 items-center gap-1.5 bg-gray-100 px-4">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="grid grid-cols-4 divide-x divide-gray-100 bg-white">
            <div className="col-span-1 space-y-2 p-4 text-xs text-gray-400">
              {['Dashboard', 'Users', 'Events', 'Funnels', 'Reports'].map((s) => (
                <div key={s} className={`rounded px-2 py-1.5 ${s === 'Dashboard' ? 'bg-violet-50 text-violet-700 font-medium' : 'hover:bg-gray-50'}`}>
                  {s}
                </div>
              ))}
            </div>
            <div className="col-span-3 p-4">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Active users', value: '12,483' },
                  { label: 'Events today', value: '94,231' },
                  { label: 'Conversion', value: '3.8%' },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                    <p className="text-xs text-gray-400">{m.label}</p>
                    <p className="mt-1 text-xl font-bold text-gray-800">{m.value}</p>
                  </div>
                ))}
              </div>
              <div className="h-28 rounded-lg bg-linear-to-br from-violet-50 to-indigo-50 border border-gray-100 flex items-end gap-1 px-3 pb-3 overflow-hidden">
                {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-violet-400 opacity-80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">Everything you need to understand your users</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: '📊', title: 'Real-time dashboards', body: 'See metrics update live as events come in. No more waiting for overnight reports.' },
              { icon: '🎯', title: 'User segmentation', body: 'Filter by any property — plan, country, behaviour — across your entire event history.' },
              { icon: '🔔', title: 'Smart alerts', body: 'Get a Slack or email alert the moment a key metric spikes or drops.' },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing stub ── */}
      <section id="pricing" className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Simple pricing</h2>
          <p className="mt-3 text-gray-500">Start free. Upgrade when you're ready.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
            {[
              { plan: 'Starter', price: '$0', features: ['Up to 1M events/mo', '3 team seats', '30-day retention'] },
              { plan: 'Growth', price: '$49/mo', features: ['Unlimited events', 'Unlimited seats', '2-year retention', 'Priority support'], highlight: true },
            ].map((p) => (
              <div
                key={p.plan}
                className={`rounded-2xl p-6 text-left ${p.highlight ? 'bg-violet-600 text-white shadow-lg' : 'border border-gray-200 bg-white'}`}
              >
                <p className={`text-sm font-medium ${p.highlight ? 'text-violet-200' : 'text-gray-500'}`}>{p.plan}</p>
                <p className={`mt-2 text-3xl font-bold ${p.highlight ? 'text-white' : 'text-gray-900'}`}>{p.price}</p>
                <ul className="mt-4 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${p.highlight ? 'text-violet-100' : 'text-gray-600'}`}>
                      <span>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-5 w-full rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                    p.highlight
                      ? 'bg-white text-violet-700 hover:bg-violet-50'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Replyr attribution ── */}
      <div className="border-t border-blue-100 bg-blue-50 py-3 text-center">
        <p className="text-sm text-blue-700">
          👋 The chat widget is powered by{' '}
          <Link href="/" className="font-semibold underline underline-offset-2 hover:text-blue-900">
            Replyr
          </Link>{' '}
          — AI customer support for any website. Try it in the corner →
        </p>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Acme Software, Inc. · This is a demo page for{' '}
        <Link href="/" className="underline">Replyr</Link>
      </footer>

      {/* ── Widget ── */}
      {DEMO_KEY ? (
        <Script src="/widget.js" data-public-key={DEMO_KEY} strategy="afterInteractive" />
      ) : (
        <div className="fixed bottom-4 right-4 max-w-xs rounded-xl border border-yellow-200 bg-yellow-50 p-4 shadow-lg text-sm text-yellow-800">
          <p className="font-semibold">Widget not configured</p>
          <p className="mt-1 text-xs leading-relaxed">
            Set <code className="rounded bg-yellow-100 px-1">NEXT_PUBLIC_DEMO_PUBLIC_KEY</code> in{' '}
            <code className="rounded bg-yellow-100 px-1">.env.local</code> to see the chat widget live.
          </p>
        </div>
      )}
    </div>
  )
}
