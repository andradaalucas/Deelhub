"use client";

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
import { updateTransactions } from "@/services/transactions";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, DollarSign } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "../transactions/types";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { parse } from 'date-fns';


// TODO: Crear validacion para que los numeros del monto sean mayores a 0

type DetailsProps = {
  rowData: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function Edit({ rowData, isOpen, setIsOpen }: DetailsProps) {
  const [dateNow, setDateNow] = useState<Date>(new Date());
  const [openDialog, setOpenDialog] = useState(false);

  const { toast } = useToast();
  const supabase = createClient();

  const defaultValues = {
    amount: rowData?.amount,
    date: parse(rowData?.date, 'yyyy-MM-dd', new Date()),
    description: rowData?.description,
    type: rowData?.type,
    status: rowData?.status,
    currency: rowData?.currency,
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues,
    resolver: zodResolver(FormSchema),
  });
  const queryClient = useQueryClient();
  const updateTransaction = useMutation({
    mutationFn: updateTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      toast({
        title: "Successfully updated",
        description: dateNow.toString(),
      });
    },
    onError() {
      toast({
        title: "Error An error occurred while creating the transaction",
        description: dateNow.toString(),
      });
    },
  });

  const handleOpenDialog = () => {
    openDialog ? setOpenDialog(false) : setOpenDialog(true);
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user !== null) {
      const enrichedData = {
        ...values,
        user_id: user.id,
        id: rowData?.id,
      };
      updateTransaction.mutate(enrichedData);
      form.reset();
      () => setIsOpen(false);
    } else {
      toast({
        title: "Unauthenticated user",
        description: "Log in and try again",
      });
      () => setIsOpen(false);
    }
    handleOpenDialog()
  };

  useEffect(() => {
    isOpen && setOpenDialog(isOpen) 
  }, [isOpen]);
  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="">
              <CardTitle className="text-lg">Edit transaction</CardTitle>
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
                        <div>
                          <div className="relative">
                            <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />

                            <Input
                              placeholder="Enter a amount"
                              type="number"
                              className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border block w-full rounded-md border bg-foreground/[.026] px-4 py-2 pl-8 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]"
                              {...field}
                            />
                          </div>
                        </div>
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
                          className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border w-full resize-none rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]"
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
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Edit</Button>
            </CardFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
