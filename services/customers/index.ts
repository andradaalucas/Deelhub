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
    const enrichedData = data.map((customer: any) => ({
      ...customer,
      user_id,
    }));
    const { error } = await supabase.from("customers").insert(enrichedData);
    !error && "Customer created successfully";
  } catch (error) {
    console.log("Error on create customer", error);
  }
};
export const createCustomers = async (data: any) => {
  try {
    const user_id = await getUserSession();
    const enrichedData = {
      ...data,
      user_id,
    };
    const { error } = await supabase.from("customers").insert(enrichedData);
    !error && "Customer created successfully";
  } catch (error) {
    console.log("Error on create customer", error);
  }
};

export const updateCustomers = async (data: any) => {
  try {
    const user_id = await getUserSession();
    const enrichedData = {
      ...data,
      user_id,
    };
    const { error } = await supabase.from("customers").update(enrichedData).eq('id', data.id);
    !error && "Customer updated successfully";
  } catch (error) {
    console.log("Error on update customer", error);
  }
};
export const deleteCustomers = async (id: any) => {
  try {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    !error && "Customer deleted successfully";
  } catch (error) {
    console.log("Error on update customer", error);
  }
};

export const exportCustomerOnSheet = async () => {
  try {
    const { data, error } = await supabase.from("customers").select().csv();

    if (error) {
      console.error("Error on fetching customers", error);
      return;
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
    } else {
      console.log("No data available to export.");
    }
  } catch (error) {
    console.error("Error on export customer", error);
  }
};
