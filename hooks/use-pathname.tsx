"use client";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function UsePathName({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/login" ? (
        <main className="h-full w-full">{children}</main>
      ) : (
        <>
          <AppSidebar />
          <main className="flex flex-1 flex-col gap-4 p-2 md:gap-8 md:p-6">
            <SidebarTrigger />
            {children}
          </main>
        </>
      )}
    </>
  );
}
