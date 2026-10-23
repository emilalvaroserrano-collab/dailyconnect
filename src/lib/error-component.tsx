import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
const RELOAD_KEY = "dc.chunk-reload";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

function isStaleChunk(message: string) {
  return /dynamically imported module|module script failed|Importing a module script failed/i.test(message);
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const message = errorMessage(error);
  useEffect(() => {
    if (!isStaleChunk(message)) return;
    try {
      if (sessionStorage.getItem(RELOAD_KEY)) return;
      sessionStorage.setItem(RELOAD_KEY, "1");
    } catch {
      return;
    }
    window.location.reload();
  }, [message]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-canvas px-6 text-center text-fg">
      <span className="text-red-500" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-muted">{message}</p>
      <button
        type="button"
        className="mt-2 h-11 rounded-full bg-teal px-5 font-medium text-ink"
        onClick={() => {
          try {
            sessionStorage.removeItem(RELOAD_KEY);
          } catch {
            // Ignore storage failures and reload anyway.
          }
          window.location.reload();
        }}
      >
        Reload
      </button>
    </main>
  );
}