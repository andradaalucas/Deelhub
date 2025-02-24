"use client";
import { ConfirmAction } from "@/components/atom/confirm-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportTransactionsOnSheet } from "@/queries/client/transactions";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function OptionsTable() {
  const [openExport, setOpenExport] = useState(false);
  const [actionExecuteData, setActionExecuteData] = useState({
    title: "export data on CSV?",
    description: "It is likely to open a pop-up tab with the file.",
  });
  const handleExportCSV = async () => {
    setOpenExport(!openExport);
  };
  const handleExport = async () => {
    const promise = exportTransactionsOnSheet();
    toast.promise(promise, {
      loading: "Loading...",
      success: () => {
        return `Data exported successfully`;
      },
      error: "Error",
    });
    setOpenExport(!openExport);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0">
            <DotsVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-lg font-medium">
          <DropdownMenuLabel className="flex items-center justify-between gap-2">
            <div>Change Status</div> <Badge variant="outline">12</Badge>
          </DropdownMenuLabel>
          <DropdownMenuItem className="flex cursor-pointer items-center justify-between gap-3">
            <div>Confirmed</div>
            <div className="h-2 w-2 rounded-full bg-[#56663e]"></div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center justify-between gap-3">
            <div>Pending</div>
            <div className="h-2 w-2 rounded-full bg-[#0a85d1]"></div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center justify-between gap-3">
            <div>Rejected</div>
            <div className="h-2 w-2 rounded-full bg-[#e14133]"></div>
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator />
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex cursor-pointer items-center justify-between gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            onClick={handleExportCSV}
          >
            <div>Export on CSV</div>
            <FileSpreadsheet className="h-5 w-5 stroke-2" />
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmAction
        isOpen={openExport}
        setIsOpen={setOpenExport}
        actionExecuteData={actionExecuteData}
        actionToExecuteFunction={handleExport}
      />
    </>
  );
}
