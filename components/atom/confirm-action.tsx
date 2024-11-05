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
  actionExecuteData,
  isOpen,
  setIsOpen,
  actionToExecuteFunction,
}: ConfirmActionType) {
  const handleActionToExecute = (e: any) => {
    actionToExecuteFunction && actionToExecuteFunction();
    e.preventDefault();
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <AlertDialogContent className="p-0">
        <form onSubmit={handleActionToExecute}>
          <AlertDialogHeader className="px-6 py-8">
            <AlertDialogTitle className="text-left">
              Are you sure you want to {actionExecuteData?.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              {actionExecuteData?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-end rounded-b-md border bg-zinc-100/75 px-8 py-4 dark:bg-zinc-900/75">
            <div className="flex items-center gap-2">
              <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                className="bg-blue font-semibold text-white hover:bg-hoverBlue"
              >
                Continue
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
