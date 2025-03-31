import { TableTransactions } from "@/components/transactions";
import { getAllTransactions } from "@/queries/server/transactions";
import { dehydrate, Hydrate, QueryClient } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["transactions"],
      queryFn: getAllTransactions,
    });
  } catch (error) {
    console.error("Error prefetching transactions:", error);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <TableTransactions />
    </Hydrate>
  );
}