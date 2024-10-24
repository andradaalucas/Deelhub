"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Transactions } from "../types";

export const columns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <div className="text-left">Description</div>;
    },
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("description")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <div className="">Amount</div>;
    },
    cell: ({ row }) => {
      const Monto = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Monto);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  }
];
