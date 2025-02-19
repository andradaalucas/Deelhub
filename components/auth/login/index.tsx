"use client";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/utils/supabase/supabase-browser";
import Image from "next/image";
import { Google } from "@/components/ui/brands";

export default function LoginButton(props: { nextUrl?: string }) {
  const supabase = createSupabaseBrowserClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${
          props.nextUrl || ""
        }`,
      },
    });
  };

  return (
    <Button onClick={handleLogin} className="w-full rounded-none">
      <Google className=" h-12 w-12 grayscale" />
      Continue with Google
    </Button>
  );
}
