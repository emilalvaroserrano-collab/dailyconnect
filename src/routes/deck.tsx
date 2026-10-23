import { createFileRoute } from "@tanstack/react-router";
import { DeckView } from "@/components/deck-view";
import { MemberGate } from "@/components/member-gate";

export const Route = createFileRoute("/deck")({
  component: function DeckPage() {
    return <MemberGate>{(session, profile) => <DeckView session={session} profile={profile} />}</MemberGate>;
  },
});
