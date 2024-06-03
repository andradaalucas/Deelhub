"use client";
import { NavBar } from "@/components/navbar";
import { SearchBar } from "@/components/search-bar";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createClient } from "@/utils/supabase/client";
import { useUserStore } from "@/utils/zustand/store";
import { useEffect, useState } from "react";
import { getUserSession } from "@/services/user_management";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  useEffect(() => {
    return () => {
      getUserSession();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <section>
          <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
            <NavBar />
            <div className="flex flex-col">
              <SearchBar />
              <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                {children}
                <ReactQueryDevtools />
              </main>
            </div>
          </div>
        </section>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
