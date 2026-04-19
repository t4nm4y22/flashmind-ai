import Link from "next/link";
import Navbar from "@/components/Navbar";

const FEATURES = [
  {
    icon: "⚡",
    title: "Instant Generation",
    description: "Paste any text — lecture notes, textbook excerpts, Wikipedia — and get 10 quality flashcards in under 5 seconds.",
  },
  {
    icon: "🎴",
    title: "Interactive Flip Cards",
    description: "Smooth 3D flip animations. Tap to reveal the answer. Track which cards you've mastered.",
  },
  {
    icon: "💾",
    title: "Save & Organize Decks",
    description: "Your decks are saved to your account. Study on any device, pick up where you left off.",
  },
  {
    icon: "🧠",
    title: "AI That Understands Context",
    description: "Not just keyword extraction — the AI creates conceptual questions that test understanding.",
  },
  {
    icon: "📱",
    title: "Mobile First",
    description: "Optimized for studying on your phone between classes. Quick, smooth, no friction.",
  },
  {
    icon: "🔗",
    title: "Share with One Click",
    description: "Generate a shareable link to any deck. Perfect for study groups.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Paste your notes",
    description: "Copy any study material — lecture slides, textbook chapters, your own notes. Any topic, any subject.",
  },
  {
    number: "02",
    title: "AI generates flashcards",
    description: "Our AI reads your content and creates focused question-answer pairs designed to test real understanding.",
  },
  {
    number: "03",
    title: "Study & remember more",
    description: "Flip through cards, mark what you know, come back to what's tricky.",
  },
];

const STATS = [
  { value: "10 cards",   label: "Generated per paste" },
  { value: "< 5 sec",   label: "Generation time" },
  { value: "Free",      label: "To get started" },
  { value: "Any topic", label: "No limits" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, rgba(245,166,35,0.4) 0%, transparent 70%)" }}
            />
          </div>

          <div className="section-container relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber/30 bg-amber-muted text-amber text-sm font-medium mb-8 animate-fade-rise">
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse-glow" />
              Powered by Google Gemini AI
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6 animate-fade-rise delay-100">
              Turn Notes Into{" "}
              <br className="hidden sm:block" />
              <span className="text-gradient">Flashcards</span>
              <br className="hidden sm:block" />
              Instantly.
            </h1>

            <p className="text-cream-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-rise delay-200">
              Paste any study material. AI creates 10 smart flashcards in seconds.
              Study more in less time — free for students.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-rise delay-300">
              <Link href="/generate" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
                Generate Flashcards Free →
              </Link>
              <a href="#how-it-works" className="btn-ghost text-base px-8 py-4 w-full sm:w-auto">
                See how it works
              </a>
            </div>

            <p className="text-cream-subtle text-sm mt-6 animate-fade-rise delay-400">
              No credit card. No signup required to try. Works for any subject.
            </p>

            {/* Hero Card Mockup */}
            <div className="mt-16 animate-fade-rise delay-500">
              <div className="animate-float max-w-sm mx-auto">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-xl opacity-30 blur-xl"
                    style={{ background: "linear-gradient(135deg, #F5A623, #FFD166)" }}
                    aria-hidden="true"
                  />
                  <div className="relative glass-card p-8 border border-amber/20">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs text-cream-subtle font-medium uppercase tracking-widest">Flashcard 1 of 10</span>
                      <span className="text-xs text-amber font-medium">Computer Networks</span>
                    </div>
                    <p className="text-cream-muted text-xs uppercase tracking-widest mb-3">Question</p>
                    <p className="font-serif text-xl text-cream leading-snug mb-6">
                      What is the primary purpose of the OSI model?
                    </p>
                    <div className="h-px bg-border mb-6" />
                    <p className="text-cream-muted text-xs uppercase tracking-widest mb-3">Answer</p>
                    <p className="text-cream text-sm leading-relaxed">
                      To standardize communication functions in a network system using 7 abstraction layers,
                      enabling interoperability between different systems and vendors.
                    </p>
                    <p className="text-cream-subtle text-xs text-center mt-6">Tap to flip card ↩</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-12 border-y border-border bg-midnight-light/50">
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl md:text-4xl text-amber mb-1">{stat.value}</p>
                  <p className="text-cream-muted text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-24">
          <div className="section-container">
            <div className="text-center mb-16">
              <p className="text-amber text-sm font-medium uppercase tracking-widest mb-3">Features</p>
              <h2 className="font-serif text-4xl md:text-5xl text-cream">Everything you need to study smarter</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="glass-card p-6">
                  <div className="w-12 h-12 rounded-lg bg-amber-muted border border-amber/20 flex items-center justify-center text-2xl mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-xl text-cream mb-3">{feature.title}</h3>
                  <p className="text-cream-muted text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 bg-midnight-light/30">
          <div className="section-container">
            <div className="text-center mb-16">
              <p className="text-amber text-sm font-medium uppercase tracking-widest mb-3">How It Works</p>
              <h2 className="font-serif text-4xl md:text-5xl text-cream">Three steps. That's it.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STEPS.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-amber/40 bg-amber-muted flex items-center justify-center mx-auto mb-6">
                    <span className="font-serif text-amber text-lg">{step.number}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-cream mb-3">{step.title}</h3>
                  <p className="text-cream-muted text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24">
          <div className="section-container">
            <div className="text-center mb-16">
              <p className="text-amber text-sm font-medium uppercase tracking-widest mb-3">Pricing</p>
              <h2 className="font-serif text-4xl md:text-5xl text-cream">Simple. Honest. Free to start.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="glass-card p-8">
                <p className="text-cream-muted text-sm font-medium uppercase tracking-widest mb-4">Free</p>
                <p className="font-serif text-5xl text-cream mb-2">₹0</p>
                <p className="text-cream-muted text-sm mb-8">Forever. No card needed.</p>
                <ul className="space-y-3 mb-8">
                  {["3 flashcard decks", "10 cards per deck", "Flip card study mode", "Share deck links"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-cream-muted">
                      <span className="text-success">✓</span>{item}
                    </li>
                  ))}
                </ul>
                <Link href="/generate" className="btn-ghost w-full text-center">Get started free</Link>
              </div>

              <div className="glass-card p-8 relative ring-1 ring-amber/40" style={{ background: "linear-gradient(145deg, #1A2744, #1F2E50)" }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber text-midnight text-xs font-bold rounded-full uppercase tracking-wider">
                  Best Value
                </div>
                <p className="text-amber text-sm font-medium uppercase tracking-widest mb-4">Unlimited</p>
                <p className="font-serif text-5xl text-cream mb-2">₹99</p>
                <p className="text-cream-muted text-sm mb-8">One-time support. Forever access.</p>
                <ul className="space-y-3 mb-8">
                  {["Unlimited decks", "Unlimited cards", "Flip card study mode", "Share deck links", "Priority AI generation", "Early access to new features"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-cream">
                      <span className="text-amber">✦</span>{item}
                    </li>
                  ))}
                </ul>
                <a href="https://ko-fi.com/yourname" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center">
                  Unlock Unlimited →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24">
          <div className="section-container text-center">
            <div className="glass-card p-12 md:p-16 relative overflow-hidden border border-amber/20">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                aria-hidden="true"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(245,166,35,0.8) 0%, transparent 60%)" }}
              />
              <div className="relative z-10">
                <h2 className="font-serif text-4xl md:text-6xl text-cream mb-6">
                  Your exam is waiting.
                  <br />
                  <span className="text-gradient">Are you?</span>
                </h2>
                <p className="text-cream-muted text-lg max-w-lg mx-auto mb-10">
                  Join students who study smarter. Paste your first set of notes and see 10 flashcards appear in seconds.
                </p>
                <Link href="/generate" className="btn-primary text-lg px-10 py-5">
                  Start Studying for Free →
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-border py-8">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4 text-cream-subtle text-sm">
          <p>Built by <a href="https://twitter.com/yourhandle" className="text-cream-muted hover:text-amber transition-colors" target="_blank" rel="noopener noreferrer">Tanmay</a> · Powered by Gemini AI</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-cream transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-cream transition-colors">Terms</a>
            <a href="https://ko-fi.com/yourname" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors">☕ Support</a>
          </div>
        </div>
      </footer>
    </>
  );
}