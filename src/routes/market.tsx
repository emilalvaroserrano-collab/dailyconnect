import { createFileRoute } from "@tanstack/react-router";
import { MarketView } from "@/components/market-view";
import { MemberGate } from "@/components/member-gate";

export const Route = createFileRoute("/market")({
  component: function MarketPage() {
    return <MemberGate>{(session) => <MarketView session={session} />}</MemberGate>;
  },
});
