"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaEdit } from "../schemas";
import { updateCustomers } from "@/services/customers";
import { DetailsProps } from "../types";
import { toast } from "sonner";

export function EditCustomers({ rowData, isOpen, setIsOpen }: DetailsProps) {
  const defaultValues = {
    id: rowData?.id || "",
    name: rowData?.name || "",
    description: rowData?.description || "",
    email: rowData?.email || "",
  };

  const formCustomers = useForm<z.infer<typeof formSchemaEdit>>({
    defaultValues,
    resolver: zodResolver(formSchemaEdit),
  });
  const queryClient = useQueryClient();
  const updateCustomer = useMutation({
    mutationFn: updateCustomers,
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
    onError: () => {
      queryClient.invalidateQueries(["customers"]);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchemaEdit>) => {
    const promise = updateCustomer.mutateAsync(values);
    toast.promise(promise, {
      loading: "Uploading customers...",
      success: () => {
        return "Customer updated successfully";
      },
      error: "Failed to updated customers. Please try again.",
    });
    promise.then(() => formCustomers.reset());
    promise.then(() => setIsOpen(false));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="max-w rounded-xl p-0">
        <DialogHeader className="px-8 pt-8">
          <DialogTitle className="text-2xl font-bold">
            Edit Customers
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youe done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...formCustomers}>
            <form onSubmit={formCustomers.handleSubmit(onSubmit)}>
              <FormField
                control={formCustomers.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the customer{"'"}s full name. This will be
                      associated with their transaction details.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCustomers.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      The invoice and all transaction-related communications
                      will be sent to this email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCustomers.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of the transaction, such as
                      the purpose or any key details.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex justify-end gap-2 rounded-b-lg border bg-[#fafafa] px-8 py-6">
                <DialogClose>
                  <div>Cancel</div>
                </DialogClose>
                <Button type="submit">Edit customer</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
