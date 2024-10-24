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
import { toast } from "sonner";
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
    mutationFn: (id: any) => deleteCustomers(id), // Se asegura de pasar el `id`
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
    onError: () => {
      queryClient.invalidateQueries(["customers"]); // Para asegurarse de actualizar el estado en caso de error también
    },
  });

  const actionToExcecuteFunction = () => {
    const promise = deleteCustomer.mutateAsync(row.original.id);
    toast.promise(promise, {
      loading: "Deleting customer...",
      success: () => {
        return "Customer deleted successfully!";
      },
      error: "Failed to delete customer. Please try again.",
    });
    promise.then(() => setIsOpenDelete(false));
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
    toast.success("Copied to clipboard");
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
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
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
