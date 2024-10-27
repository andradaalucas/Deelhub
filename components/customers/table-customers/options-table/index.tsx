"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { FileSpreadsheet, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { AuthorizationOption } from "./authorization-option";
import { DropAndDrag } from "./drop-and-drag";
import { useQueryClient } from "@tanstack/react-query";
import { exportCustomerOnSheet } from "@/services/customers";
import { toast } from "sonner";
import { ConfirmAction } from "@/components/atom/confirm-action";

export function OptionsTable() {
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [actionExcecuteData, setActionExcecuteData] = useState({
    title: "export data on csv?",
    description: "It is likely to open a pop-up tab with the file.",
  });

  const queryClient = useQueryClient();
  const handleImportCSV = async () => {
    setOpenImport(!openImport);
  };
  const handleExportCSV = async () => {
    setOpenExport(!openExport);
  };
  const handleRefreshData = () => {
    queryClient.invalidateQueries(["customers"]);
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
        <DropdownMenuContent align="end" className="rounded-lg font-medium">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex cursor-pointer items-center justify-between gap-3"
            onClick={handleRefreshData}
          >
            <div>Refresh data</div>
            <RefreshCcw className="h-5 w-5 stroke-2" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center justify-between gap-3"
            onClick={handleExportCSV}
          >
            <div>Export on CSV</div>
            <FileSpreadsheet className="h-5 w-5 stroke-2" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center justify-between gap-3"
            onClick={handleImportCSV}
          >
            <div>Import on CSV</div>
            <FileSpreadsheet className="h-5 w-5 stroke-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropAndDrag isOpen={openImport} setIsOpen={setOpenImport} />

      <ConfirmAction
        isOpen={openExport}
        setIsOpen={setOpenExport}
        actionExcecuteData={actionExcecuteData}
        actionToExcecuteFunction={handleExport}
      />
      <DropAndDrag isOpen={openImport} setIsOpen={setOpenImport} />
    </div>
  );
}
