import { useEffect, useState } from "react";
import { listProducts } from "@/lib/studio.functions";
import { errorText, peso } from "@/lib/manila";
import type { StudioProduct } from "@/lib/studio/catalog";
import type { Session } from "@/lib/types";

export function MarketView({ session }: { session: Session }) {
  const [products, setProducts] = useState<StudioProduct[]>([]);
  const [links, setLinks] = useState<Record<string, string>>({});
  const [policy, setPolicy] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    void listProducts({ data: { idToken: session.idToken } })
      .then((result) => {
        setProducts(result.products);
        setLinks(Object.fromEntries(result.links.map((link) => [link.productCode, link.path])));
        setPolicy(
          `Member share is ${result.policy.affiliateMemberShareBps / 100}% of the merchant commission. A click is not a sale. Confirmed orders are entered by a moderator from the merchant record.`,
        );
      })
      .catch((caught) => setNote(errorText(caught)));
  }, [session.idToken]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-8">
      <p className="text-sm text-teal">Affiliate marketplace</p>
      <h1 className="font-display text-4xl">Products we are allowed to sell</h1>
      <p className="mt-2 text-sm text-muted">{policy}</p>
      {note ? <p className="mt-3 text-sm text-muted">{note}</p> : null}
      <ul className="mt-6 space-y-4">
        {products.map((product) => (
          <li key={product.code} className="grid gap-4 rounded-3xl bg-raise p-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
            <img src={product.image} alt="" className="aspect-square w-full rounded-2xl object-cover" />
            <div>
              <h2 className="font-display text-2xl">{product.name}</h2>
              <p className="mt-1 text-sm text-muted">{product.description}</p>
              <p className="mt-2 tabular-nums">
                {peso(product.price)} · {product.commissionBps / 100}% merchant commission · {product.windowDays}-day window
              </p>
              <p className="mt-1 text-sm text-muted">{product.guidelines}</p>
              <p className="mt-2 break-all text-sm text-teal">{links[product.code]}</p>
              <button
                type="button"
                className="mt-3 h-10 rounded-full bg-teal px-4 text-sm font-medium text-ink"
                onClick={() => {
                  const path = links[product.code];
                  if (!path) return;
                  const absolute = new URL(path, window.location.origin).toString();
                  void navigator.clipboard.writeText(absolute).then(
                    () => setNote("Link copied."),
                    () => setNote(absolute),
                  );
                }}
              >
                Copy tracked link
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
