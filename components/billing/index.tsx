"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getAllCountries, getStateByCountry } from "@/services/countries";
import { Textarea } from "@/components/ui/textarea";

export function BillingPresets() {
  const [companyName, setCompanyName] = useState("");
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

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
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
          state_url: selectedCountry.state_url, // Esto es un placeholder para la URL del estado
        },
      }));
    }
    console.log("selectedCountry", selectedCountry);
  };

  const { data: countriesData } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
  });
  const { data: statesCountryData } = useQuery({
    queryKey: ["states", address.country.state_url],
    queryFn: () => getStateByCountry(address.country.state_url), // Pasa una función en lugar de ejecutar directamente
    enabled: !!address.country.state_url, // Solo ejecuta la query si hay una URL para los estados
  });

  const countries = useMemo(() => countriesData ?? [], [countriesData]);
  const statesCountry = useMemo(
    () => statesCountryData ?? [],
    [statesCountryData],
  );

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Company Name</CardTitle>
          <CardDescription>
            By default, your {"team's"} name appears on the invoice. If you want
            to display a custom name, enter it here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={handleCompanyNameChange}
                placeholder="Enter company name"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border bg-[#fafafa] py-2">
          <p className="mr-auto text-sm text-muted-foreground">
            Please use a maximum of 64 characters.
          </p>
          <Button size="sm">Save</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
          <CardDescription>
            If {"you'd"} like to add a mailing address to each invoice, enter it
            here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="line1">Address Line 1</Label>
              <Input
                id="line1"
                name="line1"
                value={address.line1}
                onChange={handleAddressChange}
                placeholder="Street and number"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="line2">Address Line 2</Label>
              <Input
                id="line2"
                name="line2"
                value={address.line2}
                onChange={handleAddressChange}
                placeholder="Apartment, suite, etc."
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                placeholder="City"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={handleCountryChange}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {countries.map((country) => (
                    <SelectItem
                      key={country.name}
                      value={country.name.toLowerCase()}
                    >
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="state">State</Label>
                <Select
                  onValueChange={handleStateChange}
                  disabled={statesCountry.length === 0}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {statesCountry.map((states: any) => (
                      <SelectItem
                        key={states.name}
                        value={states.name.toLowerCase()}
                      >
                        {states.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                  placeholder="Postal Code"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="If you would like to add any additional billing information"
                className="w-full resize-none"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border bg-[#fafafa] py-2">
          <p className="mr-auto text-sm text-muted-foreground">
            Feel free to complete only the fields you wish to fill out.
          </p>
          <Button size="sm">Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
