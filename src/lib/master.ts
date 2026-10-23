export const MASTER_EMAIL = "master@dailyconnect.tech";

export function isMasterEmail(email: string | null | undefined) {
  return (email ?? "").trim().toLowerCase() === MASTER_EMAIL;
}
