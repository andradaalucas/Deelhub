import { ColumnDef } from "@tanstack/react-table";

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

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
