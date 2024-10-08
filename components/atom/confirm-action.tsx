import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

type ConfirmAction = {
  actionExcecuteData?: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionToExcecuteFunction?: () => void;
};

export function ConfirmAction({
  actionExcecuteData,
  isOpen,
  setIsOpen,
  actionToExcecuteFunction,
}: ConfirmAction) {
  useEffect(() => {}, [actionExcecuteData]);
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="p-0">
        <CardHeader className="py-8">
          <CardTitle className="flex items-center justify-between text-lg">
            Are you sure you want to {actionExcecuteData.action}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-end gap-2 rounded-b-lg border bg-[#fafafa] py-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={actionToExcecuteFunction}>Accept</Button>
        </CardFooter>
      </DialogContent>
    </Dialog>
  );
}
