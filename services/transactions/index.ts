"use client";
import { createSupabaseBrowserClient } from "@/utils/supabase/browser";
import { ReactElement } from "react";
import { InvoiceTemplate } from "@/components/pdf-management";
import { pdf } from "@react-pdf/renderer";
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

export const generatePdf = async (data: any) => {
  try {
    const documentElement: ReactElement | null = InvoiceTemplate(
      data,
    ) as ReactElement | null;
    if (!documentElement) {
      throw new Error("Failed to create PDF document element");
    }

    // Generar el blob del PDF
    const blob = await pdf(documentElement).toBlob();

    // Crear un enlace temporal para descargar
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice.pdf";

    // Simular click para descargar
    document.body.appendChild(link);
    link.click();

    // Limpiar
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    // Manejar el error según tus necesidades
  }
};

// export const generatePdf = async (rowData: RowData) => {
//   // Crear el contenido HTML del PDF
//   const htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Invoice</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 20px;
//           }
//           h1 {
//             font-size: 24px;
//             margin-bottom: 10px;
//           }
//           .header, .footer {
//             text-align: center;
//             margin-bottom: 20px;
//           }
//           .details, .items, .totals {
//             width: 100%;
//             margin-bottom: 20px;
//           }
//           .details td {
//             padding: 5px;
//             vertical-align: top;
//           }
//           .items th, .items td {
//             text-align: left;
//             padding: 5px;
//             border-bottom: 1px solid #ddd;
//           }
//           .items th {
//             font-weight: bold;
//           }
//           .totals td {
//             text-align: right;
//             padding: 5px;
//           }
//           .totals td:last-child {
//             font-weight: bold;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="header">
//           <h1>Invoice</h1>
//           <p>Invoice number: ${rowData.id}</p>
//           <p>Date of issue: March 1, 2024</p>
//         </div>
//         <table class="details">
//           <tr>
//             <td>
//               <strong>From:</strong><br />
//               Vercel Inc.<br />
//               440 N Barranca Ave #4133<br />
//               Covina, California 91723<br />
//               United States<br />
//               vercel.com
//             </td>
//             <td>
//               <strong>Bill to:</strong><br />
//             </td>
//           </tr>
//         </table>
//         <table class="items">
//           <thead>
//             <tr>
//               <th>Description</th>
//               <th>Qty</th>
//               <th>Unit price</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>

//           </tbody>
//         </table>
//         <table class="totals">
//           <tr>
//             <td>Subtotal:</td>
//           </tr>
//           <tr>
//             <td>Total:</td>
//             <td>$${rowData.total.toFixed(2)}</td>
//           </tr>
//         </table>
//         <div class="footer">
//           <p>
//             To learn more about or to discuss your invoice, please visit
//             <a href="http://vercel.com/support">Vercel Support</a>.
//           </p>
//         </div>
//       </body>
//     </html>
//   `;

//   // Generar el PDF con Puppeteer
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Configurar el contenido HTML
//   await page.setContent(htmlContent, { waitUntil: "load" });

//   // Generar el archivo PDF
//   const pdfBuffer = await page.pdf({ format: "A4" });

//   await browser.close();

//   // Descargar el PDF en el cliente
//   const blob = new Blob([pdfBuffer], { type: "application/pdf" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `invoice_${rowData.id}.pdf`;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// };

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
