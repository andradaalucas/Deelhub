"use client";

import { ComingSoon } from "@/components/coming-soon";
import { Brain, Mail, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Budget Optimization.",
    description:
      "Optimize your budgets using intelligent algorithms that automatically adjust resource allocations based on past spending trends and future projections. This allows you to maximize budget efficiency and reduce the risk of unexpected overages.",
  },
  {
    icon: Users,
    title: "Many Customers.",
    description:
      "Create automations to manage budgets for multiple clients at once. This allows you to track their finances, send personalized reports, and adjust their budgets individually, all in a single centralized system.",
  },
  {
    icon: Mail,
    title: "Reminder.",
    description:
      "Send automated email notifications to your clients to remind them of important dates such as payment deadlines, budget updates, or any other relevant actions. This helps keep your clients informed and reduces the risk of delays or misunderstandings.",
  },
];

export default function Page() {
  return <ComingSoon features={features} />;
}
