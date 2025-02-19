"use client";

import { useEffect, useState } from "react";
import { statusSchema } from "./schema";
import { StatusCheckerProps } from "./types";
import { dictionary } from "./dictionary";

export function StatusChecker({ slug }: StatusCheckerProps) {
  const [status, setStatus] = useState<{ label: string; color: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch(
          `https://api.openstatus.dev/public/status/${slug}`,
          {
            next: { revalidate: 60 },
          },
        );
        const data = await res.json();
        const parsed = statusSchema.safeParse(data);
        if (parsed.success) {
          setStatus(dictionary[parsed.data.status]);
        } else {
          setStatus(null);
        }
      } catch (error) {
        console.error("Error fetching status:", error);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
  }, [slug]);

  if (loading) {
    return (
      <a
        className="inline-flex max-w-fit items-center gap-2 rounded-md border border-border px-3 py-1 text-sm font-semibold text-foreground/70 hover:bg-muted hover:text-foreground"
        href={`https://${slug}.openstatus.dev`}
        target="_blank"
        rel="noreferrer"
      >
        Loading
        <span className="relative flex h-2 w-2">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f6a623] opacity-75 duration-1000`}
          />
          <span
            className={`relative inline-flex h-2 w-2 rounded-full bg-[#f6a623]`}
          />
        </span>
      </a>
    );
  }

  if (!status) return null;

  return (
    <a
      className="inline-flex max-w-fit items-center gap-2 rounded-md border border-border px-3 py-1 text-sm font-semibold text-foreground/70 hover:bg-muted hover:text-foreground"
      href={`https://${slug}.openstatus.dev`}
      target="_blank"
      rel="noreferrer"
    >
      {status.label}
      <span className="relative flex h-2 w-2">
        {status.label === "Operational" && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${status.color} opacity-75 duration-1000`}
          />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${status.color}`}
        />
      </span>
    </a>
  );
}
