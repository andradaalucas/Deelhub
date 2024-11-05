import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center ">
        <div>
          <h1 className="mb-12 text-center text-2xl font-bold">Sign in</h1>
        </div>
        <form className="flex max-w-[800px] flex-col gap-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border block w-full rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]"
            type="email"
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            className="peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted border-control group box-border block w-full rounded-md border bg-foreground/[.026] px-4 py-2 text-sm text-foreground shadow-sm outline-none transition-all focus:ring-1 focus:ring-current focus-visible:shadow-md focus-visible:ring-[#a9a9a9]"
            required
          />
          <Button formAction={login} className="mt-2">
            Log in
          </Button>
          <span className="mt-4 text-sm">
            {"Don't have an account?"}
            <Link href="/sign-up" className="underline">
              
              Sign Up Now
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
