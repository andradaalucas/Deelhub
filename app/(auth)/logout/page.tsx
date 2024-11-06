"use client";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();
  router.push("/");
  return null;
};

export default LogoutPage;
