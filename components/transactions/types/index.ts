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
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CustomerTransaction {
  customers: {
    name: string;
    address?: string;
    email?: string;
    phone?: string;
  };
}

export interface RowData {
  id: string;
  issue_date: string;
  due_date?: string;
  total: number;
  currency?: string;
  tax_rate?: number;
  status: string;
  products: Product[];
  customer_transaction: CustomerTransaction[];
}
