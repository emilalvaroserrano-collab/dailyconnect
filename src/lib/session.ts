import type { Session, UserPublic } from "@/lib/types";

const KEY = "dc.session.v1";
const PROFILE = "dc.profile.v1";

export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Session;
    if (!value?.idToken || !value.uid) return null;
    return value;
  } catch {
    return null;
  }
}

export function writeSession(session: Session) {
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function readProfile(): UserPublic | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE);
    if (!raw) return null;
    const value = JSON.parse(raw) as UserPublic;
    if (!value?.uid) return null;
    return value;
  } catch {
    return null;
  }
}

export function writeProfile(profile: UserPublic) {
  localStorage.setItem(PROFILE, JSON.stringify(profile));
}

export function clearSession() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(PROFILE);
}

export function progressCacheKey(uid: string, tutorialId: string) {
  return `dc.progress.${uid}.${tutorialId}`;
}
