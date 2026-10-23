import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Shell, Splash } from "@/components/shell";
import { getDesk } from "@/lib/connect.functions";
import { useConnect } from "@/lib/connect";
import { errorText } from "@/lib/manila";
import type { Progress, TutorialCard } from "@/lib/types";

export const Route = createFileRoute("/learn/")({ component: Learn });

const filters = ["All", "Start", "Intermediate", "Advanced"] as const;

function Learn() {
  const { ready, session, profile } = useConnect();
  const [items, setItems] = useState<TutorialCard[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!session || profile?.membershipStatus !== "active") return;
    let cancelled = false;
    setLoading(true);
    void getDesk({ data: { idToken: session.idToken } })
      .then((desk) => { if (!cancelled) { setItems(desk.tutorials); setProgress(desk.progress); } })
      .catch((caught) => { if (!cancelled) setError(errorText(caught)); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [profile?.membershipStatus, session]);

  if (!ready) return <Splash />;
  if (!session || !profile) return <Navigate to="/login" />;
  if (profile.membershipStatus !== "active") return <Navigate to="/checkout" />;

  const ordered = [...items].sort((a, b) => a.sortOrder - b.sortOrder);
  const shown = ordered.filter((tutorial) => {
    const matchesFilter = filter === "All" || tutorial.difficulty === filter;
    const hay = `${tutorial.title} ${tutorial.tags.join(" ")} ${tutorial.description}`.toLowerCase();
    return matchesFilter && hay.includes(query.trim().toLowerCase());
  });
  const completed = progress.filter((row) => row.completed && ordered.some((item) => item.id === row.tutorialId)).length;

  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-5 py-6 pb-10 md:px-8 md:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">DAILY CONNECT · AI MASTERPLAN</p>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Learning path</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">From your first AI prompt to a working app, automation and AI agent. Follow modules in order, complete the practice drills and build as you learn.</p>
        <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-line bg-raise p-4">
          <span className="text-sm">Your course progress</span><span className="text-sm font-semibold text-teal">{completed}/{ordered.length} complete</span>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex min-h-12 flex-1 items-center gap-2 rounded-xl border border-line bg-raise px-3">
            <Search className="size-5 shrink-0 text-muted" />
            <span className="sr-only">Search modules</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search modules" className="min-w-0 flex-1 bg-transparent py-3 outline-none" />
          </label>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Module level">
            {filters.map((item) => (
              <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item}
                className={filter === item ? "min-h-11 shrink-0 rounded-xl bg-teal px-3 text-sm font-semibold text-ink" : "min-h-11 shrink-0 rounded-xl bg-surface px-3 text-sm text-muted"}>{item}</button>
            ))}
          </div>
        </div>
        {loading ? <p className="mt-8 text-sm text-muted">Loading modules…</p> : null}
        {error ? <p className="mt-8 text-sm text-teal">{error}</p> : null}
        {!loading && shown.length === 0 ? <p className="mt-8 text-sm text-muted">No modules match your search.</p> : null}
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {shown.map((tutorial) => {
            const index = ordered.findIndex((item) => item.id === tutorial.id);
            const row = progress.find((item) => item.tutorialId === tutorial.id);
            return (
              <Link key={tutorial.id} to="/learn/$tutorialId" params={{ tutorialId: tutorial.id }} className="flex min-w-0 items-center gap-4 rounded-2xl border border-line bg-raise p-3 hover:border-teal/40">
                <img src={tutorial.thumbnail} alt="" className="size-[92px] shrink-0 rounded-xl object-cover sm:size-28" />
                <span className="min-w-0 flex-1">
                  <span className="text-xs font-semibold text-teal">MODULE {String(index + 1).padStart(2, "0")}</span>
                  <span className="mt-1 block text-sm font-semibold leading-snug sm:text-base">{tutorial.title}</span>
                  <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{tutorial.description}</span>
                  <span className="mt-2 block text-xs text-muted">{row?.completed ? "Completed" : row?.progressPercent ? `${row.progressPercent}% progress` : tutorial.difficulty}</span>
                </span>
                {row?.completed ? <CheckCircle2 className="size-5 shrink-0 text-teal" /> : <ChevronRight className="size-5 shrink-0 text-muted" />}
              </Link>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
