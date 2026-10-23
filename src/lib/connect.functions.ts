import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const token = z.string().min(20);

export const signUp = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().trim().min(1).max(80),
      email: z.string().trim().email().max(120),
      phone: z.string().trim().min(10).max(30),
      password: z.string().min(8).max(100),
      referralCode: z.string().trim().max(12).optional(),
      cookieTimestamp: z.number().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { signUpWithEmail } = await import("./firebase.server");
    return signUpWithEmail(data);
  });

export const signIn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().trim().email().max(120),
      password: z.string().min(8).max(100),
    }),
  )
  .handler(async ({ data }) => {
    const { signInWithEmail } = await import("./firebase.server");
    return signInWithEmail(data);
  });

export const refreshSession = createServerFn({ method: "POST" })
  .validator(z.object({ refreshToken: z.string().min(10) }))
  .handler(async ({ data }) => {
    const { refresh } = await import("./firebase.server");
    return refresh(data.refreshToken);
  });

export const ensureProfile = createServerFn({ method: "POST" })
  .validator(
    z.object({
      idToken: token,
      name: z.string().trim().max(80).optional(),
      phone: z.string().trim().max(30).optional(),
      referralCode: z.string().trim().max(12).optional(),
      cookieTimestamp: z.number().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { ensureProfile: ensure } = await import("./firebase.server");
    return ensure(data);
  });

export const getSponsor = createServerFn({ method: "POST" })
  .validator(z.object({ code: z.string().trim().regex(/^[A-Za-z0-9]{4,12}$/) }))
  .handler(async ({ data }) => {
    const { loadSponsorCard } = await import("./firebase.server");
    return loadSponsorCard(data.code);
  });

export const getMySponsor = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { loadMySponsor } = await import("./firebase.server");
    return loadMySponsor(data.idToken);
  });

export const saveContact = createServerFn({ method: "POST" })
  .validator(
    z.object({
      idToken: token,
      phone: z.string().trim().max(30),
      facebook: z.string().trim().max(200),
      whatsapp: z.string().trim().max(200),
    }),
  )
  .handler(async ({ data }) => {
    const { savePublicContact } = await import("./firebase.server");
    return savePublicContact(data);
  });

export const getMe = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { loadProfile } = await import("./firebase.server");
    return loadProfile(data.idToken);
  });

export const getDesk = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { loadDesk } = await import("./firebase.server");
    return loadDesk(data.idToken);
  });

export const getTutorial = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token, tutorialId: z.string().regex(/^[a-z0-9-]{1,40}$/) }))
  .handler(async ({ data }) => {
    const { loadTutorial } = await import("./firebase.server");
    return loadTutorial(data.idToken, data.tutorialId);
  });

export const saveProgress = createServerFn({ method: "POST" })
  .validator(
    z.object({
      idToken: token,
      tutorialId: z.string().regex(/^[a-z0-9-]{1,40}$/),
      progressPercent: z.number().min(0).max(100),
      lastPositionSec: z.number().min(0).max(60 * 60 * 8),
      completed: z.boolean(),
      exercises: z.array(z.string().max(40)).max(20),
    }),
  )
  .handler(async ({ data }) => {
    const { saveProgress: save } = await import("./firebase.server");
    return save(data);
  });

export const masterGate = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { masterAccess } = await import("./firebase.server");
    return masterAccess(data.idToken);
  });

export const listIssued = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { listIssuedCodes } = await import("./firebase.server");
    return listIssuedCodes(data.idToken);
  });

export const issueCode = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { issueActivationCode } = await import("./firebase.server");
    return issueActivationCode(data.idToken);
  });

export const listCodes = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { listSponsorCodes } = await import("./firebase.server");
    return listSponsorCodes(data.idToken);
  });

export const redeemCode = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token, code: z.string().trim().min(4).max(16) }))
  .handler(async ({ data }) => {
    const { redeemActivationCode } = await import("./firebase.server");
    return redeemActivationCode(data);
  });

export const getWallet = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { loadWallet } = await import("./firebase.server");
    return loadWallet(data.idToken);
  });

export const payout = createServerFn({ method: "POST" })
  .validator(
    z.object({
      idToken: token,
      amount: z.number().int().min(100).max(1_000_000),
      method: z.enum(["gcash", "maya"]),
      account: z.string().trim().max(24),
      phone: z.string().trim().max(20),
      accountName: z.string().trim().min(2).max(80),
    }),
  )
  .handler(async ({ data }) => {
    const { requestPayout } = await import("./firebase.server");
    return requestPayout(data.idToken, data);
  });

export const listPayouts = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { listPayoutRequests } = await import("./firebase.server");
    return listPayoutRequests(data.idToken);
  });

export const payPayout = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token, requestId: z.string().regex(/^payout_\d+$/) }))
  .handler(async ({ data }) => {
    const { markPayoutPaid } = await import("./firebase.server");
    return markPayoutPaid(data.idToken, data.requestId);
  });

export const getNetwork = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { loadNetwork } = await import("./firebase.server");
    return loadNetwork(data.idToken);
  });

export const place = createServerFn({ method: "POST" })
  .validator(
    z.object({
      idToken: token,
      recruitUid: z.string().regex(/^[A-Za-z0-9]{8,128}$/),
      parentUid: z.string().regex(/^[A-Za-z0-9]{8,128}$/),
    }),
  )
  .handler(async ({ data }) => {
    const { placeMember } = await import("./firebase.server");
    return placeMember(data);
  });

export const getNotices = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { listNotices } = await import("./firebase.server");
    return listNotices(data.idToken);
  });

export const readNotices = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { markNoticesRead } = await import("./firebase.server");
    return markNoticesRead(data.idToken);
  });
