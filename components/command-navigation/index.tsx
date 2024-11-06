"use client";

import * as React from "react";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Calendar, CommandIcon, Search, Settings } from "lucide-react";

export function CommandNavigation() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpen((open) => !open)}
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 flex rounded-full shadow-2xl print:hidden"
      >
        <CommandIcon className="my-6 h-6 w-6" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Upload Budget</span>
            </CommandItem>
            <CommandItem>
              <Search className="mr-2 h-4 w-4" />
              <span>Search Users</span>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>AI Insights</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Settings">
            <CommandItem>
              <span>Automate Budget Sending</span>
            </CommandItem>
            <CommandItem>
              <span>Export Data</span>
            </CommandItem>
            <CommandItem>
              <span>Import Data</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
