import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { ConfirmActionType } from "./types";

export function ConfirmAction({
  actionExcecuteData,
  isOpen,
  setIsOpen,
  actionToExcecuteFunction,
}: ConfirmActionType) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <AlertDialogContent className="p-0">
        <AlertDialogHeader className="px-6 py-8">
          <AlertDialogTitle className="text-left">
            Are you sure you want to {actionExcecuteData.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            {actionExcecuteData.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-end rounded-b-md border bg-zinc-100/75 px-8 py-4 dark:bg-zinc-900/75">
          <div className="flex items-center gap-2">
            <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={actionToExcecuteFunction}
              className="bg-blue font-semibold text-white hover:bg-hoverBlue"
            >
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
