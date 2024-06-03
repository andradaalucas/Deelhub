"use client";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getUserSession = async () => {
  const { data: user } = await supabase.auth.getUser();
  return user;
};
