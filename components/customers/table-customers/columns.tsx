"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Customers } from "../types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomers } from "@/services/customers";
import { EditCustomers } from "../actions/edit";
import { DetailsCustomers } from "../actions/details";
import { ConfirmAction } from "@/components/atom/confirm-action";

const ActionsCell = ({ row }: any) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [actionExcecuteData, setActionExcecuteData] = useState({
    title: "delete this payment",
    description: "This action will permanently delete the user's data.",
    rowData: row.original,
  });

  const queryClient = useQueryClient();

  const deleteCustomer = useMutation({
    mutationFn: deleteCustomers,
    onSuccess: () => {
      queryClient.invalidateQueries(["customer"]);
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
    deleteCustomer.mutate(row.original.id);
    setIsOpenDelete(false);
  };

  const handleDetails = () => {
    setIsOpenDetails(!isOpenDetails);
  };
  const handleDelete = () => {
    setIsOpenDelete(!isOpenDelete);
  };
  const handleEdit = () => {
    setIsOpenEdit(!isOpenEdit);
  };

  const handleCopyClipboard = (row: any) => {
    navigator.clipboard.writeText(row?.id);
    toast({
      title: "Copied to clipboard",
    });
  };
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <DotsVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-lg font-medium">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleDetails}>
            Details
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleCopyClipboard(row)}
          >
            Copy Client ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500  cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isOpenDelete && (
        <ConfirmAction
          isOpen={isOpenDelete}
          setIsOpen={setIsOpenDelete}
          actionExcecuteData={actionExcecuteData}
          actionToExcecuteFunction={actionToExcecuteFunction}
        />
      )}
      {isOpenEdit && (
        <EditCustomers
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
          rowData={row.original}
        />
      )}
      {isOpenDetails && (
        <DetailsCustomers
          isOpen={isOpenDetails}
          setIsOpen={setIsOpenDetails}
          rowData={row.original}
        />
      )}
    </div>
  );
};

export const columns: ColumnDef<Customers>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return <div className="text-left">Name</div>;
    },
    cell: ({ row }) => <div className="text-left">{row.getValue("name")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <div className="text-left">Email</div>;
    },
    cell: ({ row }) => <div className="text-left">{row.getValue("email")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <div className="text-left">Customer ID</div>;
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
