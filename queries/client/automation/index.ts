import { createSupabaseBrowserClient } from "@/utils/supabase/supabase-browser";

export const getAllAutomation = async (filters?: any) => {
  try {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase

      .from("automation")
      .select()
      .order("created_at", { ascending: false });
    return data;
  } catch (error) {
    console.log("Error on create customer", error);
  }
};
