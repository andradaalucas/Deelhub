"use client";
import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { signout } from "@/lib/auth-actions";

export function SignOutButton() {
  return (
    <DropdownMenuItem
      className="cursor-pointer text-red-600"
      onClick={() => {
        signout();
      }}
    >
      Sign Out
    </DropdownMenuItem>
  );
}
