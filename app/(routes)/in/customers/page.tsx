"use client";
import { DataTable } from "@/components/customers/table-customers";
import { columns } from "@/components/customers/table-customers/columns";
import { getAllCustomers } from "@/services/customers";
import { useQuery } from "@tanstack/react-query";

export default function Customers() {
  const {
    data: customers,
    isLoading,
    isError,
  } = useQuery(["customers"], () => getAllCustomers());

  return (
    <DataTable
      columns={columns}
      data={customers || []}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
