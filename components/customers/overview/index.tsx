"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getCustomerStats, getTopSpenders } from "@/queries/client/customers";

export function AnalyticsCustomers({
  initialStatistics,
  initialTopSpenders,
}: {
  initialStatistics: any;
  initialTopSpenders: any;
}) {
  const {
    data: statistics,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: getCustomerStats,
    initialData: initialStatistics,
  });

  const {
    data: topSpends,
    isLoading: isLoadingSpenders,
    isError: isErrorSpenders,
  } = useQuery({
    queryKey: ["topSpenders"],
    queryFn: getTopSpenders,
    initialData: initialTopSpenders,
  });

  return (
    <div className="mx-auto w-full max-w-5xl grid-cols-2 gap-6 p-2">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="flex flex-col justify-between shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold">
                Total Customers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-6 font-mono text-2xl font-semibold">
                {isLoadingStats || isErrorStats ? (
                  <div className="h-8 w-24 animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                ) : (
                  statistics?.totalCustomers?.toLocaleString()
                )}
              </div>
              <div className="mt-2 h-9 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75"></div>
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold">Disabled</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-6 font-mono text-2xl font-semibold">
                {isLoadingStats || isErrorStats ? (
                  <div className="h-8 w-24 animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                ) : (
                  statistics?.disabled?.toLocaleString()
                )}
              </div>
              <div className="mt-2 h-9 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75"></div>
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-between shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold">
                Customer Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-6 font-mono text-2xl font-semibold">
                {isLoadingStats || isErrorStats ? (
                  <div className="h-8 w-24 animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                ) : (
                  `${statistics?.customerRetention?.toLocaleString()}%`
                )}
              </div>
              <div className="mt-2 h-9 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75">
                <p className="flex items-center whitespace-nowrap font-mono text-xs text-muted-foreground">
                  In the last month
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold">
                New Customers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-6 font-mono text-2xl font-semibold">
                {isLoadingStats || isErrorStats ? (
                  <div className="h-8 w-24 animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                ) : (
                  statistics?.newCustomers?.toLocaleString()
                )}
              </div>
              <div className="mt-2 h-9 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75">
                <p className="flex items-center whitespace-nowrap font-mono text-xs text-muted-foreground">
                  In the last month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="flex flex-col justify-between shadow-md">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Top Spenders
              </CardTitle>
              <CardDescription className="text-xs">
                Customers with highest total spend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoadingSpenders || isErrorSpenders
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex animate-pulse items-center"
                      >
                        <div className="h-9 w-9 rounded-full bg-zinc-200 dark:bg-[#2b2b2b]" />
                        <div className="ml-4 w-full space-y-1">
                          <div className="h-4 w-32 bg-zinc-200 dark:bg-[#2b2b2b]" />
                          <div className="h-3 w-24 bg-zinc-200 dark:bg-[#2b2b2b]" />
                        </div>
                        <div className="ml-auto h-6 w-12 bg-zinc-200 dark:bg-[#2b2b2b]" />
                      </div>
                    ))
                  : topSpends?.map((customer: any, index: number) => (
                      <div key={customer.name} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="" alt={customer.name} />
                          <AvatarFallback>
                            {customer.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {customer.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${customer.totalSpent?.toLocaleString()}
                          </p>
                        </div>
                        <Badge className="ml-auto" variant="secondary">
                          Top {index + 1}
                        </Badge>
                      </div>
                    ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}