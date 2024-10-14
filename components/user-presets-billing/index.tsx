"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getUserPresets, updateUserPresets } from "@/services/user_management";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { getAllCountries } from "@/services/countries";

const formSchemaBrand = z.object({
  company_name: z
    .string()
    .min(2, "Name should have at least 2 characters")
    .max(50),
});

const formSchemaAddress = z.object({
  street_and_number: z.string().optional(),
  apartment: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.number().optional(),
  country: z.string().optional(),
  description: z.string().optional(),
});

export function UserPresetsBilling() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    data: dataPresets,
    isLoading: isLoadingPresets,
    error,
  } = useQuery({
    queryKey: ["user_presets"],
    queryFn: getUserPresets,
  });
  const {
    data: countries,
    isLoading: isLoadingCountries,
    error: errorCountries,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
  });

  const { mutate: updatePresets, isLoading: isUpdatingPresets } = useMutation({
    mutationFn: updateUserPresets,
    onSuccess: () => {
      queryClient.invalidateQueries(["user_presets"]);
    },
    onError: (error) => {
      console.error("Error al actualizar presets:", error);
    },
  });

  const formBrand = useForm<z.infer<typeof formSchemaBrand>>({
    resolver: zodResolver(formSchemaBrand),
    defaultValues: {
      company_name: dataPresets?.company_name || "",
    },
  });

  const formAddress = useForm<z.infer<typeof formSchemaAddress>>({
    resolver: zodResolver(formSchemaAddress),
    defaultValues: {
      street_and_number: dataPresets?.street_and_number || "",
      apartment: dataPresets?.apartment || "",
      state: dataPresets?.state || "",
      city: dataPresets?.city || "",
      postal_code: dataPresets?.postal_code || "",
      country: dataPresets?.country || "",
      description: dataPresets?.description || "",
    },
  });

  useEffect(() => {
    if (dataPresets) {
      formBrand.setValue("company_name", dataPresets.company_name || "");
      formAddress.setValue(
        "street_and_number",
        dataPresets.street_and_number || "",
      );
      formAddress.setValue("apartment", dataPresets.apartment || "");
      formAddress.setValue("state", dataPresets.state || "");
      formAddress.setValue("city", dataPresets.city || "");
      formAddress.setValue("postal_code", dataPresets.postal_code || "");
      formAddress.setValue("country", dataPresets.country || "");
      formAddress.setValue("description", dataPresets.description || "");
    }
  }, [dataPresets, formBrand, formAddress]);

  const handleCompanyNameChange = (values: z.infer<typeof formSchemaBrand>) => {
    // Compara el nuevo valor con el valor actual
    if (values.company_name !== dataPresets?.company_name) {
      updatePresets(values);
      toast({
        title: "Billing data successfully updated",
      });
    } else {
      toast({
        title: "No changes detected",
        variant: "destructive",
      });
    }
  };

  const handleBillingAddress = (values: z.infer<typeof formSchemaAddress>) => {
    const fields: (keyof z.infer<typeof formSchemaAddress>)[] = [
      "street_and_number",
      "apartment",
      "state",
      "city",
      "postal_code",
      "country",
      "description",
    ];

    const hasChanges = fields.some(
      (field) => values[field] !== dataPresets?.[field],
    );

    if (hasChanges) {
      updatePresets(values);
      toast({
        title: "Billing data successfully updated",
      });
    } else {
      toast({
        title: "No changes detected",
        variant: "destructive",
      });
    }
  };

  const isLoading = isLoadingPresets || isUpdatingPresets;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <Card>
        <CardHeader className="px-8">
          <CardTitle>Company Name</CardTitle>
          <CardDescription>
            By default, your team name appears on the invoice. If you want to
            display a custom name, enter it here.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...formBrand}>
            <form
              className="grid w-full items-center gap-4"
              onSubmit={formBrand.handleSubmit(handleCompanyNameChange)}
            >
              <FormField
                control={formBrand.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormControl>
                      {isLoadingPresets ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Input
                          type="text"
                          placeholder="Acme Inc."
                          {...field}
                          disabled={isLoading}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex justify-end border bg-[#fafafa] py-2">
                <Button
                  type="submit"
                  size="default"
                  className="mx-2"
                  disabled={isLoading}
                >
                  {isUpdatingPresets ? "Saving..." : "Save"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="px-8">
          <CardTitle>Billing Address</CardTitle>
          <CardDescription>
            If youd like to add a mailing address to each invoice, enter it
            here.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...formAddress}>
            <form
              className="grid w-full items-center gap-4"
              onSubmit={formAddress.handleSubmit(handleBillingAddress)}
            >
              <FormField
                control={formAddress.control}
                name="street_and_number"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      {isLoadingPresets ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Input
                          type="text"
                          placeholder="Street and number"
                          {...field}
                          disabled={isLoading}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formAddress.control}
                name="apartment"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      {isLoadingPresets ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Input
                          type="text"
                          placeholder="Apartment, suite, etc."
                          {...field}
                          disabled={isLoading}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formAddress.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      {isLoadingPresets ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Input
                          type="text"
                          placeholder="City"
                          {...field}
                          disabled={isLoading}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4 px-8">
                <FormField
                  control={formAddress.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries?.map((country: any) => (
                              <SelectItem
                                key={country.name}
                                value={country.name}
                              >
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={formAddress.control}
                name="postal_code"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      {isLoadingPresets ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Input
                          type="text"
                          placeholder="Postal Code"
                          {...field}
                          disabled={isLoading}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formAddress.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      {isLoadingPresets ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Input
                          type="text"
                          placeholder="Additional billing information"
                          {...field}
                          disabled={isLoading}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-end border bg-[#fafafa] py-2">
                <Button type="submit" size="default" className="mx-2">
                  Save
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
