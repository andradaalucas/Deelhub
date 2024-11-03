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
import { updateTransactions } from "@/services/transactions";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import { DialogTitle } from "@radix-ui/react-dialog";

const formSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "confirmed", "rejected"] as const, {
    required_error: "Please select a status",
  }),
});

type FormValues = {
  id: string;
  status: "pending" | "confirmed" | "rejected" | string;
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
      name: rowData.customer_transaction[0]?.customers?.name || "No Name",
      address:
        rowData.customer_transaction[0]?.customers?.address || "No Address",
      email: rowData.customer_transaction[0]?.customers?.email || "No Email",
      phone: rowData.customer_transaction[0]?.customers?.phone || "No Phone",
    },
    status: rowData.status,
    companyInfo: {
      name: "Deelfy",
      logo: "D",
      invoiceNumber: "INV-0001",
      city: "Córdoba, Argentina",
      email: "hi@deelfy.com",
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
      issue_date: rowData.issue_date || "No issue date",
      due_date: rowData.due_date || "No due date",
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
      setIsOpen(false);
      toast.success("Transaction updated successfully");
    },
    onError: () => {
      queryClient.invalidateQueries(["transactions"]);
      toast.error("Failed to update transaction. Please try again.");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const promise = updateTransaction.mutateAsync(data);
    toast.promise(promise, {
      loading: "Uploading transaction...",
      success: () => {
        return "transaction updated successfully";
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
        <div className="mx-auto w-full max-w-3xl">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-7">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 min-h-[48px] w-12 min-w-[48px] items-center justify-center rounded-lg bg-primary">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {invoiceData.companyInfo.logo}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {invoiceData.companyInfo.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Invoice N°
                    <div>{invoiceData.companyInfo.invoiceNumber}</div>
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-1 text-sm">
                <div className="font-semibold">Issue Date</div>
                <div className="text-muted-foreground">
                  {invoiceData.date.issue_date}
                </div>
                <div className="font-semibold">Due Date</div>
                <div className="text-muted-foreground">
                  {invoiceData.date.due_date}
                </div>
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
                      <SelectTrigger className="max-w-32 font-semibold md:max-w-36">
                        <SelectValue
                          placeholder="Select status"
                          className="text-sm font-semibold"
                        />
                      </SelectTrigger>
                      <SelectContent className="max-w-32 md:max-w-36">
                        <SelectItem
                          value="pending"
                          className="text-sm font-semibold"
                        >
                          <span className="flex items-center text-sm">
                            <span className="mr-2 h-2 w-2 rounded-full bg-[#0a85d1]" />
                            PENDING
                          </span>
                        </SelectItem>
                        <SelectItem value="confirmed" className="font-semibold">
                          <span className="flex items-center text-sm">
                            <span className="mr-2 h-2 w-2 rounded-full bg-[#56663e] font-semibold" />
                            CONFIRMED
                          </span>
                        </SelectItem>
                        <SelectItem value="rejected" className="font-semibold">
                          <span className="flex items-center text-sm">
                            <span className="mr-2 h-2 w-2 rounded-full bg-[#e14133] font-semibold" />
                            REJECTED
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold sm:text-base">From</h3>
                  <div className="text-xs text-muted-foreground sm:text-sm">
                    <div>{invoiceData.companyInfo.name}</div>
                    <div>{invoiceData.companyInfo.city}</div>
                    <div>{invoiceData.companyInfo.email}</div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold sm:text-base">To</h3>
                  <div className="text-xs text-muted-foreground sm:text-sm">
                    <div>{invoiceData.clientInfo.name}</div>
                    <div>{invoiceData.clientInfo.address}</div>
                    <div>{invoiceData.clientInfo.email}</div>
                    <div>{invoiceData.clientInfo.phone}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="grid grid-cols-4 text-xs font-semibold sm:text-sm">
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
                  <div className="col-span-3 text-right font-semibold">TAX</div>
                  <div className="text-right">
                    {invoiceData.totals.tax_rate}%
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center text-xs sm:text-sm">
                  <div className="col-span-3 text-right font-semibold">
                    Total
                  </div>
                  <div className="text-right text-base font-semibold sm:text-lg">
                    {invoiceData.totals.currency} ${invoiceData.totals.total}
                  </div>
                </div>
              </div>
            </CardContent>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
