import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

interface PDFData {
  id: string;
  issue_date: string;
  due_date: string;
  total: number;
  tax_rate: number;
  currency: string;
  status: string;
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  customers: {
    name: string;
    email: string;
    phone: number;
    address: string;
  };
}

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 40,
    fontFamily: "Open Sans",
  },
  title: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  invoiceInfo: {
    fontSize: 10,
    fontWeight: "bold",
    lineHeight: 1.5,
  },
  triangle: {
    width: 20,
    height: 20,
  },
  companySection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  companyInfo: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  companyName: {
    fontWeight: 800,
  },
  billTo: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  billToTitle: {
    fontWeight: "bold",
  },
  amount: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  amountMiddle: {
    fontWeight: "black",
    flex: 1,
    textAlign: "left",
    fontSize: 12,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    fontSize: 10,
  },
  tableRow: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 10,
  },
  description: {
    flex: 4,
  },
  qty: {
    flex: 1,
    textAlign: "right",
  },
  unitPrice: {
    flex: 1,
    paddingRight: 5,
    textAlign: "right",
  },
  subtotalSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  subtotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    paddingTop: 5,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    fontSize: 10,
    textAlign: "left",
  },
});

export const InvoiceTemplate: React.FC<PDFData> = (data) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Invoice</Text>
        <View>
          <Text style={styles.title}>Deelhub</Text>
        </View>
      </View>

      <View style={styles.invoiceInfo}>
        <Text>Invoice number 2A3C21E0-0004</Text>
        <Text>Date of issue March 1, 2024</Text>
        <Text>Date due March 1, 2024</Text>
      </View>

      <View style={styles.companySection}>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>Vercel Inc.</Text>
          <Text>440 N Barranca Ave #4133</Text>
          <Text>Covina, California 91723</Text>
          <Text>United States</Text>
          <Text>ar@vercel.com</Text>
        </View>
        <View style={styles.billTo}>
          <Text style={styles.billToTitle}>Bill to</Text>
          <Text>{data.customers.name}</Text>
          <Text>{data.customers.email}</Text>
          <Text>{data.customers.address}</Text>
        </View>
      </View>

      <Text style={styles.amountMiddle}></Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.description}>Items</Text>
          <Text style={styles.qty}>Qty</Text>
          <Text style={styles.unitPrice}>Unit price</Text>
          <Text style={styles.amount}>Amount</Text>
        </View>
        {data.products.map((product) => (
          <View style={styles.tableRow} key={product.id}>
            <Text style={styles.description}>{product.name}</Text>
            <Text style={styles.qty}>{product.quantity}</Text>
            <Text style={styles.unitPrice}>${product.price}</Text>
            <Text style={styles.amount}>
              ${product.price * product.quantity}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.subtotalSection}>
        <View style={styles.subtotalRow}>
          {/* <Text>Subtotal</Text> */}
          {/* <Text>$0.00</Text> */}
        </View>
        <View style={styles.subtotalRow}>
          <Text>TAX</Text>
          <Text>{data.tax_rate}%</Text>
        </View>
        <View style={styles.subtotalRow}>
          <Text>Total</Text>
          <Text>
            {data.currency} ${data.total}
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        To learn more about or to discuss your invoice, please visit
        https://deelhub.com/support
      </Text>
    </Page>
  </Document>
);
