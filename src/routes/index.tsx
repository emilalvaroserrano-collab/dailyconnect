import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Dashboard } from "@/components/dashboard";
import { Landing } from "@/components/landing";
import { Shell, Splash } from "@/components/shell";
import { useConnect } from "@/lib/connect";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { ready, session, profile } = useConnect();
  if (!ready && !profile) return <Splash />;
  if (!session || !profile) return <Landing />;
  if (profile.membershipStatus !== "active") return <Navigate to="/checkout" />;
  return (
    <Shell>
      <Dashboard />
    </Shell>
  );
}