"use client";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GeistMono } from "geist/font/mono";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GeistSans } from "geist/font/sans";
import { usePathname } from "next/navigation";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>Deelhub</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${cn(
          "min-h-screen bg-background font-sans antialiased",
        )} ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <NextUIProvider>
              <SidebarProvider>
                {pathname === "/login" ? (
                  <main className="h-full w-full">{children}</main>
                ) : (
                  <>
                    <AppSidebar />
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                      <SidebarTrigger />
                      {children}
                    </main>
                  </>
                )}
              </SidebarProvider>
              <Toaster closeButton richColors />
            </NextUIProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
