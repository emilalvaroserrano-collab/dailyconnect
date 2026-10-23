import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ensureProfile, getMe, refreshSession, signIn, signUp } from "@/lib/connect.functions";
import { signOutGoogle } from "@/lib/firebase-client";
import { captureReferralFromUrl, readReferral } from "@/lib/referral-cookie";
import { clearSession, readProfile, readSession, writeProfile, writeSession } from "@/lib/session";
import type { Session, UserPublic } from "@/lib/types";

type ConnectValue = {
  ready: boolean;
  session: Session | null;
  profile: UserPublic | null;
  signInEmail: (email: string, password: string) => Promise<UserPublic>;
  signUpEmail: (input: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<UserPublic>;
  adopt: (session: Session, name?: string, phone?: string) => Promise<UserPublic>;
  signOut: () => Promise<void>;
  setProfile: (profile: UserPublic) => void;
};

const ConnectContext = createContext<ConnectValue | null>(null);

async function fresh(session: Session) {
  if (session.expiresAt > Date.now() + 60_000) return session;
  if (!session.refreshToken) throw new Error("Sign in again.");
  const next = await refreshSession({ data: { refreshToken: session.refreshToken } });
  const merged = { ...next, email: next.email || session.email };
  writeSession(merged);
  return merged;
}

function remember(session: Session, profile: UserPublic) {
  writeSession(session);
  writeProfile(profile);
}

export function ConnectProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfileState] = useState<UserPublic | null>(null);

  function setProfile(next: UserPublic) {
    writeProfile(next);
    setProfileState(next);
  }

  useEffect(() => {
    captureReferralFromUrl();
    let cancel = false;
    const stored = readSession();
    const cached = readProfile();
    if (stored) setSession(stored);
    if (stored && cached?.uid === stored.uid) setProfileState(cached);
    if (!stored) {
      setReady(true);
      return;
    }
    void (async () => {
      try {
        const next = await fresh(stored);
        const me = await getMe({ data: { idToken: next.idToken } });
        if (cancel) return;
        remember(next, me);
        setSession(next);
        setProfileState(me);
      } catch (caught) {
        const message = caught instanceof Error ? caught.message : "";
        if (!cancel && message.includes("SESSION_REVOKED")) {
          clearSession();
          setSession(null);
          setProfileState(null);
        }
      } finally {
        if (!cancel) setReady(true);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const value = useMemo<ConnectValue>(
    () => ({
      ready,
      session,
      profile,
      setProfile,
      async signInEmail(email, password) {
        const result = await signIn({ data: { email, password } });
        remember(result.session, result.profile);
        setSession(result.session);
        setProfileState(result.profile);
        return result.profile;
      },
      async signUpEmail(input) {
        const referral = readReferral();
        const result = await signUp({
          data: {
            ...input,
            referralCode: referral?.code,
            cookieTimestamp: referral?.ts,
          },
        });
        remember(result.session, result.profile);
        setSession(result.session);
        setProfileState(result.profile);
        return result.profile;
      },
      async adopt(next, name, phone) {
        const referral = readReferral();
        writeSession(next);
        const me = await ensureProfile({
          data: {
            idToken: next.idToken,
            name,
            phone,
            referralCode: referral?.code,
            cookieTimestamp: referral?.ts,
          },
        });
        remember(next, me);
        setSession(next);
        setProfileState(me);
        return me;
      },
      async signOut() {
        clearSession();
        setSession(null);
        setProfileState(null);
        await signOutGoogle();
      },
    }),
    [profile, ready, session],
  );

  return <ConnectContext.Provider value={value}>{children}</ConnectContext.Provider>;
}

export function useConnect() {
  const value = useContext(ConnectContext);
  if (!value) throw new Error("Connect is unavailable.");
  return value;
}
