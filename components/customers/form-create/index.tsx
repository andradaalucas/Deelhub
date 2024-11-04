"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { formSchema } from "../schemas";

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
      address: "",
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
        size="sm"
        className="bg-blue text-sm font-semibold text-white hover:bg-hoverBlue"
        onClick={handleOpenDialog}
      >
        Create Customer
      </Button>
      <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <AlertDialogContent className="p-0">
          <AlertDialogHeader className="px-8 pt-8">
            <AlertDialogTitle className="text-left text-2xl font-semibold">
              Create Customer
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              Fill in your profile information here. Click Save to create the
              new record.
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
                              id="phone"
                              type="tel"
                              placeholder="Enter phone"
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
              <AlertDialogFooter className="mt-10 flex items-end gap-2 rounded-b-lg border bg-zinc-100/75 px-8 py-6 dark:bg-zinc-900/75">
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
    </div>
  );
}
