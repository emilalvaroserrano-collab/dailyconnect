import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell, Splash } from "@/components/shell";
import { getWallet, payout } from "@/lib/connect.functions";
import { useConnect } from "@/lib/connect";
import { PAYOUT_MIN } from "@/lib/firebase-config";
import { errorText, peso } from "@/lib/manila";
import type { WalletView } from "@/lib/types";

export const Route = createFileRoute("/wallet")({ component: WalletPage });

const labels: Record<string, string> = {
  referral_bonus: "Direct referral",
  unilevel: "Unilevel",
  payout: "Payout",
  creator_share: "Creator share",
  affiliate_commission: "Affiliate commission",
  adjustment: "Adjustment",
};

function WalletPage() {
  const { ready, session, profile, setProfile } = useConnect();
  const [view, setView] = useState<WalletView | null>(null);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(PAYOUT_MIN);
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!session) return;
    let cancel = false;
    void getWallet({ data: { idToken: session.idToken } })
      .then((next) => {
        if (cancel) return;
        setView(next);
        setProfile(next.profile);
        setAmount(Math.max(PAYOUT_MIN, next.profile.walletBalance));
      })
      .catch((caught) => {
        if (!cancel) setError(errorText(caught));
      });
    return () => {
      cancel = true;
    };
  }, [session, setProfile]);

  if (!ready) return <Splash />;
  if (!session || !profile) return <Navigate to="/login" />;
  if (profile.membershipStatus !== "active") return <Navigate to="/checkout" />;

  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-5 py-6 md:px-8">
        <h1 className="font-display text-4xl">Wallet</h1>
        {error ? <p className="mt-4 text-sm text-teal">{error}</p> : null}
        {view ? (
          <>
            <p className="mt-6 text-sm text-muted">Available now</p>
            <p className="font-display text-5xl tabular-nums">{peso(view.profile.walletBalance)}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["Direct, paid", String(view.directPaid)],
                ["Waiting to join", String(view.directPending)],
                ["Referral paid", peso(view.directBonus)],
                ["Accruing", peso(view.accruing)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-surface p-3">
                  <dt className="text-xs text-muted">{label}</dt>
                  <dd className="mt-1 text-lg tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-muted">
              ₱50 from a direct join is available immediately. ₱10 unilevel posts on the 1st (Manila). Line size: {view.teamSize}.
            </p>
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                if (!session) return;
                setPending(true);
                setNote("");
                void payout({ data: { idToken: session.idToken, amount } })
                  .then(() => getWallet({ data: { idToken: session.idToken } }))
                  .then((next) => {
                    setView(next);
                    setProfile(next.profile);
                    setNote("Payout requested. It stays in history until the monthly run.");
                  })
                  .catch((caught) => setNote(errorText(caught)))
                  .finally(() => setPending(false));
              }}
            >
              <label className="text-sm">
                Request payout
                <input
                  type="number"
                  min={PAYOUT_MIN}
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3 sm:w-40"
                />
              </label>
              <button
                type="submit"
                disabled={pending || profile.membershipStatus !== "active"}
                className="h-12 self-end rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50"
              >
                {pending ? "Sending…" : "Request"}
              </button>
            </form>
            {note ? <p className="mt-3 text-sm text-muted">{note}</p> : null}
            <h2 className="mt-10 font-display text-2xl">History</h2>
            {view.transactions.length === 0 ? (
              <p className="mt-2 text-sm text-muted">Share your link. ₱50 lands the moment they join.</p>
            ) : (
              <ul className="mt-4 divide-y divide-line">
                {view.transactions.map((tx) => (
                  <li key={tx.id} className="flex items-center justify-between py-3">
                    <div>
                      <p>{labels[tx.type]}</p>
                      <p className="text-sm text-muted">
                        {tx.note} · {tx.status === "scheduled" ? "Posts on the 1st" : tx.status}
                      </p>
                    </div>
                    <p className="tabular-nums">
                      {tx.type === "payout" || tx.amount < 0 ? "−" : "+"}
                      {peso(Math.abs(tx.amount))}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="mt-6 text-sm text-muted">Loading wallet…</p>
        )}
      </div>
    </Shell>
  );
}
