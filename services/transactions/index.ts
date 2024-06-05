"use client";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getAllTransactions = async () => {
  try {
    const { data: transactions, error } = await supabase
      .from("transactions")
      .select();
    console.log("se ejecuta", transactions);
    return transactions;
  } catch (error) {
    console.log("error", error);
  }
};
export const createTransaction = async (data: any) => {
  try {
    const { error } = await supabase.from("transactions").insert(data);
  } catch (error) {
    console.log("error", error);
  }
};
