import { createFileRoute } from "@tanstack/react-router";
import { MemberGate } from "@/components/member-gate";
import { ModerateView } from "@/components/moderate-view";

export const Route = createFileRoute("/moderate")({
  component: function ModeratePage() {
    return <MemberGate>{(session) => <ModerateView session={session} />}</MemberGate>;
  },
});
