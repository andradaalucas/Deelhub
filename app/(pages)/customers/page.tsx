import { TableCustomers } from "@/components/customers";
import { AnalyticsCustomers } from "@/components/customers/overview";
import {
  getAllCustomers,
  getCustomerStats,
  getTopSpenders,
} from "@/queries/server/customers";
import { dehydrate, Hydrate, QueryClient } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });
  await queryClient.prefetchQuery({
    queryKey: ["statistics"],
    queryFn: getCustomerStats,
  });
  await queryClient.prefetchQuery({
    queryKey: ["topspenders"],
    queryFn: getTopSpenders,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <AnalyticsCustomers
        initialData={queryClient.getQueryData(["statistics"])}
        initialTopSpends={queryClient.getQueryData(["topspenders"])}
      />
      <TableCustomers
        initialCustomers={queryClient.getQueryData(["customers"])}
      />
    </Hydrate>
  );
}
