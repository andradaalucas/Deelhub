import { dehydrate, Hydrate, QueryClient } from "@tanstack/react-query"; 
import {
  getAllStatistics,
  getAllTransactions,
} from "@/queries/server/transactions";
import { TableTransactions } from "@/components/transactions";
import { AnalyticsDashboard } from "@/components/transactions/overview";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });
  await queryClient.prefetchQuery({
    queryKey: ["statistics"],
    queryFn: getAllStatistics,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <AnalyticsDashboard
        initialStatistics={queryClient.getQueryData(["statistics"])}
      />
      <TableTransactions
        initialTransactions={queryClient.getQueryData(["transactions"])}
      />
    </Hydrate>
  );
}
