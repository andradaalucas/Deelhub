import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  RotateCw,
  ArrowDown,
  Zap,
  Users,
  Activity,
} from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon?:
    | "revenue"
    | "conversion"
    | "bounce"
    | "session"
    | "newUsers"
    | "activeUsers";
  gradient?: "blue" | "purple" | "peach";
}

export function AnalyticsCard({
  title,
  value,
  icon,
  gradient,
}: AnalyticsCardProps) {
  const gradientClasses = {
    blue: "bg-gradient-to-br from-gray-50 to-blue-100",
    purple: "bg-gradient-to-br from-purple-50 to-purple-100",
    peach: "bg-gradient-to-br from-orange-50 to-orange-100",
  };

  const icons = {
    revenue: <ArrowUpRight className="h-5 w-5" />,
    conversion: <RotateCw className="h-5 w-5" />,
    bounce: <ArrowDown className="h-5 w-5" />,
    session: <Zap className="h-5 w-5" />,
    newUsers: <Users className="h-5 w-5" />,
    activeUsers: <Activity className="h-5 w-5" />,
  };

  return (
    <Card className={`p-6 ${gradient ? gradientClasses[gradient] : ""}`}>
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && icons[icon]}
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </Card>
  );
}
