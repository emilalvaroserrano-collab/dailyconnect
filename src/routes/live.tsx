import { createFileRoute } from "@tanstack/react-router";
import { LiveView } from "@/components/live-view";
import { MemberGate } from "@/components/member-gate";

export const Route = createFileRoute("/live")({
  component: function LivePage() {
    return <MemberGate>{(session) => <LiveView session={session} />}</MemberGate>;
  },
});
