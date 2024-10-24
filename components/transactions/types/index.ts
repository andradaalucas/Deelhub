import { ColumnDef } from "@tanstack/react-table";

export type Transactions = {
  id: string;
  amount: number;
  description: string;
  date: string;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  isError: boolean;
  Component?: React.ReactNode;
}
