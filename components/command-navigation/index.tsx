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
import { useChat } from "ai/react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export function CommandNavigation() {
  const [open, setOpen] = useState(false);
  const [showAllItems, setShowAllItems] = useState(true);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

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

  // Crear una función wrapper para adaptar el formato del cambio de input
  const handleCommandInputChange = (value: string) => {
    // Crear un evento sintético
    const syntheticEvent = {
      target: {
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handleInputChange(syntheticEvent);
  };

  const handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setShowAllItems(false);

      const form = e.currentTarget.form;
      if (form) {
        handleSubmit(new Event("submit") as any);
      }
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
        <form onSubmit={handleSubmit}>
          <CommandInput
            placeholder="Ask a question about finance to Claude AI"
            onKeyDown={handleEnterPress}
            value={input}
            onValueChange={handleCommandInputChange}
          />
        </form>
        <CommandList className="max-h-[400px] overflow-y-auto">
          <CommandGroup>
            {messages.map((message, i) => (
              <div
                key={i}
                className={`px-4 py-2 ${
                  message.role === "assistant"
                    ? "bg-secondary"
                    : "bg-background"
                }`}
              >
                <p className="text-sm">
                  <span className="font-semibold">
                    {message.role === "assistant" ? "Claude: " : "You: "}
                  </span>
                  {message.content}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className="px-4 py-2 text-sm text-muted-foreground">
                Claude is thinking...
              </div>
            )}
          </CommandGroup>
        </CommandList>
        <div className="flex items-center gap-2 px-3 py-2">
          <span className="text-xs text-muted-foreground">
            {isLoading ? "Claude is responding..." : "Press enter to send"}
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
