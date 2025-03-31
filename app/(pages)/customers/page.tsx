import { TableCustomers } from "@/components/customers";
import { getAllCustomers } from "@/queries/server/customers";
import { dehydrate, Hydrate, QueryClient } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["customers"],
      queryFn: getAllCustomers,
    });
  } catch (error) {
    console.error("Error prefetching customers:", error);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <TableCustomers />
    </Hydrate>
  );
}

export const dynamic = "force-dynamic";