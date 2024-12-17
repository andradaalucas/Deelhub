import dynamic from "next/dynamic";
import React from "react";
import { InvoiceTemplate } from "./index";
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

interface PDFData {
  nombre: string;
  email: string;
}
export const PDFPreview: React.FC = () => {
  const pdfData: any = {
    id: "fb648e07-6048-496e-b4ff-3b7cd36d0420",
    issue_date: "2024-12-12",
    due_date: "2024-12-13",
    total: 3291.48,
    tax_rate: 123,
    currency: "USD",
    status: "pending",
    products: [
      {
        id: "a5b7cc56-98e9-4581-8215-6a302c7a09d9",
        name: "Laptop",
        price: 12,
        quantity: 123,
      },
    ],
    customers: {
      name: "Lucas Andrada",
      email: "andradalucaswork@gmail.com",
      phone: 0,
      address: "San Martín 1100\n1",
    },
    customer: "Lucas Andrada",
  };

  return (
    <div>
      <h1>Vista previa del PDF</h1>
      <PDFViewer width="100%" height="600">
        <InvoiceTemplate {...pdfData} />
      </PDFViewer>
    </div>
  );
};
