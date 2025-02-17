"use client";

import * as z from "zod";
import { useEffect, useState } from "react";

const statusEnum = z.enum([
  "operational",
  "degraded_performance",
  "partial_outage",
  "major_outage",
  "under_maintenance",
  "unknown",
  "incident",
]);

const statusSchema = z.object({ status: statusEnum });

const dictionary = {
  operational: { label: "Operational", color: "bg-green-500" },
  degraded_performance: {
    label: "Degraded Performance",
    color: "bg-yellow-500",
  },
  partial_outage: { label: "Partial Outage", color: "bg-yellow-500" },
  major_outage: { label: "Major Outage", color: "bg-red-500" },
  unknown: { label: "Unknown", color: "bg-gray-500" },
  incident: { label: "Incident", color: "bg-yellow-500" },
  under_maintenance: { label: "Under Maintenance", color: "bg-blue-500" },
};

interface StatusCheckerProps {
  slug: string;
}

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
