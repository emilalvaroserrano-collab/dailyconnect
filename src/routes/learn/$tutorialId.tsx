import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Player } from "@/components/player";
import { Shell, Splash } from "@/components/shell";
import { getDesk, getTutorial } from "@/lib/connect.functions";
import { useConnect } from "@/lib/connect";
import { errorText } from "@/lib/manila";
import type { Progress, TutorialCard, TutorialDetail } from "@/lib/types";

export const Route = createFileRoute("/learn/$tutorialId")({ component: TutorialPage });

function TutorialPage() {
  const { tutorialId } = Route.useParams();
  const { ready, session, profile } = useConnect();
  const [tutorial, setTutorial] = useState<TutorialDetail | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [related, setRelated] = useState<TutorialCard[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session || profile?.membershipStatus !== "active") return;
    let cancel = false;
    setTutorial(null);
    setError("");
    void Promise.all([
      getTutorial({ data: { idToken: session.idToken, tutorialId } }),
      getDesk({ data: { idToken: session.idToken } }),
    ])
      .then(([detail, desk]) => {
        if (cancel) return;
        setTutorial(detail.tutorial);
        setProgress(detail.progress);
        setRelated(desk.tutorials.filter((item) => item.id !== tutorialId).slice(0, 3));
      })
      .catch((caught) => {
        if (!cancel) setError(errorText(caught));
      });
    return () => {
      cancel = true;
    };
  }, [profile?.membershipStatus, session, tutorialId]);

  if (!ready) return <Splash />;
  if (!session || !profile) return <Navigate to="/login" />;
  if (profile.membershipStatus !== "active") return <Navigate to="/checkout" />;

  return (
    <Shell>
      {error ? <p className="px-5 py-16 text-muted">{error}</p> : null}
      {!error && !tutorial ? <p className="px-5 py-16 text-sm text-muted">Opening the lesson…</p> : null}
      {tutorial ? <Player tutorial={tutorial} initial={progress} related={related} /> : null}
    </Shell>
  );
}
