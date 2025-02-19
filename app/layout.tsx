import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";
import { NextUIProvider } from "@nextui-org/react";
import { GeistMono } from "geist/font/mono";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UsePathName } from "@/hooks/use-pathname";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Providers from "./providers";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* <QueryClientProvider client={queryClient}> */}
          <NextUIProvider>
            <SidebarProvider>
              <Providers>
                <UsePathName>{children}</UsePathName>
              </Providers>
            </SidebarProvider>
            <Toaster closeButton richColors />
          </NextUIProvider>
          {/* </QueryClientProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
