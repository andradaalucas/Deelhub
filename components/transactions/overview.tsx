"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  extractResumeOfTransactions,
  getAllTransactions,
} from "@/services/transactions";
// import { calculateBalance } from "@/utils/operationals/overview";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpRightIcon,
  FlipVerticalIcon,
  PrinterIcon,
  RefreshCwIcon,
  Share2,
} from "lucide-react";
import { useMemo, useState } from "react";

export function OverviewTransactions() {
  const [isLoading, setIsLoading] = useState(false);
  const [dateNow, setDateNow] = useState<Date>(new Date());
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const queryClient = useQueryClient();
  const handleRefreshTable = () => {
    setIsLoading(true);
    queryClient.invalidateQueries(["transactions"]);
    setIsLoading(false);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Fecha inválida");
    }
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const { data: resume } = useQuery({
    queryKey: ["resume"],
    queryFn: extractResumeOfTransactions,
  });
  const data = useMemo(() => resume ?? [], [resume]);
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-6 p-2 md:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transaction Details</h2>
          <div className="border-foreground-muted rounded-md border border-[#a9a9a9] bg-[#f8f8f8] p-4 px-2 py-1 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            {formatDate(dateNow.toDateString())}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Purchase of new office supplies
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-medium">Total Amount</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {data && data.netTotal}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Payment Method</h3>
              <p className="text-gray-500 dark:text-gray-400">Visa *1234</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-medium">Transaction ID</h3>
              <p className="text-gray-500 dark:text-gray-400">#12345678</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Last movement</h2>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <FlipVerticalIcon className="h-4 w-4" />
                  <span className="sr-only">Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex cursor-pointer justify-between">
                  <span>Export</span>
                  <ArrowUpRightIcon className="h-4 w-4" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex cursor-pointer justify-between">
                  <span>Print</span>
                  <PrinterIcon className="h-4 w-4" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex cursor-pointer justify-between">
                  <span>Share</span>
                  <Share2 className="h-4 w-4" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon" onClick={handleRefreshTable}>
              <RefreshCwIcon
                className={`h-4 w-4 ${isLoading && "animate-spin"}`}
              />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Amount</h3>
              <p className="text-gray-500 dark:text-gray-400">$125.00</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-medium">Payment Method</h3>
              <p className="text-gray-500 dark:text-gray-400">Visa *1234</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Taxes</h3>
              <p className="text-gray-500 dark:text-gray-400">$10.00</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-medium">Fees</h3>
              <p className="text-gray-500 dark:text-gray-400">$2.50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
