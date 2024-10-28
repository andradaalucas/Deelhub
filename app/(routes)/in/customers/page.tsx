"use client";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/customers/table-components/columns";
import { getAllCustomers } from "@/services/customers";
import { useQuery } from "@tanstack/react-query";
import { OptionsAndCreate } from "@/components/customers/table-components";
import { Overview } from "@/components/customers/overview";

export default function Page() {
  const {
    data: customers,
    isLoading,
    isError,
  } = useQuery(["customers"], () => getAllCustomers());

  return (
    <>
      <Overview />
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
