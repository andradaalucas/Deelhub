import { createSupabaseServerClient } from "@/utils/supabase/server";

export const getAllCustomers = async (filters?: any) => {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase

      .from("customers")
      .select()
      .order("created_at", { ascending: false });
    return data;
  } catch (error) {
    console.log("Error on create customer", error);
  }
};

export const getCustomerStats = async () => {
  const supabase = createSupabaseServerClient();
  try {
    // Obtener todos los clientes actuales
    const { data: currentCustomers, error: currentError } = await supabase
      .from("customers")
      .select("id, name, email, status, created_at");

    if (currentError) throw currentError;

    // Obtener clientes del mes anterior
    const { data: previousCustomers, error: previousError } = await supabase
      .from("customers")
      .select("id, email")
      .gte(
        "created_at",
        new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
      )
      .lt("created_at", new Date(new Date().setDate(1)).toISOString());

    if (previousError) throw previousError;

    // Calcular métricas
    const totalCustomers = currentCustomers.length;
    const disabled = currentCustomers.filter(
      (c) => c.status === "disabled",
    ).length;

    // Emails de clientes del mes anterior
    const previousEmails = new Set(previousCustomers.map((c) => c.email));

    // Clientes retenidos: existen en ambos conjuntos
    const customerRetention = currentCustomers.filter((c) =>
      previousEmails.has(c.email),
    ).length;

    // Nuevos clientes: están en la lista actual pero no en la anterior
    const newCustomers = currentCustomers.filter(
      (c) => !previousEmails.has(c.email),
    ).length;

    return { totalCustomers, disabled, customerRetention, newCustomers };
  } catch (error) {
    console.error("Error fetching customer stats:", error);
    return null;
  }
};

export const getTopSpenders = async () => {
  const supabase = createSupabaseServerClient();
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select(
        `
      total,
      customers (
        id,
        name
      )
    `,
      )
      .limit(5);

    if (error) {
      throw error;
    }

    // Agrupar gastos por cliente
    const customerExpenses: Record<
      string,
      { name: string; totalSpent: number }
    > = {};

    data.forEach((transaction: any) => {
      const customerId = transaction.customers.id;
      const customerName = transaction.customers.name;
      const totalSpent = transaction.total || 0;

      if (!customerExpenses[customerId]) {
        customerExpenses[customerId] = { name: customerName, totalSpent };
      } else {
        customerExpenses[customerId].totalSpent += totalSpent;
      }
    });

    // Convertir a array y ordenar de mayor a menor gasto
    const formattedData = Object.values(customerExpenses).sort(
      (a, b) => b.totalSpent - a.totalSpent,
    );

    return formattedData;
  } catch (error) {
    console.log("Error fetching customer expenses", error);
  }
};
