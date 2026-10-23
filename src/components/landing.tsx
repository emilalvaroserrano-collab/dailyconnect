import { Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/shell";
import { captureReferralFromUrl } from "@/lib/referral-cookie";

function useDesktop() {
  const [desktop, setDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return desktop;
}

export function Landing() {
  const desktop = useDesktop();
  const [toEntry, setToEntry] = useState(false);
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (!ref) return;
    captureReferralFromUrl();
    setToEntry(true);
  }, []);
  if (toEntry) return <Navigate to="/join" />;
  const src = desktop === null ? undefined : desktop ? "/landing/pc.mp4" : "/landing/mobile.mp4";
  return (
    <main className="min-h-dvh bg-canvas text-fg">
      <header className="sticky top-0 z-10 border-b border-line bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Logo />
          <div className="flex items-center gap-2">
            <Link to="/login" className="inline-flex h-11 items-center rounded-full px-3 text-sm text-muted hover:text-fg">
              Sign in
            </Link>
            <Link to="/join" className="inline-flex h-11 items-center rounded-full bg-teal px-5 text-sm font-medium text-ink">
              Join
            </Link>
          </div>
        </div>
      </header>
      <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 md:px-8 md:py-14">
        <div className="w-full max-w-[420px] overflow-hidden rounded-[1.75rem] bg-canvas shadow-float md:max-w-5xl">
          <div className="relative aspect-[9/16] w-full md:aspect-video">
            <video
              key={src}
              className="absolute inset-0 h-full w-full bg-canvas object-contain"
              src={src}
              controls
              playsInline
              preload="metadata"
            >
              Your browser cannot play this video.
            </video>
          </div>
        </div>
        <div className="mt-10 max-w-xl text-center">
          <p className="text-sm font-medium text-teal">One tool. Every morning.</p>
          <h1 className="mt-2 font-display text-4xl leading-tight md:text-6xl">A new AI tool, taught before lunch.</h1>
          <p className="mt-4 text-muted">Watch the film, then open a desk.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/join" className="inline-flex h-12 items-center rounded-full bg-teal px-6 font-medium text-ink">
              Create your desk
            </Link>
            <Link to="/login" className="inline-flex h-12 items-center rounded-full px-4 text-fg hover:bg-surface">
              I already have one
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
