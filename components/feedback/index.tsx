"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  FrownIcon as FaceFrown,
  Meh as FaceMeh,
  SmileIcon as FaceSmile,
  Flag,
} from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Toggle } from "@/components/ui/toggle";

type Sentiment = "sad" | "neutral" | "happy" | null;

export function FeedbackForm() {
  const [open, setOpen] = useState(false);
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment>(null);

  const sentiments = [
    { icon: FaceFrown, value: "sad" as const },
    { icon: FaceMeh, value: "neutral" as const },
    { icon: FaceSmile, value: "happy" as const },
  ];

  return (
    <>
      <SidebarMenuButton asChild>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2"
        >
          <Flag />
          <span>Feedback</span>
        </button>
      </SidebarMenuButton>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="p-0 sm:max-w-md">
          <AlertDialogHeader className="p-4">
            <AlertDialogTitle className="text-xl font-semibold">
              Leave Feedback
            </AlertDialogTitle>
            <p className="text-sm text-muted-foreground">
              Wed love to hear what went well or how we can improve the product
              experience.
            </p>
          </AlertDialogHeader>
          <div className="pt-4">
            <div className="p-4">
              <Textarea placeholder="Your feedback" className="resize-none" />
            </div>
            <AlertDialogFooter className="flex items-center justify-between gap-2 rounded-b-lg border bg-zinc-100/75 px-8 py-6 dark:bg-zinc-900/75">
              <div className="flex gap-4">
                {sentiments.map(({ icon: Icon, value }) => (
                  <Toggle key={value}>
                    <Icon className="h-6 w-6" />
                  </Toggle>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <div>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-blue text-sm text-white hover:bg-hoverBlue"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
