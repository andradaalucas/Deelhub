"use client";
import { cn } from "@/lib/utils";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
      <body
        className={`${cn(
          "min-h-screen bg-background font-sans antialiased",
        )} ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>{children}</NextUIProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
