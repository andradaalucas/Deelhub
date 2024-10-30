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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllCustomers } from "@/services/customers";
import { createTransactions } from "@/services/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowUpRight,
  CalendarIcon,
  Delete,
  Info,
  TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { formSchemaTransactions, FormSchemaTransactions } from "../schemas";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { getAllProducts } from "@/services/products";

export function CreateForm() {
  const [precreateProduct, setPrecreateProduct] = useState(false);
  const form = useForm<FormSchemaTransactions>({
    resolver: zodResolver(formSchemaTransactions),
    defaultValues: {
      issueDate: new Date(),
      customers: [],
      currency: "USD",
      taxRate: 0,
      products: [{ name: "", price: 0, quantity: 0 }],
      services: [],
    },
  });
  const { control, handleSubmit, setValue, getValues, register } = form;

  const { fields: productFields, remove: removeProduct } = useFieldArray({
    control,
    name: "products",
  });
  const {
    fields: serviceFields,
    append: addService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "services",
  });

  const queryClient = useQueryClient();
  const createTransaction = useMutation({
    mutationFn: createTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
    onError: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
  });

  const addItem = (type: "product" | "service") => {
    if (type === "product") {
      const products = getValues("products") || [];
      if (products.length === 0 || isLastRowValid(products)) {
        setValue("products", [
          ...products,
          { name: "", price: 0, quantity: 0 },
        ]);
      }
    } else {
      const services = getValues("services") || [];
      if (services.length === 0 || isLastRowValid(services)) {
        setValue("services", [...services, { name: "", price: 0, hours: 0 }]);
      }
    }
  };

  const isLastRowValid = (items: any) => {
    const lastItem = items[items.length - 1];
    return lastItem?.name && lastItem?.price && lastItem?.quantity;
  };

  const calculateSubtotal = () => {
    const products = form.watch("products") || [];
    const services = form.watch("services") || [];
    const productTotal = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );
    const serviceTotal = services.reduce(
      (sum, service) => sum + service.price * service.hours,
      0,
    );
    return productTotal + serviceTotal;
  };

  const calculateTotal = (): number => {
    const subtotal = calculateSubtotal();
    const taxRate = form.watch("taxRate");
    const taxAmount = subtotal * (taxRate / 100);
    return subtotal + taxAmount;
  };

  const { data: customers } = useQuery(["customers"], () => getAllCustomers());
  const { data: products } = useQuery(["products"], () => getAllProducts());

  const handlePreCreateProduct = () => {
    setPrecreateProduct(!precreateProduct);
  };
  const onSubmit = (data: FormSchemaTransactions) => {
    const enrichedData = {
      ...data,
      subtotal: calculateSubtotal(),
      total: calculateTotal(),
    };
    const refinementError = (form.formState.errors as any)[""];
    if (refinementError && refinementError.type === "custom") {
      toast.warning(refinementError.message);
      return;
    }
    const promise = createTransaction.mutateAsync(enrichedData);
    toast.promise(promise, {
      loading: "Uploading transaction...",
      success: () => {
        return "All transaction created successfully!";
      },
      error: "Failed to upload transaction. Please try again.",
    });
    promise.then(() => form.reset());
    console.log("data on submit", data);
  };
  const currency = form.watch("currency");
  const taxRate = form.watch("taxRate");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-9 rounded-md bg-blue font-semibold text-white hover:bg-hoverBlue">
          Create Budget
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full p-0 lg:min-w-[600px]">
        <SheetHeader className="sr-only">
          <SheetTitle>Create Budget</SheetTitle>
          <SheetDescription>Make changes to your budget here.</SheetDescription>
        </SheetHeader>
        <div className="flex h-screen flex-col overflow-y-auto p-4 md:p-8">
          <div className="flex-grow">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex h-full flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Cliente */}
                  <div>
                    <div className="flex flex-row items-start space-y-4 md:space-x-4 md:space-y-0">
                      {customers && (
                        <FormField
                          control={form.control}
                          name="customers"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Customers</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={customers.map((customer) => ({
                                    value: customer.id,
                                    label: customer.name,
                                  }))}
                                  selectedOptions={field.value}
                                  onChange={(selected: string[]) => {
                                    field.onChange(selected); // Usa el método onChange de RHF
                                  }}
                                  placeholder="Select customer"
                                  className="mt-10 w-full"
                                  contentClass="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    <Link
                      className="mt-2 flex cursor-pointer items-center text-sm font-medium hover:underline"
                      href="/in/customers"
                    >
                      <div>To add customers</div>{" "}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Fechas */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="issueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full px-2 py-1 text-sm"
                                >
                                  {field.value
                                    ? format(field.value, "PPP")
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
                        const issueDate = form.watch("issueDate");

                        return (
                          <FormItem>
                            <FormLabel>Due Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className="w-full px-2 py-1 text-sm"
                                  >
                                    {field.value
                                      ? format(field.value, "PPP")
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
                          <FormLabel>Currency</FormLabel>
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
                          <FormLabel>Tax Rate (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="font-mono"
                              max={100}
                              min={0}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <div>
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={precreateProduct}
                        onCheckedChange={handlePreCreateProduct}
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2">
                              <Info className="h-4 w-4" />
                              <div className="font-semibold">
                                Use pre-created product
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Using the pre-created products will be discounted
                              from stock
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div> */}
                  <div className="mt-4 flex-grow">
                    <Tabs defaultValue="product">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="product">Products</TabsTrigger>
                        <TabsTrigger value="service">Services</TabsTrigger>
                      </TabsList>

                      {/* Contenido de Productos */}
                      <TabsContent value="product">
                        <div className="flex items-center justify-between">
                          <Popover>
                            <PopoverTrigger asChild>
                              <div className="flex cursor-pointer items-center gap-2">
                                <Info className="h-4 w-4" />
                                <div className="font-semibold">Products</div>
                              </div>
                            </PopoverTrigger>
                            <PopoverContent align="end">
                              <div className="text-sm">
                                <p>
                                  Selecting a quantity of products will be
                                  deducted from your stock.
                                </p>
                                <Link
                                  className="flex cursor-pointer items-center font-medium hover:underline"
                                  href="/in/products"
                                >
                                  <div>To add products</div>{" "}
                                  <ArrowUpRight className="h-4 w-4" />
                                </Link>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <Button
                            onClick={() => addItem("product")}
                            type="button"
                            size="sm"
                            className="font-semibold"
                          >
                            <span>Add Product</span>
                          </Button>
                        </div>

                        <ScrollArea>
                          <div className="h-22 mt-4 overflow-y-auto rounded-lg border lg:h-48">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Price</TableHead>
                                  <TableHead>Quantity</TableHead>
                                  <TableHead></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {productFields.map((field, index) => (
                                  <TableRow key={field.id}>
                                    <TableCell>
                                      <FormField
                                        control={control}
                                        name={`products.${index}.name`}
                                        render={({ field }) => (
                                          <Select
                                            onValueChange={(selectedId) => {
                                              field.onChange(selectedId);
                                              // Cuando se selecciona un producto, actualizamos su precio
                                              const selectedProduct =
                                                products?.find(
                                                  (product) =>
                                                    product.id === selectedId,
                                                );
                                              if (selectedProduct) {
                                                setValue(
                                                  `products.${index}.price`,
                                                  selectedProduct.price,
                                                );
                                              }
                                            }}
                                            value={field.value}
                                          >
                                            <FormControl>
                                              <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a product" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              {products?.map((product) => (
                                                <SelectItem
                                                  key={product.id}
                                                  value={product.id}
                                                >
                                                  {product.name}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        )}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        placeholder="Price"
                                        readOnly
                                        {...register(
                                          `products.${index}.price`,
                                          {
                                            valueAsNumber: true,
                                          },
                                        )}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        placeholder="Quantity"
                                        {...register(
                                          `products.${index}.quantity`,
                                          {
                                            valueAsNumber: true,
                                          },
                                        )}
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
                      </TabsContent>

                      {/* Contenido de Servicios */}
                      <TabsContent value="service">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Service</h3>
                          <Button
                            onClick={() => addItem("service")}
                            type="button"
                            size="sm"
                            className="font-semibold"
                          >
                            Add Service
                          </Button>
                        </div>

                        <ScrollArea>
                          <div className="h-22 mt-4 overflow-y-auto rounded-lg border lg:h-48">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Price per hour</TableHead>
                                  <TableHead>Hour</TableHead>
                                  <TableHead></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {serviceFields.map((field, index) => (
                                  <TableRow key={field.id}>
                                    <TableCell>
                                      <Input
                                        placeholder="Nombre"
                                        {...control.register(
                                          `services.${index}.name`,
                                        )}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        placeholder="Precio por Hora"
                                        {...control.register(
                                          `services.${index}.price`,
                                          {
                                            valueAsNumber: true,
                                          },
                                        )}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        placeholder="Horas"
                                        {...control.register(
                                          `services.${index}.hours`,
                                          {
                                            valueAsNumber: true,
                                          },
                                        )}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        variant="ghost"
                                        onClick={() => removeService(index)}
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
                      </TabsContent>
                    </Tabs>
                    {(form.formState.errors as any)[""] && (
                      <div className="mt-4 flex items-center gap-2 rounded-lg border p-4 text-xs text-zinc-600">
                        <TriangleAlert className="h-4 w-4" />
                        <div>{(form.formState.errors as any)[""].message}.</div>
                      </div>
                    )}
                  </div>
                  {/* Tabs para productos y servicios */}
                </div>

                <div className="mt-4">
                  <div className="rounded-lg bg-secondary px-4 py-2">
                    <h3 className="mb-2 text-lg font-semibold">Resumen</h3>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <div>Subtotal</div>
                        <div className="font-mono">
                          {currency} {calculateSubtotal().toFixed(2)}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div>Tax </div>
                        <div className="font-mono">{taxRate}%</div>
                      </div>
                      <div className="mt-2 flex justify-between border-t pt-2 text-lg font-semibold">
                        <span>Total Cost</span>
                        <span className="font-mono">$ {calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-14 mt-6 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-blue px-4 py-4 font-semibold text-white hover:bg-hoverBlue"
                    >
                      Create Budget
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
