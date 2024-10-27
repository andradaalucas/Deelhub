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

export function ConfirmTest({
  actionExcecuteData,
  isOpen,
  setIsOpen,
  actionToExcecuteFunction,
}: ConfirmActionType) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="p-0">
        <DialogHeader className="px-6 py-8 text-right">
          <DialogTitle className="text-right text-lg">
            Are you sure you want to {actionExcecuteData.title}
          </DialogTitle>
          <DialogDescription className="text-right">
            as sdfsdfsdfs   
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end rounded-b-lg border bg-zinc-100/75 px-8 py-4 dark:bg-zinc-900/75">
          <Button
            onClick={actionToExcecuteFunction}
            className="bg-blue px-4 py-2 font-semibold text-white hover:bg-hoverBlue"
          >
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
