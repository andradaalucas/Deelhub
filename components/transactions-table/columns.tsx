"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "./types";

const getStatusStyles = (status: any) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-[#ebebeb] text-[#1a1a1a]";
    case "confirmed":
      return "bg-[#e6eddd] text-[#56663e]";
    case "rejected":
      return "bg-[#f2d5cd] text-[#6f260e]";
    default:
      return "bg-[#ebebeb] text-[#1a1a1a]";
  }
};
const getTypeStyles = (type: any) => {
  switch (type.toLowerCase()) {
    case "income":
      return "bg-[#e6eddd] text-[#56663e]";
    case "expense":
      return "bg-[#f2d5cd] text-[#6f260e]";
    default:
      return "bg-[#ebebeb] text-[#1a1a1a]";
  }
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mx-6"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="mx-6"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <div className="text-center">ID</div>;
    },
    cell: ({ row }) => (
      <>
        <div className="max-w-[100px] overflow-hidden whitespace-nowrap text-center">
          <div className="truncate">{row.getValue("id")}</div>
        </div>
      </>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const Monto = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Monto);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center lowercase">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <div className="text-center">Description</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("description")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <div className="text-center">Status</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">
        <p
          className={`mx-auto inline-block rounded-lg border-opacity-10 px-2 text-center font-semibold capitalize ${getStatusStyles(
            row.getValue("status"),
          )}`}
        >
          {row.getValue("status")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <div className="text-center">Category</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <div className="text-center">Type</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">
        <p
          className={`mx-auto inline-block rounded-lg border-opacity-10 px-2 text-center font-semibold capitalize ${getTypeStyles(
            row.getValue("type"),
          )}`}
        >
          {row.getValue("type")}
        </p>
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    header: ({ column }) => {
      return <div className="text-center">Actions</div>;
    },
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <DotsVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg font-medium">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Details
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Add note
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-[#6f260e] hover:bg-white">
                Delete row
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
