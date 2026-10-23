import { useEffect, useState } from "react";
import { generateStudio, listProducts, speakCaption, submitPost } from "@/lib/studio.functions";
import { errorText, peso } from "@/lib/manila";
import type { StudioProduct } from "@/lib/studio/catalog";
import type { Session } from "@/lib/types";

type Draft = {
  id: string;
  productCode: string;
  output: string;
  text: string;
  imageUrl: string;
  affiliatePath: string;
  source: string;
};

export function StudioView({ session }: { session: Session }) {
  const [products, setProducts] = useState<StudioProduct[]>([]);
  const [productCode, setProductCode] = useState("lamp");
  const [style, setStyle] = useState("morning light, quiet desk");
  const [output, setOutput] = useState<"image" | "caption" | "script">("caption");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [audio, setAudio] = useState("");
  const [rights, setRights] = useState(false);

  useEffect(() => {
    void listProducts({ data: { idToken: session.idToken } })
      .then((result) => {
        setProducts(result.products);
        if (result.products[0]) setProductCode(result.products[0].code);
      })
      .catch((caught) => setNote(errorText(caught)));
  }, [session.idToken]);

  const product = products.find((item) => item.code === productCode);

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-8">
      <p className="text-sm text-teal">Daily Connect · AI Content Studio</p>
      <h1 className="font-display text-4xl">Create and share content</h1>
      <p className="mt-2 text-sm text-muted">
        Use AI to draft images, captions, and scripts for your learning journey or optional creator products. This workspace currently creates drafts from approved products. Video is a desk draft plus your own portrait clip — this desk does not invent a finished commercial unless the image service is configured. Nothing publishes until a person approves it.
      </p>
      <form
        className="mt-6 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          setBusy(true);
          setNote("");
          setAudio("");
          void generateStudio({ data: { idToken: session.idToken, productCode, output, style } })
            .then((next) => {
              setDraft(next);
              setText(next.text);
              setNote(next.source === "grok" ? "Generated. Edit it before you submit." : "AI provider is not configured. This is a desk draft you can edit.");
            })
            .catch((caught) => setNote(errorText(caught)))
            .finally(() => setBusy(false));
        }}
      >
        <label className="block text-sm">
          Product
          <select value={productCode} onChange={(event) => setProductCode(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-raise px-3">
            {products.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name} · {peso(item.price)}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap gap-2">
          {(["caption", "image", "script"] as const).map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => setOutput(kind)}
              className={kind === output ? "h-10 rounded-full bg-teal px-4 text-sm text-ink" : "h-10 rounded-full bg-surface px-4 text-sm text-muted"}
            >
              {kind}
            </button>
          ))}
        </div>
        <label className="block text-sm">
          Style or prompt
          <input value={style} onChange={(event) => setStyle(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-raise px-3" />
        </label>
        <button type="submit" disabled={busy} className="h-11 rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50">
          {busy ? "Working…" : "Generate"}
        </button>
      </form>
      {product ? <p className="mt-3 text-sm text-muted">{product.guidelines}</p> : null}
      {note ? <p className="mt-3 text-sm text-muted">{note}</p> : null}
      {draft ? (
        <div className="mt-6 rounded-3xl bg-raise p-4">
          <img src={draft.imageUrl} alt="" className="aspect-[9/16] max-h-96 w-full rounded-2xl object-cover" />
          <p className="mt-3 text-xs text-muted">
            {draft.source} · {draft.affiliatePath}
          </p>
          <label className="mt-3 block text-sm">
            Edit
            <textarea value={text} onChange={(event) => setText(event.target.value)} rows={5} className="mt-1 w-full rounded-xl border border-line bg-canvas px-3 py-2" />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className="h-11 rounded-full bg-surface px-4 text-sm"
              onClick={() => {
                setBusy(true);
                void speakCaption({ data: { idToken: session.idToken, text } })
                  .then((result) => setAudio(result.audio))
                  .catch((caught) => setNote(errorText(caught)))
                  .finally(() => setBusy(false));
              }}
            >
              Read caption
            </button>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={rights} onChange={(event) => setRights(event.target.checked)} className="size-4 accent-teal" />
              I can use this image and any audio.
            </label>
          </div>
          {audio ? <audio controls src={audio} className="mt-3 w-full" /> : null}
          <button
            type="button"
            disabled={busy || output === "script"}
            className="mt-4 h-11 rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50"
            onClick={() => {
              setBusy(true);
              void submitPost({
                data: {
                  idToken: session.idToken,
                  title: product?.name || "Product",
                  caption: text,
                  hashtags: "#DailyConnect",
                  kind: "image",
                  mediaUrl: draft.imageUrl,
                  posterUrl: draft.imageUrl,
                  durationSec: 0,
                  width: 9,
                  height: 16,
                  mime: "image/jpeg",
                  productCode: draft.productCode,
                  rightsConfirmed: rights,
                },
              })
                .then(() => setNote("Submitted to View Deck. It waits for a person."))
                .catch((caught) => setNote(errorText(caught)))
                .finally(() => setBusy(false));
            }}
          >
            {output === "script" ? "Scripts stay on the live desk" : "Submit to View Deck"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
