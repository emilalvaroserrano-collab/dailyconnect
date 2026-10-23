import { Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/shell";
import { formatClock, secondsUntilManilaMidnight } from "@/lib/manila";
import { captureReferralFromUrl } from "@/lib/referral-cookie";

function Clock() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(secondsUntilManilaMidnight());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{left === null ? "--:--:--" : formatClock(left)}</span>;
}

const rows = [
  ["Once", "₱550", "Settled directly with your sponsor. The app does not take it."],
  ["Direct", "₱50", "To the first link that brought you, for 1 month."],
  ["Line", "₱10", "Each of ten levels, posted on the 1st."],
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
    <main className="min-h-screen bg-canvas text-fg">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo />
          <div className="flex items-center gap-2">
            <Link to="/login" className="inline-flex h-11 items-center px-3 text-sm text-muted">
              Sign in
            </Link>
            <Link
              to="/join"
              className="inline-flex h-11 items-center rounded-full bg-teal px-4 text-sm font-medium text-ink"
            >
              Join
            </Link>
          </div>
        </div>
      </header>
      <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 pb-16 pt-8 md:grid-cols-2 md:pt-16">
        <div>
          <p className="text-sm tracking-wide text-teal">Manila · one tool a day</p>
          <h1 className="mt-3 font-display text-5xl leading-tight md:text-6xl">A new AI tool, taught before lunch.</h1>
          <p className="mt-4 max-w-md text-lg text-muted">
            Sign up, then pay your sponsor ₱550 between the two of you. They give you a code they bought from the admin the same way. The app does not take the money.
          </p>
          <ol className="mt-6 grid max-w-md gap-2 text-sm">
            <li className="rounded-2xl bg-raise px-4 py-3">1. Create an account with email or Google.</li>
            <li className="rounded-2xl bg-raise px-4 py-3">2. Pay your sponsor directly. They give you a code.</li>
            <li className="rounded-2xl bg-raise px-4 py-3">3. Enter the activation code to open the desk.</li>
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/join"
              className="inline-flex h-12 items-center rounded-full bg-teal px-6 font-medium text-ink"
            >
              Create your desk
            </Link>
            <Link to="/login" className="inline-flex h-12 items-center rounded-full px-4 text-fg">
              I already have one
            </Link>
          </div>
        </div>
        <article className="glass overflow-hidden rounded-3xl">
          <div className="relative aspect-[16/10]">
            <img src="/covers/projects.jpg" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent" />
            <div className="absolute left-4 top-4 rounded-full bg-canvas/80 px-3 py-1 text-xs text-teal">
              Next door in <Clock />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-sm text-muted">Today’s pick</p>
              <h2 className="font-display text-3xl">Members only</h2>
            </div>
          </div>
          <p className="px-4 py-4 text-sm text-muted">The lesson, the reel, and the drills stay shut until membership is active.</p>
        </article>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <table className="w-full text-left">
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-line">
                <th className="py-4 pr-4 text-sm font-medium text-muted">{row[0]}</th>
                <td className="py-4 pr-4 font-display text-2xl tabular-nums">{row[1]}</td>
                <td className="py-4 text-sm text-muted">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
