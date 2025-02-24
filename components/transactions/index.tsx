"use client";
import { getAllTransactions } from "@/queries/client/transactions";
import { DataTable } from "@/components/data-table";
import { OptionsAndCreate } from "@/components/transactions/table-components";
import { columns } from "@/components/transactions/table-components/columns";
import { useQuery } from "@tanstack/react-query";

export function TableTransactions({ initialTransactions }: any) {
  const { 
    data: transactions, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      return getAllTransactions();
    },
    initialData: initialTransactions,
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