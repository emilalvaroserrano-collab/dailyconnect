import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell, BookOpen, Clapperboard, Home, LineChart, Menu, Radio, Shield,
  Sparkles, Store, UserRound, Wallet, X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { getNotices, readNotices } from "@/lib/connect.functions";
import { useConnect } from "@/lib/connect";
import { cn } from "@/lib/cn";
import { SponsorBar } from "@/components/sponsor-bar";
import type { Notice } from "@/lib/types";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2.5 text-fg">
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill="#153143" />
        <path d="M9 21c0-7 9-7 11 0s11 7 11 0" fill="none" stroke="#2ee6c7" strokeWidth="3.6" strokeLinecap="round" />
        <circle cx="12" cy="15" r="2" fill="#edfdfa" />
        <circle cx="28" cy="27" r="2" fill="#edfdfa" />
      </svg>
      {compact ? null : (
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="font-display text-[17px] font-semibold tracking-tight">Daily <span className="text-teal">Connect</span></span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">AI MasterPlan</span>
        </span>
      )}
    </span>
  );
}

export function Splash() {
  return <main className="grid min-h-dvh place-items-center bg-canvas"><Logo /></main>;
}

export function Paywall() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-5 py-16">
      <p className="text-sm font-medium text-teal">Daily Connect · AI MasterPlan</p>
      <h1 className="mt-2 font-display text-4xl">Your learning path awaits.</h1>
      <p className="mt-3 text-muted">One-time membership is ₱550. Complete payment with your sponsor and use the activation code to unlock your lessons.</p>
      <Link to="/checkout" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-teal px-6 font-medium text-ink">Activate membership</Link>
    </section>
  );
}

const primary = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/learn", label: "Learn", icon: BookOpen, exact: false },
  { to: "/deck", label: "Watch", icon: Clapperboard, exact: false },
  { to: "/studio", label: "Studio", icon: Sparkles, exact: false },
] as const;

const extra = [
  { to: "/live", label: "Live sessions", hint: "Streams and community sessions", icon: Radio },
  { to: "/market", label: "Marketplace", hint: "Optional creator and affiliate products", icon: Store },
  { to: "/creator", label: "Creator tools", hint: "Your videos and performance", icon: LineChart },
  { to: "/wallet", label: "Wallet", hint: "Referral and creator balances", icon: Wallet },
  { to: "/profile", label: "My profile", hint: "Membership and account settings", icon: UserRound },
  { to: "/moderate", label: "Moderation", hint: "Manage submitted content", icon: Shield },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const { session, profile } = useConnect();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [more, setMore] = useState(false);
  const [showNotices, setShowNotices] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [unread, setUnread] = useState(0);
  const initial = (profile?.name || profile?.email || "M").charAt(0).toUpperCase();
  const moreActive = extra.some((tab) => pathname === tab.to || pathname.startsWith(tab.to + "/"));

  useEffect(() => {
    setMore(false);
    setShowNotices(false);
  }, [pathname]);

  useEffect(() => {
    if (!more && !showNotices) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMore(false); setShowNotices(false); }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [more, showNotices]);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    void getNotices({ data: { idToken: session.idToken } })
      .then((result) => {
        if (cancelled) return;
        setNotices(result.notifications);
        setUnread(result.unread);
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [pathname, session]);

  return (
    <div className="app-frame text-fg">
      <header className="relative z-20 shrink-0 border-b border-line/70 bg-canvas/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[calc(3.75rem+env(safe-area-inset-top))] w-full max-w-6xl items-center justify-between gap-3 px-4 pt-[env(safe-area-inset-top)] md:h-20 md:px-8 md:pt-0">
          <Link to="/" aria-label="Daily Connect home" className="shrink-0"><Logo /></Link>
          <nav aria-label="Desktop navigation" className="hidden items-center gap-1 md:flex">
            {primary.map((tab) => (
              <Link key={tab.to} to={tab.to} activeOptions={{ exact: tab.exact }}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-muted hover:bg-surface hover:text-fg"
                activeProps={{ className: "inline-flex min-h-11 items-center gap-2 rounded-xl bg-surface px-3 text-sm font-medium text-teal" }}>
                <tab.icon className="size-[18px]" aria-hidden="true" />{tab.label}
              </Link>
            ))}
            <button type="button" aria-expanded={more} aria-haspopup="dialog" onClick={() => { setShowNotices(false); setMore((v) => !v); }}
              className={cn("inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium", moreActive || more ? "bg-surface text-teal" : "text-muted")}>
              <Menu className="size-[18px]" />More
            </button>
          </nav>
          <div className="flex shrink-0 items-center gap-1">
            <button type="button" aria-label={unread ? `${unread} unread notifications` : "Notifications"} aria-expanded={showNotices}
              onClick={() => { setMore(false); setShowNotices((v) => !v); }}
              className="relative grid size-11 place-items-center rounded-xl text-fg hover:bg-surface">
              <Bell className="size-5" />
              {unread > 0 ? <span className="absolute right-2 top-2 size-2 rounded-full bg-teal" /> : null}
            </button>
            <Link to="/profile" aria-label="Open profile" className="grid size-10 place-items-center rounded-full bg-surface font-medium text-teal">{initial}</Link>
          </div>
        </div>
        <SponsorBar />
      </header>

      <main id="app-content" className="app-scroll" tabIndex={-1}>{children}</main>

      <nav aria-label="Mobile navigation" className="mobile-tabbar md:hidden">
        {primary.map((tab) => (
          <Link key={tab.to} to={tab.to} activeOptions={{ exact: tab.exact }}
            className="mobile-tab text-muted"
            activeProps={{ className: "mobile-tab is-active text-teal" }}>
            <tab.icon className="size-[21px]" strokeWidth={1.9} aria-hidden="true" />
            <span>{tab.label}</span>
          </Link>
        ))}
        <button type="button" aria-label="More sections" aria-expanded={more} aria-haspopup="dialog"
          className={cn("mobile-tab", moreActive || more ? "is-active text-teal" : "text-muted")}
          onClick={() => { setShowNotices(false); setMore((v) => !v); }}>
          {more ? <X className="size-[21px]" /> : <Menu className="size-[21px]" />}
          <span>More</span>
        </button>
      </nav>

      {more ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-start md:justify-end md:pt-20 md:pr-8">
          <button type="button" aria-label="Close more menu" className="absolute inset-0 bg-black/55" onClick={() => setMore(false)} />
          <section role="dialog" aria-modal="true" aria-label="More sections"
            className="mobile-sheet relative z-10 w-full max-w-md overflow-y-auto border border-line bg-raise p-4 shadow-float md:rounded-2xl">
            <div className="mb-3 flex items-center justify-between">
              <div><p className="text-base font-semibold">More</p><p className="text-xs text-muted">Daily Connect</p></div>
              <button type="button" onClick={() => setMore(false)} aria-label="Close" className="grid size-11 place-items-center rounded-xl bg-surface"><X className="size-5" /></button>
            </div>
            <div className="grid gap-1">
              {extra.map((tab) => (
                <Link key={tab.to} to={tab.to} onClick={() => setMore(false)}
                  className="flex min-h-14 items-center gap-3 rounded-xl px-3 py-2 hover:bg-surface">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-teal"><tab.icon className="size-5" /></span>
                  <span className="min-w-0"><span className="block text-sm font-medium">{tab.label}</span><span className="block text-xs text-muted">{tab.hint}</span></span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      ) : null}

      {showNotices ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-[calc(4rem+env(safe-area-inset-top))] md:justify-end md:pr-8 md:pt-20">
          <button type="button" aria-label="Close notifications" className="absolute inset-0 bg-black/45" onClick={() => setShowNotices(false)} />
          <section role="dialog" aria-modal="true" aria-label="Notifications" className="relative z-10 max-h-[70dvh] w-full max-w-sm overflow-y-auto rounded-2xl border border-line bg-raise p-4 shadow-float">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">Notifications</h2>
              <div className="flex items-center gap-3">
                {unread > 0 && session ? <button type="button" className="text-xs text-teal" onClick={() => {
                  void readNotices({ data: { idToken: session.idToken } }).then((next) => { setNotices(next); setUnread(0); });
                }}>Mark read</button> : null}
                <button type="button" aria-label="Close" className="grid size-10 place-items-center" onClick={() => setShowNotices(false)}><X className="size-5" /></button>
              </div>
            </div>
            {notices.length === 0 ? <p className="py-8 text-center text-sm text-muted">No notifications yet.</p> : (
              <ul className="space-y-2">{notices.map((notice) => (
                <li key={notice.id} className={cn("rounded-xl p-3", notice.read ? "bg-canvas/50" : "bg-surface")}>
                  <p className="text-sm font-medium">{notice.title}</p><p className="mt-1 text-xs text-muted">{notice.body}</p>
                </li>
              ))}</ul>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}
