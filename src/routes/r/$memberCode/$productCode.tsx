import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/shell";
import { SponsorBar } from "@/components/sponsor-bar";
import { loadAffiliateLanding, recordClick } from "@/lib/studio.functions";
import { errorText, peso } from "@/lib/manila";
import type { StudioProduct } from "@/lib/studio/catalog";

export const Route = createFileRoute("/r/$memberCode/$productCode")({
  component: AffiliateLanding,
});

function AffiliateLanding() {
  const { memberCode, productCode } = Route.useParams();
  const [product, setProduct] = useState<StudioProduct | null>(null);
  const [memberName, setMemberName] = useState("");
  const [disclosure, setDisclosure] = useState("");
  const [windowDays, setWindowDays] = useState(0);
  const [error, setError] = useState("");
  const [recorded, setRecorded] = useState<boolean | null>(null);

  useEffect(() => {
    let cancel = false;
    void loadAffiliateLanding({ data: { memberCode, productCode } })
      .then((result) => {
        if (cancel) return;
        setProduct(result.product);
        setMemberName(result.memberName);
        setDisclosure(result.disclosure);
        setWindowDays(result.windowDays);
      })
      .catch((caught) => {
        if (!cancel) setError(errorText(caught));
      });
    void recordClick({ data: { memberCode, productCode } })
      .then((result) => {
        if (!cancel) setRecorded(result.recorded);
      })
      .catch(() => {
        if (!cancel) setRecorded(false);
      });
    return () => {
      cancel = true;
    };
  }, [memberCode, productCode]);

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col px-5 py-8">
      <Logo />
      <SponsorBar />
      {error ? <p className="mt-10 text-muted">{error}</p> : null}
      {product ? (
        <article className="mt-8">
          <img src={product.image} alt="" className="aspect-square w-full rounded-3xl object-cover" />
          <p className="mt-4 text-sm text-teal">Shared by {memberName}</p>
          <h1 className="font-display text-4xl">{product.name}</h1>
          <p className="mt-2 text-muted">{product.description}</p>
          <p className="mt-3 text-2xl tabular-nums">{peso(product.price)}</p>
          <p className="mt-4 text-sm">{disclosure}</p>
          <p className="mt-2 text-sm text-muted">
            {recorded ? "This click was recorded." : "Click noted."} A sale counts only after the merchant confirms it, inside {windowDays} days.
          </p>
        </article>
      ) : null}
    </main>
  );
}
