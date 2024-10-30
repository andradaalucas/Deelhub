"use client";
import { Overview } from "@/components/transactions/overview";
import { getAllProducts } from "@/services/products";
import { useQuery } from "@tanstack/react-query";
import { OptionsAndCreate } from "@/components/products/table-components";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/products/table-components/columns";

export default function Page() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["customers"], () => getAllProducts());
  return (
    <>
      <Overview />
      <DataTable
        columns={columns}
        data={products || []}
        filter="name"
        isLoading={isLoading}
        isError={isError}
        Component={OptionsAndCreate}
      />
    </>
  );
}
