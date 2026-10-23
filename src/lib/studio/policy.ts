export const PLATFORMS = ["tiktok", "youtube", "facebook"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const DISCLOSURE = "Affiliate link. Daily Connect may earn a commission.";

const MISLEADING = /guaranteed\s+(income|profit|cure|sales)|100%\s*(cure|profit|safe)|get rich/i;
const COPYRIGHT = /\b(disney|pokemon|marvel studios|nike|adidas|hello kitty)\b/i;

export type ScreenFlag = "misleading-claim" | "possible-copyright";

export function screenCopy(title: string, caption: string): ScreenFlag[] {
  const text = `${title}\n${caption}`;
  const flags: ScreenFlag[] = [];
  if (MISLEADING.test(text)) flags.push("misleading-claim");
  if (COPYRIGHT.test(text)) flags.push("possible-copyright");
  return flags;
}

export function videoIssues(input: { mime: string; durationSec: number; width: number; height: number }) {
  const issues: string[] = [];
  if (input.mime !== "video/mp4" && input.mime !== "video/webm") issues.push("Use an MP4 or WebM file.");
  if (!Number.isFinite(input.durationSec) || input.durationSec < 1 || input.durationSec > 58) {
    issues.push("Video must run between 1 and 58 seconds.");
  }
  if (input.width < 1 || input.height < 1) issues.push("Could not read the frame size.");
  else {
    const ratio = input.width / input.height;
    if (ratio < 0.45 || ratio > 0.7) issues.push("Use a portrait frame, close to 9:16.");
  }
  return issues;
}

/** 50% of net eligible revenue actually received, unless a policy overrides the bps. */
export function creatorShare(gross: number, deductions: number, shareBps = 5000) {
  const safeGross = Math.max(0, Math.round(gross));
  const safeDeductions = Math.max(0, Math.round(deductions));
  const net = Math.max(0, safeGross - safeDeductions);
  const bps = Math.min(10_000, Math.max(0, Math.round(shareBps)));
  const share = Math.round((net * bps) / 10_000);
  return { gross: safeGross, deductions: safeDeductions, net, share, basis: "net" as const, shareBps: bps };
}

export function affiliateSplit(salePesos: number, commissionBps: number, memberShareBps: number) {
  const sale = Math.max(0, Math.round(salePesos));
  const commission = Math.round((sale * Math.max(0, commissionBps)) / 10_000);
  const memberBps = Math.min(10_000, Math.max(0, Math.round(memberShareBps)));
  const member = Math.round((commission * memberBps) / 10_000);
  return { sale, grossCommission: commission, member, house: commission - member, memberShareBps: memberBps };
}

export function nextRetryAt(attempts: number, now: number) {
  const delay = Math.min(60 * 60 * 1000, 30_000 * 2 ** Math.max(0, attempts));
  return now + delay;
}

export type OrderStatus = "none" | "confirmed" | "refunded" | "cancelled";
export type OrderEvent = "confirmed" | "refunded" | "cancelled";

export function applyOrderEvent(prior: OrderStatus, event: OrderEvent) {
  if (prior === event) return "noop" as const;
  if (prior === "none" && event === "confirmed") return "credit" as const;
  if (prior === "confirmed" && (event === "refunded" || event === "cancelled")) return "reverse" as const;
  if (prior === "none") return "record" as const;
  return "noop" as const;
}

export function publishClaim(existing: boolean) {
  return existing ? ("duplicate" as const) : ("create" as const);
}

export function withDisclosure(caption: string) {
  const text = caption.trim();
  if (/affiliate link/i.test(text)) return text;
  return text ? `${text} ${DISCLOSURE}` : DISCLOSURE;
}
