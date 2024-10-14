import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmActionType } from "./types";

export function ConfirmAction({
  actionExcecuteData,
  isOpen,
  setIsOpen,
  actionToExcecuteFunction,
}: ConfirmActionType) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="p-0">
        <DialogHeader className="px-6 py-8">
          <DialogTitle className="flex items-center justify-between text-lg">
            Are you sure you want to {actionExcecuteData.title}
          </DialogTitle>
          <DialogDescription>
            {actionExcecuteData.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2 rounded-b-lg border bg-[#fafafa] px-8 py-4">
          <Button onClick={actionToExcecuteFunction} variant="destructive">
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
