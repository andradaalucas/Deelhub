import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { BudgetCreator } from "./budget-form";

export function CreateForm() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="ml-4 h-9 rounded-md bg-blue hover:bg-hoverBlue text-white font-semibold">Create Budget</Button>
      </SheetTrigger>
      <SheetContent className="w-full lg:min-w-[600px] p-0 ">
        <SheetHeader className="sr-only">
          <SheetTitle>Create Budget</SheetTitle>
          <SheetDescription>Make changes to your budget here.</SheetDescription>
        </SheetHeader>
        <BudgetCreator />
      </SheetContent>
    </Sheet>
  );
}
