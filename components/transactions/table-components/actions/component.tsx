"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"

// Datos como variables
const companyInfo = {
  name: "Lost Island AB",
  logo: "D",
  invoiceNumber: "INV-0001",
  address: "Torsgatan 59, 113 37",
  city: "Stockholm",
  email: "pontus@lostisland.co",
  phone: "+46 700 010 100",
  vat: "SE503484848"
}

const clientInfo = {
  name: "Klarna",
  address: "Sveavägen 168, 113 54",
  city: "Stockholm, Sweden",
  email: "test@example.com"
}

const items = [
  { description: "Design", quantity: 156, price: 1100, total: 171600 },
  { description: "Development", quantity: 52, price: 1100, total: 57200 },
  { description: "Planning & meetings", quantity: 12, price: 1100, total: 13200 }
]

const totals = {
  vat: 48400,
  total: 290400
}

const paymentDetails = {
  bank: "SEB Bank",
  iban: "123 123 123",
  note: "Please reference the invoice number"
}

export default function Component() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">{companyInfo.logo}</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg">{companyInfo.name}</h2>
            <p className="text-sm text-muted-foreground">Invoice no. {companyInfo.invoiceNumber}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold">From</h3>
            <div className="text-sm text-muted-foreground">
              <p>{companyInfo.name}</p>
              <p>{companyInfo.address}</p>
              <p>{companyInfo.city}</p>
              <p>{companyInfo.email}</p>
              <p>{companyInfo.phone}</p>
              <p className="mt-1.5">VAT: {companyInfo.vat}</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold">To</h3>
            <div className="text-sm text-muted-foreground">
              <p>{clientInfo.name}</p>
              <p>{clientInfo.address}</p>
              <p>{clientInfo.city}</p>
              <p>{clientInfo.email}</p>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="grid grid-cols-4 text-sm font-medium">
            <div>Description</div>
            <div className="text-right">Quantity</div>
            <div className="text-right">Price</div>
            <div className="text-right">Total</div>
          </div>
          <Separator />
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 text-sm">
              <div>{item.description}</div>
              <div className="text-right">{item.quantity}</div>
              <div className="text-right">${item.price.toFixed(2)}</div>
              <div className="text-right">${item.total.toFixed(2)}</div>
            </div>
          ))}
          <Separator />
          <div className="grid grid-cols-4 text-sm">
            <div className="col-span-3 text-right font-medium">VAT</div>
            <div className="text-right">${totals.vat.toFixed(2)}</div>
          </div>
          <div className="grid grid-cols-4 text-sm">
            <div className="col-span-3 text-right font-medium">Total</div>
            <div className="text-right font-bold">${totals.total.toFixed(2)}</div>
          </div>
        </div>
        <div className="space-y-1.5">
          <h3 className="text-sm font-semibold">Payment Details</h3>
          <div className="text-sm text-muted-foreground">
            <p>{paymentDetails.bank}</p>
            <p>IBAN: {paymentDetails.iban}</p>
            <p className="mt-1.5">{paymentDetails.note}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Thank you for your business.</p>
      </CardFooter>
    </div>
  )
}
