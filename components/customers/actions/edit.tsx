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
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchemaCustomers } from "../schemas";
import { updateCustomers } from "@/services/customers";
import { DetailsProps } from "../types";


export function EditCustomers({ rowData, isOpen, setIsOpen }: DetailsProps) {
  const { toast } = useToast();
  const defaultValues = {
    id: rowData?.id || "",
    name: rowData?.name || "",
    description: rowData?.description || "",
    email: rowData?.email || "",
  };

  const formCustomers = useForm<z.infer<typeof FormSchemaCustomers>>({
    defaultValues,
    resolver: zodResolver(FormSchemaCustomers),
  });
  const queryClient = useQueryClient();
  const updateCustomer = useMutation({
    mutationFn: updateCustomers,
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      toast({
        title: "Successfully updated",
      });
    },
    onError() {
      toast({
        title: "Error An error occurred while edit the customer",
      });
    },
  });
  const handleOpenDialog = () => {
    setIsOpen(!isOpen);
  };
  const onSubmit = async (values: z.infer<typeof FormSchemaCustomers>) => {
    updateCustomer.mutate(values);
    formCustomers.reset();
    handleOpenDialog();
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
