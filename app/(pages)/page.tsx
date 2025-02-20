import { DataTable } from "@/components/data-table";
import { AnalyticsDashboard } from "@/components/transactions/overview";
import { OptionsAndCreate } from "@/components/transactions/table-components";
import { columns } from "@/components/transactions/table-components/columns";
import {
  getAllStatistics,
  getTransactions,
} from "@/services/transactions/server";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Hydrate } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();

  const statistics = await queryClient.fetchQuery({
    queryKey: ["statistics"],
    queryFn: getAllStatistics,
  });
  const transactions = await queryClient.fetchQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <AnalyticsDashboard data={statistics} isLoading={false} isError={false} />
      <DataTable
        columns={columns}
        data={transactions}
        filter="name"
        isLoading={false}
        isError={false}
        Component={OptionsAndCreate}
      />
    </Hydrate>
  );
}
