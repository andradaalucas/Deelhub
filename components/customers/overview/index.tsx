import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpIcon } from "lucide-react";

interface AnalyticsCustomersProps {
  data:
    | {
        totalCustomers: number;
        disabled: number;
        customerRetention: number;
        newCustomers: number;
      }
    | undefined
    | null;
  topSpends: any;
  isLoadingSpenders: boolean;
  isErrorSpenders: boolean;
  isLoading: boolean;
  isError: boolean;
}

export function AnalyticsCustomers({
  data,
  isLoading,
  topSpends,
  isLoadingSpenders,
  isErrorSpenders,
  isError,
}: AnalyticsCustomersProps) {
  const topCustomers = [
    "Frank Miller",
    "Grace Lee",
    "Henry Wilson",
    "Ivy Chen",
    "Jack Taylor",
  ];
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
                {isLoading || isError ? (
                  <div className="h-8 w-24 animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                ) : (
                  data?.totalCustomers.toLocaleString()
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
                {isLoading || isError ? (
                  <div className="h-8 w-24 animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                ) : (
                  data?.disabled.toLocaleString()
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
                {isLoading || isError ? (
                  <div className="h-8 w-24 animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                ) : (
                  data?.customerRetention.toLocaleString() + "%"
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
                {isLoading || isError ? (
                  <div className="h-8 w-24 animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                ) : (
                  data?.newCustomers.toLocaleString()
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
                {isLoading || isError
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
                  : topSpends.map((customer: any, index: any) => (
                      <div key={customer.name} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={""} alt={customer.name} />
                          <AvatarFallback>
                            {customer.name
                              .split(" ")
                              .map((n: any) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {customer.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${customer.totalSpent.toLocaleString()}
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
