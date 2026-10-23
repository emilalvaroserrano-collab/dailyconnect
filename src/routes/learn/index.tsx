import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell, Splash } from "@/components/shell";
import { getDesk } from "@/lib/connect.functions";
import { useConnect } from "@/lib/connect";
import { errorText } from "@/lib/manila";
import type { TutorialCard } from "@/lib/types";

export const Route = createFileRoute("/learn/")({ component: Learn });

const filters = ["All", "Start", "Intermediate", "Advanced"] as const;

function Learn() {
  const { ready, session, profile } = useConnect();
  const [items, setItems] = useState<TutorialCard[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!session || profile?.membershipStatus !== "active") return;
    let cancel = false;
    void getDesk({ data: { idToken: session.idToken } })
      .then((desk) => {
        if (!cancel) setItems(desk.tutorials);
      })
      .catch((caught) => {
        if (!cancel) setError(errorText(caught));
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });
    return () => {
      cancel = true;
    };
  }, [profile?.membershipStatus, session]);

  if (!ready) return <Splash />;
  if (!session || !profile) return <Navigate to="/login" />;
  if (profile.membershipStatus !== "active") return <Navigate to="/checkout" />;

  const shown = items.filter((tutorial) => {
    const matchesFilter = filter === "All" || tutorial.difficulty === filter;
    const hay = `${tutorial.title} ${tutorial.tags.join(" ")} ${tutorial.description}`.toLowerCase();
    return matchesFilter && hay.includes(query.trim().toLowerCase());
  });

  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-5 py-6 md:px-8">
        <h1 className="font-display text-4xl">Learn</h1>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search lessons"
            className="h-12 flex-1 rounded-xl border border-line bg-raise px-3"
          />
          <div className="flex gap-2 overflow-x-auto">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={
                  filter === item
                    ? "h-10 shrink-0 rounded-full bg-teal px-3 text-sm text-ink"
                    : "h-10 shrink-0 rounded-full bg-surface px-3 text-sm text-muted"
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {loading ? <p className="mt-8 text-sm text-muted">Loading lessons…</p> : null}
        {error ? <p className="mt-8 text-sm text-teal">{error}</p> : null}
        {!loading && shown.length === 0 ? <p className="mt-8 text-sm text-muted">Nothing matches.</p> : null}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {shown.map((tutorial) => (
            <Link key={tutorial.id} to="/learn/$tutorialId" params={{ tutorialId: tutorial.id }}>
              <img src={tutorial.thumbnail} alt="" className="aspect-[3/2] w-full rounded-2xl object-cover" />
              <p className="mt-2">{tutorial.title}</p>
              <p className="text-sm text-muted">
                {tutorial.difficulty} · {tutorial.durationMin} min
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}
