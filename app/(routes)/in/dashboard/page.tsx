import { DataTable } from "@/components/transactions-table";
import { OverviewTransactions } from "@/components/transactions-table/overview";

export default function Dashboard() {
  return (
    <div>
      <OverviewTransactions />
      <DataTable />
    </div>
  );
}
