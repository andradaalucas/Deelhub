import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { exportCustomerOnSheet } from "@/services/customers";
import { ConfirmAction } from "@/components/atom/confirm-action";

export function AuthorizationOption({ isOpen, setIsOpen }: any) {
  const handleExport = async () => {
    const promise = exportCustomerOnSheet();
    toast.promise(promise, {
      loading: 'Loading...',
      success: () => {
        return `Data exported successfully`;
      },
      error: 'Error',
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="p-0">
        <DialogHeader className="px-6 py-8">
          <DialogTitle className="flex items-center justify-between text-lg">
            Are you sure you want to export this data?
          </DialogTitle>
          <DialogDescription>
            This action will export the customer data to a sheet.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2 rounded-b-lg border bg-[#fafafa] px-8 py-4">
          <Button onClick={handleExport} className="bg-blue hover:bg-hoverBlue px-4 py-2 font-semibold text-white">Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
