'use client'; // Asegúrate de que esto esté al inicio si es un Client Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllStatistics } from "@/queries/client/transactions";
import { useQuery } from "@tanstack/react-query";

interface AnalyticsDashboardProps {
  initialStatistics:
    | {
        total: string;
        paid: { total: string; count: number };
        pending: { total: string; count: number };
        canceled: { total: string; count: number };
        invoices: { total: string; count: number };
      }
    | undefined;
}

export function AnalyticsDashboard({ initialStatistics }: AnalyticsDashboardProps) {
  const { 
    data: statistics, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      return getAllStatistics();
    },
    initialData: initialStatistics,
  });

  const cardData = [
    { title: "Revenue", value: statistics?.total, color: "" },
    { title: "Quantity", value: statistics?.invoices?.count, color: "" },
    {
      title: "Paid",
      value: statistics?.paid?.total,
      color: "bg-[#56663e]",
    },
    {
      title: "Pending",
      value: statistics?.pending?.total,
      color: "bg-[#0a85d1]",
    },
    {
      title: "Canceled",
      value: statistics?.canceled?.total,
      color: "bg-[#e14133]",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl p-2">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-2">
        {cardData.map((card, index) => (
          <Card
            key={index}
            className={`shadow-md ${index === 0 ? "flex flex-col justify-between sm:col-span-2" : ""}`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                {card.color && (
                  <div className={`h-2 w-2 rounded-full ${card.color}`}></div>
                )}
                <div>{card.title}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex w-full justify-between px-6 font-mono text-2xl font-semibold">
                {isLoading && !statistics ? (
                  <div className="h-8 w-full animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                ) : isError ? (
                  <span>Error</span>
                ) : (
                  <span>
                    {card.title === "Quantity"
                      ? card.value ?? 0
                      : `USD $${card.value ?? '0'}`}
                  </span>
                )}
              </div>
              <div className="mt-2 h-9 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}