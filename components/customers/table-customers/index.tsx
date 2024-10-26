"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { DataTableProps } from "../types";
import { HeaderTable } from "./data-table-header";
import { DataTablePagination } from "./data-table-pagination";
import { ArrowUpIcon } from "lucide-react";

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  isError,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isLoadingOverview, setIsLoadingOverview] = useState(true);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const cardData = [
    {
      title: "Total Customers",
      value: "1,234",
      description: "+5.2% last month",
    },
    {
      title: "Average Spend",
      value: "$345",
      description: "Per customer",
    },
    {
      title: "Customer Retention",
      value: "78%",
      description: "+2.5% last quarter",
    },
    {
      title: "New Customers",
      value: "89",
      description: "This month",
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingOverview(false);
    }, 2000);
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl grid-cols-2 gap-6 space-y-6 p-2">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="px-6 font-mono text-2xl font-semibold">
                  {isLoadingOverview ? (
                    <div className="h-8 w-24 animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                  ) : (
                    card.value
                  )}
                </div>
                <div className="mt-2 rounded-b-lg border bg-zinc-100/75 px-6 py-2 dark:bg-zinc-900/75">
                  <p className="flex items-center whitespace-nowrap font-mono text-xs text-muted-foreground">
                    <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card className="flex flex-col justify-between shadow-md">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Top Spenders
              </CardTitle>
              <CardDescription className="text-xs">
                Customers with highest total spend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Frank Miller",
                  "Grace Lee",
                  "Henry Wilson",
                  "Ivy Chen",
                  "Jack Taylor",
                ].map((name, index) => (
                  <div key={name} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`/placeholder.svg?height=36&width=36`}
                        alt={name}
                      />
                      <AvatarFallback>
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${(5000 - index * 500).toLocaleString()}
                      </p>
                    </div>
                    <Badge className="ml-auto" variant="secondary">
                      Top {index + 1}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-6 p-2">
        <div className="col-span-2">
          <div className="flex items-center justify-between py-4">
            <Input
              placeholder="Filter name..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <HeaderTable />
          </div>
          <div className="rounded-md border shadow-lg">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Si isLoading es true, muestra "Loading..."
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <div role="status" className="flex justify-center">
                        <svg
                          aria-hidden="true"
                          className="h-8 w-8 animate-spin fill-black text-gray-200 dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  // Si isError es true, muestra un mensaje de error
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-red-500"
                    >
                      Error loading data.
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  // Si hay datos, renderiza las filas
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  // Si no hay datos, muestra "No results"
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
