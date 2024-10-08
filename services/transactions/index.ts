"use client";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getAllTransactions = async (filters?: any) => {
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

// export const createTransactions = async (data: any) => {
//   try {
//     console.log("data desde index.ts", data);
//     // const { error } = await supabase.from("transactions").insert(data);
//   } catch (error) {
//     console.log("error", error);
//   }
// };
export const createTransactions = async (data: any) => {
  try {
    console.log("data desde create transaction index.ts", data);

    // Insertar la transacción y obtener el ID
    const { data: dataTransactions, error: errorTransactions } = await supabase
      .from("transactions")
      .insert(data.transactions)
      .select();

    if (errorTransactions) {
      console.error("Error inserting transaction:", errorTransactions);
    } else if (dataTransactions?.length > 0) {
      const transaction_id = dataTransactions?.[0]?.id; // Obtener el ID de la transacción insertada
      for (const product of data.products) {
        const { error: errorProduct } = await supabase.from("products").insert({
          transaction_id: transaction_id, // Relacionar con la transacción
          name: product.name,
          price: product.price,
        });
      }
    }
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

export const extractResumeOfTransactions = async () => {
  // Realiza la consulta para obtener todas las transacciones ordenadas por la fecha (suponiendo que tienes una columna de fecha)
  const { data, error } = await supabase
    .from("transactions")
    .select("amount, created_at") // Asegúrate de seleccionar 'created_at' o la columna que determine el orden de las transacciones
    .order("created_at", { ascending: false }); // Ordenar para que el último registro aparezca primero

  if (error) {
    console.error("Error fetching transactions:", error);
    return null;
  }

  // Verifica si hay datos
  if (!data || data.length === 0) {
    return {
      lastTransaction: null,
      totalIncome: 0,
      totalExpense: 0,
      netTotal: 0,
    };
  }

  // Inicializa las sumas para income y expense
  let totalIncome = 0;
  let totalExpense = 0;

  // Recorre las transacciones y calcula la suma de cada tipo
  // data.forEach((transaction) => {
  //   if (transaction.type === "income") {
  //     totalIncome += transaction.amount;
  //   } else if (transaction.type === "expense") {
  //     totalExpense += transaction.amount;
  //   }
  // });

  // Calcula el balance neto (income - expense)
  const netTotal = totalIncome - totalExpense;

  // Obtiene el último registro
  const lastTransaction = data[0]; // Como ordenamos de forma descendente, el primer elemento es el último registro

  // Retorna un resumen de las sumas y el último registro
  return {
    lastTransaction,
    totalIncome,
    totalExpense,
    netTotal,
  };
};
