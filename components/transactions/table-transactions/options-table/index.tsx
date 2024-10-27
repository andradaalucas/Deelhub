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
import { FileSpreadsheet } from "lucide-react";
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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex cursor-pointer items-center justify-between gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            onClick={handleExportCSV}
          >
            <div>Export on CSV</div>
            <FileSpreadsheet className="h-5 w-5 stroke-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AuthorizationOption isOpen={openExport} setIsOpen={setOpenExport} />
    </>
  );
}
