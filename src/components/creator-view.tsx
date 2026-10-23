import { useEffect, useState } from "react";
import { loadCreator, revisePost } from "@/lib/studio.functions";
import { errorText, peso } from "@/lib/manila";
import type { Session } from "@/lib/types";

type Post = {
  id: string;
  title: string;
  status: string;
  flags: string[];
  moderatorNote: string;
  caption: string;
  destinations: Record<string, { status: string; url: string }>;
};
type Earning = { id: string; postId: string; status: string; share: number; net: number; gross: number; source: string; period: string };
type Order = { productCode?: string; status: string; memberPesos?: number };

export function CreatorView({ session }: { session: Session }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [views, setViews] = useState<Record<string, number>>({});
  const [clicks, setClicks] = useState(0);
  const [summary, setSummary] = useState({ submitted: 0, pending: 0, approved: 0, rejected: 0, estimated: 0, confirmed: 0 });
  const [note, setNote] = useState("");
  const [edit, setEdit] = useState<Post | null>(null);

  function reload() {
    return loadCreator({ data: { idToken: session.idToken } }).then((result) => {
      setPosts(result.posts as Post[]);
      setEarnings(result.earnings as Earning[]);
      setOrders(result.orders as Order[]);
      setViews(result.views);
      setClicks(result.clicks);
      setSummary(result.summary);
    });
  }

  useEffect(() => {
    void reload().catch((caught) => setNote(errorText(caught)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.idToken]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-8">
      <p className="text-sm text-teal">Creator Studio</p>
      <h1 className="font-display text-4xl">What actually posted, and what actually paid</h1>
      <p className="mt-2 text-sm text-muted">
        Estimated share is not in the wallet. Confirmed share is half of net eligible revenue a moderator reconciled. Clicks are not sales.
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {[
          ["Submitted", String(summary.submitted)],
          ["In review", String(summary.pending)],
          ["Approved", String(summary.approved)],
          ["Rejected", String(summary.rejected)],
          ["Estimated", peso(summary.estimated)],
          ["Confirmed", peso(summary.confirmed)],
          ["Link clicks", String(clicks)],
          ["Orders", String(orders.length)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-surface p-3">
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="mt-1 text-lg tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className="mt-4 text-sm text-muted">{note}</p> : null}
      <h2 className="mt-8 font-display text-2xl">Posts</h2>
      <ul className="mt-3 divide-y divide-line">
        {posts.length === 0 ? <li className="py-3 text-sm text-muted">No submissions yet.</li> : null}
        {posts.map((post) => (
          <li key={post.id} className="py-3">
            <p>{post.title}</p>
            <p className="text-sm text-muted">
              {post.status}
              {post.flags?.length ? ` · flagged: ${post.flags.join(", ")}` : ""} · {views[post.id] ?? 0} views
            </p>
            {post.moderatorNote ? <p className="text-sm">{post.moderatorNote}</p> : null}
            <p className="text-xs text-muted">
              {Object.entries(post.destinations ?? {})
                .map(([name, dest]) => `${name}: ${dest.url ? "live link" : dest.status}`)
                .join(" · ")}
            </p>
            {post.status === "changes" || post.status === "rejected" ? (
              <button type="button" className="mt-2 text-sm text-teal" onClick={() => setEdit(post)}>
                Revise
              </button>
            ) : null}
          </li>
        ))}
      </ul>
      {edit ? (
        <form
          className="mt-4 space-y-2"
          onSubmit={(event) => {
            event.preventDefault();
            void revisePost({ data: { idToken: session.idToken, postId: edit.id, title: edit.title, caption: edit.caption } })
              .then(() => {
                setEdit(null);
                setNote("Back in the queue.");
                return reload();
              })
              .catch((caught) => setNote(errorText(caught)));
          }}
        >
          <input value={edit.title} onChange={(event) => setEdit({ ...edit, title: event.target.value })} className="h-11 w-full rounded-xl border border-line bg-raise px-3" />
          <textarea value={edit.caption} onChange={(event) => setEdit({ ...edit, caption: event.target.value })} rows={3} className="w-full rounded-xl border border-line bg-raise px-3 py-2" />
          <button type="submit" className="h-11 rounded-full bg-teal px-5 text-sm font-medium text-ink">
            Resubmit
          </button>
        </form>
      ) : null}
      <h2 className="mt-8 font-display text-2xl">Earnings</h2>
      <ul className="mt-3 divide-y divide-line">
        {earnings.length === 0 ? <li className="py-3 text-sm text-muted">No reconciled revenue yet.</li> : null}
        {earnings.map((row) => (
          <li key={row.id} className="flex items-center justify-between py-3">
            <div>
              <p>
                {row.status === "estimated" ? "Estimated" : "Confirmed"} · {row.source}
              </p>
              <p className="text-sm text-muted">
                {row.period} · net {peso(row.net)} of {peso(row.gross)}
              </p>
            </div>
            <p className="tabular-nums">{peso(row.share)}</p>
          </li>
        ))}
      </ul>
      <h2 className="mt-8 font-display text-2xl">Affiliate orders</h2>
      <ul className="mt-3 divide-y divide-line">
        {orders.length === 0 ? <li className="py-3 text-sm text-muted">No merchant-confirmed orders.</li> : null}
        {orders.map((order, index) => (
          <li key={`${order.productCode}-${index}`} className="py-3 text-sm">
            {order.productCode} · {order.status} · {peso(order.memberPesos ?? 0)}
          </li>
        ))}
      </ul>
    </div>
  );
}
