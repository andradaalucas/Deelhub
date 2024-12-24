"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  RefreshCw,
  History,
  Network,
  GitPullRequestCreate,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
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
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8">
      <div className="font-heading text-pretty text-center text-[29px] font-semibold tracking-tighter text-gray-900 sm:text-[32px] md:text-[46px]">
        What functionality do you need?
      </div>
      <div className="mt-16 space-x-4">
        <Button variant="outline">Schedule a Meeting</Button>
        <Button>Contact Sales</Button>
      </div>
      <div className="flex items-center justify-center px-6 py-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center px-6 py-8 text-center"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:border-zinc-800 dark:bg-zinc-700 dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              <feature.icon className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="max-w-[280px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
