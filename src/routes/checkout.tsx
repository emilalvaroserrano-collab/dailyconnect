import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo, Splash } from "@/components/shell";
import { SponsorDetails, type SponsorCard } from "@/components/contact-icons";
import { getMySponsor, getSponsor, redeemCode } from "@/lib/connect.functions";
import { useConnect } from "@/lib/connect";
import { errorText } from "@/lib/manila";
import { captureReferralFromUrl } from "@/lib/referral-cookie";

export const Route = createFileRoute("/checkout")({ component: Checkout });

type Card = SponsorCard;

function Checkout() {
  const navigate = useNavigate();
  const { ready, session, profile, setProfile, signOut } = useConnect();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [sponsor, setSponsor] = useState<Card | null>(null);
  const [sponsorReady, setSponsorReady] = useState(false);

  useEffect(() => {
    if (!session) return;
    let cancel = false;
    void (async () => {
      try {
        const mine = await getMySponsor({ data: { idToken: session.idToken } });
        if (cancel) return;
        if (mine) {
          setSponsor(mine);
          return;
        }
      } catch {
        // Fall through to the referral cookie.
      }
      const referral = captureReferralFromUrl();
      if (!referral) return;
      try {
        const card = await getSponsor({ data: { code: referral.code } });
        if (!cancel && card) setSponsor(card);
      } catch {
        // No public sponsor card.
      }
    })().finally(() => {
      if (!cancel) setSponsorReady(true);
    });
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
      <header className="sticky top-0 z-10 border-b border-line bg-canvas/80 backdrop-blur-xl">
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
      </header>
      {sponsor ? (
        <SponsorDetails card={sponsor} />
      ) : sponsorReady ? (
        <p className="border-b border-line bg-raise px-5 py-4 text-sm text-muted">
          Open the link your sponsor sent so their phone, Facebook, and WhatsApp show here.
        </p>
      ) : null}
      <section className="mx-auto max-w-lg px-5 py-8">
        <h1 className="font-display text-4xl">Activate your account</h1>
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