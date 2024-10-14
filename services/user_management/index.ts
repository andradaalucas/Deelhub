"use client";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new Error("The user could not be obtained.");
  }

  return data.user.id;
};

export const getUserPresets = async () => {
  try {
    const user_id = await getUserSession();
    const { data, error } = await supabase
      .from("user_billing_presets")
      .select()
      .eq("user_id", user_id);
    return data && data[0];
  } catch (error) {
    console.error("Error in getUserPresets:", error);
  }
};

export const updateUserPresets = async (data: any) => {
  try {
    const user_id = await getUserSession();
    const { error } = await supabase
      .from("user_billing_presets")
      .update(data)
      .eq("user_id", user_id);
  } catch (error) {
    console.error("Error in updateUserPresets:", error);
  }
};
