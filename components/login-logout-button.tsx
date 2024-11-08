"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { signout } from "@/lib/auth-actions";
import Link from "next/link";
import Image from "next/image";

const LoginButton = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase.auth]);
  if (user) {
    return (
      <div className="mx-auto mt-6 flex max-w-5xl items-center justify-between">
        <Image
          src="/assets/images/logo.png"
          width={48}
          height={48}
          alt="logo"
        />
        <Link href="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="mx-auto mt-6 flex max-w-5xl items-center justify-between">
      <Image src="/assets/images/logo.png" width={48} height={48} alt="logo" />
      <Button
        variant="outline"
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginButton;
