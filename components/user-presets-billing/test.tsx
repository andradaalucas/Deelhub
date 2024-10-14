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
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAllCountries, getStateByCountry } from "@/services/countries";
import { updateUserPresets, getUserPresets } from "@/services/user_management";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validaciones para la marca (nombre de la compañía)
const formSchemaBrand = z.object({
  company_name: z.string().min(2, "Name should have at least 2 characters").max(50),
});

// Validaciones para la dirección de facturación
const formSchemaAddress = z.object({
  addressLine1: z.string().min(2, "Address is too short").max(50),
  addressLine2: z.string().min(2, "Address is too short").max(50),
  city: z.string().min(2, "City is too short").max(50),
  country: z.string().min(2, "Please select a country").max(50),
  state: z.string().min(2, "Please select a state").max(50),
  postalCode: z.string().min(2, "Postal code is too short").max(10),
  description: z.string().min(2, "Description is too short").max(255),
});

export function UserPresetsBilling() {
  const queryClient = useQueryClient();
  const createPresets = useMutation({
    mutationFn: updateUserPresets,
    onSuccess: () => {
      queryClient.invalidateQueries(["user_presets"]);
    },
    onError() {},
  });
  

  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: {
      name: "",
      capital: "",
      currency: "",
      phoneCode: "",
      flag: "",
      state_url: "",
    },
  });

  // Inicialización del formulario de la marca
  const formBrand = useForm<z.infer<typeof formSchemaBrand>>({
    resolver: zodResolver(formSchemaBrand),
    defaultValues: {
      company_name: "",
    },
  });

  // Inicialización del formulario de la dirección
  const formAddress = useForm<z.infer<typeof formSchemaAddress>>({
    resolver: zodResolver(formSchemaAddress),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      country: "",
      state: "",
      postalCode: "",
      description: "",
    },
  });

  const handleCompanyNameChange = (values: z.infer<typeof formSchemaBrand>) => {
    console.log("Company Name:", values);
    createPresets.mutate(values);
  };

  const handleBillingAddress = (values: z.infer<typeof formSchemaAddress>) => {
    console.log("Billing Address:", values);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (value: string) => {
    setAddress((prev) => ({
      ...prev,
      state: value,
    }));
  };

  const handleCountryChange = (value: string) => {
    const selectedCountry = countries.find(
      (country) => country.name.toLowerCase() === value.toLowerCase(),
    );
    if (selectedCountry) {
      setAddress((prev) => ({
        ...prev,
        country: {
          name: selectedCountry.name,
          capital: selectedCountry.capital,
          currency: selectedCountry.currency,
          phoneCode: selectedCountry.phoneCode,
          flag: selectedCountry.flag,
          state_url: selectedCountry.state_url,
        },
      }));
    }
  };

  // Obtener lista de países y estados
  const { data: countriesData } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
  });
  const { data: statesCountryData } = useQuery({
    queryKey: ["states", address.country.state_url],
    queryFn: () => getStateByCountry(address.country.state_url),
    enabled: !!address.country.state_url,
  });
  const { data: company_name } = useQuery({
    queryKey: ["user_presets"],
    queryFn: () => getUserPresets()
  });

  const companie_name = useMemo(() => company_name ?? [], [company_name]);
  const countries = useMemo(() => countriesData ?? [], [countriesData]);
  const statesCountry = useMemo(
    () => statesCountryData ?? [],
    [statesCountryData],
  );
  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      {/* Formulario para el nombre de la compañía */}
      <Card>
        <CardHeader className="px-8">
          <CardTitle>Company Name</CardTitle>
          <CardDescription>
            By default, your teams name appears on the invoice. If you want to
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
                      <Input type="text" placeholder="Acme Inc." {...field} />
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

      {/* Formulario para la dirección de facturación */}
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
                name="addressLine1"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Street and number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formAddress.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Apartment, suite, etc." />
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
                      <Input {...field} placeholder="City" />
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
                        <Select onValueChange={handleCountryChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country: any) => (
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

                <FormField
                  control={formAddress.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={handleStateChange}
                          disabled={statesCountry.length === 0}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a state" />
                          </SelectTrigger>
                          <SelectContent>
                            {statesCountry.map((state: any) => (
                              <SelectItem key={state.name} value={state.name}>
                                {state.name}
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
                name="postalCode"
                render={({ field }) => (
                  <FormItem className="px-8">
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Postal Code" />
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
                      <Textarea
                        {...field}
                        placeholder="Additional billing information"
                      />
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
