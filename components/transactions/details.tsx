"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { CalendarIcon, DollarSign } from "lucide-react";
import Image from "next/image";
import { CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
type DetailsProps = {
  rowData: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function Details({ rowData, isOpen, setIsOpen }: DetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="">
        <CardHeader className="">
          <CardTitle className="flex items-center justify-between text-lg">
            <div>Transaction Detail</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <DotsVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-lg font-medium"
              >
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Export PDF
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Export Excel
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(rowData?.id)}
                >
                  Copy ID payment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Amount</Label>
              <div>
                <div className="relative">
                  <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="number"
                    readOnly
                    defaultValue={rowData?.amount}
                    className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border block w-full max-w-full appearance-none rounded-md border bg-foreground/[.026] px-4 py-2 pl-8 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]"
                  />
                  <Image
                    src="/assets/flags/argentina.png"
                    alt="argentine-flag"
                    height={17}
                    width={17}
                    className="absolute right-2.5 top-2.5"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label>Date</Label>
              <div>
                <div className="relative">
                  <Button
                    variant={"outline"}
                    className={cn(
                      "peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border w-full cursor-text rounded-md border bg-foreground/[.026] px-4 py-2 text-sm font-normal text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]",
                      !rowData.date && "text-muted-foreground",
                    )}
                  >
                    {rowData.date ? (
                      format(new Date(rowData.date), "MMM do, yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Enter a description"
              readOnly
              defaultValue={rowData?.description}
              className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border block w-full resize-none rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Type</Label>
              <Input
                readOnly
                defaultValue={rowData?.type}
                className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border block w-full rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]"
              />
            </div>

            <div className="">
              <Label>Status</Label>
              <Input
                readOnly
                defaultValue={rowData?.status}
                className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border block w-full rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 rounded-lg pt-6">
          <Button type="submit" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </CardFooter>
      </DialogContent>
    </Dialog>
  );
}
