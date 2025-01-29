"use client";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/utils/supabase/browser";
import Image from "next/image";

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
      <Image
        src="/assets/images/google-brand-icon.png"
        width={20}
        height={20}
        alt="google-icon"
      />
      Continue with Google
    </Button>
  );
}
