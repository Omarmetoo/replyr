'use client'
import Script from 'next/script'
import Link from 'next/link'
import { useState } from 'react'

const DEMO_KEY = process.env.NEXT_PUBLIC_DEMO_PUBLIC_KEY

type Page = 'home' | 'features' | 'pricing' | 'dashboard' | 'users' | 'events' | 'funnels' | 'reports'

const metrics = [
  { label: 'Active users', value: '12,483', change: '+8.2%', up: true },
  { label: 'Events today', value: '94,231', change: '+12.4%', up: true },
  { label: 'Conversion', value: '3.8%', change: '-0.3%', up: false },
  { label: 'Revenue MRR', value: '$48,290', change: '+5.1%', up: true },
]

const users = [
  { name: 'Sarah Johnson', email: 'sarah@acme.com', plan: 'Growth', status: 'Active', joined: 'Jun 12, 2025' },
  { name: 'Marcus Lee', email: 'marcus@startup.io', plan: 'Starter', status: 'Active', joined: 'Jun 10, 2025' },
  { name: 'Priya Patel', email: 'priya@corp.dev', plan: 'Growth', status: 'Churned', joined: 'May 28, 2025' },
  { name: 'Tom Nguyen', email: 'tom@agency.co', plan: 'Enterprise', status: 'Active', joined: 'May 15, 2025' },
  { name: 'Elena Vasquez', email: 'elena@tech.ai', plan: 'Starter', status: 'Trial', joined: 'Jun 20, 2025' },
]

const events = [
  { event: 'page_view', user: 'sarah@acme.com', property: '/dashboard', time: '2 min ago' },
  { event: 'button_click', user: 'marcus@startup.io', property: 'upgrade_cta', time: '5 min ago' },
  { event: 'signup', user: 'new@user.com', property: 'google_oauth', time: '8 min ago' },
  { event: 'export_csv', user: 'tom@agency.co', property: 'users_table', time: '12 min ago' },
  { event: 'api_call', user: 'elena@tech.ai', property: '/v1/events', time: '15 min ago' },
  { event: 'page_view', user: 'priya@corp.dev', property: '/pricing', time: '18 min ago' },
]

function DashboardView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-xs font-medium text-gray-500">{m.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{m.value}</p>
            <p className={`mt-1 text-xs font-medium ${m.up ? 'text-emerald-600' : 'text-red-500'}`}>
              {m.change} vs last week
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-sm font-semibold text-gray-700 mb-4">Events this week</p>
        <div className="flex items-end gap-1.5 h-36">
          {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 100, 92, 97].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-violet-500 opacity-80 transition-all hover:opacity-100" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-400">
          <span>Jun 14</span><span>Jun 17</span><span>Jun 20</span><span>Jun 23</span><span>Jun 27</span>
        </div>
      </div>
    </div>
  )
}

function UsersView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">5 total users</p>
        </div>
        <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 transition-colors">
          + Invite user
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              {['Name', 'Plan', 'Status', 'Joined'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u) => (
              <tr key={u.email} className="hover:bg-gray-50 cursor-pointer transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{u.name}</div>
                  <div className="text-xs text-gray-400">{u.email}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700">{u.plan}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    u.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                    u.status === 'Trial' ? 'bg-amber-50 text-amber-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>{u.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-500">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function EventsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <p className="mt-1 text-sm text-gray-500">Live event stream</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-gray-500">Live</span>
        </div>
        <div className="divide-y divide-gray-50">
          {events.map((e, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="rounded-lg bg-violet-50 px-2 py-1 font-mono text-xs text-violet-700 whitespace-nowrap">{e.event}</div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm text-gray-700">{e.property}</p>
                <p className="text-xs text-gray-400">{e.user}</p>
              </div>
              <p className="text-xs text-gray-400 whitespace-nowrap">{e.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FunnelsView() {
  const steps = [
    { name: 'Visited landing page', users: 8420, pct: 100 },
    { name: 'Clicked sign up', users: 3108, pct: 36.9 },
    { name: 'Completed registration', users: 1844, pct: 21.9 },
    { name: 'Connected data source', users: 982, pct: 11.7 },
    { name: 'Upgraded to paid', users: 318, pct: 3.8 },
  ]
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Funnels</h1>
        <p className="mt-1 text-sm text-gray-500">Signup to paid conversion</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
        {steps.map((s, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{i + 1}. {s.name}</span>
              <span className="text-gray-500">{s.users.toLocaleString()} users · {s.pct}%</span>
            </div>
            <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReportsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">Saved reports and exports</p>
        </div>
        <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 transition-colors">
          + New report
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { title: 'Weekly active users', updated: '2 hours ago', type: 'Line chart' },
          { title: 'Revenue by plan', updated: 'Yesterday', type: 'Bar chart' },
          { title: 'Churn analysis Q2', updated: '3 days ago', type: 'Table' },
          { title: 'Feature adoption rate', updated: '1 week ago', type: 'Funnel' },
        ].map((r) => (
          <div key={r.title} className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md cursor-pointer transition-shadow">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900">{r.title}</h3>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{r.type}</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">Updated {r.updated}</p>
            <div className="mt-4 h-16 rounded-lg bg-linear-to-br from-violet-50 to-indigo-50 flex items-end gap-1 px-2 pb-2">
              {[50,70,45,80,65,90,75].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-violet-400 opacity-60" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HomeView({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 text-center px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
            ✨ Trusted by 2,000+ teams worldwide
          </div>
          <h1 className="text-5xl font-extrabold leading-tight text-gray-900">Analytics for people<br />who move fast</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-500">Track every user action, understand your growth, and build better products — all without writing SQL.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => setPage('dashboard')} className="w-full rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow hover:bg-violet-700 transition-colors sm:w-auto">
              Start free trial
            </button>
            <button onClick={() => setPage('features')} className="w-full rounded-xl border border-gray-200 px-8 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors sm:w-auto">
              See how it works
            </button>
          </div>
        </div>
      </section>

      {/* Mini dashboard preview */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
          <div className="flex h-8 items-center gap-1.5 bg-gray-100 px-4">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" /><div className="h-2.5 w-2.5 rounded-full bg-yellow-400" /><div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-gray-400">app.acmesoftware.com/dashboard</span>
          </div>
          <div className="bg-white p-6 cursor-pointer" onClick={() => setPage('dashboard')}>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">{m.label}</p>
                  <p className="mt-1 text-lg font-bold text-gray-800">{m.value}</p>
                </div>
              ))}
            </div>
            <div className="h-24 rounded-lg bg-gray-50 flex items-end gap-1 px-3 pb-3">
              {[40,55,45,70,65,80,75,90,85,95,88,100].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-violet-400 opacity-80" style={{ height: `${h}%` }} />
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-violet-600 font-medium">Click to explore the dashboard →</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeaturesView() {
  return (
    <div className="py-16 px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">Everything you need</h1>
        <p className="text-center text-gray-500 mb-12">No data engineering required.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: '📊', title: 'Real-time dashboards', body: 'See metrics update live as events come in. No more waiting for overnight reports.' },
            { icon: '🎯', title: 'User segmentation', body: 'Filter by any property — plan, country, behaviour — across your entire event history.' },
            { icon: '🔔', title: 'Smart alerts', body: 'Get a Slack or email alert the moment a key metric spikes or drops.' },
            { icon: '🔮', title: 'Funnel analysis', body: 'Visualize drop-off at every step of your conversion flow. Fix what leaks.' },
            { icon: '📁', title: 'CSV exports', body: 'Export any report or user segment to CSV in one click. Your data is yours.' },
            { icon: '🔗', title: 'API access', body: 'Push events via our REST API or any of our SDKs. Works with any backend.' },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PricingView() {
  return (
    <div className="py-16 px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">Simple pricing</h1>
        <p className="text-center text-gray-500 mb-12">Start free. Upgrade when you're ready.</p>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { plan: 'Starter', price: '$0', period: 'forever', features: ['1M events/mo', '3 team seats', '30-day retention', 'Email support'], highlight: false },
            { plan: 'Growth', price: '$49', period: 'per month', features: ['Unlimited events', 'Unlimited seats', '2-year retention', 'Priority support', 'Custom dashboards'], highlight: true },
            { plan: 'Enterprise', price: 'Custom', period: 'contact us', features: ['Everything in Growth', 'SSO / SAML', 'SLA guarantee', 'Dedicated CSM', 'On-premise option'], highlight: false },
          ].map((p) => (
            <div key={p.plan} className={`rounded-2xl p-6 ${p.highlight ? 'bg-violet-600 text-white shadow-xl scale-105' : 'border border-gray-200 bg-white'}`}>
              <p className={`text-sm font-medium ${p.highlight ? 'text-violet-200' : 'text-gray-500'}`}>{p.plan}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className={`text-4xl font-extrabold ${p.highlight ? 'text-white' : 'text-gray-900'}`}>{p.price}</span>
                <span className={`text-sm ${p.highlight ? 'text-violet-200' : 'text-gray-400'}`}>/{p.period}</span>
              </div>
              <ul className="mt-5 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${p.highlight ? 'text-violet-100' : 'text-gray-600'}`}>
                    <span className={p.highlight ? 'text-violet-200' : 'text-violet-500'}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button className={`mt-6 w-full rounded-xl py-2.5 text-sm font-semibold transition-colors ${p.highlight ? 'bg-white text-violet-700 hover:bg-violet-50' : 'bg-violet-600 text-white hover:bg-violet-700'}`}>
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const sidebarItems: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'users', label: 'Users', icon: '👥' },
  { id: 'events', label: 'Events', icon: '⚡' },
  { id: 'funnels', label: 'Funnels', icon: '🔮' },
  { id: 'reports', label: 'Reports', icon: '📁' },
]

const marketingPages: Page[] = ['home', 'features', 'pricing']

export default function DemoPage() {
  const [page, setPage] = useState<Page>('home')
  const isAppPage = !marketingPages.includes(page)

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Replyr demo banner ── */}
      <div className="bg-blue-600 py-2.5 text-center text-sm text-white">
        👋 This is a demo of{' '}
        <Link href="/" className="font-bold underline underline-offset-2 hover:text-blue-100">Replyr</Link>
        {' '}— try the AI chat widget in the bottom-right corner!
        <Link href="/sign-up" className="ml-4 rounded-full bg-white px-3 py-0.5 text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors">
          Add it to your site →
        </Link>
      </div>

      {isAppPage ? (
        /* ── App layout (dashboard) ── */
        <div className="flex h-[calc(100vh-40px)]">
          {/* Sidebar */}
          <aside className="flex w-56 shrink-0 flex-col border-r border-gray-200 bg-white">
            <div className="flex h-14 items-center gap-2 border-b border-gray-100 px-5">
              <div className="h-6 w-6 rounded-md bg-violet-600" />
              <span className="font-bold text-gray-900">Acme Software</span>
            </div>
            <nav className="flex-1 space-y-1 p-3">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    page === item.id
                      ? 'bg-violet-50 text-violet-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="border-t border-gray-100 p-4">
              <button
                onClick={() => setPage('home')}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Back to marketing site
              </button>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-8">
            {page === 'dashboard' && <DashboardView />}
            {page === 'users' && <UsersView />}
            {page === 'events' && <EventsView />}
            {page === 'funnels' && <FunnelsView />}
            {page === 'reports' && <ReportsView />}
          </main>
        </div>
      ) : (
        /* ── Marketing site layout ── */
        <div>
          <header className="sticky top-10 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
                <div className="h-6 w-6 rounded-md bg-violet-600" />
                <span className="font-bold text-gray-900">Acme Software</span>
              </div>
              <nav className="flex items-center gap-6 text-sm">
                <button onClick={() => setPage('features')} className={`transition-colors ${page === 'features' ? 'font-semibold text-violet-600' : 'text-gray-500 hover:text-gray-900'}`}>Features</button>
                <button onClick={() => setPage('pricing')} className={`transition-colors ${page === 'pricing' ? 'font-semibold text-violet-600' : 'text-gray-500 hover:text-gray-900'}`}>Pricing</button>
                <button onClick={() => setPage('dashboard')} className="rounded-lg bg-violet-600 px-4 py-1.5 text-white font-medium hover:bg-violet-700 transition-colors">
                  Get started
                </button>
              </nav>
            </div>
          </header>

          <main className="bg-white">
            {page === 'home' && <HomeView setPage={setPage} />}
            {page === 'features' && <FeaturesView />}
            {page === 'pricing' && <PricingView />}
          </main>

          <footer className="border-t border-gray-100 bg-white py-8 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Acme Software, Inc. · Demo powered by{' '}
            <Link href="/" className="underline hover:text-gray-600">Replyr</Link>
          </footer>
        </div>
      )}

      {/* ── Widget ── */}
      {DEMO_KEY ? (
        <Script src="/widget.js" data-public-key={DEMO_KEY} strategy="afterInteractive" />
      ) : (
        <div className="fixed bottom-6 right-6 z-50 max-w-xs rounded-2xl border border-blue-200 bg-blue-50 p-4 shadow-xl text-sm">
          <div className="flex items-center gap-2 font-semibold text-blue-800">
            <span>💬</span> Replyr widget preview
          </div>
          <p className="mt-1 text-xs leading-relaxed text-blue-600">
            This is where the AI chat widget appears. To see it live,{' '}
            <Link href="/sign-up" className="font-semibold underline">create a free account</Link>,
            upload your docs, and paste your public key here.
          </p>
        </div>
      )}
    </div>
  )
}
