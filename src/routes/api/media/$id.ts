import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/media/$id")({
  server: {
    handlers: {
      GET: async ({ params }: { params: { id: string } }) => {
        const { readUploadedVideo } = await import("@/lib/firebase.server");
        const file = await readUploadedVideo(params.id);
        if (!file) return new Response("Not found", { status: 404 });
        const bytes = Uint8Array.from(Buffer.from(file.data, "base64"));
        return new Response(bytes, {
          headers: {
            "content-type": file.mime,
            "cache-control": "public, max-age=31536000",
          },
        });
      },
    },
  },
});
