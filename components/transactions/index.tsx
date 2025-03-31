"use client";

import { DataTable } from "@/components/data-table";
import { OptionsAndCreate } from "@/components/transactions/table-components";
import { columns } from "@/components/transactions/table-components/columns";
import { getAllTransactions } from "@/queries/client/transactions";
import { useQuery } from "@tanstack/react-query";

export function TableTransactions() {
  const {
    data: transactions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"] as const,
    queryFn: getAllTransactions,
    staleTime: 5 * 60 * 1000,
  });

  if (isError) {
    return <div>Error al cargar las transacciones</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={transactions}
      filter="customer"
      isLoading={isLoading}
      isError={isError}
      Component={OptionsAndCreate}
    />
  );
}
