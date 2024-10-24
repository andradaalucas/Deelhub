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
} from "lucide-react";

const predictionData = [
  { month: "Jan", actual: 4000, prediction: 4000 },
  { month: "Feb", actual: 3000, prediction: 3200 },
  { month: "Mar", actual: 2000, prediction: 2400 },
  { month: "Apr", actual: 2780, prediction: 2800 },
  { month: "May", actual: 1890, prediction: 2200 },
  { month: "Jun", actual: 2390, prediction: 2600 },
  { month: "Jul", actual: 3490, prediction: 3400 },
  { month: "Aug", actual: null, prediction: 3700 },
  { month: "Sep", actual: null, prediction: 4000 },
  { month: "Oct", actual: null, prediction: 4200 },
  { month: "Nov", actual: null, prediction: 4500 },
  { month: "Dec", actual: null, prediction: 4800 },
];

export default function Component() {
  return (
    <div className="space-y-6 p-6 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Predictive Billing Analysis
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Powered by AI
        </span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Revenue (Next Month)
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,700</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
              8.7% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Annual Growth Rate
            </CardTitle>
            <PercentIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <TrendingUpIcon className="mr-1 h-4 w-4 text-green-500" />
              Based on last 12 months
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              At-Risk Customers
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
              Potential loss in next 3 months
            </p>
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
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual Revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={true}
                />
                <Line
                  type="monotone"
                  dataKey="prediction"
                  name="Predicted Revenue"
                  stroke="#475569"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
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
