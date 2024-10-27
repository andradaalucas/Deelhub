import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
          <DialogTitle className="text-left text-lg">
            Are you sure you want to {actionExcecuteData.title}
          </DialogTitle>
          <DialogDescription className="text-left">
            {actionExcecuteData.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-end rounded-b-lg border bg-zinc-100/75 px-8 py-4 dark:bg-zinc-900/75">
          <div>
            <Button
              onClick={actionToExcecuteFunction}
              className="bg-blue px-4 py-2 font-semibold text-white hover:bg-hoverBlue"
            >
              Accept
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
