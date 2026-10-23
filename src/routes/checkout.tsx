import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo, Splash } from "@/components/shell";
import { SponsorBar } from "@/components/sponsor-bar";
import { SponsorContacts, type SponsorCard } from "@/components/contact-icons";
import { getMySponsor, redeemCode } from "@/lib/connect.functions";
import { useConnect } from "@/lib/connect";
import { errorText } from "@/lib/manila";

export const Route = createFileRoute("/checkout")({ component: Checkout });

type Card = SponsorCard;

function Checkout() {
  const navigate = useNavigate();
  const { ready, session, profile, setProfile, signOut } = useConnect();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [sponsor, setSponsor] = useState<Card | null>(null);

  useEffect(() => {
    if (!session) return;
    let cancel = false;
    void getMySponsor({ data: { idToken: session.idToken } })
      .then((next) => {
        if (!cancel) setSponsor(next);
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, [session]);

  if (!ready) return <Splash />;
  if (!session || !profile) {
    return (
      <main className="grid min-h-dvh place-items-center px-5">
        <Link to="/join" className="text-teal">
          Open your sponsor’s link
        </Link>
      </main>
    );
  }
  if (profile.membershipStatus === "active") return <Navigate to="/" />;

  return (
    <main className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-10 border-b border-line bg-canvas">
        <div className="mx-auto flex max-w-lg items-center justify-between px-5 py-3">
          <Logo />
          <button
            type="button"
            className="text-sm text-muted"
            onClick={() => {
              void signOut().then(() => navigate({ to: "/login" }));
            }}
          >
            Log out
          </button>
        </div>
        {sponsor ? <SponsorContacts card={sponsor} /> : <SponsorBar />}
      </header>
      <section className="mx-auto max-w-lg px-5 py-8">
        <p className="text-sm text-teal">Step 3 of 3</p>
        <h1 className="mt-1 font-display text-4xl">Enter the code</h1>
        <ol className="mt-5 space-y-3 text-sm">
          <li className="flex gap-3 rounded-2xl bg-raise px-3 py-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface text-teal">1</span>
            <span>Pay your sponsor ₱550 between the two of you. The app does not take the money.</span>
          </li>
          <li className="flex gap-3 rounded-2xl bg-raise px-3 py-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface text-teal">2</span>
            <span>They already bought this code from the admin, also between the two of them. The admin’s contact is not in the app.</span>
          </li>
          <li className="flex gap-3 rounded-2xl bg-raise px-3 py-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-teal text-ink">3</span>
            <span>Type the code your sponsor gives you after you pay them.</span>
          </li>
        </ol>
        <form
          className="mt-6 space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            setPending(true);
            setError("");
            void redeemCode({ data: { idToken: session.idToken, code } })
              .then((next) => {
                setProfile(next);
                void navigate({ to: "/" });
              })
              .catch((caught) => setError(errorText(caught)))
              .finally(() => setPending(false));
          }}
        >
          <label className="block text-sm">
            Enter activation code
            <input
              required
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              autoComplete="one-time-code"
              className="mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3 tracking-widest"
            />
          </label>
          {error ? <p className="text-sm text-teal">{error}</p> : null}
          <button type="submit" disabled={pending} className="h-12 w-full rounded-full bg-teal font-medium text-ink disabled:opacity-60">
            {pending ? "Checking…" : "Activate"}
          </button>
        </form>
      </section>
    </main>
  );
}