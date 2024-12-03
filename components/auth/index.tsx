"use client";
import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { createSupabaseBrowserClient } from "@/utils/supabase/browser";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <DropdownMenuItem
      className="cursor-pointer text-red-600"
      onClick={() => {
        handleLogout();
      }}
    >
      Sign Out
    </DropdownMenuItem>
  );
}
