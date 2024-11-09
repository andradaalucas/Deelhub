"use client";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  BarChart2Icon,
  Cog,
  CommandIcon,
  LifeBuoy,
  UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export function CommandNavigation() {
  const [open, setOpen] = useState(false);
  const [showAllItems, setShowAllItems] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const handleInputChange = (value: string) => {
    setInputValue(value)
  }
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setShowAllItems(false);

      // Aquí puedes hacer algo con el valor del input
      console.log("Input value:", inputValue);

      // Opcional: limpiar el input después de enviar
      setInputValue("");
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen((open) => !open)}
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 flex rounded-full p-4 shadow-2xl"
      >
        <CommandIcon className="my-6 h-6 w-6" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Ask a question about finance to Claude AI"
          onKeyDown={handleEnterPress}
          onValueChange={handleInputChange}
          value={inputValue} // Asegura que el valor del input esté sincronizado con el estado
        />
        <CommandList></CommandList>
        <div className="flex items-center gap-2 px-3 py-2">
          <span className="text-xs text-muted-foreground">
            Press enter to send
          </span>
          <div className="flex-1" />
          <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium opacity-100">
            ↵
          </kbd>
        </div>
      </CommandDialog>
    </>
  );
}
