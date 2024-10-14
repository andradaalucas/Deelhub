import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { exportCustomerOnSheet } from "@/services/customers";

export function AuthorizationOption({ isOpen, setIsOpen }: any) {
  const handleExport = async () => {
    await exportCustomerOnSheet();
    toast({
      title: "Successfully exported",
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
          <Button onClick={handleExport}>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
