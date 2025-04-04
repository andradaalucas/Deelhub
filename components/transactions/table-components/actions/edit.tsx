import { CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { RowData } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransactions } from "@/queries/client/transactions";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import { DialogTitle } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import Image from "next/image";

const formSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "paid", "canceled"] as const, {
    required_error: "Please select a status",
  }),
});

type FormValues = {
  id: string;
  status: "pending" | "paid" | "canceled" | string;
};

export function Edit({
  isOpen,
  setIsOpen,
  rowData,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  rowData: RowData;
}) {
  const [invoiceData, setInvoiceData] = useState({
    clientInfo: {
      name: rowData?.customers?.name || null,
      address: rowData?.customers?.address || null,
      email: rowData?.customers?.email || null,
      phone: rowData?.customers?.phone || null,
    },
    status: rowData.status,
    companyInfo: {
      name: "Deelhub",
      logo: "D",
      invoiceNumber: "INV-0001",
      city: "Córdoba, Argentina",
      email: "hi@Deelhub.com",
    },
    items: rowData.products.map((product) => ({
      description: product.name,
      quantity: product.quantity,
      price: product.price,
      total: product.price * product.quantity,
    })),
    totals: {
      tax_rate: rowData.tax_rate ?? 0,
      currency: rowData.currency || null,
      total: rowData.total.toFixed(2),
    },
    date: {
      issue_date: rowData.issue_date
        ? format(new Date(rowData.issue_date), "MM/dd/yyyy")
        : null,

      due_date: rowData.due_date
        ? format(new Date(rowData.due_date), "MM/dd/yyyy")
        : null,
    },
  });

  const form = useForm<FormValues>({
    defaultValues: {
      id: rowData.id,
      status: invoiceData?.status,
    },
    resolver: zodResolver(formSchema),
  });

  const queryClient = useQueryClient();
  const updateTransaction = useMutation({
    mutationFn: updateTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["statistics"]);
    },
  });
  

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const promise = updateTransaction.mutateAsync(data);
    toast.promise(promise, {
      loading: "Uploading transaction...",
      success: () => {
        return "Transaction updated successfully";
      },
      error: "Failed to updated transaction. Please try again.",
    });
    promise.then(() => setIsOpen(false));
  };
  const handleStatusChange = (value: FormValues["status"]) => {
    form.setValue("status", value);
    form.handleSubmit(onSubmit)();
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="rounded-none lg:min-w-[700px]">
        <DialogHeader className="sr-only">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="fflex flex-row items-start justify-between space-y-0 p-0 pb-7 pt-6">
            <div className="flex items-center space-x-4 p-2">
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                height="48"
                width="48"
              />
              <div>
                <h2 className="text-base font-semibold lg:text-lg">
                  {invoiceData.companyInfo.name}
                </h2>
                <p className="text-xs text-muted-foreground md:text-sm lg:text-sm">
                  Invoice N°
                  <div>{invoiceData.companyInfo.invoiceNumber}</div>
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-1 p-2 text-xs md:text-sm lg:text-sm">
              {invoiceData.date.issue_date && (
                <>
                  <div className="font-semibold">Issue Date</div>
                  <div className="text-muted-foreground">
                    {invoiceData.date.issue_date}
                  </div>
                </>
              )}
              {invoiceData.date.due_date && (
                <>
                  <div className="font-semibold">Due Date</div>
                  <div className="text-muted-foreground">
                    {invoiceData.date.due_date}
                  </div>
                </>
              )}
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={handleStatusChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="">
                      <SelectValue
                        placeholder="Select status"
                        className="text-xs font-semibold"
                      />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem
                        value="pending"
                        className="text-xs font-semibold"
                      >
                        <span className="flex items-center text-xs">
                          <span className="mr-2 h-2 w-2 rounded-full bg-[#0a85d1]" />
                          PENDING
                        </span>
                      </SelectItem>
                      <SelectItem value="paid" className="font-semibold">
                        <span className="flex items-center text-xs">
                          <span className="mr-2 h-2 w-2 rounded-full bg-[#56663e] font-semibold" />
                          PAID
                        </span>
                      </SelectItem>
                      <SelectItem value="canceled" className="font-semibold">
                        <span className="flex items-center text-xs">
                          <span className="mr-2 h-2 w-2 rounded-full bg-[#e14133] font-semibold" />
                          CANCELED
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </CardHeader>
          <CardContent className="grid gap-24 p-0">
            <div className="grid gap-4 p-2 md:grid-cols-2">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold">From</h3>
                <div className="text-sm text-muted-foreground md:text-sm lg:text-sm">
                  <p>{invoiceData.companyInfo.name}</p>
                  <p>{invoiceData.companyInfo.city}</p>
                  <p>{invoiceData.companyInfo.email}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold">To</h3>
                <div className="text-sm text-muted-foreground md:text-sm lg:text-sm">
                  <p>{invoiceData.clientInfo.name}</p>
                  <p>{invoiceData.clientInfo.address}</p>
                  <p>{invoiceData.clientInfo.email}</p>
                  <p>{invoiceData.clientInfo.phone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-1.5 p-2 pb-6">
              <div className="grid grid-cols-4 text-xs font-semibold">
                <div>Description</div>
                <div className="text-right">Quantity</div>
                <div className="text-right">Price</div>
                <div className="text-right">Total</div>
              </div>
              <Separator />
              {invoiceData.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 text-xs sm:text-sm"
                >
                  <div>{item.description}</div>
                  <div className="text-right">{item.quantity}</div>
                  <div className="text-right">${item.price.toFixed(2)}</div>
                  <div className="text-right">${item.total.toFixed(2)}</div>
                </div>
              ))}
              <Separator />
              <div className="grid grid-cols-4 text-xs sm:text-sm">
                <div className="col-span-1 text-left font-semibold">TAX</div>
                <div className="col-span-3 text-right">
                  {invoiceData.totals.tax_rate}%
                </div>
              </div>
              <div className="grid grid-cols-4 items-center text-xs sm:text-sm">
                <div className="col-span-1 text-left font-semibold">Total</div>
                <div className="col-span-3 whitespace-nowrap text-right text-xs font-semibold md:text-sm">
                  {invoiceData.totals.currency} ${invoiceData.totals.total}
                </div>
              </div>
            </div>
          </CardContent>
        </form>
      </DialogContent>
    </Dialog>
  );
}
