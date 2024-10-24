import { createClient } from "@/utils/supabase/client";
import { getUserSession } from "../user_management";

const supabase = createClient();

export const getAllCustomers = async (filters?: any) => {
  try {
    const { data, error } = await supabase.from("customers").select();
    return data;
  } catch (error) {
    console.log("Error on create customer", error);
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
