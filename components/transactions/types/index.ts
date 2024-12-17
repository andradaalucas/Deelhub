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
export interface DetailType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  rowData: any;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: number;
  address: string;
}

export interface RowData {
  id: string;
  issue_date: string;
  due_date: string;
  total: number;
  currency?: string;
  tax_rate?: number;
  status: string;
  products: Product[];
  customers: Customer;
}
