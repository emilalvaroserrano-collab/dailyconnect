import { createFileRoute } from "@tanstack/react-router";
import { MemberGate } from "@/components/member-gate";
import { StudioView } from "@/components/studio-view";

export const Route = createFileRoute("/studio")({
  component: function StudioPage() {
    return <MemberGate>{(session) => <StudioView session={session} />}</MemberGate>;
  },
});
