"use client";
import { Button } from "@/components/ui/button";
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
import { createCustomers } from "@/services/customers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchemaCustomers } from "../schemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateForm() {
  const queryClient = useQueryClient();

  const createCustomer = useMutation({
    mutationFn: (data: any) => createCustomers(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
    onError: () => {
      queryClient.invalidateQueries(["customers"]);
    },
  });

  const formCustomers = useForm<z.infer<typeof FormSchemaCustomers>>({
    resolver: zodResolver(FormSchemaCustomers),
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchemaCustomers>) => {
    // const promise = createCustomer.mutateAsync(data); // Usamos mutateAsync para una promesa
    // toast.promise(promise, {
    //   loading: "Creating customer...",
    //   success: "Customer created successfully!",
    //   error: "An error occurred while creating the customer",
    // });
    // await promise; // Esperamos a que la promesa se resuelva
    // formCustomers.reset(); // Reseteamos el formulario solo si fue exitoso
    // handleOpenDialog(); // Cerrar el diálogo después de la operación
    console.log("<data value=></data>");
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="ml-4 h-9 rounded-md">Create customer</Button>
        </DialogTrigger>
        <DialogContent className="max-w rounded-xl p-0">
          <DialogHeader className="px-8 pt-8">
            <DialogTitle className="text-2xl font-bold">
              Create Customers
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you’re done.
            </DialogDescription>
          </DialogHeader>
          <Form {...formCustomers}>
            <form
              onSubmit={formCustomers.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={formCustomers.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
