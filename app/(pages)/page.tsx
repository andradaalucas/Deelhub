"use client";
import { DataTable } from "@/components/data-table";
import { AnalyticsDashboard } from "@/components/transactions/overview";
import { OptionsAndCreate } from "@/components/transactions/table-components";
import { columns } from "@/components/transactions/table-components/columns";
import { getAllStatistics, getAllTransactions } from "@/services/transactions";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery(["transactions"], () => getAllTransactions(), {
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
  const {
    data: statistics,
    isLoading: isLoadingStatistics,
    isError: isErrorStatistics,
  } = useQuery(["statistics"], () => getAllStatistics(), {
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <AnalyticsDashboard
        data={statistics}
        isLoading={isLoadingStatistics}
        isError={isErrorStatistics}
      />
      <DataTable
        columns={columns}
        data={transactions || []}
        filter="customer"
        isLoading={isLoading}
        isError={isError}
        Component={OptionsAndCreate}
      />
    </>
  );
}
