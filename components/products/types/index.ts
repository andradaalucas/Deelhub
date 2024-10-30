import { ColumnDef } from "@tanstack/react-table";

export type Products = {
  id: string;
  name: string;
  price: number;
  quantity: number;
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
