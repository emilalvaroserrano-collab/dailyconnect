import { useEffect, useState } from "react";
import { generateStudio, listLive, saveLive, startLive } from "@/lib/studio.functions";
import { errorText, peso } from "@/lib/manila";
import type { StudioProduct } from "@/lib/studio/catalog";
import type { Session } from "@/lib/types";

type Destination = { status: string; detail: string };
type SessionRow = {
  id: string;
  title: string;
  scheduledAt: number;
  productCodes: string[];
  script: string;
  status: string;
  destinations: { youtube: Destination; facebook: Destination; tiktok: Destination };
};

export function LiveView({ session }: { session: Session }) {
  const [products, setProducts] = useState<StudioProduct[]>([]);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [script, setScript] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  function reload() {
    return listLive({ data: { idToken: session.idToken } }).then((result) => {
      setProducts(result.products);
      setSessions(result.sessions as SessionRow[]);
    });
  }

  useEffect(() => {
    void reload().catch((caught) => setNote(errorText(caught)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.idToken]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-8">
      <p className="text-sm text-teal">Daily Connect Live</p>
      <h1 className="font-display text-4xl">Schedule the sell</h1>
      <p className="mt-2 text-sm text-muted">
        Each platform is its own destination. Stream keys never come to this page. If a destination is not connected, the others are still checked — none of them go live until an official account is eligible.
      </p>
      <form
        className="mt-6 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          setBusy(true);
          void saveLive({
            data: {
              idToken: session.idToken,
              title,
              scheduledAt: when ? new Date(when).getTime() : Date.now(),
              productCodes: picked,
              script,
            },
          })
            .then(() => reload())
            .then(() => setNote("Session saved. It is not live."))
            .catch((caught) => setNote(errorText(caught)))
            .finally(() => setBusy(false));
        }}
      >
        <label className="block text-sm">
          Title
          <input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-raise px-3" />
        </label>
        <label className="block text-sm">
          When
          <input type="datetime-local" value={when} onChange={(event) => setWhen(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-raise px-3" />
        </label>
        <fieldset>
          <legend className="text-sm">Products</legend>
          <div className="mt-2 space-y-2">
            {products.map((product) => (
              <label key={product.code} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="size-4 accent-teal"
                  checked={picked.includes(product.code)}
                  onChange={() =>
                    setPicked((current) =>
                      current.includes(product.code) ? current.filter((code) => code !== product.code) : [...current, product.code],
                    )
                  }
                />
                {product.name} · {peso(product.price)}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm">
          Script
          <textarea value={script} onChange={(event) => setScript(event.target.value)} rows={5} className="mt-1 w-full rounded-xl border border-line bg-raise px-3 py-2" />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="h-11 rounded-full bg-surface px-4 text-sm"
            disabled={!picked[0] || busy}
            onClick={() => {
              const code = picked[0];
              if (!code) return;
              setBusy(true);
              void generateStudio({ data: { idToken: session.idToken, productCode: code, output: "script", style: title || "calm host" } })
                .then((draft) => setScript(draft.text))
                .catch((caught) => setNote(errorText(caught)))
                .finally(() => setBusy(false));
            }}
          >
            Draft a script
          </button>
          <button type="submit" disabled={busy} className="h-11 rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50">
            Save session
          </button>
        </div>
      </form>
      {note ? <p className="mt-3 text-sm text-muted">{note}</p> : null}
      <ul className="mt-8 space-y-4">
        {sessions.map((item) => (
          <li key={item.id} className="rounded-3xl bg-raise p-4">
            <h2 className="font-display text-2xl">{item.title}</h2>
            <p className="text-sm text-muted">
              {new Date(item.scheduledAt).toLocaleString()} · {item.status}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm">{item.script}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {(["youtube", "facebook", "tiktok"] as const).map((platform) => (
                <li key={platform}>
                  <span className="text-teal">{platform}</span> · {item.destinations[platform]?.status} — {item.destinations[platform]?.detail}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-3 h-10 rounded-full bg-surface px-4 text-sm"
              onClick={() => {
                void startLive({ data: { idToken: session.idToken, sessionId: item.id } })
                  .then((next) => {
                    setSessions((current) => current.map((row) => (row.id === next.id ? (next as SessionRow) : row)));
                    setNote("Checked each destination. None are connected, so nothing is streaming.");
                  })
                  .catch((caught) => setNote(errorText(caught)));
              }}
            >
              Check destinations
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
