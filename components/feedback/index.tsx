"use client"

import * as React from "react"
import Link from "next/link"
import { MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function FeedbackDropdown() {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-white bg-zinc-800 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 transition-colors"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Feedback
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[400px] p-4 bg-zinc-900 border border-zinc-800 text-zinc-300">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            // Handle form submission
            setOpen(false)
          }}
        >
          <Textarea
            className="min-h-[120px] resize-none bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-zinc-700"
            placeholder="Ideas on how to improve this page. Use the Support Form for technical issues."
          />
          <div className="flex items-center gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              className="border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
            >
              Clear
            </Button>
            <Button type="submit" className="bg-[#2c2c2c] text-white hover:bg-[#3a3a3a]">
              Send feedback
            </Button>
          </div>
          <div className="text-sm text-zinc-500">
            Have a technical issue? Contact{" "}
            <Link href="/" className="text-[#2c2c2c] hover:text-[#3a3a3a]">
              Supabase support
            </Link>{" "}
            or{" "}
            <Link href="/" className="text-[#2c2c2c] hover:text-[#3a3a3a]">
              browse our docs
            </Link>
            .
          </div>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

