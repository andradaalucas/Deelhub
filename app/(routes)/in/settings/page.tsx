"use client";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/transactions/columns";
import { getAllTransactions } from "@/services/transactions";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

function Page() {
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });
  const data = useMemo(() => transactions ?? [], [transactions]);
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Page;
