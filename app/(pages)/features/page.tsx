"use client";

import { ComingSoon } from "@/components/coming-soon";
import { History, Network, RefreshCw } from "lucide-react";

const features = [
  {
    icon: RefreshCw,
    title: "Cache, controlled.",
    description:
      "Define per-component response revalidation that persists across deploys with Vercel's Data Cache.",
  },
  {
    icon: History,
    title: "Fastest Next.js builds.",
    description:
      "Build, test, iterate, and deploy at record, industry-leading speeds with Vercel's Build Pipeline.",
  },
  {
    icon: Network,
    title: "Deploy with zero downtime.",
    description:
      "Protect against version skew and cache-related downtime with framework-aware infrastructure.",
  },
];

export default function Page() {
  return <ComingSoon features={features} />;
}
