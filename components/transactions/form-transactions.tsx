import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Definir el esquema del formulario
const formSchema = z.object({
  customers: z.string().email(),
  description: z.string().optional(),
  termsAndConditions: z.string().optional(),
  notifyByEmail: z.boolean().optional(),
  date: z.date({
    required_error: "Required",
    invalid_type_error: "date must be a date format",
  }),
});

// Definir el tipo de las props del componente
interface FormTransactionsProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void; // Prop para el onSubmit
}

// Definir el tipo del ref que será expuesto
interface FormTransactionsRef {
  submitForm: (callback: (data: any) => void) => void; // Método expuesto
}

export const FormTransactions = forwardRef<
  FormTransactionsRef,
  FormTransactionsProps
>(function FormTransactions({ onSubmit }, ref) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customers: "",
      description: "",
      termsAndConditions: "",
      notifyByEmail: false,
    },
  });

  // Exponer el handleSubmit al componente padre con un callback
  useImperativeHandle(ref, () => ({
    submitForm: (callback: (data: any) => void) => {
      form.handleSubmit((data) => {
        handleFormSubmit(data);
        callback(data); // Pasar los datos al padre mediante el callback
      })();
    },
  }));

  // Manejo del envío del formulario
  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data:", data);
    onSubmit(data); // Llamar al padre con los datos
  };

  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const handleAddTerms = () => {
    setTermsAndConditions(!termsAndConditions);
  };

  return (
    <div className="h-full w-full max-w-md">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="customers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer email</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Billing for the transaction will be sent to this email
                  address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "box-border w-full rounded-md border px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Add a date to the transaction, by default it will be saved
                  with today{"'"}s date.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormDescription>
                  Add a brief description of the transaction.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <div
              className="mt-2 cursor-pointer space-y-1 text-sm text-blue-500"
              onClick={handleAddTerms}
            >
              {termsAndConditions ? "-" : "+"} Add terms and conditions
            </div>
            {termsAndConditions && (
              <FormField
                control={form.control}
                name="termsAndConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Terms and conditions</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Terms and conditions cannot be modified
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormField
            control={form.control}
            name="notifyByEmail"
            render={({ field }) => (
              <FormItem>
                <div className="mt-4 flex items-center justify-between">
                  <FormLabel>Notify by email</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormDescription>
                  Invoice will be sent via email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
});
