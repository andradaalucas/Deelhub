"use client";

import { Google } from "@/components/ui/brands";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/utils/supabase/supabase-browser";

// Define la interfaz para TrustedTypePolicy
interface TrustedTypePolicy {
  createScript: (input: string) => string;
  createScriptURL: (input: string) => string;
  createHTML: (input: string) => string;
}

// Extiende la interfaz Window para incluir trustedTypes
interface TrustedTypesWindow extends Window {
  trustedTypes?: {
    createPolicy: (
      name: string,
      policy: {
        createScript?: (input: string) => string;
        createScriptURL?: (input: string) => string;
        createHTML?: (input: string) => string;
      },
    ) => TrustedTypePolicy;
  };
}

// Configura Trusted Types con tipos seguros
if (typeof window !== "undefined") {
  const trustedWindow = window as TrustedTypesWindow;
  if (trustedWindow.trustedTypes && trustedWindow.trustedTypes.createPolicy) {
    trustedWindow.trustedTypes.createPolicy("default", {
      createScript: (input: string) => input,
      createScriptURL: (input: string) => input,
      createHTML: (input: string) => input,
    });
  }
}

export default function LoginButton(props: { nextUrl?: string }) {
  const supabase = createSupabaseBrowserClient();

  const handleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback?next=${
            props.nextUrl || ""
          }`,
        },
      });
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <Button onClick={handleLogin} className="w-full rounded-none">
      <Google className="h-12 w-12 grayscale" />
      Continue with Google
    </Button>
  );
}
