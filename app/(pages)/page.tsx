"use client";
import { DataTable } from "@/components/data-table";
import { OptionsAndCreate } from "@/components/transactions/table-components";
import { columns } from "@/components/transactions/table-components/columns";
import { getAllTransactions } from "@/services/transactions";
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

  return (
    <>
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
