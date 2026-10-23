export async function uploadMemberMedia(idToken: string, file: File, _objectPath: string) {
  let ticket: Response;
  try {
    ticket = await fetch("/api/media", {
      method: "POST",
      headers: { "x-id-token": idToken },
    });
  } catch {
    throw new Error("The upload did not reach the server. Try again.");
  }
  if (!ticket.ok) {
    const text = (await ticket.text()).trim();
    throw new Error(text || "Could not start the upload.");
  }
  const signed = (await ticket.json()) as {
    cloudName: string;
    apiKey: string;
    timestamp: number;
    signature: string;
  };
  const body = new FormData();
  body.set("file", file);
  body.set("api_key", signed.apiKey);
  body.set("timestamp", String(signed.timestamp));
  body.set("signature", signed.signature);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${signed.cloudName}/video/upload`, {
    method: "POST",
    body,
  });
  const data = (await res.json()) as { secure_url?: string; error?: { message?: string } };
  if (!res.ok || !data.secure_url) {
    throw new Error(data.error?.message || "Cloudinary refused the video.");
  }
  return data.secure_url;
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