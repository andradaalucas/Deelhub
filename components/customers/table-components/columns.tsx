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
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomers, updateCustomers } from "@/services/customers";
import { EditCustomers } from "./actions/edit";
import { DetailsCustomers } from "./actions/details";
import { ConfirmDelete } from "@/components/atom/confirm-delete";
import { ConfirmAction } from "@/components/atom/confirm-action";

const getStatusStyles = (status: any) => {
  switch (status) {
    case "enabled":
      return "bg-green-100 text-[#56663e]";
    case "disabled":
      return "bg-red-100 text-[#e14133]";
    default:
      return "bg-[#e2ecf3] text-[#0a85d1]";
  }
};
const getDotStatusStyles = (status: any) => {
  switch (status) {
    case "enabled":
      return "bg-[#56663e]";
    case "disabled":
      return "bg-[#e14133]";
    default:
      return "bg-[#0a85d1]";
  }
};

const ActionsCell = ({ row }: any) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [enabledOrDisabled, setEnabledOrDisabled] = useState(false);
  const [isOpenEnabledOrDisabled, setIsOpenEnabledOrDisabled] = useState(false);
  const [actionExcecuteData, setActionExcecuteData] = useState({});
  const [enabledOrDisabledData, setEnabledOrDisabledData] = useState({});
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
  const updateCustomer = useMutation({
    mutationFn: (data: any) => updateCustomers(data), // Se asegura de pasar el `id`
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
    onError: () => {
      queryClient.invalidateQueries(["customers"]); // Para asegurarse de actualizar el estado en caso de error también
    },
  });

  const handleEnabledOrDisabled = () => {
    setEnabledOrDisabledData({
      title: `${enabledOrDisabled ? "disable" : "enable"} this customer?`,
      description: `Transactions associated with this customer will remain active.`,
    });
    setIsOpenEnabledOrDisabled(!isOpenEnabledOrDisabled);
  };
  const actionToExecuteEnabledDisabled = () => {
    const id = row.original.id;
    const status = row.original.status === "enabled" ? "disabled" : "enabled";
    const promise = updateCustomer.mutateAsync({ id, status });
    toast.promise(promise, {
      loading: "Update Status...",
      success: () => {
        return "Customer update successfully!";
      },
      error: "Failed to update status customer. Please try again.",
    });
    promise.then(() => setEnabledOrDisabled(false));
  };
  const actionToExecuteFunction = () => {
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
    setActionExcecuteData({
      title: "delete this customer?",
      description: "Transactions associated with this customer will also be permanently deleted.",
      rowData: row.original,
    });
    setIsOpenDelete(!isOpenDelete);
  };
  const handleEdit = () => {
    setIsOpenEdit(!isOpenEdit);
  };

  const handleCopyClipboard = (row: any) => {
    navigator.clipboard.writeText(row?.id);
    toast.success("Copied to clipboard");
  };
  useEffect(() => {
    if (row.original.status === "enabled") {
      setEnabledOrDisabled(true);
    }
  }, [row.original.status, enabledOrDisabledData]);
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
            className="cursor-pointer"
            onClick={handleEnabledOrDisabled}
          >
            {enabledOrDisabled ? "Disable" : "Enable"}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onClick={handleDelete}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDelete
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        actionExecuteData={actionExcecuteData}
        actionToExecuteFunction={actionToExecuteFunction}
      />
      <ConfirmAction
        isOpen={isOpenEnabledOrDisabled}
        setIsOpen={setIsOpenEnabledOrDisabled}
        actionExecuteData={enabledOrDisabledData}
        actionToExecuteFunction={actionToExecuteEnabledDisabled}
      />
      <EditCustomers
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        rowData={row.original}
      />
      <DetailsCustomers
        isOpen={isOpenDetails}
        setIsOpen={setIsOpenDetails}
        rowData={row.original}
      />
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
      return <div className="whitespace-nowrap text-left">Name</div>;
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-left">{row.getValue("name")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <div className="text-left">Email</div>;
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-left">{row.getValue("email")}</div>
    ),
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
          <div className="truncate whitespace-nowrap">
            #{row.getValue("id")}
          </div>
        </div>
      </>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <div className="text-left">Status</div>;
    },
    cell: ({ row }) => (
      <>
        <div className="flex whitespace-nowrap text-left">
          <div
            className={`${getStatusStyles(row.getValue("status"))} flex items-center gap-1 truncate rounded-sm border px-2 text-center text-xs font-semibold uppercase`}
          >
            <div
              className={`${getDotStatusStyles(row.getValue("status"))} h-1 w-1 rounded-full`}
            ></div>
            {row.getValue("status")}
          </div>
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
