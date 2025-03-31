import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CreateAutomation() {
  return (
    <div>
      <Link href="/automation/create">
        <Button
          size="sm"
          className="bg-blue text-sm font-semibold text-white hover:bg-hoverBlue"
        >
          Create Automation
        </Button>
      </Link>
    </div>
  );
}
