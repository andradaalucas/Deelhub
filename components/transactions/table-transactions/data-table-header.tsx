"use client";
import { OptionsTable } from "./options-table";
import { CreateForm } from "@/components/transactions/form-create-transactions/create-form";

export function HeaderTable() {
  return (
    <div className="flex items-center justify-between py-4">
      <OptionsTable />
      <CreateForm />
    </div>
  );
}
