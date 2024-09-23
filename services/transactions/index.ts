"use client";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getAllTransactions = async (filters: any) => {
  try {
    console.log("filtesrssss desde index.ts", filters);

    let query = supabase.from("transactions").select();

    // If filters are provided, apply them to the query
    if (filters && filters.length > 0) {
      filters.forEach((filter: any) => {
        const { column, operator, value } = filter;

        switch (operator) {
          case "equals":
            query = query.eq(column, value);
            break;
          case "neq":
            query = query.neq(column, value);
            break;
          case "gte":
            query = query.gte(column, value);
            break;
          case "lte":
            query = query.lte(column, value);
            break;
          default:
            query = query.ilike(column, `%${value}%`);
        }
      });
    }

    // Execute the query
    const { data: transactions, error } = await query;

    // Handle any errors from Supabase
    if (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }

    // Return the filtered or unfiltered transactions
    console.log("result desde index.ts", transactions);
    return transactions;
  } catch (error) {
    console.error("Error in getAllTransactions:", error);
    return [];
  }
};

export const createTransactions = async (data: any) => {
  try {
    const { error } = await supabase.from("transactions").insert(data);
  } catch (error) {
    console.log("error", error);
  }
};
export const updateTransactions = async (data: any) => {
  try {
    const { error } = await supabase
      .from("transactions")
      .update(data)
      .eq("id", data.id);
  } catch (error) {
    console.log("error", error);
  }
};
export const deleteTransactions = async (id: number) => {
  try {
    const { error } = await supabase.from("transactions").delete().eq("id", id);
  } catch (error) {
    console.log("error", error);
  }
};