import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CommandNavigation } from "@/components/command-navigation";

export const metadata: Metadata = {
  title: "Deelfy Inc",
};

export default async function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/sign-in");
  }
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
