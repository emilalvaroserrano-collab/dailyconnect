import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getDesk } from "@/lib/connect.functions";
import { useConnect } from "@/lib/connect";
import { errorText } from "@/lib/manila";
import type { Desk } from "@/lib/types";

export function Dashboard() {
  const { session } = useConnect();
  const [desk, setDesk] = useState<Desk | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    void getDesk({ data: { idToken: session.idToken } })
      .then((next) => { if (!cancelled) setDesk(next); })
      .catch((caught) => { if (!cancelled) setError(errorText(caught)); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [session]);

  if (loading) return <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted">Loading your learning path…</div>;
  if (error || !desk) return (
    <div className="mx-auto max-w-lg px-5 py-16">
      <p className="text-muted">{error || "Your learning path is unavailable."}</p>
      <button type="button" className="mt-4 min-h-11 text-teal" onClick={() => window.location.reload()}>Try again</button>
    </div>
  );

  const tutorials = [...desk.tutorials].sort((a, b) => a.sortOrder - b.sortOrder);
  const progress = new Map(desk.progress.map((row) => [row.tutorialId, row]));
  const finished = tutorials.filter((item) => progress.get(item.id)?.completed).length;
  const next = tutorials.find((item) => !progress.get(item.id)?.completed) ?? tutorials[0];
  const nextProgress = next ? progress.get(next.id)?.progressPercent ?? 0 : 0;
  const totalPercent = tutorials.length ? Math.round((finished / tutorials.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 pb-10 md:px-8 md:py-10">
      <p className="text-sm text-muted">Welcome back{desk.profile.name ? `, ${desk.profile.name.split(" ")[0]}` : ""}</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">DAILY CONNECT · AI MASTERPLAN</p><h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Keep building.</h1></div>
        <span className="rounded-xl border border-line bg-raise px-3 py-2 text-sm text-muted">{finished} of {tutorials.length} modules done</span>
      </div>

      <section className="mt-6 overflow-hidden rounded-[1.6rem] border border-line bg-raise shadow-float">
        {next ? (
          <div className="grid md:grid-cols-[0.95fr_1.05fr]">
            <img src={next.thumbnail} alt="" className="aspect-[16/9] h-full w-full object-cover md:aspect-auto" />
            <div className="flex flex-col justify-center p-5 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal">{nextProgress ? "Continue learning" : "Your next module"}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">{next.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{next.description}</p>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-surface"><div className="h-full rounded-full bg-teal" style={{ width: `${nextProgress}%` }} /></div>
              <div className="mt-2 text-xs text-muted">{nextProgress}% complete</div>
              <Link to="/learn/$tutorialId" params={{ tutorialId: next.id }} className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 self-stretch rounded-xl bg-teal px-5 font-semibold text-ink sm:self-start">{nextProgress ? "Resume module" : "Start module"} <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        ) : <p className="p-6 text-sm text-muted">Your lessons are being prepared.</p>}
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        <Link to="/learn" className="rounded-2xl border border-line bg-raise p-4"><BookOpen className="size-5 text-teal" /><p className="mt-2 text-sm font-semibold">Learning path</p><p className="mt-1 text-xs text-muted">All ten modules</p></Link>
        <Link to="/deck" className="rounded-2xl border border-line bg-raise p-4"><Sparkles className="size-5 text-teal" /><p className="mt-2 text-sm font-semibold">Community watch</p><p className="mt-1 text-xs text-muted">Member video feed</p></Link>
        <div className="col-span-2 rounded-2xl border border-line bg-raise p-4 md:col-span-1">
          <div className="flex items-center gap-2 text-teal"><CheckCircle2 className="size-5" /><span className="text-sm font-medium">Your progress</span></div>
          <div className="mt-2 flex items-end justify-between"><p className="text-2xl font-semibold">{totalPercent}%</p><p className="text-xs text-muted">Completed modules</p></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface"><div className="h-full rounded-full bg-teal" style={{ width: `${totalPercent}%` }} /></div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal">LEARN BY BUILDING</p><h2 className="mt-1 font-display text-2xl font-semibold">Your roadmap</h2></div><Link to="/learn" className="inline-flex min-h-11 items-center gap-1 text-sm text-teal">View all <ChevronRight className="size-4" /></Link></div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {tutorials.map((item, index) => {
            const row = progress.get(item.id);
            return (
              <Link key={item.id} to="/learn/$tutorialId" params={{ tutorialId: item.id }}
                className="flex min-w-0 items-center gap-3 rounded-2xl border border-line bg-raise p-3 hover:border-teal/40">
                <img src={item.thumbnail} alt="" className="size-20 shrink-0 rounded-xl object-cover sm:size-24" />
                <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-teal">MODULE {String(index + 1).padStart(2, "0")}</span><span className="mt-1 block text-sm font-semibold leading-snug">{item.title}</span><span className="mt-1 block text-xs text-muted">{row?.completed ? "Completed" : row?.progressPercent ? `${row.progressPercent}% complete` : item.difficulty}</span></span>
                {row?.completed ? <CheckCircle2 className="size-5 shrink-0 text-teal" /> : <ChevronRight className="size-5 shrink-0 text-muted" />}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
