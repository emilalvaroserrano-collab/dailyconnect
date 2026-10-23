import { createFileRoute } from "@tanstack/react-router";
import { CreatorView } from "@/components/creator-view";
import { MemberGate } from "@/components/member-gate";

export const Route = createFileRoute("/creator")({
  component: function CreatorPage() {
    return <MemberGate>{(session) => <CreatorView session={session} />}</MemberGate>;
  },
});
