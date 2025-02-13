import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Overview() {
  const [isLoadingOverview, setIsLoadingOverview] = useState(true);



  const cardData = [
    {
      title: "Total Customers",
      value: "1,234",
      description: "+5.2% last month",
    },
    {
      title: "Disabled",
      value: "$345",
      description: "",
    },
    {
      title: "Customer Retention",
      value: "78%",
      description: "+2.5% last quarter",
    },
    {
      title: "New Customers",
      value: "89",
      description: "In the last month",
    },
  ];

  const topCustomers = [
    "Frank Miller",
    "Grace Lee",
    "Henry Wilson",
    "Ivy Chen",
    "Jack Taylor",
  ];

  return (
    <div className="mx-auto w-full max-w-5xl grid-cols-2 gap-6 p-2">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cardData.map((card, index) => (
            <Card key={index} className="flex flex-col justify-between shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold">{card.title}</CardTitle>
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
              <CardTitle className="text-sm font-semibold">Top Spenders</CardTitle>
              <CardDescription className="text-xs">Customers with highest total spend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoadingOverview
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="flex items-center animate-pulse">
                        <div className="h-9 w-9 rounded-full bg-zinc-200 dark:bg-[#2b2b2b]" />
                        <div className="ml-4 space-y-1 w-full">
                          <div className="h-4 w-32 bg-zinc-200 dark:bg-[#2b2b2b]" />
                          <div className="h-3 w-24 bg-zinc-200 dark:bg-[#2b2b2b]" />
                        </div>
                        <div className="h-6 w-12 bg-zinc-200 dark:bg-[#2b2b2b] ml-auto" />
                      </div>
                    ))
                  : topCustomers.map((name, index) => (
                      <div key={name} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={""} alt={name} />
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
    </div>
  );
}
