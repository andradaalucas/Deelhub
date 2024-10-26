"use client";
import { createClient } from "@/utils/supabase/client";
import { getUserSession } from "../user_management";

const supabase = createClient();

// export const getAllTransactions = async (filters?: any) => {
//   try {

//     let query = supabase.from("transactions").select();

//     // If filters are provided, apply them to the query
//     if (filters && filters.length > 0) {
//       filters.forEach((filter: any) => {
//         const { column, operator, value } = filter;

//         switch (operator) {
//           case "equals":
//             query = query.eq(column, value);
//             break;
//           case "neq":
//             query = query.neq(column, value);
//             break;
//           case "gte":
//             query = query.gte(column, value);
//             break;
//           case "lte":
//             query = query.lte(column, value);
//             break;
//           default:
//             query = query.ilike(column, `%${value}%`);
//         }
//       });
//     }

//     // Execute the query
//     const { data: transactions, error } = await query;

//     // Handle any errors from Supabase
//     if (error) {
//       console.error("Error fetching transactions:", error);
//       return [];
//     }

//     // Return the filtered or unfiltered transactions
//     console.log("result desde index.ts", transactions);
//     return transactions;
//   } catch (error) {
//     console.error("Error in getAllTransactions:", error);
//     return [];
//   }
// };
export const getAllTransactions = async () => {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select("*, transaction_product(*), customer_transaction(*, customers(name))");

    if (error) {
      throw error;
    }

    console.log("data", data);
    return data;
  } catch (error) {
    console.log("Error on create customer", error);
  }
};

// export const createTransactions = async (data: any) => {
//   console.log("data desde create transaction", data);

//   // try {
//   //   // Insertar el cliente en la tabla customers
//   //   const user_id = await getUserSession()
//   //   const { data: dataCustomer, error: errorCustomer } = await supabase
//   //     .from("customers")
//   //     .insert({
//   //       user_id: user_id,
//   //       name: data.transactions.customers, // Usar el campo customers como name
//   //     })
//   //     .select();

//   //   // Manejar errores de inserción de cliente
//   //   if (errorCustomer) {
//   //     console.error("Error inserting customer:", errorCustomer);
//   //     return {
//   //       success: false,
//   //       message: "Error inserting customer",
//   //       error: errorCustomer,
//   //     };
//   //   }

//   //   if (!dataCustomer?.length) {
//   //     return {
//   //       success: false,
//   //       message: "No customer was inserted.",
//   //     };
//   //   }

//   //   const customer_id = dataCustomer[0].id; // Obtener el ID del cliente insertado

//   //   // Insertar la transacción y obtener el ID
//   //   const { data: dataTransactions, error: errorTransactions } = await supabase
//   //     .from("transactions")
//   //     .insert({
//   //       description: data.transactions.description,
//   //       date: data.transactions.date,
//   //       status: data.transactions.status,
//   //       amount: data.transactions.amount,
//   //       user_id: user_id, // Relacionar la transacción con el usuario
//   //     })
//   //     .select();

//   //   // Manejar errores de inserción de la transacción
//   //   if (errorTransactions) {
//   //     console.error("Error inserting transaction:", errorTransactions);
//   //     return {
//   //       success: false,
//   //       message: "Error inserting transaction",
//   //       error: errorTransactions,
//   //     };
//   //   }

//   //   if (dataTransactions?.length > 0) {
//   //     const transaction_id = dataTransactions[0].id; // Obtener el ID de la transacción insertada

//   //     // Relacionar cliente con la transacción en la tabla intermedia customer_transaction
//   //     const { error: errorCustomerTransaction } = await supabase
//   //       .from("customer_transaction")
//   //       .insert({
//   //         customer_id: customer_id, // ID del cliente insertado
//   //         transaction_id: transaction_id, // ID de la transacción insertada
//   //       });

//   //     if (errorCustomerTransaction) {
//   //       console.error("Error inserting into customer_transaction:", errorCustomerTransaction);
//   //       return {
//   //         success: false,
//   //         message: "Error inserting customer-transaction relation",
//   //         error: errorCustomerTransaction,
//   //       };
//   //     }

//   //     // Insertar productos relacionados con la transacción en la tabla products
//   //     const productInsertPromises = data.products.map(async (product: any) => {
//   //       const { data: dataProduct, error: errorProduct } = await supabase
//   //         .from("products")
//   //         .insert({
//   //           name: product.name,
//   //           price: product.price,
//   //           quantity: product.quantity,
//   //           user_id: user_id, // Enviar el user_id aquí
//   //         })
//   //         .select();

//   //       // Manejar errores de inserción de productos
//   //       if (errorProduct) {
//   //         console.error("Error inserting product:", errorProduct);
//   //         return {
//   //           success: false,
//   //           message: "Error inserting product",
//   //           error: errorProduct,
//   //         };
//   //       }

//   //       // Relacionar producto con la transacción en la tabla intermedia transaction_product
//   //       if (dataProduct?.length > 0) {
//   //         const product_id = dataProduct[0].id; // Obtener el ID del producto insertado

//   //         const { error: errorTransactionProduct } = await supabase
//   //           .from("transaction_product")
//   //           .insert({
//   //             product_id: product_id, // ID del producto insertado
//   //             transaction_id: transaction_id, // ID de la transacción insertada
//   //           });

//   //         if (errorTransactionProduct) {
//   //           console.error("Error inserting into transaction_product:", errorTransactionProduct);
//   //           return {
//   //             success: false,
//   //             message: "Error inserting transaction-product relation",
//   //             error: errorTransactionProduct,
//   //           };
//   //         }
//   //       }
//   //     });

//   //     // Esperar a que se completen todas las inserciones de productos
//   //     const productResults = await Promise.all(productInsertPromises);

//   //     // Verificar si hubo errores en las inserciones de productos
//   //     const hasError = productResults.some((result) => result && !result.success);
//   //     if (hasError) {
//   //       return { success: false, message: "Some products were not inserted." };
//   //     }

//   //     return { success: true, transaction: dataTransactions };
//   //   }

//   //   return { success: false, message: "No transaction was inserted." };
//   // } catch (error) {
//   //   console.error("Unexpected error:", error);
//   //   return { success: false, message: "Unexpected error occurred.", error };
//   // }
// };
export const createTransactions = async (data: any) => {
  const {
    customersID,
    products,
    subtotal,
    total,
    currency,
    taxRate,
    startDate,
    expirationDate,
    description,
  } = data;
  const user_id = await getUserSession();
  try {
    // Iterate over each customerID
    for (const customerID of customersID) {
      // Step 1: Insert into the `transactions` table
      const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .insert({
          user_id,
          subtotal,
          total,
          currency,
          taxRate,
          startDate,
          expirationDate,
          description,
        })
        .select(); // This will return the inserted row with the new `id`

      if (transactionError)
        throw new Error(
          "Error inserting transaction: " + transactionError.message,
        );

      const transactionID = transactionData?.[0]?.id;

      // Step 2: Insert into the `customer_transaction` intermediate table
      const { error: customerTransactionError } = await supabase
        .from("customer_transaction")
        .insert({
          customer_id: customerID,
          transaction_id: transactionID, // Link to the newly created transaction
        });

      if (customerTransactionError)
        throw new Error(
          "Error inserting into customer_transaction: " +
            customerTransactionError.message,
        );

      // Step 3: Insert each product into `transaction_product`
      for (const product of products) {
        const { error: productError } = await supabase
          .from("transaction_product")
          .insert({
            transaction_id: transactionID, // Link the product to the transaction
          });

        if (productError)
          throw new Error("Error inserting product: " + productError.message);
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
