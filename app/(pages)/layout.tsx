import { AppSidebar } from "@/components/app-sidebar";
import { CommandNavigation } from "@/components/command-navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deelfy Inc",
};

export default async function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <SidebarTrigger />
        {children}
        <CommandNavigation />
      </main>
    </SidebarProvider>
  );
}
