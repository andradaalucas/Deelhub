import { DataTable } from "@/components/transactions-table";
import { Toaster } from "@/components/ui/toaster";

export default async function Transaction() {
  return (
    <>
      <DataTable />
      <Toaster />
    </>
  );
}
