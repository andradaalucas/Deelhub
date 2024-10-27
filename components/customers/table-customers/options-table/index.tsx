"use client"
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
import { FileDown, FileUp, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { AuthorizationOption } from "./authorization-option";
import { DropAndDrag } from "./drop-and-drag";
import { useQueryClient } from "@tanstack/react-query";

export function OptionsTable() {
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const queryClient = useQueryClient();
  const handleImportCSV = async () => {
    setOpenImport(!openImport);
  };
  const handleExportCSV = async () => {
    setOpenExport(!openImport);
  };
  const handleRefreshData = () => {
    queryClient.invalidateQueries(["customers"]);
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
            <RefreshCcw className="stroke-1" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center justify-between gap-3"
            onClick={handleExportCSV}
          >
            <div>Export on CSV</div>
            <FileUp className="stroke-1" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center justify-between gap-3"
            onClick={handleImportCSV}
          >
            <div>Import on CSV</div>
            <FileDown className="stroke-1" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropAndDrag isOpen={openImport} setIsOpen={setOpenImport} />
      <AuthorizationOption isOpen={openExport} setIsOpen={setOpenExport} />
    </div>
  );
}
