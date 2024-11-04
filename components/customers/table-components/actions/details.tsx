"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../../schemas";
import { DetailsProps } from "../../types";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { CopyIcon, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";

export function DetailsCustomers({ rowData, isOpen, setIsOpen }: DetailsProps) {
  const defaultValues = {
    id: rowData?.id || "",
    name: rowData?.name || "",
    phone: rowData?.phone || 0,
    address: rowData?.address || "",
    email: rowData?.email || "",
  };

  const formCustomers = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleCopyClipboard = (data: any) => {
    navigator.clipboard.writeText(data);
    toast.success("Copied to clipboard");
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <AlertDialogContent className="max-w p-0">
        <AlertDialogHeader className="px-8 pt-8">
          <AlertDialogTitle className="text-left text-2xl font-semibold">
            Details Customer
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            View your profile details here. Click Close when you are done
            reviewing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...formCustomers}>
          <form>
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
                            placeholder="No Name"
                            className="pl-9"
                            readOnly
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
                            placeholder="No Phone"
                            className="pl-9"
                            readOnly
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
                      <div className="group relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="No Email Address"
                          className="pl-9"
                          readOnly
                          {...field}
                        />
                        <div
                          onClick={() => handleCopyClipboard(field.value)}
                          className="absolute right-3 top-2.5 h-4 w-4 cursor-pointer text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                          aria-label="Copy email"
                        >
                          <CopyIcon className="h-4 w-4" />
                        </div>
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
                      <Textarea className="resize-none" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <AlertDialogFooter className="mt-10 flex items-end gap-2 rounded-b-lg border bg-zinc-100/75 px-8 py-6 dark:bg-zinc-900/75">
              <AlertDialogCancel>Back to</AlertDialogCancel>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
