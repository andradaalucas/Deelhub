"use client";

import { createSupabaseBrowserClient } from "@/utils/supabase/browser";
import { getUserSession } from "../user_management";

const supabase = createSupabaseBrowserClient();

export const getAllTransactions = async () => {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select(
        `
      id,
      issue_date,
      due_date,
      total,
      tax_rate,
      currency,
      status,
      products (
        id,
        name,
        price,
        quantity
      ),
      customers (
          name,
          email,
          address,
          phone
      )
    `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Formateamos los datos para que incluyan los detalles de los productos y el nombre del cliente
    const dataFormatted = data.map((transaction: any) => ({
      ...transaction,
      customer: transaction?.customers.name,
    }));
    console.log("dataa", dataFormatted);
    return dataFormatted;
  } catch (error) {
    console.log("Error on fetch transactions", error);
  }
};

export const getAllStatistics = async () => {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select("total, currency, status")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Inicializar contadores y sumas
    let totalSum = 0;
    let totalPaid = 0, countPaid = 0;
    let totalPending = 0, countPending = 0;
    let totalCanceled = 0, countCanceled = 0;
    let totalInvoices = 0, countInvoices = 0;

    // Recorrer las transacciones y calcular estadísticas
    data?.forEach(({ total = 0, status }) => {
      totalSum += total;
      if (status === "paid") {
        totalPaid += total;
        countPaid++;
      } else if (status === "pending") {
        totalPending += total;
        countPending++;
      } else if (status === "canceled") {
        totalCanceled += total;
        countCanceled++;
      }

      // Contar las facturas (asumiendo que 'invoice' es un estado o algún campo)
      // Si quieres que cuente todas las transacciones (sin importar el estado), puedes agregar una condición aquí
      totalInvoices += total;
      countInvoices++;
    });

    // Formatear los totales con separadores y 2 decimales
    const formatNumber = (num: number) =>
      num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    return {
      total: formatNumber(totalSum),
      paid: { total: formatNumber(totalPaid), count: countPaid },
      pending: { total: formatNumber(totalPending), count: countPending },
      canceled: { total: formatNumber(totalCanceled), count: countCanceled },
      invoices: { total: formatNumber(totalInvoices), count: countInvoices },
    };
  } catch (error) {
    console.log("Error on fetch statistics", error);
    return {
      total: "0.00",
      paid: { total: "0.00", count: 0 },
      pending: { total: "0.00", count: 0 },
      canceled: { total: "0.00", count: 0 },
      invoices: { total: "0.00", count: 0 },
    };
  }
};

export const createTransactions = async (data: any) => {
  const {
    customers,
    products,
    subtotal,
    total,
    currency,
    taxRate,
    issueDate,
    dueDate,
    description,
  } = data;
  const user_id = await getUserSession();

  try {
    // Iterar sobre cada customerID
    for (const customerID of customers) {
      // Paso 1: Insertar en la tabla `transactions`
      const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .insert({
          user_id,
          subtotal,
          total,
          currency,
          tax_rate: taxRate,
          issue_date: issueDate,
          due_date: dueDate,
          customer_id: customerID,
          description,
        })
        .select(); // Retorna la fila insertada con el nuevo `id`

      if (transactionError) {
        throw new Error(
          "Error inserting transaction: " + transactionError.message,
        );
      }

      const transactionID = transactionData?.[0]?.id;

      // Paso 2: Insertar cada producto en `transaction_product` con sus detalles
      for (const product of products) {
        const { name, quantity, price } = product;
        const { error: productError } = await supabase.from("products").insert({
          user_id,
          transaction_id: transactionID,
          name: name, // ID del producto específico
          quantity: quantity, // Cantidad del producto en la transacción
          price: price, // Precio del producto en la transacción
        });
        if (productError) {
          throw new Error("Error inserting product: " + productError.message);
        }
      }
    }
    return { success: true };
  } catch (error) {
    console.log("Transaction creation failed", error);
    return { success: false, error: error };
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

export const deleteTransactions = async (id: any): Promise<string> => {
  try {
    const { error } = await supabase.from("transactions").delete().eq("id", id);

    if (error) {
      throw new Error(error.message || "Failed to delete transactions");
    }

    return "Customer deleted successfully";
  } catch (error) {
    console.log("Error on delete transactions", error);
    throw new Error("An error occurred while deleting transactions: " + error);
  }
};

export const exportTransactionsOnSheet = async () => {
  try {
    const { data, error } = await supabase.from("transactions").select().csv();

    if (error) {
      console.error("Error on fetching transactions", error);
      return;
    }

    if (data) {
      const csvData = new Blob([data], { type: "text/csv;charset=utf-8;" });
      const csvURL = URL.createObjectURL(csvData);
      const link = document.createElement("a");
      link.href = csvURL;
      link.setAttribute("download", "transactions.csv"); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log("No data available to export.");
    }
  } catch (error) {
    console.error("Error on export customer", error);
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
