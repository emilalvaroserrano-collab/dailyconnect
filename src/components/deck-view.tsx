import { useEffect, useRef, useState } from "react";
import { listFeed, recordView, submitPost } from "@/lib/studio.functions";
import { uploadMemberMedia, readVideoMeta } from "@/lib/upload-media";
import { errorText } from "@/lib/manila";
import { PRODUCT_CATALOG } from "@/lib/studio/catalog";
import type { Session, UserPublic } from "@/lib/types";

type Destination = { status: string; url: string; error: string; attempts: number };
type Post = {
  id: string;
  creatorName: string;
  creatorCode: string;
  kind: "video" | "image";
  title: string;
  caption: string;
  mediaUrl: string;
  posterUrl: string;
  productCode: string;
  affiliatePath: string;
  status: string;
  creatorId?: string;
  destinations: { tiktok: Destination; youtube: Destination; facebook: Destination };
};

function Reel({
  post,
  mine,
  onView,
}: {
  post: Post;
  mine: boolean;
  onView: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const seen = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
          if (!seen.current) {
            seen.current = true;
            onView();
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.65 },
    );
    watcher.observe(video);
    return () => watcher.disconnect();
  }, [onView]);

  return (
    <article className="snap-start snap-always relative h-[78dvh] overflow-hidden bg-black">
      {post.kind === "video" ? (
        <video
          ref={videoRef}
          src={post.mediaUrl}
          poster={post.posterUrl}
          playsInline
          muted
          loop
          className="h-full w-full object-cover"
        />
      ) : (
        <img src={post.mediaUrl} alt="" className="h-full w-full object-cover" />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-4 pt-24">
        <p className="text-sm font-medium text-white">{post.creatorName}</p>
        <h2 className="mt-1 text-lg text-white">{post.title}</h2>
        {post.caption ? <p className="mt-1 line-clamp-3 text-sm text-white/85">{post.caption}</p> : null}
        {mine && post.status !== "approved" && post.status !== "publishing" ? (
          <p className="mt-2 text-xs text-teal">{post.status === "queued" ? "In review" : post.status}</p>
        ) : null}
        {post.affiliatePath ? (
          <a href={post.affiliatePath} className="pointer-events-auto mt-3 inline-flex h-9 items-center rounded-full bg-white/15 px-3 text-sm text-white">
            View product
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function DeckView({ session, profile }: { session: Session; profile: UserPublic }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [productCode, setProductCode] = useState("");
  const [rights, setRights] = useState(false);
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function reload() {
    return listFeed({ data: { idToken: session.idToken } }).then((result) => setPosts(result.posts as Post[]));
  }

  useEffect(() => {
    let cancel = false;
    void reload()
      .catch((caught) => {
        if (!cancel) setError(errorText(caught));
      });
    return () => {
      cancel = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.idToken]);

  return (
    <div className="relative mx-auto h-full max-w-md">
      <div className="h-full snap-y snap-mandatory overflow-y-auto">
        <section className="sticky top-0 z-10 border-b border-line bg-canvas px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface font-medium text-teal">
              {(profile.name || "M").charAt(0).toUpperCase()}
            </span>
            <button
              type="button"
              className="h-11 flex-1 rounded-full bg-raise px-4 text-left text-sm text-muted"
              onClick={() => setOpen(true)}
            >
              Post a video
            </button>
            <button
              type="button"
              className="h-11 rounded-full bg-teal px-4 text-sm font-medium text-ink"
              onClick={() => setOpen(true)}
            >
              Post
            </button>
          </div>
          {error ? <p className="mt-2 text-sm text-muted">{error}</p> : null}
          {note && !open ? <p className="mt-2 text-sm text-muted">{note}</p> : null}
        </section>
        {posts.length === 0 ? (
          <p className="px-4 py-16 text-center text-sm text-muted">No reels yet. Post the first video.</p>
        ) : (
          posts.map((post) => (
            <Reel
              key={post.id}
              post={post}
              mine={post.creatorId === profile.uid}
              onView={() => {
                void recordView({ data: { idToken: session.idToken, postId: post.id } }).catch(() => undefined);
              }}
            />
          ))
        )}
      </div>
      {open ? (
        <div className="fixed inset-0 z-30 flex flex-col justify-end bg-canvas/70">
          <form
            className="max-h-[85%] space-y-3 overflow-y-auto rounded-t-3xl border border-line bg-raise px-4 py-5"
            onSubmit={(event) => {
              event.preventDefault();
              setNote("");
              setBusy(true);
              const file = fileRef.current?.files?.[0];
              void (async () => {
                if (!file) throw new Error("Choose a video to upload.");
                const meta = await readVideoMeta(file);
                let mediaUrl = await uploadMemberMedia(session.idToken, file, `dailyConnect/${profile.uid}/${Date.now()}.mp4`);
                if (!mediaUrl) {
                  if (file.size > 700_000) throw new Error("Storage refused the file. Trim it under about 700KB and try again.");
                  mediaUrl = await fileToData(file);
                }
                await submitPost({
                  data: {
                    idToken: session.idToken,
                    title,
                    caption,
                    hashtags: "#DailyConnect",
                    kind: "video",
                    mediaUrl,
                    posterUrl: meta.posterUrl,
                    durationSec: meta.durationSec,
                    width: meta.width,
                    height: meta.height,
                    mime: file.type || "video/mp4",
                    productCode,
                    rightsConfirmed: rights,
                  },
                });
                setTitle("");
                setCaption("");
                setRights(false);
                setFileName("");
                if (fileRef.current) fileRef.current.value = "";
                setOpen(false);
                setNote("Video uploaded. It stays in review until a person approves it.");
                await reload();
              })()
                .catch((caught) => setNote(errorText(caught)))
                .finally(() => setBusy(false));
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">Upload video</h2>
              <button type="button" className="text-sm text-muted" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <p className="text-sm text-muted">Portrait clips under 58 seconds. {profile.name}.</p>
            <label className="block text-sm">
              Title
              <input value={title} onChange={(event) => setTitle(event.target.value)} required className="mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3" />
            </label>
            <label className="block text-sm">
              Caption
              <textarea value={caption} onChange={(event) => setCaption(event.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-line bg-canvas px-3 py-2" />
            </label>
            <label className="block text-sm">
              Affiliate product, optional
              <select value={productCode} onChange={(event) => setProductCode(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3">
                <option value="">None</option>
                {PRODUCT_CATALOG.map((product) => (
                  <option key={product.code} value={product.code}>
                    {product.name}
                  </option>
                ))}
              </select>
            </label>
            <input
              ref={fileRef}
              name="clip"
              type="file"
              accept="video/mp4,video/webm,video/*"
              className="sr-only"
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            />
            <button type="button" className="h-12 w-full rounded-xl border border-line bg-canvas text-sm" onClick={() => fileRef.current?.click()}>
              {fileName || "Choose video"}
            </button>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" checked={rights} onChange={(event) => setRights(event.target.checked)} className="mt-1 size-4 accent-teal" required />
              I have the rights to this footage and any music in it.
            </label>
            {note ? <p className="text-sm text-muted">{note}</p> : null}
            <button type="submit" disabled={busy} className="h-12 w-full rounded-full bg-teal font-medium text-ink disabled:opacity-50">
              {busy ? "Uploading…" : "Upload video"}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

function fileToData(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.readAsDataURL(file);
  });
}
