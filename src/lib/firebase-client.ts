import { firebaseConfig } from "@/lib/firebase-config";
import type { Session } from "@/lib/types";

type TokenBag = { refreshToken?: string; expiresIn?: string };

export async function signInWithGoogle(): Promise<Session & { name: string }> {
  const { initializeApp, getApps } = await import("firebase/app");
  const { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence, signInWithPopup } = await import("firebase/auth");
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  const auth = getAuth(app);
  await setPersistence(auth, browserLocalPersistence);
  const cred = await signInWithPopup(auth, new GoogleAuthProvider());
  const idToken = await cred.user.getIdToken();
  const bag = (cred as unknown as { _tokenResponse?: TokenBag })._tokenResponse;
  return {
    idToken,
    refreshToken: cred.user.refreshToken || bag?.refreshToken || "",
    uid: cred.user.uid,
    email: cred.user.email ?? "",
    name: cred.user.displayName ?? "",
    expiresAt: Date.now() + Number(bag?.expiresIn ?? 3600) * 1000,
  };
}

export function googleError(error: unknown) {
  const code =
    error && typeof error === "object" && "code" in error ? String((error as { code: string }).code) : "";
  const host = typeof window !== "undefined" ? window.location.hostname : "this site";
  if (code.includes("unauthorized-domain")) {
    return `Google isn’t allowed on ${host} yet. Add that domain in Firebase Authentication → Settings → Authorized domains. Email still works.`;
  }
  if (code.includes("popup-blocked")) return "The browser blocked the Google window. Allow popups, or use email.";
  if (code.includes("popup-closed-by-user") || code.includes("cancelled")) return "Google window closed before finishing.";
  if (code.includes("operation-not-allowed")) return "Turn on Google in Firebase Authentication → Sign-in method.";
  if (code.includes("network")) return "Couldn’t reach Google. Try again.";
  return "Google didn’t finish. Use email, or try again.";
}

export async function signOutGoogle() {
  try {
    const { getApps } = await import("firebase/app");
    const { getAuth, signOut } = await import("firebase/auth");
    const app = getApps()[0];
    if (app) await signOut(getAuth(app));
  } catch {
    /* email sessions never open the Firebase client */
  }
}
