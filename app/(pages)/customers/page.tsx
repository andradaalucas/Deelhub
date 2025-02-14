"use client";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/customers/table-components/columns";
import {
  getAllCustomers,
  getCustomerStats,
  getTopSpenders,
} from "@/services/customers";
import { useQuery } from "@tanstack/react-query";
import { OptionsAndCreate } from "@/components/customers/table-components";
import { AnalyticsCustomers } from "@/components/customers/overview";
import Head from "next/head";

export default function Page() {
  const {
    data: customers,
    isLoading,
    isError,
  } = useQuery(["customers"], () => getAllCustomers());
  const {
    data: statistics,
    isLoading: isLoadingStatistics,
    isError: isErrorStatistics,
  } = useQuery(["statistics"], () => getCustomerStats(), {
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const {
    data: topSpenders,
    isLoading: IsLoadingTopSpenders,
    isError: isErrorSpenders,
  } = useQuery(["topspenders"], () => getTopSpenders(), {
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <AnalyticsCustomers
        data={statistics}
        topSpends={topSpenders}
        isLoadingSpenders={IsLoadingTopSpenders}
        isErrorSpenders={isErrorSpenders}
        isLoading={isLoadingStatistics}
        isError={isErrorStatistics}
      />
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
