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
import { Mail, Phone, User } from "lucide-react";

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
      phone: 0,
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
      <Button
        className="h-9 bg-blue font-semibold text-white hover:bg-hoverBlue"
        onClick={handleOpenDialog}
      >
        Create Customer
      </Button>
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent className="max-w rounded-xl p-0">
          <DialogHeader className="px-8 pt-8 ">
            <DialogTitle className="text-2xl font-semibold">
              Create Customer
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youe done.
            </DialogDescription>
          </DialogHeader>
          <Form {...formCustomers}>
            <form
              onSubmit={formCustomers.handleSubmit(onSubmit)}
              
            >
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
                            placeholder="Enter customer name"
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
                            id="phone"
                            type="tel"
                            placeholder="Enter phone number"
                            className="pl-9"
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
                name="description"
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

              <DialogFooter className="mt-10 flex justify-end gap-2 rounded-b-lg border bg-zinc-100/75 px-8 py-6 dark:bg-zinc-900/75">
                <Button
                  type="submit"
                  className="bg-blue px-4 py-2 font-semibold text-white hover:bg-hoverBlue"
                >
                  Create Customer
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
