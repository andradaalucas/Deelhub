"use client";
import { ConfirmAction } from "@/components/atom/confirm-action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportCustomerOnSheet } from "@/queries/client/customers";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DropAndDrag } from "./drop-and-drag";

export function OptionsTable() {
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [actionExecuteData, setActionExecuteData] = useState({
    title: "export data on CSV?",
    description: "It is likely to open a pop-up tab with the file.",
  });

  const handleImportCSV = async () => {
    setOpenImport(!openImport);
  };
  const handleExportCSV = async () => {
    setOpenExport(!openExport);
  };

  const handleExport = async () => {
    const promise = exportCustomerOnSheet();
    toast.promise(promise, {
      loading: "Loading...",
      success: () => {
        return `Data exported successfully`;
      },
      error: "Error",
    });
    setOpenExport(!openImport);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0">
            <DotsVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="flex gap-2 rounded-lg font-medium"
        >
          <div>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex cursor-pointer items-center justify-between gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              onClick={handleExportCSV}
            >
              <div>Export on CSV</div>
              <FileSpreadsheet className="h-5 w-5 stroke-2" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex cursor-pointer items-center justify-between gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              onClick={handleImportCSV}
            >
              <div>Import on CSV</div>
              <FileSpreadsheet className="h-5 w-5 stroke-2" />
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropAndDrag isOpen={openImport} setIsOpen={setOpenImport} />

      <ConfirmAction
        isOpen={openExport}
        setIsOpen={setOpenExport}
        actionExecuteData={actionExecuteData}
        actionToExecuteFunction={handleExport}
      />
    </div>
  );
}
