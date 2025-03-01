// "use client";
// import { AnalyticsCustomers } from "@/components/customers/overview";
// import { OptionsAndCreate } from "@/components/customers/table-components";
// import { columns } from "@/components/customers/table-components/columns";
// import { DataTable } from "@/components/data-table";
// import {
//   getAllCustomers,
//   getCustomerStats,
//   getTopSpenders,
// } from "@/queries/client/customers";
// import { useQuery } from "@tanstack/react-query";

// export default function Page() {
//   const {
//     data: customers,
//     isLoading,
//     isError,
//   } = useQuery(["customers"], () => getAllCustomers());
//   const {
//     data: statistics,
//     isLoading: isLoadingStatistics,
//     isError: isErrorStatistics,
//   } = useQuery(["statistics"], () => getCustomerStats(), {
//     staleTime: 1000 * 60,
//     refetchOnWindowFocus: false,
//   });

//   const {
//     data: topSpenders,
//     isLoading: IsLoadingTopSpenders,
//     isError: isErrorSpenders,
//   } = useQuery(["topspenders"], () => getTopSpenders(), {
//     staleTime: 1000 * 60,
//     refetchOnWindowFocus: false,
//   });
//   return (
//     <>
//       <AnalyticsCustomers
//         data={statistics}
//         topSpends={topSpenders}
//         isLoadingSpenders={IsLoadingTopSpenders}
//         isErrorSpenders={isErrorSpenders}
//         isLoading={isLoadingStatistics}
//         isError={isErrorStatistics}
//       />
//       <DataTable
//         columns={columns}
//         data={customers || []}
//         filter="name"
//         isLoading={isLoading}
//         isError={isError}
//         Component={OptionsAndCreate}
//       />
//     </>
//   );
// }

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
    queryKey: ["topSpenders"],
    queryFn: getTopSpenders,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <AnalyticsCustomers
        initialStatistics={queryClient.getQueryData(["statistics"])}
        initialTopSpenders={queryClient.getQueryData(["topSpenders"])}
      />
      <TableCustomers
        initialTransactions={queryClient.getQueryData(["transactions"])}
      />
    </Hydrate>
  );
}
