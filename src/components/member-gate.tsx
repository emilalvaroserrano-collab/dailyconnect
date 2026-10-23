import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Splash, Shell } from "@/components/shell";
import { useConnect } from "@/lib/connect";
import type { Session, UserPublic } from "@/lib/types";

export function MemberGate({ children }: { children: (session: Session, profile: UserPublic) => ReactNode }) {
  const { ready, session, profile } = useConnect();
  if (!ready) return <Splash />;
  if (!session || !profile) return <Navigate to="/login" />;
  if (profile.membershipStatus !== "active") return <Navigate to="/checkout" />;
  return <Shell>{children(session, profile)}</Shell>;
}
