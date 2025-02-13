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

export function AnalyticsDashboard({
  data,
  isLoading,
  isError,
}: AnalyticsDashboardProps) {
  const cardData = [
    { title: "Revenue", value: data?.total, color: "" },
    { title: "Quantity", value: data?.invoices?.count, color: "" },
    { title: "Paid", value: data?.paid?.total, color: "bg-[#56663e]" },
    { title: "Pending", value: data?.pending?.total, color: "bg-[#0a85d1]" },
    { title: "Canceled", value: data?.canceled?.total, color: "bg-[#e14133]" },
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
                {isLoading || isError ? (
                  <div className="h-8 w-full animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                ) : (
                  <span>
                    {card.title === "Quantity"
                      ? card.value
                      : `USD $${card.value}`}
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
