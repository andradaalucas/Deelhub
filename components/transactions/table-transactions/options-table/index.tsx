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
import { useQueryClient } from "@tanstack/react-query";
import { ArrowUpRight, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { AuthorizationOption } from "./authorization-option";

export function OptionsTable() {
  const [openExport, setOpenExport] = useState(false);
  const queryClient = useQueryClient();
  const handleExportCSV = async () => {
    setOpenExport(!openExport);
  };
  const handleRefreshData = () => {
    queryClient.invalidateQueries(["transactions"]);
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
            <ArrowUpRight className="stroke-1" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AuthorizationOption isOpen={openExport} setIsOpen={setOpenExport} />
    </>
  );
}
