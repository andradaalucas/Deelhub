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
import { deleteTransactions } from "@/services/transactions";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { ConfirmAction } from "../../atom/confirm-action";
// import { Edit } from "../actions/edit";
import { Transactions } from "../types";
import { toast } from "sonner";
import { getCustomerById } from "@/services/customers";

const getStatusStyles = (status: any) => {
  switch (status) {
    // case "pending":
    //   return "bg-[#fdefca] text-[#805e0c]";
    case "confirmed":
      return "bg-[#e6eddd] text-[#56663e]";
    case "rejected":
      return "bg-[#f2d5cd] text-[#6f260e]";
    default:
      return "bg-[#dbf0f3] text-[#33686c]";
  }
};

const ActionsCell = ({ row }: any) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [actionExcecuteData, setActionExcecuteData] = useState({
    title: "delete this payment",
    description: "This action will permanently delete the transactions's data.",
    rowData: row.original,
  });

  const queryClient = useQueryClient();

  const deleteTransaction = useMutation({
    mutationFn: (id: any) => deleteTransactions(id), // Se asegura de pasar el `id`
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
    onError: () => {
      queryClient.invalidateQueries(["transactions"]); // Para asegurarse de actualizar el estado en caso de error también
    },
  });

  const actionToExcecuteFunction = () => {
    const promise = deleteTransaction.mutateAsync(row.original.id);
    toast.promise(promise, {
      loading: "Deleting transaction...",
      success: () => {
        return "Transaction deleted successfully!";
      },
      error: "Failed to delete transaction. Please try again.",
    });
    promise.then(() => setIsOpenDelete(!isOpenDelete));
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
    toast.success("Copied to clipboard");
  };
  const handleGeneratePDF = () => {};

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
              onClick={() => handleCopyClipboard(row.original)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleCopyClipboard(row.original)}
            >
              Copy Access Token
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleGeneratePDF}
            >
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-500"
              onClick={handleDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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

const CustomerName = (id: any) => {
  // const queryClient = useQueryClient();
  // const getCustomerByID = useMutation({
  //   mutationFn: (id: any) => getCustomerById(id), // Se asegura de pasar el `id`
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["transactions"]);
  //   },
  //   onError: () => {
  //     queryClient.invalidateQueries(["transactions"]); // Para asegurarse de actualizar el estado en caso de error también
  //   },
  // });
  // const promise = getCustomerByID.mutateAsync(id);
  // console.log("getCustomerByID", promise);
  return <div>No Name</div>;
};

export const columns: ColumnDef<Transactions>[] = [
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
    accessorKey: "customer",
    header: ({ column }) => {
      return <div className="">Customer</div>;
    },
    cell: ({ row }) => {
      const id = row.original.id;
      return <CustomerName row={id} />;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return <div className="">Amount</div>;
    },
    cell: ({ row }) => {
      const Monto = parseFloat(row.getValue("total"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Monto);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return <div className="w-full text-left">Date</div>; // Ajusta el ancho al completo
    },
    cell: ({ row }) => (
      <div className="flex w-full justify-between whitespace-nowrap text-left lowercase">
        {row.getValue("startDate")} {row.getValue("expirationDate")}
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
    accessorKey: "status",
    header: ({ column }) => {
      return <div className="text-left">Status</div>;
    },

    cell: ({ row }) => (
      <>
        <div className="max-w-[100px] overflow-hidden whitespace-nowrap text-left">
          <div
            className={`${getStatusStyles(row.getValue("status"))} truncate rounded-sm border px-2 text-center text-xs font-semibold uppercase`}
          >
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
