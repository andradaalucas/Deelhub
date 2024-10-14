"use client";
import { DataTable } from "@/components/transactions/table-transactions";
import { columns } from "@/components/transactions/table-transactions/columns";
import { FilterTransactions } from "@/components/transactions/table-transactions/filter-transactions";
import { getAllTransactions } from "@/services/transactions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Dashboard() {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery(
    ["transactions"], // Include filters in the queryKey to refetch on change
    () => getAllTransactions(), // Pass filters to the query function
  );

  return (
    <DataTable
      columns={columns}
      data={transactions || []}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
