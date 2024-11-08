'use client'
import { Document, Page, PDFDownloadLink, StyleSheet, Image, Text, View } from "@react-pdf/renderer"
import Logo from "./image.png"

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
})


const PDFTemplate = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src="/image.png" style={styles.image} alt="test" />
    </Page>
  </Document>
)

export const PDFDownload = () => {
  return (
    <PDFDownloadLink
      document={<PDFTemplate />}
      fileName="template.pdf"
      className="cursor-pointer"
    >
      {
        ({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>
  )
}
