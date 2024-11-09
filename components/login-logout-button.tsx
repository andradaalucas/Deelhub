"use client";
import { createClient } from "@/utils/supabase/client";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

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
      <div className="mx-auto mt-6 flex max-w-5xl items-center justify-between px-4">
        <Image
          src="/assets/images/logo.png"
          width={48}
          height={48}
          alt="logo"
        />
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <MoveUpRight className="h-4 w-4"/>
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="mx-auto mt-6 flex max-w-5xl items-center justify-between px-4">
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
