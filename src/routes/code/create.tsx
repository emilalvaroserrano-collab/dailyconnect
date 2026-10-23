import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Logo, Splash } from "@/components/shell";
import { issueCode, listIssued, masterGate } from "@/lib/connect.functions";
import { useConnect } from "@/lib/connect";
import { googleError, signInWithGoogle } from "@/lib/firebase-client";
import { errorText } from "@/lib/manila";
import { MASTER_EMAIL } from "@/lib/master";

export const Route = createFileRoute("/code/create")({ component: CreateCode });

type IssuedCode = {
  code: string;
  status: "available" | "used";
  createdAt: number;
  createdByEmail: string;
  createdByName: string;
  createdWhere: string;
  sponsorName: string;
  sponsorCode: string;
  usedAt: number | null;
  usedByName: string | null;
  usedByEmail: string | null;
};

function when(ts: number | null) {
  if (!ts) return "Not used";
  return new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(ts);
}

function CreateCode() {
  const { ready, session, signInEmail, adopt, signOut } = useConnect();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [issued, setIssued] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState<"email" | "google" | "code" | null>(null);
  const [gate, setGate] = useState<{ email: string; allowed: boolean } | null>(null);
  const [rows, setRows] = useState<IssuedCode[]>([]);

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
    void listIssued({ data: { idToken: session.idToken } })
      .then((result) => {
        if (!cancel) setRows(result.codes);
      })
      .catch((caught) => {
        if (!cancel) setError(errorText(caught));
      });
    return () => {
      cancel = true;
    };
  }, [session, gate?.allowed, issued]);

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
        <div className="mx-auto flex max-w-lg items-center justify-between px-5 py-3">
          <Logo />
          {session ? (
            <button type="button" className="text-sm text-muted" onClick={() => void signOut()}>
              Log out
            </button>
          ) : null}
        </div>
      </header>
      <section className="mx-auto max-w-lg px-5 py-8">
        <p className="text-sm text-teal">Activation codes</p>
        <h1 className="mt-1 font-display text-4xl">Create a code</h1>
        {!session ? (
          <form className="mt-6 space-y-3" onSubmit={onEmail}>
            <p className="text-sm text-muted">Sign in with {MASTER_EMAIL}.</p>
            <input
              required
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="h-12 w-full rounded-xl border border-line bg-raise px-3"
            />
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="h-12 w-full rounded-xl border border-line bg-raise px-3"
            />
            {error ? <p className="text-sm text-teal">{error}</p> : null}
            <button type="submit" disabled={pending !== null} className="h-12 w-full rounded-full bg-teal font-medium text-ink disabled:opacity-60">
              {pending === "email" ? "Signing in…" : "Sign in"}
            </button>
            <button type="button" disabled={pending !== null} onClick={() => void onGoogle()} className="h-12 w-full rounded-full border border-line bg-raise font-medium disabled:opacity-60">
              {pending === "google" ? "Opening Google…" : "Continue with Google"}
            </button>
          </form>
        ) : !gate?.allowed ? (
          <p className="mt-4 text-sm text-muted">
            Signed in as {gate?.email || "another account"}. Only {MASTER_EMAIL} can create a code.
          </p>
        ) : (
          <form
            className="mt-6 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!session) return;
              setPending("code");
              setError("");
              void issueCode({ data: { idToken: session.idToken } })
                .then((result) => {
                  setIssued(result.code);
                })
                .catch((caught) => setError(errorText(caught)))
                .finally(() => setPending(null));
            }}
          >
            <p className="text-sm text-muted">
              Signed in as {MASTER_EMAIL}. This code only activates a member. Their sponsor stays the one from the affiliate link.
            </p>
            {error ? <p className="text-sm text-teal">{error}</p> : null}
            <button type="submit" disabled={pending !== null} className="h-12 w-full rounded-full bg-teal font-medium text-ink disabled:opacity-60">
              {pending === "code" ? "Creating…" : "Create activation code"}
            </button>
            {issued ? <p className="font-display text-3xl tracking-widest text-teal">{issued}</p> : null}
          </form>
        )}
        {gate?.allowed ? (
          <section className="mt-8">
            <h2 className="font-display text-2xl">Code list</h2>
            <p className="mt-1 text-sm text-muted">Saved in Firebase. Status shows who created each code, where, and who used it.</p>
            {rows.length === 0 ? <p className="mt-3 text-sm text-muted">No codes yet.</p> : null}
            <ul className="mt-3 space-y-3">
              {rows.map((row) => (
                <li key={row.code} className="rounded-2xl bg-raise px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-2xl tracking-widest text-teal">{row.code}</p>
                    <p className="text-sm text-muted">{row.status === "used" ? "Used" : "Available"}</p>
                  </div>
                  <p className="mt-2 text-sm">Created {when(row.createdAt)} by {row.createdByName || row.createdByEmail} at {row.createdWhere || "/code/create"}</p>
                  {row.sponsorName || row.sponsorCode ? (
                    <p className="text-sm text-muted">Used under {row.sponsorName || "sponsor"} · {row.sponsorCode}</p>
                  ) : (
                    <p className="text-sm text-muted">Sponsor is set by the affiliate link, not by this code.</p>
                  )}
                  <p className="text-sm text-muted">
                    {row.status === "used"
                      ? `Used ${when(row.usedAt)} by ${row.usedByName || "member"}${row.usedByEmail ? ` · ${row.usedByEmail}` : ""}`
                      : "Not used yet"}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </section>
    </main>
  );
}
