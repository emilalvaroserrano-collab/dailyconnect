import { firebaseConfig } from "@/lib/firebase-config";

export async function uploadMemberMedia(idToken: string, file: File, objectPath: string) {
  const bucket = firebaseConfig.storageBucket;
  const name = encodeURIComponent(objectPath);
  const res = await fetch(
    `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?uploadType=media&name=${name}`,
    {
      method: "POST",
      headers: {
        Authorization: `Firebase ${idToken}`,
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { downloadTokens?: string; name?: string };
  const token = data.downloadTokens?.split(",")[0];
  if (!token) return null;
  const stored = encodeURIComponent(data.name || objectPath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${stored}?alt=media&token=${token}`;
}

export function readVideoMeta(file: File) {
  return new Promise<{ durationSec: number; width: number; height: number; posterUrl: string }>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      const width = video.videoWidth || 720;
      const height = video.videoHeight || 1280;
      const durationSec = Number.isFinite(video.duration) ? video.duration : 0;
      const canvas = document.createElement("canvas");
      canvas.width = 360;
      canvas.height = Math.max(1, Math.round((360 * height) / Math.max(1, width)));
      const ctx = canvas.getContext("2d");
      if (ctx && video.videoWidth) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const posterUrl = canvas.toDataURL("image/jpeg", 0.72);
      URL.revokeObjectURL(url);
      resolve({ durationSec, width, height, posterUrl });
    };
    const timer = window.setTimeout(finish, 2500);
    video.onloadedmetadata = () => {
      try {
        const target = Math.min(0.2, Math.max(0, (video.duration || 0) / 2));
        if (target > 0) video.currentTime = target;
        else finish();
      } catch {
        finish();
      }
    };
    video.onseeked = finish;
    video.onerror = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that video."));
    };
    video.src = url;
  });
}
