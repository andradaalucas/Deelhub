"use client";
import { getAllCustomers } from "@/queries/client/customers";
import { DataTable } from "@/components/data-table";
import { OptionsAndCreate } from "@/components/customers/table-components";
import { columns } from "@/components/customers/table-components/columns";
import { useQuery } from "@tanstack/react-query";

export function TableCustomers() {
  const {
    data: customers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"] as const,
    queryFn: getAllCustomers,
    staleTime: 5 * 60 * 1000,
  });

  if (isError) {
    return <div>Error al cargar las transacciones</div>;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={customers || []}
        filter="name"
        isLoading={isLoading}
        isError={isError}
        Component={OptionsAndCreate}
      />
    </>
  );
}
