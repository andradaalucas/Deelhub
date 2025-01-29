"use client";
import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { createSupabaseBrowserClient } from "@/utils/supabase/browser";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <DropdownMenuItem
      className="flex items-center gap-2"
      onClick={() => {
        handleLogout();
      }}
    >
      <LogOut className="h-4 w-4" />
      Log out
    </DropdownMenuItem>
  );
}
