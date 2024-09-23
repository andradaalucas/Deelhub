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
import { Details } from "./details";
import { useState } from "react";
import { Edit } from "./edit";
import { ConfirmAction } from "../atom/confirm-action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransactions } from "@/services/transactions";
import { toast } from "../ui/use-toast";

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
      return "border-[#a9a9a9] bg-[#e6eddd]";
    case "expense":
      return "border-[#a9a9a9] bg-[#f2d5cd]";
    default:
      return "bg-[#ebebeb] text-[#1a1a1a]";
  }
};

const ActionsCell = ({ row }: any) => {
  const rowData = row.original;
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [actionExcecuteData, setActionExcecuteData] = useState({
    action: "delete this payment",
    rowData: rowData,
  });

  const queryClient = useQueryClient();
  const deleteTransaction = useMutation({
    mutationFn: deleteTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      toast({
        title: "Successfully deleted",
      });
    },
    onError() {
      toast({
        title: "Error An error occurred while delete the transaction",
      });
    },
  });
  const editTransaction = useMutation({
    mutationFn: deleteTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      toast({
        title: "Successfully deleted",
      });
    },
    onError() {
      toast({
        title: "Error An error occurred while delete the transaction",
      });
    },
  });

  const actionToExcecuteFunction = () => {
    deleteTransaction.mutate(rowData.id);
    setIsOpenDelete(false);
  };

  const handleDetails = () => {
    setIsOpenDetails(!isOpenDetails);
  };
  const handleEdit = () => {
    setIsOpenEdit(!isOpenEdit);
  };
  const handleDelete = () => {
    setIsOpenDelete(!isOpenDelete);
  };
  const handleCopyClipboard = (rowData: any) => {
    navigator.clipboard.writeText(rowData?.id);
    toast({
      title: "Copied to clipboard",
    });
  };

  return (
    <>
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
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleDetails}
            >
              Details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleCopyClipboard(rowData)}
            >
              Copy ID payment
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-danger hover:text-danger"
              onClick={handleDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isOpenDetails && (
        <Details
          isOpen={isOpenDetails}
          setIsOpen={setIsOpenDetails}
          rowData={rowData}
        />
      )}
      {isOpenEdit && (
        <Edit isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} rowData={rowData} />
      )}
      {isOpenDelete && (
        <ConfirmAction
          isOpen={isOpenDelete}
          setIsOpen={setIsOpenDelete}
          actionExcecuteData={actionExcecuteData}
          actionToExcecuteFunction={actionToExcecuteFunction}
        />
      )}
    </>
  );
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
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <div className="text-left">Date</div>;
    },
    cell: ({ row }) => (
      <div className="text-left lowercase">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <div className="text-left">Type</div>;
    },
    cell: ({ row }) => (
      <div className="text-left">
        <span
          className={`${getTypeStyles(row.getValue("type"))} border-foreground-muted rounded-md border border-[#a9a9a9] p-4 px-2 py-1 text-sm capitalize`}
        >
          {row.getValue("type")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <div className="text-left">Transaction ID </div>;
    },
    cell: ({ row }) => (
      <>
        <div className="max-w-[100px] overflow-hidden whitespace-nowrap text-left">
          <div className="truncate">#{row.getValue("id")}</div>
        </div>
      </>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
    header: ({ column }) => {
      return <div className="text-center">Actions</div>;
    },
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
