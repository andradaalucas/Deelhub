import { ColumnDef } from "@tanstack/react-table";

export type Transactions = {
  amount: number;
  description: string;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  isError?: boolean;
  Component?: React.ReactNode;
}
