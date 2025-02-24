import { createSupabaseBrowserClient } from "@/utils/supabase/supabase-browser";
import { getUserSession } from "../user_management";

const supabase = createSupabaseBrowserClient();
//TODO: REPOSITORY PATTERN

export const getAllCustomers = async (filters?: any) => {
  try {
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

// export const getTopSpenders = async () => {
//   try {
//     const { data, error } = await supabase
//       .from("transactions")
//       .select("customer_id, customers(name), total")
//       .eq("status", "paid") // Solo transacciones confirmadas
//       .order("total", { ascending: false }) // Ordenar de mayor a menor gasto
//       .limit(5); // Obtener los 5 clientes con mayor gasto

//     if (error) throw error;
//     console.log("data", data);
//     return data; // Devuelve [{ customer_id: 1, customers: { name: "Juan" }, total: 5000 }, ...]
//   } catch (error) {
//     console.error("Error fetching top spenders:", error);
//     return null;
//   }
// };
export const getTopSpenders = async () => {
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

    // Convertir a array
    const formattedData = Object.values(customerExpenses);

    return formattedData;
  } catch (error) {
    console.log("Error fetching customer expenses", error);
  }
};

export const getWithoutTrashedCustomers = async (filters?: any) => {
  try {
    const { data, error } = await supabase
      .from("customers")
      .select()
      .neq("status", "disabled")
      .order("created_at", { ascending: false });
    return data;
  } catch (error) {
    console.log("Error on create customer", error);
  }
};
export const getCustomerById = async (id: any) => {
  try {
    const { data, error } = await supabase
      .from("customers")
      .select()
      .eq("id", id);
    console.log("data customer id", data);

    if (error) {
      throw new Error(error.message || "Failed to get customer");
    }

    return data;
  } catch (error) {
    console.error("Error on get customer", error);
    throw new Error("An error occurred while obtaining the customer");
  }
};
export const createCustomersFromCsv = async (data: any) => {
  try {
    const user_id = await getUserSession();
    const enrichedData = data.map((customer: any) => {
      const { id, ...rest } = customer;
      return {
        ...rest,
        user_id,
      };
    });

    // Obtenemos una lista de correos (o cualquier otra clave única)
    const emails = enrichedData.map((customer: any) => customer.email);

    // Verificamos si ya existen registros con estos correos
    const { data: existingCustomers, error: fetchError } = await supabase
      .from("customers")
      .select("email")
      .in("email", emails);

    if (fetchError) {
      throw new Error(
        fetchError.message || "Failed to check existing customers",
      );
    }

    // Filtramos los nuevos datos para no insertar los ya existentes
    const newCustomers = enrichedData.filter((customer: any) => {
      return !existingCustomers.some(
        (existing: any) => existing.email === customer.email,
      );
    });

    if (newCustomers.length > 0) {
      const { error: insertError } = await supabase
        .from("customers")
        .insert(newCustomers);

      if (insertError) {
        throw new Error(insertError.message || "Failed to insert customers");
      }

      return `${newCustomers.length} customer(s) created successfully, ${existingCustomers.length} already existed.`;
    } else {
      return "No new customers to insert, all already exist.";
    }
  } catch (error) {
    throw new Error("An error occurred when obtaining the product." + error);
  }
};

export const createCustomers = async (data: any): Promise<string> => {
  try {
    const user_id = await getUserSession();
    const enrichedData = {
      ...data,
      user_id,
    };

    const { error } = await supabase.from("customers").insert(enrichedData);

    if (error) {
      throw new Error(error.message || "Failed to create customer");
    }

    return "Customer created successfully";
  } catch (error) {
    console.error("Error on create customer", error);
    throw new Error("An error occurred while creating the customer");
  }
};

export const updateCustomers = async (data: any) => {
  try {
    const user_id = await getUserSession();
    const enrichedData = {
      ...data,
      user_id,
    };

    const { error } = await supabase
      .from("customers")
      .update(enrichedData)
      .eq("id", data.id);

    // Verificamos si hay error y arrojamos un throw
    if (error) {
      throw new Error(`Error updating customer: ${error.message}`);
    }

    return "Customer updated successfully"; // Retornamos un mensaje de éxito
  } catch (error) {
    // Capturamos y arrojamos el error para que sea manejado por el código que llama a esta función
    throw new Error(`Error on update customer: ${error}`);
  }
};

export const deleteCustomers = async (id: any): Promise<string> => {
  try {
    const { error } = await supabase.from("customers").delete().eq("id", id);

    if (error) {
      throw new Error(error.message || "Failed to delete customer");
    }

    return "Customer deleted successfully";
  } catch (error) {
    console.log("Error on delete customer", error);
    throw new Error("An error occurred while deleting customer: " + error);
  }
};

export const exportCustomerOnSheet = async () => {
  try {
    const { data, error } = await supabase.from("customers").select().csv();

    if (error) {
      throw new Error("Error on fetching customers: " + error.message);
    }

    if (data) {
      const csvData = new Blob([data], { type: "text/csv;charset=utf-8;" });
      const csvURL = URL.createObjectURL(csvData);
      const link = document.createElement("a");
      link.href = csvURL;
      link.setAttribute("download", "customers.csv"); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return { message: "Customers exported successfully" }; // Devolvemos un mensaje de éxito
    } else {
      throw new Error("No data available to export.");
    }
  } catch (error) {
    throw new Error("Error on exporting customers: " + error); // Lanzamos un error para que sea manejado
  }
};
