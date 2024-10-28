"use client";
import { Overview } from "@/components/transactions/overview";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/transactions/table-components/columns";
import { getAllTransactions } from "@/services/transactions";
import { useQuery } from "@tanstack/react-query";
import { OptionsAndCreate } from "@/components/transactions/table-components";

export default function Page() {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery(["transactions"], () => getAllTransactions());

  return (
    <>
      <Overview />
      <DataTable
        columns={columns}
        data={transactions || []}
        filter="name"
        isLoading={isLoading}
        isError={isError}
        Component={OptionsAndCreate}
      />
    </>
  );
}
