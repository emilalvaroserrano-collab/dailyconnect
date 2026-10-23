import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthPanel } from "@/components/auth-panel";
import { Splash } from "@/components/shell";
import { useConnect } from "@/lib/connect";
import { captureReferralFromUrl } from "@/lib/referral-cookie";

export const Route = createFileRoute("/join")({ component: Join });

function Join() {
  const { ready, session, profile } = useConnect();
  useEffect(() => {
    captureReferralFromUrl();
  }, []);
  if (!ready) return <Splash />;
  if (session && profile?.membershipStatus === "active") return <Navigate to="/" />;
  if (session && profile) return <Navigate to="/checkout" />;
  return <AuthPanel mode="join" />;
}
