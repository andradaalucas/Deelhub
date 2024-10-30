import { ColumnDef } from "@tanstack/react-table";

export type Transactions = {
  id: string;
  total: number;
  status: string;
  issueDate: string;
  dueDate: string;
  date: string;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  isError: boolean;
  Component?: React.ReactNode;
}
