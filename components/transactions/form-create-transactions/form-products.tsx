"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import {
  DollarSignIcon,
  MoreHorizontal,
  PlusIcon,
  TagIcon,
} from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forwardRef, useImperativeHandle } from "react";
import { formSchemaProducts } from "../schemas";
import { Product } from "../types";

const ActionsCell = ({ row }: any) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="danger cursor-pointer text-red-600">
          Delete product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Definición de las columnas
export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <div className="w-32 text-left">Name</div>; // ancho fijo en 32
    },
    cell: ({ row }) => (
      <div className="w-32 overflow-hidden truncate text-left">
        {row.getValue("name")}
      </div>
    ),
  },

  {
    accessorKey: "price",
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      // Formato de moneda
      const formatted = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(price);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-left">Quantity</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("quantity")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

// Componente de tabla de productos
export const FormProducts = forwardRef((props, ref) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allDataProducts, setAllDataProducts] = useState<any>({
    products: [],
    total: 0,
  });
  const form = useForm<z.infer<typeof formSchemaProducts>>({
    resolver: zodResolver(formSchemaProducts),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
    },
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });

  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchemaProducts>) => {
    const newProduct = {
      id: `${products.length + 1}`,
      name: data.name,
      price: data.price,
      quantity: data.quantity,
    };
    setProducts((prev) => [...prev, newProduct]);
    console.log("Product added:", newProduct);

    form.reset(); // Reset the form after submission
  };

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );
  const total = subtotal;

  useImperativeHandle(ref, () => ({
    getProducts: () => {
      // Actualizar el estado correctamente
      const updatedData = { products, total };
      setAllDataProducts(updatedData); // Esto actualizará el estado
      return updatedData; // Devuelve el nuevo objeto actualizado al padre
    },
  }));
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-full max-w-lg">
          <Form {...form}>
            <form
              className="mx-auto mb-4 w-full max-w-3xl"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="mb-4 flex items-center gap-4">
                <h2 className="text-base font-medium">Products</h2>
                <div className="flex-1" />
                <Button size="sm" type="submit">
                  Add product
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <div className="flex flex-1 items-center gap-2">
                          <TagIcon className="h-5 w-5 text-muted-foreground" />
                          <Input type="text" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <div className="flex flex-1 items-center gap-2">
                          <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
                          <Input type="number" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <div className="flex flex-1 items-center gap-2">
                          <PlusIcon className="h-5 w-5 text-muted-foreground" />
                          <Input type="number" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
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
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No hay resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} de{" "}
              {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>
            </div>
          </div>
          <div className="rounded-lg bg-secondary px-4 py-2">
            <h3 className="mb-2 text-lg font-semibold">Resume</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$ {subtotal}</span>
              </div>
              <div className="mt-2 flex justify-between border-t pt-2 text-lg font-semibold">
                <span>Total Cost</span>
                <span>$ {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

FormProducts.displayName = "FormProducts";
