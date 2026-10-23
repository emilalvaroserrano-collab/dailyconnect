import { createHash } from "node:crypto";

export const CLOUD_NAME = "f4iuzezb";
export const CLOUD_API_KEY = "361377871219586";

export function signVideoUpload() {
  const secret = process.env.CLOUDINARY_API_SECRET?.trim() || "";
  if (!secret) {
    throw new Error("Cloudinary API secret is missing. The dashboard hid it. Copy the secret for key 361377871219586 and set CLOUDINARY_API_SECRET.");
  }
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1").update(`timestamp=${timestamp}${secret}`).digest("hex");
  return { cloudName: CLOUD_NAME, apiKey: CLOUD_API_KEY, timestamp, signature };
}
