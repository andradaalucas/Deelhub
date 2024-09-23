"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

interface Filter {
  column: string;
  operator: string;
  value: string;
}

export function FilterTransactions({ onChange }: any) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [showAddFilter, setShowAddFilter] = useState(true);

  const addFilter = () => {
    setFilters([...filters, { column: "", operator: "", value: "" }]);
    setShowAddFilter(true);
  };

  const updateFilter = (index: number, field: keyof Filter, value: string) => {
    const newFilters = [...filters];
    newFilters[index][field] = value;
    setFilters(newFilters);
  };

  const applyFilters = () => {
    onChange(filters);
  };

  const resetFilters = () => {
    setFilters([]);
  };

  return (
    <div className="flex w-full justify-between">
      <Input placeholder="Filter emails..." className="max-w-sm" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <FilterIcon className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-medium">Filter</h2>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-full max-w-md rounded-lg border bg-background p-4 shadow"
        >
          {filters.length === 0 ? (
            <p className="mb-4 text-sm text-muted-foreground">
              No filters applied to this view
            </p>
          ) : (
            <div className="mb-4 space-y-2">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
              </div>
              {filters.map((filter, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Select
                    onValueChange={(value) =>
                      updateFilter(index, "column", value)
                    }
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Column" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) =>
                      updateFilter(index, "operator", value)
                    }
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent className="w-[50px]">
                      <SelectItem value="equals">=</SelectItem>
                      <SelectItem value="contains">c</SelectItem>
                      <SelectItem value="greater_than">{">"}</SelectItem>
                      <SelectItem value="less_than">{"<"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    className="w-[120px]"
                    placeholder="Value"
                    onChange={(e) =>
                      updateFilter(index, "value", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {showAddFilter && (
            <Button
              onClick={addFilter}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add filter
            </Button>
          )}
          {filters.length !== 0 && (
            <Button onClick={applyFilters} className="mt-4 w-full">
              Apply filter
            </Button>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
