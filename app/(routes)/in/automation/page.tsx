// "use client";

// import {
//   formSchemaTransactions,
//   FormSchemaTransactions,
// } from "@/components/transactions/schemas";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import MultiSelect from "@/components/ui/multi-select";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import { getAllCustomers } from "@/services/customers";
// import { createTransactions } from "@/services/transactions";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { format } from "date-fns";
// import {
//   CalendarIcon,
//   DollarSign,
//   Edit,
//   MessageSquare,
//   PlusCircle,
//   Trash2,
//   Truck,
//   X,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// interface Product {
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface Service {
//   name: string;
//   price: number;
//   hours: number;
// }

// export default function Page() {
//   const [customersID, setCustomersID] = useState<string[]>([]);
//   const [activeTable, setActiveTable] = useState<boolean>(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [services, setServices] = useState<Service[]>([]);
//   const [taxRate, setTaxRate] = useState<number>(0);

//   const [automations, setAutomations] = useState([
//     {
//       id: 1,
//       type: "message",
//       name: "Welcome Email",
//       schedule: "On signup",
//       active: true,
//     },
//     {
//       id: 2,
//       type: "shipping",
//       name: "Monthly Product",
//       schedule: "1st of every month",
//       active: true,
//     },
//     {
//       id: 3,
//       type: "payment",
//       name: "Subscription Renewal",
//       schedule: "Every 30 days",
//       active: false,
//     },
//   ]);

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     // Handle form submission logic here
//   };

//   const toggleAutomation = (id: number) => {
//     setAutomations(
//       automations.map((auto) =>
//         auto.id === id ? { ...auto, active: !auto.active } : auto,
//       ),
//     );
//   };
//   const queryClient = useQueryClient();
//   const createTransaction = useMutation({
//     mutationFn: createTransactions,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["transactions"]);
//     },
//     onError: () => {
//       queryClient.invalidateQueries(["transactions"]);
//     },
//   });

//   const handleValueChange = (value: string[]) => {
//     setCustomersID(value);
//   };

//   const addItem = (type: "product" | "service") => {
//     setActiveTable(true);
//     if (type === "product") {
//       if (products.length === 0 || isLastRowValid(products)) {
//         setProducts([...products, { name: "", price: 0, quantity: 0 }]);
//       }
//     } else {
//       if (services.length === 0 || isLastRowValid(services)) {
//         setServices([...services, { name: "", price: 0, hours: 0 }]);
//       }
//     }
//   };

//   const isLastRowValid = (items: any) => {
//     const lastItem = items[items.length - 1];
//     return lastItem?.name && lastItem?.price && lastItem?.quantity;
//   };

//   const removeItem = (index: number, type: "product" | "service") => {
//     if (type === "product") {
//       const updatedProducts = products.filter((_, i) => i !== index);
//       setProducts(updatedProducts);

//       if (updatedProducts.length === 0) {
//         setActiveTable(false);
//       }
//     } else {
//       const updatedServices = services.filter((_, i) => i !== index);
//       setServices(updatedServices);
//       if (updatedServices.length === 0) {
//         setActiveTable(false);
//       }
//     }
//   };

//   const calculateSubtotal = (): number => {
//     const productTotal = products.reduce(
//       (sum, product) => sum + product.price * product.quantity,
//       0,
//     );
//     const serviceTotal = services.reduce(
//       (sum, service) => sum + service.price * service.hours,
//       0,
//     );
//     return productTotal + serviceTotal;
//   };

//   const calculateTotal = (): number => {
//     const subtotal = calculateSubtotal();
//     const taxAmount = subtotal * (taxRate / 100);
//     return subtotal + taxAmount;
//   };

//   const form = useForm<FormSchemaTransactions>({
//     resolver: zodResolver(formSchemaTransactions),
//     defaultValues: {
//       customers: "",
//       description: "",
//       startDate: new Date(),
//       currency: "USD",
//       taxRate: 0,
//     },
//   });

//   const {
//     data: customers,
//     isLoading,
//     isError,
//   } = useQuery(["customers"], () => getAllCustomers());

//   const onSubmit = (data: FormSchemaTransactions) => {
//     const enrichedData = {
//       ...data,
//       customersID,
//       subtotal: calculateSubtotal(),
//       total: calculateTotal(),
//       products,
//       services,
//     };
//     const promise = createTransaction.mutateAsync(enrichedData);
//     toast.promise(promise, {
//       loading: "Uploading transaction...",
//       success: () => {
//         return "All transaction created successfully!";
//       },
//       error: "Failed to upload transaction. Please try again.",
//     });
//     promise.then(() => form.reset());
//   };
//   const selectedCurrency = form.watch("currency");

//   return (
//     <div className="mx-auto w-full max-w-5xl grid-cols-2 gap-6 space-y-6 p-2">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold">
//             Budget Automation
//           </CardTitle>
//           <CardDescription>
//             Set up and manage your automated budget
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Automation Name</Label>
//                 <Input id="name" placeholder="Enter automation name" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="type">Type</Label>
//                 <Select>
//                   <SelectTrigger id="type">
//                     <SelectValue placeholder="Select type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="message">Message</SelectItem>
//                     <SelectItem value="shipping">Shipping</SelectItem>
//                     <SelectItem value="payment">Payment</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="title">Title</Label>
//               <Input
//                 id="schedule"
//                 placeholder="e.g., Every Monday, Monthly, On signup"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="message">Message or Details</Label>
//               <Textarea
//                 id="message"
//                 placeholder="Enter your automated message or transaction details"
//               />
//             </div>
//           </form>
//           <div className="flex-grow">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="flex h-full flex-col justify-between"
//               >
//                 <div className="space-y-4">
//                   {/* Cliente */}
//                   <div className="flex flex-row items-end space-y-4 md:space-x-4 md:space-y-0">
//                     {customers && (
//                       <FormField
//                         control={form.control}
//                         name="customers"
//                         render={({ field }) => (
//                           <FormItem className="w-full">
//                             <FormLabel>Customer</FormLabel>
//                             <FormControl>
//                               <MultiSelect
//                                 options={customers.map((customer) => ({
//                                   value: customer.id,
//                                   label: customer.name,
//                                 }))}
//                                 selectedOptions={customersID}
//                                 onChange={(selected: string[]) => {
//                                   handleValueChange(selected);
//                                 }}
//                                 placeholder="Select customer"
//                                 className="mt-10 w-full md:w-96"
//                                 contentClass="w-full md:!w-96"
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     )}
//                     <div className="ml-4">
//                       <Link href="/in/customers">
//                         <Button size="sm">Add Customer</Button>
//                       </Link>
//                     </div>
//                   </div>

//                   {/* Fechas */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                       control={form.control}
//                       name="startDate"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Start Date</FormLabel>
//                           <Popover>
//                             <PopoverTrigger asChild>
//                               <FormControl>
//                                 <Button
//                                   variant="outline"
//                                   className="w-full px-2 py-1 text-sm"
//                                 >
//                                   {field.value
//                                     ? format(field.value, "PPP")
//                                     : "Pick a date"}
//                                   <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                                 </Button>
//                               </FormControl>
//                             </PopoverTrigger>
//                             <PopoverContent align="start">
//                               <Calendar
//                                 mode="single"
//                                 selected={field.value}
//                                 onSelect={field.onChange}
//                                 initialFocus
//                               />
//                             </PopoverContent>
//                           </Popover>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="expirationDate"
//                       render={({ field }) => {
//                         const startDate = form.watch("startDate");

//                         return (
//                           <FormItem>
//                             <FormLabel>Expiration Date</FormLabel>
//                             <Popover>
//                               <PopoverTrigger asChild>
//                                 <FormControl>
//                                   <Button
//                                     variant="outline"
//                                     className="w-full px-2 py-1 text-sm"
//                                   >
//                                     {field.value
//                                       ? format(field.value, "PPP")
//                                       : "Pick a date"}
//                                     <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                                   </Button>
//                                 </FormControl>
//                               </PopoverTrigger>
//                               <PopoverContent align="start">
//                                 <Calendar
//                                   mode="single"
//                                   selected={field.value}
//                                   onSelect={field.onChange}
//                                   disabled={(date) => date < startDate}
//                                 />
//                               </PopoverContent>
//                             </Popover>
//                             <FormMessage />
//                           </FormItem>
//                         );
//                       }}
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                       control={form.control}
//                       name="currency"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Currency</FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             defaultValue={field.value}
//                           >
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select currency" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value="USD">
//                                 <div className="flex items-center gap-4">
//                                   <Image
//                                     src="/assets/flags/united-states.png"
//                                     width={12}
//                                     height={12}
//                                     alt="united-states"
//                                   />
//                                   <div>USD</div>
//                                 </div>
//                               </SelectItem>
//                               <SelectItem value="EUR">
//                                 <div className="flex items-center gap-4">
//                                   <Image
//                                     src="/assets/flags/european-union.png"
//                                     width={12}
//                                     height={12}
//                                     alt="european-union"
//                                   />
//                                   <div>EUR</div>
//                                 </div>
//                               </SelectItem>
//                               <SelectItem value="GBP">
//                                 <div className="flex items-center gap-4">
//                                   <Image
//                                     src="/assets/flags/united-kingdom.png"
//                                     width={12}
//                                     height={12}
//                                     alt="united-kingdom"
//                                   />
//                                   <div>GBP</div>
//                                 </div>
//                               </SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="taxRate"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Tax Rate (%)</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               className="font-mono"
//                               value={taxRate}
//                               onChange={(e) =>
//                                 setTaxRate(Number(e.target.value))
//                               }
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   {/* Tabs para productos y servicios */}
//                   <div className="mt-4 flex-grow">
//                     <Tabs defaultValue="product">
//                       <TabsList className="grid w-full grid-cols-2">
//                         <TabsTrigger value="product">Producto</TabsTrigger>
//                         <TabsTrigger value="service">Servicio</TabsTrigger>
//                       </TabsList>

//                       {/* Contenido de Productos */}
//                       <TabsContent value="product" className="space-y-4">
//                         <div className="flex items-center justify-between">
//                           <div className="font-semibold">Products</div>
//                           <Button
//                             onClick={() => addItem("product")}
//                             type="button"
//                             size="sm"
//                           >
//                             Add Product
//                           </Button>
//                         </div>
//                         {activeTable && (
//                           <div className="h-22 mt-4 overflow-y-auto rounded-lg border lg:h-48">
//                             <ScrollArea className="w-full overflow-x-auto">
//                               <div className="w-full whitespace-nowrap">
//                                 {/* Tabla de Productos */}
//                                 <Table className="min-w-full">
//                                   <TableHeader>
//                                     <TableRow>
//                                       <TableHead>Name</TableHead>
//                                       <TableHead>Price</TableHead>
//                                       <TableHead>Quantity</TableHead>
//                                       <TableHead></TableHead>
//                                     </TableRow>
//                                   </TableHeader>
//                                   <TableBody>
//                                     {products.map((product, index) => (
//                                       <TableRow key={index}>
//                                         <TableCell>
//                                           <Input
//                                             type="text"
//                                             placeholder="name"
//                                             value={product.name}
//                                             onChange={(e) => {
//                                               const updatedProducts = [
//                                                 ...products,
//                                               ];
//                                               updatedProducts[index].name =
//                                                 e.target.value;
//                                               setProducts(updatedProducts);
//                                             }}
//                                           />
//                                         </TableCell>
//                                         <TableCell>
//                                           <Input
//                                             type="number"
//                                             placeholder="price"
//                                             value={product.price}
//                                             className="font-mono"
//                                             onChange={(e) => {
//                                               const updatedProducts = [
//                                                 ...products,
//                                               ];
//                                               updatedProducts[index].price =
//                                                 parseFloat(e.target.value);
//                                               setProducts(updatedProducts);
//                                             }}
//                                           />
//                                         </TableCell>
//                                         <TableCell>
//                                           <Input
//                                             type="number"
//                                             placeholder="quantity"
//                                             value={product.quantity}
//                                             className="font-mono"
//                                             onChange={(e) => {
//                                               const updatedProducts = [
//                                                 ...products,
//                                               ];
//                                               updatedProducts[index].quantity =
//                                                 parseInt(e.target.value);
//                                               setProducts(updatedProducts);
//                                             }}
//                                           />
//                                         </TableCell>
//                                         <TableCell>
//                                           <Button
//                                             variant="ghost"
//                                             size="icon"
//                                             onClick={() =>
//                                               removeItem(index, "product")
//                                             }
//                                           >
//                                             <X className="h-4 w-4" />
//                                           </Button>
//                                         </TableCell>
//                                       </TableRow>
//                                     ))}
//                                   </TableBody>
//                                 </Table>
//                               </div>
//                             </ScrollArea>
//                           </div>
//                         )}
//                       </TabsContent>

//                       {/* Contenido de Servicios */}
//                       <TabsContent value="service" className="space-y-4">
//                         <div className="flex items-center justify-between">
//                           <div className="font-semibold">Service</div>
//                           <Button
//                             onClick={() => addItem("service")}
//                             size="sm"
//                             type="button"
//                           >
//                             Add Service
//                           </Button>
//                         </div>
//                         {activeTable && (
//                           <div className="h-22 overflow-y-auto rounded-lg border lg:h-48">
//                             <Table>
//                               <TableHeader>
//                                 <TableRow>
//                                   <TableHead>Name</TableHead>
//                                   <TableHead>Price per Hour</TableHead>
//                                   <TableHead>Hours</TableHead>
//                                   <TableHead></TableHead>
//                                 </TableRow>
//                               </TableHeader>
//                               <TableBody>
//                                 {services.map((service, index) => (
//                                   <TableRow key={index}>
//                                     <TableCell>
//                                       <Input
//                                         type="text"
//                                         value={service.name}
//                                         onChange={(e) => {
//                                           const updatedServices = [...services];
//                                           updatedServices[index].name =
//                                             e.target.value;
//                                           setServices(updatedServices);
//                                         }}
//                                       />
//                                     </TableCell>
//                                     <TableCell>
//                                       <Input
//                                         type="number"
//                                         value={service.price}
//                                         className="font-mono"
//                                         onChange={(e) => {
//                                           const updatedServices = [...services];
//                                           updatedServices[index].price =
//                                             parseFloat(e.target.value);
//                                           setServices(updatedServices);
//                                         }}
//                                       />
//                                     </TableCell>
//                                     <TableCell>
//                                       <Input
//                                         type="number"
//                                         value={service.hours}
//                                         className="font-mono"
//                                         onChange={(e) => {
//                                           const updatedServices = [...services];
//                                           updatedServices[index].hours =
//                                             parseInt(e.target.value);
//                                           setServices(updatedServices);
//                                         }}
//                                       />
//                                     </TableCell>
//                                     <TableCell>
//                                       <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         onClick={() =>
//                                           removeItem(index, "service")
//                                         }
//                                       >
//                                         <X className="h-4 w-4" />
//                                       </Button>
//                                     </TableCell>
//                                   </TableRow>
//                                 ))}
//                               </TableBody>
//                             </Table>
//                           </div>
//                         )}
//                       </TabsContent>
//                     </Tabs>
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <div className="rounded-lg bg-secondary px-4 py-2">
//                     <h3 className="mb-2 text-lg font-semibold">Resumen</h3>
//                     <div className="grid gap-2 text-sm">
//                       <div className="flex justify-between">
//                         <div>Subtotal</div>
//                         <div className="font-mono">
//                           {selectedCurrency} {calculateSubtotal().toFixed(2)}
//                         </div>
//                       </div>
//                       <div className="flex justify-between">
//                         <div>Tax </div>
//                         <div className="font-mono">{taxRate}%</div>
//                       </div>
//                       <div className="mt-2 flex justify-between border-t pt-2 text-lg font-semibold">
//                         <span>Total Cost</span>
//                         <span className="font-mono">$ {calculateTotal()}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-4 flex items-end justify-end md:hidden lg:hidden">
//                     a
//                   </div>
//                 </div>
//                 <Button
//                   type="submit"
//                   className="mt-6 w-full bg-blue px-4 py-2 font-semibold text-white hover:bg-hoverBlue"
//                 >
//                   <PlusCircle className="mr-2 h-4 w-4" /> Create Automation
//                 </Button>
//               </form>
//             </Form>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="space-y-4">
//         {automations.map((auto) => (
//           <div
//             key={auto.id}
//             className="flex items-center justify-between rounded-lg border bg-muted p-4"
//           >
//             <div className="flex items-center space-x-4">
//               {auto.type === "message" && (
//                 <MessageSquare className="text-blue-500 h-5 w-5" />
//               )}
//               {auto.type === "shipping" && (
//                 <Truck className="h-5 w-5 text-green-500" />
//               )}
//               {auto.type === "payment" && (
//                 <DollarSign className="h-5 w-5 text-yellow-500" />
//               )}
//               <div>
//                 <h3 className="font-medium">{auto.name}</h3>
//                 <p className="flex items-center text-sm text-muted-foreground">
//                   <CalendarIcon className="mr-1 h-4 w-4" /> {auto.schedule}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Switch
//                 checked={auto.active}
//                 onCheckedChange={() => toggleAutomation(auto.id)}
//               />
//               <Button variant="ghost" size="icon">
//                 <Edit className="h-4 w-4" />
//               </Button>
//               <Button variant="ghost" size="icon">
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from 'react'

function Page() {
  return (
    <div>Coming soon</div>
  )
}

export default Page