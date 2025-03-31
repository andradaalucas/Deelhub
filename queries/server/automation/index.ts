import { createSupabaseServerClient } from "@/utils/supabase/server";

export const getAllAutomation = async (filters?: any) => {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase

      .from("automation")
      .select()
      .order("created_at", { ascending: false });
    return data;
  } catch (error) {
    console.log("Error on create customer", error);
  }
};
