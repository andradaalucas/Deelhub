import { createSupabaseBrowserClient } from "@/utils/supabase/supabase-browser";
import { getUserSession } from "../user_management";

const supabase = createSupabaseBrowserClient();

export const getAllProducts = async () => {
  try {
    const { data, error } = await supabase.from("products").select();
    if (error) {
      throw new Error(error.message || "Filed to get products");
    }
    return data;
  } catch (error) {
    throw new Error("Filed to get products" + error);
  }
};
