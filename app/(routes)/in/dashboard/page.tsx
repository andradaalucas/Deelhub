"use client";
import { DataTable } from "@/components/data-table";
import { OverviewTransactions } from "@/components/transactions/overview";
import { columns } from "@/components/transactions/columns";
import { getAllTransactions } from "@/services/transactions";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CreateForm } from "@/components/transactions/create-form";
import { FilterTransactions } from "@/components/transactions/filter-transactions";

export default function Dashboard() {
  const [filters, setFilters] = useState<any[]>([]);
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery(
    ["transactions", filters], // Include filters in the queryKey to refetch on change
    () => getAllTransactions(filters), // Pass filters to the query function
    {
      enabled: !!filters, // Ensure the query runs only when filters exist
    },
  );

  const data = useMemo(() => transactions ?? [], [transactions]);
  data && console.log("data desde page.tsx", data);

  return (
    <div>
      <OverviewTransactions />
      <DataTable
        columns={columns}
        data={data}
        Filters={<FilterTransactions onChange={setFilters} />}
      />
    </div>
  );
}
