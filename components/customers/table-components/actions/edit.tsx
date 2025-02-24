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
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { formSchema } from "../../schemas";
import { updateCustomers } from "@/queries/client/customers";
import { DetailsProps } from "../../types";
import { toast } from "sonner";
import { Mail, Phone, User } from "lucide-react";

export function EditCustomers({ rowData, isOpen, setIsOpen }: DetailsProps) {
  const defaultValues = {
    id: rowData?.id || "",
    name: rowData?.name || "",
    email: rowData?.email || "",
    phone: rowData?.phone || 0,
    address: rowData?.address || "",
  };

  const formCustomers = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
    <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <AlertDialogContent className="max-w p-0">
        <AlertDialogHeader className="px-8 pt-8">
          <AlertDialogTitle className="text-left text-2xl font-semibold">
            Edit Customers
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            The change will be reflected in the budgets associated with this
            customer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...formCustomers}>
          <form onSubmit={formCustomers.handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between gap-2 px-8">
                <FormField
                  control={formCustomers.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="Enter name"
                            className="pl-9"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formCustomers.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Enter phone"
                            className="pl-9"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={formCustomers.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email address"
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCustomers.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="mb-12 px-8">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <AlertDialogFooter className="mt-10 flex items-end gap-2 border bg-zinc-100/75 px-8 py-6 dark:bg-zinc-900/75 md:rounded-b-lg lg:rounded-b-lg">
              <div className="flex items-center gap-2">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <div>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-blue text-sm text-white hover:bg-hoverBlue"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
