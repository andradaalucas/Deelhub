// @/server/transactions.ts
import { createSupabaseServerClient } from "@/utils/supabase/server";

export const getAllTransactions = async () => {
  // Crear el cliente dentro de la función, no en el ámbito superior
  const supabase = createSupabaseServerClient();

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

    const dataFormatted = data.map((transaction: any) => ({
      ...transaction,
      customer: transaction?.customers.name,
    }));
    return dataFormatted;
  } catch (error) {
    console.log("Error on fetch transactions from server", error);
    return []; // Devolver un valor por defecto en caso de error
  }
};

export const getAllStatistics = async () => {
  const supabase = createSupabaseServerClient();
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
    let totalPaid = 0,
      countPaid = 0;
    let totalPending = 0,
      countPending = 0;
    let totalCanceled = 0,
      countCanceled = 0;
    let totalInvoices = 0,
      countInvoices = 0;

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
      num?.toLocaleString("en-US", {
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
