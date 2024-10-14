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
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef } from "react";
import { FormTransactions } from "./form-transactions";
import { FormProducts } from "./form-products";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransactions } from "@/services/transactions";
import { toast } from "@/components/ui/use-toast";

export function CreateForm() {
  const formRef = useRef<any>(null);
  const tableProductsRef = useRef<any>(null); // Referencia para obtener productos

  const supabase = createClient();

  const queryClient = useQueryClient();
  const createTransaction = useMutation({
    mutationFn: createTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
    onError() {},
  });

  const handleCreateTransaction = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const products = tableProductsRef.current.getProducts();

    if (formRef.current && tableProductsRef.current) {
      formRef.current.submitForm((dataTransaction: any) => {
        const datTransactionEnriched = {
          customers: dataTransaction.customers, // Solo los campos deseados
          description: dataTransaction.description,
          date: dataTransaction.date,
          status: dataTransaction.status,
          amount: products.total,
          user_id: user?.id, // Asegúrate de tener acceso al usuario
        };
        const allDataForm = {
          transactions: datTransactionEnriched,
          products: products.products,
        };
        console.log("dataTransaction", dataTransaction);
        if (!products.products.length) {
          toast({
            title: "Add at least one product",
          });
        } else {
          
          
          createTransaction.mutate(allDataForm);
          toast({
            title: "Transaction created successfully",
          });
        }
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-4 h-9 rounded-md">Create transaction</Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl rounded-xl p-0">
        <DialogHeader className="px-8 pt-8">
          <DialogTitle className="text-2xl font-bold">
            Create Transactions
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youe done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between px-8 pt-4">
          <FormTransactions ref={formRef} />
          <FormProducts ref={tableProductsRef} />
        </div>

        <DialogFooter className="flex justify-end gap-2 rounded-b-lg border bg-[#fafafa] px-8 py-6">
          <DialogClose>
            <div>Cancel</div>
          </DialogClose>
          <Button type="button" onClick={handleCreateTransaction}>
            Create transactions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
