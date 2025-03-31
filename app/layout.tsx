import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { UsePathName } from "@/hooks/use-pathname";
import { cn } from "@/lib/utils";
import Providers from "@/tanstack-provider";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

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
          <Providers>
            <SidebarProvider>
              <UsePathName>{children}</UsePathName>
            </SidebarProvider>
            <Toaster closeButton richColors />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
