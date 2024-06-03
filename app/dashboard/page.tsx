"use client";

import { getUserSession } from "@/services/user_management";
import { useUserStore } from "@/utils/zustand/store";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function Dashboard() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserSession,
  });
  const userSession = useMemo(() => user ?? [], [user]);
  const { userData, setUserData } = useUserStore();
  if (userSession) {
    setUserData(user);
    console.log("userSession", userData);
  }
	// TODO : Mover la asociacion

  return (
    <pre className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(userSession, null, 2)}
      as
    </pre>
  );
}
