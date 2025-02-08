"use client";

import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ComingSoonProps {
  features: Feature[];
}

export function ComingSoon({ features }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8">
      <h1 className="relative flex w-full translate-y-4 justify-center gap-2 bg-gradient-to-b from-black/80 to-black bg-clip-text pb-4 text-center text-3xl font-extrabold leading-tight text-transparent dark:from-white dark:to-[#AAAAAA] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl md:inline-block md:!w-full md:translate-y-[12px] md:py-0 lg:!mt-20 lg:leading-snug">
        Coming Soon
      </h1>
      <div className="flex flex-wrap justify-center gap-8 px-6 py-8 lg:grid lg:grid-cols-3 lg:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center px-6 py-8 text-center w-full sm:w-1/2 lg:w-full"
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
