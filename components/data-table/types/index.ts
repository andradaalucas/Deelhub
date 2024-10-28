import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps <TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: any[];
  isLoading: boolean;
  isError: boolean;
  filter: string;
  Component: React.ComponentType;
}
