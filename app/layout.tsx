"use client";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      {/* <head>
        <title>Deelhub</title>
      </head> */}
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
              {children}
              <Toaster closeButton />
              <ReactQueryDevtools />
            </NextUIProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
