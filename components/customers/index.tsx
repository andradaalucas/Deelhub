"use client";
import { getAllCustomers } from "@/queries/client/customers";
import { DataTable } from "@/components/data-table";
import { OptionsAndCreate } from "@/components/customers/table-components";
import { columns } from "@/components/customers/table-components/columns";
import { useQuery } from "@tanstack/react-query";

export function TableCustomers({ initialCustomers }: any) {
  const {
    data: customers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      return getAllCustomers();
    },
    initialData: initialCustomers,
  });

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
