import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Logo, Splash } from "@/components/shell";
import { listPayouts, masterGate, payPayout } from "@/lib/connect.functions";
import { useConnect } from "@/lib/connect";
import { googleError, signInWithGoogle } from "@/lib/firebase-client";
import { errorText, peso } from "@/lib/manila";
import { MASTER_EMAIL } from "@/lib/master";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type PayoutRow = {
  id: string;
  name: string;
  email: string;
  amount: number;
  method: "gcash" | "maya";
  account: string;
  phone: string;
  accountName: string;
  status: "requested" | "paid";
  createdAt: number;
  paidAt: number | null;
};

function when(ts: number | null) {
  if (!ts) return "";
  return new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(ts);
}

function AdminPage() {
  const { ready, session, signInEmail, adopt, signOut } = useConnect();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [gate, setGate] = useState<{ email: string; allowed: boolean } | null>(null);
  const [rows, setRows] = useState<PayoutRow[]>([]);

  useEffect(() => {
    if (!session) {
      setGate(null);
      return;
    }
    let cancel = false;
    void masterGate({ data: { idToken: session.idToken } })
      .then((next) => {
        if (!cancel) setGate(next);
      })
      .catch((caught) => {
        if (!cancel) setError(errorText(caught));
      });
    return () => {
      cancel = true;
    };
  }, [session]);

  useEffect(() => {
    if (!session || !gate?.allowed) return;
    let cancel = false;
    void listPayouts({ data: { idToken: session.idToken } })
      .then((result) => {
        if (!cancel) setRows(result.requests);
      })
      .catch((caught) => {
        if (!cancel) setError(errorText(caught));
      });
    return () => {
      cancel = true;
    };
  }, [session, gate?.allowed]);

  if (!ready || (session && !gate && !error)) return <Splash />;

  async function onEmail(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending("email");
    try {
      await signInEmail(email, password);
    } catch (caught) {
      setError(errorText(caught));
    } finally {
      setPending(null);
    }
  }

  async function onGoogle() {
    setError("");
    setPending("google");
    try {
      const next = await signInWithGoogle();
      await adopt(
        {
          idToken: next.idToken,
          refreshToken: next.refreshToken,
          uid: next.uid,
          email: next.email,
          expiresAt: next.expiresAt,
        },
        next.name,
      );
    } catch (caught) {
      const code = caught && typeof caught === "object" && "code" in caught;
      setError(code ? googleError(caught) : errorText(caught));
    } finally {
      setPending(null);
    }
  }

  return (
    <main className="min-h-dvh bg-canvas">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <Logo />
          {session ? (
            <button type="button" className="text-sm text-muted" onClick={() => void signOut()}>
              Log out
            </button>
          ) : null}
        </div>
      </header>
      <section className="mx-auto max-w-3xl px-5 py-8">
        <p className="text-sm text-teal">Payouts</p>
        <h1 className="mt-1 font-display text-4xl">Admin</h1>
        {!session ? (
          <form className="mt-6 max-w-md space-y-3" onSubmit={onEmail}>
            <p className="text-sm text-muted">Sign in with {MASTER_EMAIL}.</p>
            <input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="h-12 w-full rounded-xl border border-line bg-raise px-3" />
            <input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="h-12 w-full rounded-xl border border-line bg-raise px-3" />
            {error ? <p className="text-sm text-teal">{error}</p> : null}
            <button type="submit" disabled={pending !== null} className="h-12 w-full rounded-full bg-teal font-medium text-ink disabled:opacity-60">
              {pending === "email" ? "Signing in…" : "Sign in"}
            </button>
            <button type="button" disabled={pending !== null} onClick={() => void onGoogle()} className="h-12 w-full rounded-full border border-line bg-raise font-medium disabled:opacity-60">
              {pending === "google" ? "Opening Google…" : "Continue with Google"}
            </button>
          </form>
        ) : !gate?.allowed ? (
          <p className="mt-4 text-sm text-muted">Signed in as {gate?.email || "another account"}. Only {MASTER_EMAIL} can open this desk.</p>
        ) : (
          <>
            {error ? <p className="mt-4 text-sm text-teal">{error}</p> : null}
            {rows.length === 0 ? <p className="mt-6 text-sm text-muted">No payout requests.</p> : null}
            <ul className="mt-6 space-y-3">
              {rows.map((row) => (
                <li key={row.id} className="rounded-2xl bg-raise px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{row.name}</p>
                      <p className="text-sm text-muted">{row.email}</p>
                    </div>
                    <p className="font-display text-2xl tabular-nums">{peso(row.amount)}</p>
                  </div>
                  <p className="mt-2 text-sm">
                    {row.method === "gcash" ? "GCash" : "Maya"} · {row.accountName || "No name"} · {row.account || "No account"}
                  </p>
                  <p className="text-sm text-muted">
                    Requested {when(row.createdAt)}
                    {row.status === "paid" && row.paidAt ? ` · Paid ${when(row.paidAt)}` : " · Not paid"}
                  </p>
                  {row.status === "requested" ? (
                    <button
                      type="button"
                      disabled={pending !== null}
                      className="mt-3 h-10 rounded-full bg-teal px-4 text-sm font-medium text-ink disabled:opacity-50"
                      onClick={() => {
                        if (!session) return;
                        setPending(row.id);
                        setError("");
                        void payPayout({ data: { idToken: session.idToken, requestId: row.id } })
                          .then((result) => setRows(result.requests))
                          .catch((caught) => setError(errorText(caught)))
                          .finally(() => setPending(null));
                      }}
                    >
                      {pending === row.id ? "Paying…" : "Mark paid"}
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}
