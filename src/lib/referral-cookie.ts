const KEY = "dc.referral.v1";
const COOKIE = "dc_ref";
/** One month. The first link keeps the attribution for this whole window. */
export const REFERRAL_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_AGE = Math.floor(REFERRAL_WINDOW_MS / 1000);

export type ReferralCookie = { code: string; ts: number };

function valid(code: string) {
  return /^[A-Z0-9]{4,12}$/.test(code);
}

function parse(raw: string | null): ReferralCookie | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as ReferralCookie;
    if (!value || typeof value.code !== "string" || typeof value.ts !== "number") return null;
    if (!valid(value.code) || Date.now() - value.ts > REFERRAL_WINDOW_MS) return null;
    return { code: value.code, ts: value.ts };
  } catch {
    return null;
  }
}

function readCookieRaw() {
  const parts = document.cookie.split("; ");
  const row = parts.find((part) => part.startsWith(`${COOKIE}=`));
  if (!row) return null;
  try {
    return decodeURIComponent(row.slice(COOKIE.length + 1));
  } catch {
    return null;
  }
}

function clearCookie() {
  document.cookie = `${COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
  localStorage.removeItem(KEY);
}

function writeReferral(record: ReferralCookie) {
  const payload = encodeURIComponent(JSON.stringify(record));
  document.cookie = `${COOKIE}=${payload}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax`;
  localStorage.setItem(KEY, JSON.stringify(record));
}

export function readReferral(): ReferralCookie | null {
  if (typeof window === "undefined") return null;
  const fromCookie = parse(readCookieRaw());
  if (fromCookie) return fromCookie;
  const fromStore = parse(localStorage.getItem(KEY));
  if (!fromStore) {
    if (readCookieRaw() || localStorage.getItem(KEY)) clearCookie();
    return null;
  }
  writeReferral(fromStore);
  return fromStore;
}

function codeFromLocation() {
  const query = new URLSearchParams(window.location.search).get("ref")?.trim().toUpperCase() ?? "";
  if (valid(query)) return query;
  const path = window.location.pathname.match(/^\/r\/([A-Za-z0-9]{4,12})(?:\/|$)/i);
  const fromPath = path?.[1]?.toUpperCase() ?? "";
  return valid(fromPath) ? fromPath : "";
}

/** First link opener keeps the credit for one month. Later links do not replace it. */
export function captureReferralFromUrl(): ReferralCookie | null {
  if (typeof window === "undefined") return null;
  const existing = readReferral();
  const ref = codeFromLocation();
  if (!ref) return existing;
  if (existing) return existing;
  const record = { code: ref, ts: Date.now() };
  writeReferral(record);
  return record;
}
