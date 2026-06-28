'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth, ClerkProvider } from '@clerk/nextjs'
import { MenuIcon, XIcon } from 'lucide-react'

const features = [
  {
    icon: '🤖',
    title: 'RAG-Powered Answers',
    body: 'Every answer is grounded in your uploaded docs. No hallucinations — if the answer isn\'t in your content, the AI says so.',
  },
  {
    icon: '⚡',
    title: 'Real-Time Streaming',
    body: 'Tokens stream to the visitor instantly, just like ChatGPT. No waiting for a full response to load.',
  },
  {
    icon: '🧑‍💼',
    title: 'Human Handoff',
    body: "When AI can't help, it captures the visitor's email so your team can follow up personally.",
  },
  {
    icon: '📁',
    title: 'Multi-Source Ingestion',
    body: 'Upload PDFs, paste plain text, or import live URLs. All chunked, embedded, and kept searchable.',
  },
  {
    icon: '🎨',
    title: 'Full Customization',
    body: "Set your bot's name, greeting, color, and position. Preview changes live before saving.",
  },
  {
    icon: '🔒',
    title: 'Secure by Design',
    body: 'AI keys never leave the server. The widget authenticates with a scoped public key safe to expose.',
  },
  {
    icon: '📊',
    title: 'Conversations Inbox',
    body: 'View every chat in your dashboard. See what visitors asked, what the AI answered, and who needs follow-up.',
  },
  {
    icon: '🌐',
    title: 'Works on Any Stack',
    body: 'One script tag. No npm installs, no build steps. Drop it on Webflow, Shopify, WordPress, or raw HTML.',
  },
  {
    icon: '📈',
    title: 'Vector Search',
    body: 'Powered by MongoDB Atlas Vector Search — retrieves the most relevant chunks from your docs in milliseconds.',
  },
]

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Perfect for testing and small projects.',
    features: [
      '1 bot',
      'Up to 50 docs',
      '500 messages/month',
      'Widget customization',
      'Human handoff',
      'Community support',
    ],
    cta: 'Get started free',
    href: '/sign-up',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For growing businesses that need more.',
    features: [
      '5 bots',
      'Unlimited docs',
      '10,000 messages/month',
      'Custom branding',
      'Priority support',
      'Analytics dashboard',
      'Remove "Powered by Replyr"',
    ],
    cta: 'Contact us to upgrade',
    href: 'mailto:omarmetoo2@gmail.com?subject=Replyr Pro Plan',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large teams with advanced needs.',
    features: [
      'Unlimited bots',
      'Unlimited messages',
      'SSO & team accounts',
      'SLA guarantee',
      'Dedicated support',
      'Custom integrations',
      'On-premise option',
    ],
    cta: 'Contact sales',
    href: 'mailto:omarmetoo2@gmail.com?subject=Replyr Enterprise',
    highlight: false,
  },
]

const faqs = [
  {
    q: 'How does the AI know about my product?',
    a: 'You upload your docs — PDFs, text files, or URLs. Replyr chunks and embeds them into a vector database. When a visitor asks a question, the AI retrieves the most relevant sections and answers from them.',
  },
  {
    q: "What if the AI can't answer a question?",
    a: "The AI is instructed to say so honestly and offer to connect the visitor with a human agent. It captures their email so your team can follow up — no question gets dropped.",
  },
  {
    q: 'Will it work on my website?',
    a: 'Yes. One script tag before </body> is all it takes. Works on any platform: Webflow, Shopify, WordPress, React, or plain HTML.',
  },
  {
    q: 'Is my data secure?',
    a: 'Your API keys never leave our servers. The widget only uses a scoped public key. All AI inference happens server-side.',
  },
  {
    q: 'Can I customize how it looks?',
    a: "Yes — bot name, greeting message, brand color, and position (bottom-left or bottom-right). You can preview changes live in the dashboard before saving.",
  },
]

const testimonials = [
  {
    quote: "We went from drowning in repeat support tickets to handling them automatically. Setup took less than 10 minutes. Our team now focuses on issues that actually need a human.",
    name: 'Sarah Chen',
    role: 'Head of Customer Support',
    company: 'TechFlow',
    avatar: 'SC',
    color: 'bg-violet-500',
  },
  {
    quote: "I uploaded our FAQ, grabbed the script tag, pasted it before </body>. That was it. The widget was live and answering questions in under 10 minutes. Genuinely impressed.",
    name: 'Marcus Webb',
    role: 'Founder',
    company: 'ShopEasy',
    avatar: 'MW',
    color: 'bg-emerald-500',
  },
  {
    quote: "The human handoff is what sold me. The AI captures the email when it can't answer — nothing falls through the cracks. It's like having a support agent that never sleeps.",
    name: 'Priya Nair',
    role: 'Customer Success Manager',
    company: 'BuildCo',
    avatar: 'PN',
    color: 'bg-amber-500',
  },
]

const useCases = [
  { icon: '🛍️', label: 'E-commerce', desc: 'Answer product, shipping, and return questions instantly.' },
  { icon: '💻', label: 'SaaS', desc: 'Turn your docs into a 24/7 support agent.' },
  { icon: '🏢', label: 'Agencies', desc: 'White-label AI support for every client you serve.' },
  { icon: '📚', label: 'Education', desc: 'Let students get instant answers from course material.' },
]

const stats = [
  { value: '< 2s', label: 'Average response time' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '1024', label: 'Vector dimensions' },
  { value: '1 tag', label: 'To embed on any site' },
]

function HomePageInner() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isSignedIn } = useAuth()

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">Replyr</Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">FAQ</a>
            <Link href="/demo" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Demo</Link>
          </nav>

          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <Link href="/bots" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                Go to dashboard →
              </Link>
            ) : (
              <>
                <Link href="/sign-in" className="hidden text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors sm:block">
                  Sign in
                </Link>
                <Link href="/sign-up" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                  Get started free
                </Link>
              </>
            )}
            {/* Mobile hamburger */}
            <button
              className="p-1 text-gray-500 hover:text-gray-700 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white px-6 pb-4 md:hidden">
            <nav className="flex flex-col gap-3 pt-3">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-gray-900">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-gray-900">How it works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-gray-900">FAQ</a>
              <Link href="/demo" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-gray-900">Demo</Link>
              {!isSignedIn && (
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-gray-900">Sign in</Link>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 to-white pb-24 pt-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 uppercase tracking-wide">
            AI Customer Support — Free to Start
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
            AI support that knows{' '}
            <span className="text-blue-600">your product</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-gray-500">
            Upload your docs. Paste one script tag. Your visitors get instant, accurate answers 24/7 — grounded in your content, not hallucinations.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={isSignedIn ? '/bots' : '/sign-up'} className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors sm:w-auto">
              {isSignedIn ? 'Go to dashboard →' : 'Start for free →'}
            </Link>
            <Link href="/demo" className="w-full rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors sm:w-auto">
              See live demo
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">No credit card required · Free forever plan available</p>
        </div>

        {/* Widget preview mockup */}
        <div className="mx-auto mt-16 max-w-2xl px-6">
          <div className="relative rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-gray-400">yourwebsite.com</span>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-xs rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-2.5 text-sm text-white">
                    What's your refund policy?
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm">🤖</div>
                  <div className="max-w-xs rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-2.5 text-sm text-gray-800">
                    We offer a full refund within 30 days of purchase, no questions asked. Just email support@... and we'll process it within 24 hours.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-xs rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-2.5 text-sm text-white">
                    Do you support team accounts?
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm">🤖</div>
                  <div className="max-w-xs rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-2.5 text-sm text-gray-800">
                    Yes! Our Pro and Enterprise plans include team accounts with role-based access. You can invite unlimited members.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-gray-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-blue-600">{s.value}</div>
                <div className="mt-1 text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">Up and running in 5 minutes</h2>
            <p className="mt-3 text-lg text-gray-500">No engineering team required.</p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Upload your docs',
                body: 'Paste a URL, upload a PDF, or drop in plain text. Replyr chunks and embeds everything automatically.',
                color: 'bg-blue-600',
              },
              {
                step: '02',
                title: 'Customize the widget',
                body: "Set your bot's name, greeting, and brand color. Preview changes in real time before saving.",
                color: 'bg-violet-600',
              },
              {
                step: '03',
                title: 'Paste one script tag',
                body: 'Copy the embed snippet and drop it before </body> on any page. The chat bubble appears instantly.',
                color: 'bg-emerald-600',
              },
            ].map((s) => (
              <div key={s.step} className="relative flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white ${s.color}`}>
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section className="border-t border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Built for every business</h2>
            <p className="mt-3 text-lg text-gray-500">Any industry. Any website. Any stack.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <div key={u.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:border-blue-200 hover:bg-blue-50/40 transition-colors">
                <div className="text-3xl">{u.icon}</div>
                <h3 className="mt-3 font-semibold text-gray-900">{u.label}</h3>
                <p className="mt-1 text-sm text-gray-500">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="border-t border-gray-100 bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">Everything you need</h2>
            <p className="mt-3 text-lg text-gray-500">No extra tools. No separate vector DB. No ops burden.</p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Code snippet ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900">One line of code</h2>
          <p className="mt-3 text-lg text-gray-500">Works on any stack. No build steps. No npm installs.</p>
          <div className="mt-10 overflow-hidden rounded-2xl bg-gray-900 p-6 text-left shadow-xl">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-gray-500">index.html</span>
            </div>
            <pre className="overflow-x-auto text-sm">
              <code>
                <span className="text-gray-500">{'<!-- Add before </body> -->'}</span>{'\n'}
                <span className="text-blue-400">{'<script'}</span>
                <span className="text-yellow-300">{' src'}</span>
                <span className="text-gray-300">{'="'}</span>
                <span className="text-green-400">{'https://replyr-mu.vercel.app/widget.js'}</span>
                <span className="text-gray-300">{'"'}</span>{'\n'}
                {'        '}
                <span className="text-yellow-300">{'data-public-key'}</span>
                <span className="text-gray-300">{'="'}</span>
                <span className="text-green-400">{'ws_live_xxxxxxxxxxxxxxxxxxxx'}</span>
                <span className="text-gray-300">{'">'}</span>
                <span className="text-blue-400">{'</script>'}</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="border-t border-gray-100 bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">What teams are saying</h2>
            <p className="mt-3 text-lg text-gray-500">Real results from businesses using Replyr.</p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex gap-1 text-amber-400 text-sm mb-4">
                  {'★★★★★'}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-gray-600">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${t.color}`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="border-t border-gray-100 bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">Simple, transparent pricing</h2>
            <p className="mt-3 text-lg text-gray-500">Start free. Upgrade when you need more.</p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl p-8 ${
                  plan.highlight
                    ? 'bg-blue-600 text-white shadow-2xl lg:scale-105'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-amber-900 whitespace-nowrap">
                    Most popular
                  </div>
                )}
                <div>
                  <h3 className={`text-lg font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <p className={`mt-1 text-sm ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>{plan.description}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className={`text-5xl font-extrabold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.highlight ? 'text-blue-100' : 'text-gray-400'}`}>/{plan.period}</span>
                  </div>
                </div>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <span className={`text-lg ${plan.highlight ? 'text-blue-200' : 'text-blue-500'}`}>✓</span>
                      <span className={plan.highlight ? 'text-blue-50' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
                    plan.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="border-t border-gray-100 bg-gray-50 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-4xl font-bold text-gray-900">Frequently asked questions</h2>
          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <span className="ml-4 text-gray-400 text-xl shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="border-t border-gray-100 px-6 py-4 text-sm leading-relaxed text-gray-500">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-blue-600 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-bold text-white">Ready to add AI support?</h2>
          <p className="mt-4 text-xl text-blue-100">Set up in under 10 minutes. No credit card required.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up" className="w-full rounded-xl bg-white px-10 py-4 text-base font-semibold text-blue-600 hover:bg-blue-50 transition-colors shadow-lg sm:w-auto">
              Start for free →
            </Link>
            <Link href="/demo" className="w-full rounded-xl border border-blue-400 px-10 py-4 text-base font-semibold text-white hover:bg-blue-500 transition-colors sm:w-auto">
              See live demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div>
              <Link href="/" className="text-xl font-bold text-blue-600">Replyr</Link>
              <p className="mt-2 max-w-xs text-sm text-gray-400">AI customer support that knows your product. Answers grounded in your docs, 24/7.</p>
            </div>
            <div className="flex gap-8 sm:gap-16">
              <div>
                <p className="text-sm font-semibold text-gray-700">Product</p>
                <div className="mt-3 flex flex-col gap-2">
                  <a href="#features" className="text-sm text-gray-400 hover:text-gray-700">Features</a>
                  <a href="#pricing" className="text-sm text-gray-400 hover:text-gray-700">Pricing</a>
                  <Link href="/demo" className="text-sm text-gray-400 hover:text-gray-700">Demo</Link>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Account</p>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/sign-in" className="text-sm text-gray-400 hover:text-gray-700">Sign in</Link>
                  <Link href="/sign-up" className="text-sm text-gray-400 hover:text-gray-700">Sign up</Link>
                  <Link href="/bots" className="text-sm text-gray-400 hover:text-gray-700">Dashboard</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-100 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} Replyr. All rights reserved.</p>
            <p className="text-xs text-gray-400">Built with Next.js · MongoDB · LLaMA 3.3</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function HomePage() {
  return (
    <ClerkProvider>
      <HomePageInner />
    </ClerkProvider>
  )
}
