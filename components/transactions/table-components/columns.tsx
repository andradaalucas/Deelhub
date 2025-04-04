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
import { deleteTransactions } from "@/queries/client/transactions";
// import { PDFDownloadLink } from '@react-pdf/renderer';
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { pdf } from "@react-pdf/renderer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDelete } from "../../atom/confirm-delete";
import { PDFData } from "../../pdf-management";
import { RowData, Transactions } from "../types";
import { Details } from "./actions/details";
import { Edit } from "./actions/edit";
// Carga dinámica del componente de la plantilla PDF
// const InvoiceTemplate = dynamic<PDFData>(
//   () => import("../../pdf-management/index").then((mod) => mod.InvoiceTemplate),
//   {
//     ssr: false,
//   },
// );

const getStatusStyles = (status: any) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-[#56663e]";
    case "canceled":
      return "bg-red-100 text-[#e14133]";
    default:
      return "bg-[#e2ecf3] text-[#0a85d1]";
  }
};
const getDotStatusStyles = (status: any) => {
  switch (status) {
    case "paid":
      return "bg-[#56663e]";
    case "canceled":
      return "bg-[#e14133]";
    default:
      return "bg-[#0a85d1]";
  }
};

const handleDownloadPDF = async (invoiceData: PDFData) => {
  // try {
  //   // Primero generamos el documento
  //   const pdfDoc = <InvoiceTemplate {...invoiceData} />;
  //   // Luego lo convertimos a blob
  //   const blob = await pdf(pdfDoc).toBlob();
  //   // Finalmente lo descargamos
  //   saveAs(blob, `invoice_${invoiceData.id}.pdf`);
  // } catch (error) {
  //   console.error("Error al generar el PDF:", error);
  //   // Aquí puedes agregar alguna notificación al usuario
  // }
};

const ActionsCell = ({ row }: any) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [actionExecuteData, setActionExecuteData] = useState({});

  const queryClient = useQueryClient();

  const deleteTransaction = useMutation({
    mutationFn: (id: any) => deleteTransactions(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["statistics"]);
    },
  });

  const actionToExecuteFunction = () => {
    const promise = deleteTransaction.mutateAsync(row.original.id);
    toast.promise(promise, {
      loading: "Deleting transaction...",
      success: "Transaction deleted successfully!",
      error: "Failed to delete transaction. Please try again.",
    });
    promise.then(() => setIsOpenDelete(false));
  };

  const handleDetails = () => setIsOpenDetails(!isOpenDetails);
  const handleEdit = () => setIsOpenEdit(!isOpenEdit);
  const handleDelete = () => {
    setActionExecuteData({
      title: "delete this payment",
      description:
        "This action will permanently delete the transaction's data.",
      rowData: row.original,
    });
    setIsOpenDelete(!isOpenDelete);
  };

  const handleCopyClipboard = (rowData: RowData) => {
    navigator.clipboard.writeText(rowData?.id);
    toast.success("Copied to clipboard");
  };

  return (
    <div>
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
            <DropdownMenuItem onClick={() => handleDownloadPDF(row.original)}>
              Download Invoice
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-500 hover:bg-red-500 hover:text-white"
              onClick={handleDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ConfirmDelete
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        actionExecuteData={actionExecuteData}
        actionToExecuteFunction={actionToExecuteFunction}
      />
      <Details
        isOpen={isOpenDetails}
        setIsOpen={setIsOpenDetails}
        rowData={row.original}
      />
      <Edit
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        rowData={row.original}
      />
    </div>
  );
};

export default ActionsCell;

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
      return <div className="whitespace-nowrap">Customer</div>;
    },
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="whitespace-nowrap text-left font-medium">
          {row.getValue("customer")}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Amount</div>;
    },
    cell: ({ row }) => {
      const Monto = parseFloat(row.getValue("total"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Monto);

      return (
        <div className="whitespace-nowrap text-left font-medium">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "issue_date",
    header: ({ column }) => {
      return (
        <div className="w-full whitespace-nowrap text-left">Issue Date</div>
      );
    },
    cell: ({ row }): React.ReactNode => {
      const issueDate = row.getValue("issue_date") as string | Date | null;
      return (
        <div className="flex w-full justify-between whitespace-nowrap text-left lowercase">
          {issueDate ? format(new Date(issueDate), "MM/dd/yyyy") : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => {
      return <div className="w-full whitespace-nowrap text-left">Due Date</div>;
    },
    cell: ({ row }): React.ReactNode => {
      const dueDate = row.getValue("due_date") as string | Date | null;

      return (
        <div className="flex w-full justify-between whitespace-nowrap text-left lowercase">
          {dueDate ? format(new Date(dueDate), "MM/dd/yyyy") : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <div className="whitespace-nowrap text-left">Transaction ID</div>;
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
      return <div className="whitespace-nowrap text-left">Status</div>;
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
