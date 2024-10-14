"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface Filter {
  column: string;
  operator: string;
  value: string;
}

export function FilterTransactions({ onChange }: any) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [descriptionFilter, setDescriptionFilter] = useState(""); // Nuevo estado para el input

  // Actualiza el filtro de descripción cada vez que cambia el input
  useEffect(() => {
    const newFilters = filters.filter(f => f.column !== 'description');
    if (descriptionFilter) {
      newFilters.push({ column: 'description', operator: 'contains', value: descriptionFilter });
    }
    onChange(newFilters);
  }, [descriptionFilter, filters, onChange]);

  return (
    <div className="flex w-full justify-between">
      <Input
        placeholder="Filter description..."
        className="max-w-sm"
        value={descriptionFilter}
        onChange={(e) => setDescriptionFilter(e.target.value)} // Actualiza el filtro de descripción
      />
    </div>
  );
}
