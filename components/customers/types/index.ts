import { ColumnDef } from "@tanstack/react-table";

export type Customers = {
  id: string;
  name: string;
  description: string;
  status: string;
  user_id: string;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  isError: boolean;
}

export type DetailsProps = {
  rowData: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
