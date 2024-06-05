import { FormSchema } from "@/components/transactions-table/types";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { createTransaction, getAllTransactions } from "@/services/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { columns } from "./columns";

export function HeaderTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dateNow, setDateNow] = useState<Date>(new Date());

  const handleOpenDialog = () => {
    openDialog ? setOpenDialog(false) : setOpenDialog(true);
  };
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });
  const data = useMemo(() => transactions ?? [], [transactions]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      amount: 0,
    },
    resolver: zodResolver(FormSchema),
  });
  const queryClient = useQueryClient();
  const addTransaction = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast({
        title: "Successfully created",
        description: dateNow.toString(),
      });
      queryClient.invalidateQueries(["transactions"]);
    },
    onError(error) {
      toast({
        title: "Error An error occurred while creating the transaction",
        description: dateNow.toString(),
      });
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    addTransaction.mutate(data);
    handleOpenDialog();
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="flex items-center py-4 justify-between">
      <Input
        placeholder="Filter by description..."
        value={
          (table.getColumn("description")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("description")?.setFilterValue(event.target.value)
        }
        className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border block w-full max-w-sm rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]"
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="ml-4 h-9 rounded-md" onClick={handleOpenDialog}>
            Create transaction
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader className="">
                <CardTitle className="text-lg">Create transaction</CardTitle>
                <CardDescription>
                  Please enter the details of your transaction.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a amount"
                            type="number"
                            className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border block w-full rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border w-full rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a description"
                            className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border block w-full rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border w-full rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border w-full rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border w-full rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]">
                              <SelectValue placeholder="Choose a currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Currency</SelectLabel>
                              <SelectItem value="argentine-peso">
                                <div className="flex items-center gap-2">
                                  <Image
                                    src="/assets/flags/argentina.png"
                                    alt="argentine-flag"
                                    height={17}
                                    width={17}
                                  />
                                  Argentine pesos
                                </div>
                              </SelectItem>
                              <SelectItem value="american-dollar">
                                <div className="flex items-center gap-2">
                                  <Image
                                    src="/assets/flags/united-states.png"
                                    alt="argentine-flag"
                                    height={17}
                                    width={17}
                                  />
                                  American Dollar
                                </div>
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 rounded-lg pt-6">
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
