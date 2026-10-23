import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const token = z.string().min(20);
const id = z.string().regex(/^[A-Za-z0-9_-]{4,40}$/);

export const listFeed = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { listFeed: run } = await import("./studio.server");
    return run(data.idToken);
  });

export const recordView = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token, postId: id }))
  .handler(async ({ data }) => {
    const { recordView: run } = await import("./studio.server");
    return run(data.idToken, data.postId);
  });

export const submitPost = createServerFn({ method: "POST" })
  .validator(
    z.object({
      idToken: token,
      title: z.string().trim().min(1).max(80),
      caption: z.string().trim().max(500),
      hashtags: z.string().trim().max(120),
      kind: z.enum(["video", "image"]),
      mediaUrl: z.string().min(1).max(1_200_000),
      posterUrl: z.string().max(1_200_000),
      durationSec: z.number().min(0).max(120),
      width: z.number().min(0).max(8000),
      height: z.number().min(0).max(8000),
      mime: z.string().max(40),
      productCode: z.string().max(40),
      rightsConfirmed: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    const { submitPost: run } = await import("./studio.server");
    return run(data);
  });

export const revisePost = createServerFn({ method: "POST" })
  .validator(
    z.object({
      idToken: token,
      postId: id,
      title: z.string().trim().min(1).max(80),
      caption: z.string().trim().max(500),
    }),
  )
  .handler(async ({ data }) => {
    const { revisePost: run } = await import("./studio.server");
    return run(data);
  });

export const generateStudio = createServerFn({ method: "POST" })
  .validator(
    z.object({
      idToken: token,
      productCode: z.string().regex(/^[a-z0-9-]{2,40}$/),
      output: z.enum(["image", "caption", "script"]),
      style: z.string().max(240),
    }),
  )
  .handler(async ({ data }) => {
    const { generateStudio: run } = await import("./studio.server");
    return run(data);
  });

export const speakCaption = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token, text: z.string().trim().min(1).max(400) }))
  .handler(async ({ data }) => {
    const { speakCaption: run } = await import("./studio.server");
    return run(data.idToken, data.text);
  });

export const listProducts = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { listProducts: run } = await import("./studio.server");
    return run(data.idToken);
  });

export const loadCreator = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { loadCreator: run } = await import("./studio.server");
    return run(data.idToken);
  });

export const listLive = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { listLive: run } = await import("./studio.server");
    return run(data.idToken);
  });

export const saveLive = createServerFn({ method: "POST" })
  .validator(
    z.object({
      idToken: token,
      title: z.string().trim().max(80),
      scheduledAt: z.number().min(0),
      productCodes: z.array(z.string().regex(/^[a-z0-9-]{2,40}$/)).max(6),
      script: z.string().max(2000),
    }),
  )
  .handler(async ({ data }) => {
    const { saveLive: run } = await import("./studio.server");
    return run(data);
  });

export const startLive = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token, sessionId: id }))
  .handler(async ({ data }) => {
    const { startLive: run } = await import("./studio.server");
    return run(data.idToken, data.sessionId);
  });

export const loadModeration = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token }))
  .handler(async ({ data }) => {
    const { loadModeration: run } = await import("./studio.server");
    return run(data.idToken);
  });

export const moderatePost = createServerFn({ method: "POST" })
  .validator(
    z.object({
      idToken: token,
      postId: id,
      action: z.enum(["approve", "reject", "changes"]),
      note: z.string().max(240),
    }),
  )
  .handler(async ({ data }) => {
    const { moderatePost: run } = await import("./studio.server");
    return run(data);
  });

export const retryPublish = createServerFn({ method: "POST" })
  .validator(z.object({ idToken: token, postId: id, platform: z.enum(["tiktok", "youtube", "facebook"]) }))
  .handler(async ({ data }) => {
    const { retryPublish: run } = await import("./studio.server");
    return run(data.idToken, data.postId, data.platform);
  });

export const confirmOrder = createServerFn({ method: "POST" })
  .validator(
    z.object({
      idToken: token,
      orderId: id,
      memberCode: z.string().regex(/^[A-Z0-9]{4,12}$/),
      productCode: z.string().regex(/^[a-z0-9-]{2,40}$/),
      salePesos: z.number().int().min(1).max(10_000_000),
      event: z.enum(["confirmed", "refunded", "cancelled"]),
    }),
  )
  .handler(async ({ data }) => {
    const { confirmOrder: run } = await import("./studio.server");
    return run(data);
  });

export const recordRevenue = createServerFn({ method: "POST" })
  .validator(
    z.object({
      idToken: token,
      reportId: id,
      postId: id,
      gross: z.number().int().min(0).max(10_000_000),
      deductions: z.number().int().min(0).max(10_000_000),
      source: z.string().max(80),
      status: z.enum(["estimated", "confirmed"]),
    }),
  )
  .handler(async ({ data }) => {
    const { recordRevenue: run } = await import("./studio.server");
    return run(data);
  });

export const recordClick = createServerFn({ method: "POST" })
  .validator(
    z.object({
      memberCode: z.string().regex(/^[A-Za-z0-9]{4,12}$/),
      productCode: z.string().regex(/^[A-Za-z0-9-]{2,40}$/),
    }),
  )
  .handler(async ({ data }) => {
    const { recordClick: run } = await import("./studio.server");
    return run(data.memberCode, data.productCode);
  });

export const loadAffiliateLanding = createServerFn({ method: "POST" })
  .validator(
    z.object({
      memberCode: z.string().regex(/^[A-Za-z0-9]{4,12}$/),
      productCode: z.string().regex(/^[A-Za-z0-9-]{2,40}$/),
    }),
  )
  .handler(async ({ data }) => {
    const { loadAffiliateLanding: run } = await import("./studio.server");
    return run(data.memberCode, data.productCode);
  });
