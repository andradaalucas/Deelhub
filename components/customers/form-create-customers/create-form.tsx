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
import { createCustomers } from "@/services/customers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../schemas";
import { toast } from "sonner";

export function CreateForm() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const createCustomer = useMutation({
    mutationFn: createCustomers,
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
    onError: () => {
      queryClient.invalidateQueries(["customers"]);
    },
  });
  const formCustomers = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const promise = createCustomer.mutateAsync(data);
    toast.promise(promise, {
      loading: "Uploading customers...",
      success: () => {
        return "All customers imported successfully!";
      },
      error: "Failed to upload customers. Please try again.",
    });
    promise.then(() => formCustomers.reset());
    promise.then(() => setIsOpen(false));
  };
  const handleOpenDialog = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Button className="ml-4 h-9 rounded-md" onClick={handleOpenDialog}>
        Create customer
      </Button>
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent className="max-w rounded-xl p-0">
          <DialogHeader className="px-8 pt-8">
            <DialogTitle className="text-2xl font-semibold">Create Customers</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youe done.
            </DialogDescription>
          </DialogHeader>
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
              <DialogFooter className="flex justify-end gap-2 rounded-b-lg border bg-zinc-100/75 dark:bg-zinc-900/75 px-8 py-6 mt-4">
                <DialogClose>
                  <div>Cancel</div>
                </DialogClose>
                <Button type="submit">Create customer</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
