"use client";
import { CreateForm } from "../transactions/create-form";

interface HeaderTableProps {
  Filters?: React.ReactNode;
}

export function HeaderTable({ Filters }: HeaderTableProps) {
  return (
    <div className="flex items-center justify-between py-4">
      {Filters}
      <CreateForm />
    </div>
  );
}
