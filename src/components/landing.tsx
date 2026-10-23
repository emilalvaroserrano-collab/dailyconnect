import { Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Code2, Database, Sparkles, Workflow } from "lucide-react";
import { Logo } from "@/components/shell";
import { captureReferralFromUrl } from "@/lib/referral-cookie";

const highlights = [
  { icon: Sparkles, title: "AI Foundations", desc: "Understand AI, LLMs and practical prompting." },
  { icon: Code2, title: "Vibe Coding", desc: "Build real websites and applications with AI." },
  { icon: Database, title: "Real App Development", desc: "Connect interfaces, databases, APIs and accounts." },
  { icon: Workflow, title: "AI Automation & Agents", desc: "Design useful business workflows and AI assistants." },
];

const modules = [
  "AI Fundamentals", "Prompt Engineering", "Vibe Coding", "Frontend UI",
  "Backend & APIs", "Database & Auth", "AI Integration", "Automation",
  "AI Agents", "Capstone & Deployment",
];

export function Landing() {
  const [toEntry, setToEntry] = useState(false);
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (!ref) return;
    captureReferralFromUrl();
    setToEntry(true);
  }, []);
  if (toEntry) return <Navigate to="/join" />;

  return (
    <main className="min-h-dvh bg-canvas text-fg">
      <header className="sticky top-0 z-20 border-b border-line/70 bg-canvas/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-2 px-4 pt-[env(safe-area-inset-top)] md:px-8">
          <Logo />
          <div className="flex items-center gap-2">
            <Link to="/login" className="inline-flex min-h-11 items-center rounded-xl px-3 text-sm text-muted hover:text-fg">Sign in</Link>
            <Link to="/join" className="inline-flex min-h-11 items-center rounded-xl bg-teal px-4 text-sm font-semibold text-ink">Join for ₱550</Link>
          </div>
        </div>
      </header>

      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-teal">DAILY CONNECT PRESENTS · AI MASTERPLAN</span>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.65rem,7vw,4.8rem)] font-semibold leading-[1.06] tracking-tight">From AI curious to <span className="text-teal">AI builder.</span></h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">A practical Zero-to-Hero AI development roadmap. Learn to prompt, build responsive apps, connect APIs and databases, automate tasks, and create AI agents—one working project at a time.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/join" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-teal px-6 font-semibold text-ink">Start learning · ₱550 <ArrowRight className="size-4" /></Link>
            <a href="#curriculum" className="inline-flex min-h-13 items-center justify-center rounded-xl border border-line px-5 font-medium text-fg">Explore the roadmap</a>
          </div>
          <p className="mt-4 text-xs text-muted">One-time membership · Guided lessons and exercises · Learn at your own pace</p>
        </div>
        <div className="overflow-hidden rounded-[1.8rem] border border-line bg-raise p-5 shadow-float md:p-7">
          <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">Your learning journey</p><h2 className="mt-2 font-display text-2xl">AI MasterPlan</h2></div><span className="grid size-12 place-items-center rounded-2xl bg-teal/15 text-teal"><BookOpen className="size-6" /></span></div>
          <div className="mt-6 space-y-2">
            {highlights.map((item, index) => (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl bg-canvas/70 p-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-teal"><item.icon className="size-5" /></span>
                <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{item.title}</p><p className="mt-0.5 text-xs text-muted">{item.desc}</p></div>
                <span className="text-xs tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-teal/25 bg-teal/10 p-4">
            <span><span className="block text-xs text-muted">One-time access</span><span className="text-3xl font-semibold text-fg">₱550</span></span>
            <CheckCircle2 className="size-7 text-teal" />
          </div>
        </div>
      </section>

      <section id="curriculum" className="border-t border-line bg-raise/40 px-5 py-14 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal">Clear learning path</p>
          <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Ten modules. One builder's roadmap.</h2>
          <p className="mt-3 max-w-xl text-sm text-muted">Each module includes guided reading, implementation steps and practice exercises. Build skills progressively rather than jumping between random AI tools.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {modules.map((title, index) => (
              <div key={title} className="rounded-2xl border border-line bg-raise p-4">
                <p className="text-xs font-semibold text-teal">MODULE {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-base font-semibold">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center md:px-8">
        <div><p className="text-sm font-medium text-teal">Taught through practical engineering experience</p><h2 className="mt-2 font-display text-2xl font-semibold">Learn with Emil Alvaro Serrano Danguilan</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">A full-stack software engineer working with AI applications, automations and business systems. Follow real development workflows—not just disconnected tool demos. Consistent practice and testing are part of the journey.</p></div>
        <Link to="/join" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-teal px-6 font-semibold text-ink">Join Daily Connect <ArrowRight className="size-4" /></Link>
      </section>
      <footer className="border-t border-line px-5 py-6 text-center text-xs text-muted">Daily Connect · AI MasterPlan · Your roadmap from idea to working app.</footer>
    </main>
  );
}
