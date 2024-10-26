"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  DollarSignIcon,
  UsersIcon,
  PercentIcon,
  RefreshCcwIcon,
  PieChartIcon,
  ClockIcon,
} from "lucide-react";

const data = [
  {
    average: 400,
    today: 240,
  },
  {
    average: 300,
    today: 139,
  },
  {
    average: 200,
    today: 980,
  },
  {
    average: 278,
    today: 390,
  },
  {
    average: 189,
    today: 480,
  },
  {
    average: 239,
    today: 380,
  },
  {
    average: 349,
    today: 430,
  },
];

export default function Component() {
  return (
    <div className="mx-auto w-full max-w-5xl grid-cols-2 gap-6 space-y-6 p-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Powered by Deelfy AI
        </span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex flex-col justify-between shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Revenue (Next Month)
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 font-mono text-2xl font-semibold">$3,700</div>
            <div className="mt-2 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75">
              <p className="flex items-center font-mono text-xs text-muted-foreground">
                <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                8.7% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Annual Growth Rate
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 font-mono text-2xl font-semibold">12.5%</div>
            <div className="mt-2 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75">
              <p className="flex items-center font-mono text-xs text-muted-foreground">
                <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                Based on last 12 months
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Collection Cycle
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 font-mono text-2xl font-semibold">45 days</div>
            <div className="mt-2 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75">
              <p className="flex items-center font-mono text-xs text-muted-foreground">
                <ArrowDownIcon className="mr-1 h-4 w-4 text-green-500" />5 days
                improvement
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Projected Growth
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 font-mono text-2xl font-semibold">15.3%</div>
            <div className="mt-2 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75">
              <p className="flex items-center font-mono text-xs text-muted-foreground">
                <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                2.8% increase from last year
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <RefreshCcwIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 font-mono text-2xl font-semibold">8.7%</div>
            <div className="mt-2 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75">
              <p className="flex items-center font-mono text-xs text-muted-foreground">
                <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                1.2% increase
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Projected Gross Margins
            </CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 font-mono text-2xl font-semibold">62%</div>
            <div className="mt-2 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75">
              <p className="flex items-center font-mono text-xs text-muted-foreground">
                <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                3% increase expected
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Revenue Forecast</CardTitle>
          <CardDescription>
            Comparison of actual revenue vs. prediction for the next months
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Average
                              </span>
                              <span className="font-mono font-bold text-muted-foreground">
                                {payload[0].value}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Today
                              </span>
                              <span className="font-mono font-bold">
                                {payload[1].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  strokeWidth={2}
                  stroke="#52525b" // Ajuste de color para modo oscuro
                  activeDot={{
                    r: 6,
                    style: { fill: "#52525b" },
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="today"
                  strokeWidth={2}
                  stroke="#fafafa" // Otro color contrastante
                  activeDot={{
                    r: 8,
                    style: { fill: "#fafafa" },
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">AI-Powered Recommendations</CardTitle>
          <CardDescription>
            Based on predictive analysis of billing data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <ArrowUpIcon className="mr-2 mt-0.5 h-5 w-5 text-green-500" />
              <span>
                Implement a retention campaign for the 7 customers identified as
                at-risk of churning.
              </span>
            </li>
            <li className="flex items-start">
              <TrendingUpIcon className="mr-2 mt-0.5 h-5 w-5 text-blue-500" />
              <span>
                The projected growth suggests an opportunity to invest in
                service or product expansion.
              </span>
            </li>
            <li className="flex items-start">
              <ArrowUpIcon className="mr-2 mt-0.5 h-5 w-5 text-green-500" />
              <span>
                August to December show an upward trend. Prepare strategies to
                maximize this growth period.
              </span>
            </li>
            <li className="flex items-start">
              <DollarSignIcon className="mr-2 mt-0.5 h-5 w-5 text-yellow-500" />
              <span>
                Analyze factors contributing to the January revenue peak to
                replicate that success in future months.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
