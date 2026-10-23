import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, PlayCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { saveProgress } from "@/lib/connect.functions";
import { useConnect } from "@/lib/connect";
import { progressCacheKey } from "@/lib/session";
import type { Progress, TutorialDetail } from "@/lib/types";

export function Player({
  tutorial,
  initial,
  related,
}: {
  tutorial: TutorialDetail;
  initial: Progress | null;
  related: { id: string; title: string; thumbnail: string }[];
}) {
  const { session } = useConnect();
  const cache = useMemo(() => readCache(session?.uid, tutorial.id), [session?.uid, tutorial.id]);
  const seed = newer(initial, cache);
  const chapters = tutorial.lesson.chapters;
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState(seed?.completed ? chapters.length : Math.min(chapters.length, Math.floor((seed?.progressPercent ?? 0) * chapters.length / 100)));
  const [exercises, setExercises] = useState<string[]>(seed?.exercises ?? []);
  const [completed, setCompleted] = useState(Boolean(seed?.completed));
  const [syncNote, setSyncNote] = useState("");
  const chapter = chapters[active];
  const percent = completed ? 100 : Math.min(99, Math.round((visited / Math.max(chapters.length, 1)) * 100));
  const moduleMinutes = chapters.reduce((sum, item) => sum + item.minutes, 0);
  const position = chapters.slice(0, visited).reduce((sum, item) => sum + item.minutes * 60, 0);

  useEffect(() => {
    if (!session) return;
    const snapshot: Progress = {
      tutorialId: tutorial.id, progressPercent: percent, completed,
      lastPositionSec: position, exercises, updatedAt: Date.now(),
    };
    writeCache(session.uid, snapshot);
    const handle = window.setTimeout(() => {
      void saveProgress({ data: {
        idToken: session.idToken, tutorialId: tutorial.id,
        progressPercent: snapshot.progressPercent, lastPositionSec: snapshot.lastPositionSec,
        completed: snapshot.completed, exercises: snapshot.exercises,
      }}).then(() => setSyncNote("")).catch(() => setSyncNote("Saved on this device. Online sync will retry when you make another change."));
    }, 700);
    return () => window.clearTimeout(handle);
  }, [completed, exercises, percent, position, session, tutorial.id]);

  const chooseChapter = (index: number) => {
    setActive(index);
    setVisited((old) => Math.max(old, index + 1));
  };
  const toggleExercise = (id: string) => setExercises((current) =>
    current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 pb-12 md:px-8 md:py-10">
      <Link to="/learn" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-teal"><ArrowLeft className="size-4" /> Learning path</Link>
      <div className="mt-4 grid gap-7 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">AI MASTERPLAN · {tutorial.difficulty} · {moduleMinutes} MIN PRACTICE</p>
          <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{tutorial.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">{tutorial.description}</p>

          {tutorial.reel ? (
            <video key={tutorial.id} controls playsInline preload="metadata" poster={tutorial.thumbnail}
              src={tutorial.reel} className="mt-6 aspect-video w-full rounded-2xl bg-raise object-cover">Your browser does not support this video.</video>
          ) : (
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-line">
              <img src={tutorial.thumbnail} alt="" className="aspect-[16/8] w-full object-cover" />
              <div className="flex items-center gap-2 border-t border-line bg-raise p-3 text-xs text-muted"><BookOpen className="size-4 text-teal" /> Guided reading and practical exercises. Video walkthrough is not published yet.</div>
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-line bg-raise p-4">
            <div className="flex items-center justify-between gap-3"><p className="text-sm font-medium">Module progress</p><span className="text-sm font-semibold text-teal">{percent}%</span></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface"><div className="h-full rounded-full bg-teal" style={{ width: `${percent}%` }} /></div>
            <p className="mt-2 text-xs text-muted">{visited} of {chapters.length} chapters visited</p>
          </div>

          <section className="mt-7">
            <h2 className="font-display text-xl font-semibold">Chapters</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {chapters.map((item, index) => (
                <button key={item.id} type="button" onClick={() => chooseChapter(index)} aria-pressed={active === index}
                  className={active === index ? "min-h-20 rounded-xl border border-teal/50 bg-teal/10 p-3 text-left" : "min-h-20 rounded-xl border border-line bg-raise p-3 text-left"}>
                  <span className="text-xs text-teal">PART {index + 1} · {item.minutes} MIN</span>
                  <span className="mt-1 block text-sm font-medium">{item.title}</span>
                </button>
              ))}
            </div>
          </section>

          {chapter ? (
            <article className="mt-5 rounded-2xl border border-line bg-raise p-5 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">CHAPTER {active + 1}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">{chapter.title}</h2>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-8 text-fg/90">{chapter.body}</p>
              <button type="button"
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-teal px-5 font-semibold text-ink"
                onClick={() => { setVisited((old) => Math.max(old, active + 1)); if (active < chapters.length - 1) setActive(active + 1); }}>
                {active < chapters.length - 1 ? "Next chapter" : "Chapter reviewed"} <ArrowRight className="size-4" />
              </button>
            </article>
          ) : null}

          <section className="mt-8">
            <h2 className="font-display text-2xl font-semibold">Practice exercises</h2>
            <p className="mt-2 text-sm text-muted">Try each exercise in your own project, then check it off.</p>
            <ul className="mt-4 space-y-3">
              {tutorial.lesson.exercises.map((exercise) => (
                <li key={exercise.id} className="rounded-xl border border-line bg-raise p-4">
                  <label className="flex items-start gap-3">
                    <input type="checkbox" checked={exercises.includes(exercise.id)} onChange={() => toggleExercise(exercise.id)} className="mt-1 size-5 shrink-0 accent-teal" />
                    <span><span className="block text-sm font-medium">{exercise.prompt}</span><span className="mt-1 block text-xs leading-relaxed text-muted">{exercise.hint}</span></span>
                  </label>
                </li>
              ))}
            </ul>
            {syncNote ? <p className="mt-3 text-xs text-muted">{syncNote}</p> : null}
            <button type="button" disabled={completed} onClick={() => { setCompleted(true); setVisited(chapters.length); }}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal px-5 font-semibold text-ink disabled:opacity-70 sm:w-auto">
              {completed ? <CheckCircle2 className="size-5" /> : <PlayCircle className="size-5" />}
              {completed ? "Module completed" : "Mark module complete"}
            </button>
          </section>
        </div>
        <aside className="min-w-0">
          <div className="rounded-2xl border border-line bg-raise p-4">
            <h2 className="text-base font-semibold">Keep learning</h2>
            <p className="mt-1 text-xs text-muted">Explore the other modules in your roadmap.</p>
            <div className="mt-4 space-y-3">{related.map((item) => (
              <Link key={item.id} to="/learn/$tutorialId" params={{ tutorialId: item.id }} className="flex items-center gap-3">
                <img src={item.thumbnail} alt="" className="size-14 shrink-0 rounded-lg object-cover" /><span className="text-sm font-medium leading-snug">{item.title}</span>
              </Link>
            ))}</div>
            <Link to="/learn" className="mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-teal">View full roadmap <ArrowRight className="size-4" /></Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function readCache(uid: string | undefined, tutorialId: string): Progress | null {
  if (!uid || typeof window === "undefined") return null;
  try { const raw = localStorage.getItem(progressCacheKey(uid, tutorialId)); return raw ? (JSON.parse(raw) as Progress) : null; }
  catch { return null; }
}
function writeCache(uid: string, progress: Progress) {
  try { localStorage.setItem(progressCacheKey(uid, progress.tutorialId), JSON.stringify(progress)); } catch { /* Private-mode storage may be unavailable. */ }
}
function newer(server: Progress | null, local: Progress | null) {
  if (!server) return local;
  if (!local) return server;
  return local.updatedAt > server.updatedAt ? local : server;
}
