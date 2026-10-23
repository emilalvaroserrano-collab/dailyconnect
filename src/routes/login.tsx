import { createFileRoute, Navigate } from "@tanstack/react-router";
import { AuthPanel } from "@/components/auth-panel";
import { Splash } from "@/components/shell";
import { useConnect } from "@/lib/connect";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { ready, session, profile } = useConnect();
  if (!ready && !profile) return <Splash />;
  if (session && profile?.membershipStatus === "active") return <Navigate to="/" />;
  if (session && profile) return <Navigate to="/checkout" />;
  return <AuthPanel mode="login" />;
}