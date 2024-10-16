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
import { formSchema } from "../schemas";
import { DetailsProps } from "../types";

export function DetailsCustomers({ rowData, isOpen, setIsOpen }: DetailsProps) {
  const defaultValues = {
    id: rowData?.id || "",
    name: rowData?.name || "",
    description: rowData?.description || "",
    email: rowData?.email || "",
  };

  const formCustomers = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleOpenDialog = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="max-w rounded-xl p-0">
        <DialogHeader className="px-8 pt-8">
          <DialogTitle className="text-2xl font-bold">
            Details Customers
          </DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when youe done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...formCustomers}>
            <form>
              <FormField
                control={formCustomers.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" readOnly {...field} />
                    </FormControl>
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
                      <Input type="text" readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCustomers.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="px-8 pb-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex justify-end gap-2 rounded-b-lg border bg-[#fafafa] px-8 py-6">
                <Button type="button" onClick={handleOpenDialog}>
                  Close
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
