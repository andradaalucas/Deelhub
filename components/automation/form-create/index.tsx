import {
    formSchemaTransactions,
    FormSchemaTransactions,
} from "@/components/transactions/schemas";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/ui/multi-select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getWithoutTrashedCustomers } from "@/queries/client/customers";
import { createTransactions } from "@/queries/client/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
    ArrowUpRight,
    CalendarIcon,
    Delete,
    TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

export function CreateForm() {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: any) => {
    setIsFocused(false);
    setHasContent(e.target.value.length > 0);
  };
  const handleChange = (e: any) => setHasContent(e.target.value.length > 0);

  const form = useForm<FormSchemaTransactions>({
    resolver: zodResolver(formSchemaTransactions),
    defaultValues: {
      customers: [],
      currency: "USD",
      taxRate: 0,
      products: [{ name: "", price: 0, quantity: 0 }],
    },
  });

  const { control, handleSubmit, setValue, getValues } = form;

  const { fields: productFields, remove: removeProduct } = useFieldArray({
    control,
    name: "products",
  });

  const queryClient = useQueryClient();
  const createTransaction = useMutation({
    mutationFn: createTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["statistics"]);
    },
  });

  const addProduct = () => {
    const products = getValues("products") || [];
    if (products.length === 0 || isLastRowValid(products)) {
      setValue("products", [...products, { name: "", price: 0, quantity: 0 }]);
    }
  };

  const isLastRowValid = (items: any) => {
    const lastItem = items[items.length - 1];
    return lastItem?.name && lastItem?.price && lastItem?.quantity;
  };

  const calculateSubtotal = () => {
    const products = form.watch("products") || [];
    return products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );
  };

  const calculateTotal = (): number => {
    const subtotal = calculateSubtotal();
    const taxRate = form.watch("taxRate");
    const taxAmount = subtotal * (taxRate / 100);
    return subtotal + taxAmount;
  };

  const { data: customers } = useQuery(["customers"], () =>
    getWithoutTrashedCustomers(),
  );

  const onSubmit = (data: FormSchemaTransactions) => {
    const enrichedData = {
      ...data,
      subtotal: calculateSubtotal(),
      total: calculateTotal(),
    };
    const promise = createTransaction.mutateAsync(enrichedData);
    toast.promise(promise, {
      loading: "Creating transaction...",
      success: () => {
        return "Transaction created successfully!";
      },
      error: "Failed to upload transaction. Please try again.",
    });
    promise.then(() => form.reset());
    promise.then(() => setIsOpen(false));
  };

  const currency = form.watch("currency");
  const taxRate = form.watch("taxRate");

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <AlertDialogTrigger asChild >
        <Button
          size="sm"
          className="bg-blue text-sm font-semibold text-white hover:bg-hoverBlue"
        >
          Create Automation
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full p-0 lg:min-w-[600px]">
        <AlertDialogHeader className="sr-only mb-0 px-4 pt-8 md:px-8">
          <AlertDialogTitle className="md text-left text-2xl font-semibold">
            Create Budget
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Make changes to your budget here.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-grow flex-col overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full flex-col justify-between"
            >
              <div className="space-y-4 px-4 pb-4 pt-8 md:px-8 md:pb-8 lg:px-8">
                <div>
                  <div className="flex flex-row items-start space-y-4 md:space-x-4 md:space-y-0">
                    {customers && (
                      <FormField
                        control={form.control}
                        name="customers"
                        render={({ field }) => (
                          <FormItem className="w-full text-xs">
                            <FormLabel className="text-xs">Customers</FormLabel>
                            <FormControl>
                              <MultiSelect
                                options={customers.map((customer) => ({
                                  value: customer.id,
                                  label: customer.name,
                                }))}
                                selectedOptions={field.value}
                                onChange={(selected: string[]) => {
                                  field.onChange(selected);
                                }}
                                placeholder="Select customer"
                                className="mt-10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  <div className="mt-2">
                    <Link
                      className="flex cursor-pointer items-center text-xs font-medium hover:underline md:text-sm lg:text-sm"
                      href="/customers"
                    >
                      <span className="text-xs">To add customers</span>
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="issueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Issue Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full px-2 py-1 text-sm"
                              >
                                {field.value
                                  ? format(new Date(field.value), "MM/dd/yyyy")
                                  : "Pick a date"}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => {
                      const issueDate = form.watch("issueDate") || true;

                      return (
                        <FormItem>
                          <FormLabel className="text-xs">Due Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full px-2 py-1 text-sm"
                                >
                                  {field.value
                                    ? format(
                                        new Date(field.value),
                                        "MM/dd/yyyy",
                                      )
                                    : "Pick a date"}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < issueDate}
                              />
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">
                              <div className="flex items-center gap-4">
                                <Image
                                  src="/assets/flags/united-states.png"
                                  width={12}
                                  height={12}
                                  alt="united-states"
                                />
                                <div>USD</div>
                              </div>
                            </SelectItem>
                            <SelectItem value="EUR">
                              <div className="flex items-center gap-4">
                                <Image
                                  src="/assets/flags/european-union.png"
                                  width={12}
                                  height={12}
                                  alt="european-union"
                                />
                                <div>EUR</div>
                              </div>
                            </SelectItem>
                            <SelectItem value="GBP">
                              <div className="flex items-center gap-4">
                                <Image
                                  src="/assets/flags/united-kingdom.png"
                                  width={12}
                                  height={12}
                                  alt="united-kingdom"
                                />
                                <div>GBP</div>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="taxRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Tax Rate (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="font-mono"
                            min={0}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4 flex-grow">
                  <h3 className="text-xs font-semibold">Items</h3>
                  <ScrollArea>
                    <div className="mt-4 h-28 overflow-y-auto rounded-lg border md:h-28 lg:h-48">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="h-8">Name</TableHead>
                            <TableHead className="h-8">Quantity</TableHead>
                            <TableHead className="h-8">Price</TableHead>
                            <TableHead className="h-8"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {productFields.map((field, index) => (
                            <TableRow key={field.id}>
                              <TableCell>
                                <Input
                                  placeholder="Name"
                                  {...form.register(`products.${index}.name`)}
                                  className={`mt-1 resize-none rounded-none pb-0.5 shadow-none`}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  placeholder="Quantity"
                                  {...form.register(
                                    `products.${index}.quantity`,
                                    {
                                      valueAsNumber: true,
                                    },
                                  )}
                                  className={`mt-1 resize-none rounded-none pb-0.5 shadow-none`}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  placeholder="Unit Price"
                                  {...form.register(`products.${index}.price`, {
                                    valueAsNumber: true,
                                  })}
                                  className={`mt-1 resize-none rounded-none pb-0.5 shadow-none`}
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  onClick={() => removeProduct(index)}
                                >
                                  <Delete />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </ScrollArea>
                  <Button
                    className="p-0 text-xs"
                    variant="link"
                    type="button"
                    onClick={addProduct}
                  >
                    Add Items
                  </Button>
                  {(form.formState.errors as any)[""] && (
                    <div className="mt-2 flex items-center gap-2 rounded-lg border p-4 text-xs text-zinc-600">
                      <TriangleAlert className="h-4 w-4" />
                      <div>{(form.formState.errors as any)[""].message}.</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-4 pb-4 md:px-8 md:pb-8 lg:px-8">
                <div className="bg-secondary px-4 py-2">
                  {/* <h3 className="mb-2 text-lg font-semibold">Resumen</h3> */}
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <div>Subtotal</div>
                      <div className="font-mono">
                        {currency} {calculateSubtotal().toFixed(2)}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>Tax</div>
                      <div className="font-mono">{taxRate}%</div>
                    </div>
                    <div className="mt-2 flex justify-between border-t pt-2 text-lg font-semibold">
                      <span>Total</span>
                      <span className="font-mono">$ {calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <AlertDialogFooter className="flex items-end gap-2 rounded-b-lg border bg-zinc-100/75 px-8 py-6 dark:bg-zinc-900/75">
                <div className="flex items-center gap-2">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <div>
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-blue text-sm text-white hover:bg-hoverBlue"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </AlertDialogFooter>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
