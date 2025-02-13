import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpIcon } from "lucide-react";

interface AnalyticsDashboardProps {
  data:
    | {
        total: string;
        paid: { total: string; count: number };
        pending: { total: string; count: number };
        canceled: { total: string; count: number };
        invoices: { total: string; count: number };
      }
    | undefined;
  isLoading: boolean;
  isError: boolean;
}

export default function AnalyticsDashboard({
  data,
  isLoading,
  isError,
}: AnalyticsDashboardProps) {
  return (
    <div className="mx-auto w-full max-w-5xl p-2">
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        {/* Primera fila */}
        <Card className="col-span-2 flex flex-col justify-between shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex w-full justify-between px-6 font-mono text-2xl font-semibold">
              <div className="flex w-full flex-col">
                {isLoading || isError ? (
                  <div className="h-8 w-full animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                ) : (
                  <span>USD ${data?.total}</span>
                )}
              </div>
            </div>
            <div className="mt-2 h-9 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75"></div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">
              Budget Quantity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex w-full justify-between px-6 font-mono text-2xl font-semibold">
              {isLoading || isError ? (
                <div className="h-8 w-full animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
              ) : (
                <span>{data?.invoices?.count}</span>
              )}
            </div>
            <div className="mt-2 h-9 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75"></div>
          </CardContent>
        </Card>

        {/* Segunda fila */}
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <div className="h-2 w-2 rounded-full bg-[#56663e]"></div>
              <div>Paid</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex w-full justify-between px-6 font-mono text-2xl font-semibold">
              {isLoading || isError ? (
                <div className="h-8 w-full animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
              ) : (
                <span>USD ${data?.paid?.total}</span>
              )}
            </div>
            <div className="mt-2 h-9 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75"></div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <div className="h-2 w-2 rounded-full bg-[#0a85d1]"></div>
              <div>Pending</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex w-full justify-between px-6 font-mono text-2xl font-semibold">
              {isLoading || isError ? (
                <div className="h-8 w-full animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
              ) : (
                <span>USD ${data?.pending?.total}</span>
              )}
            </div>
            <div className="mt-2 h-9 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75"></div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <div className="h-2 w-2 rounded-full bg-[#e14133]"></div>

              <div>Canceled</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex w-full justify-between px-6 font-mono text-2xl font-semibold">
              {isLoading || isError ? (
                <div className="h-8 w-full animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
              ) : (
                <span>USD ${data?.canceled?.total}</span>
              )}
            </div>
            <div className="mt-2 h-9 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
