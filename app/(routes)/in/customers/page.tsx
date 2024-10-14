"use client";
import { DataTable } from "@/components/customers/table-customers";
import { columns } from "@/components/customers/table-customers/columns";
import { FilterCustomers } from "@/components/customers/table-customers/filters-customers";
import { getAllCustomers } from "@/services/customers";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
