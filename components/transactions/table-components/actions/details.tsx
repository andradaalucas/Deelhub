import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RowData } from "../../types";

export function Details({
  isOpen,
  setIsOpen,
  rowData,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  rowData: RowData;
}) {
  const clientInfo = {
    name: rowData.customer_transaction[0]?.customers?.name || "No Name",
    address:
      rowData.customer_transaction[0]?.customers?.address || "No Address",
    email: rowData.customer_transaction[0]?.customers?.email || "No Email",
    phone: rowData.customer_transaction[0]?.customers?.phone || "No Phone",
  };

  const companyInfo = {
    name: "Deelfy",
    logo: "D",
    invoiceNumber: "INV-0001",
    city: "Córdoba, Argentina",
    email: "hi@deelfy.com",
  };

  const items = rowData.products.map((product) => ({
    description: product.name,
    quantity: product.quantity,
    price: product.price,
    total: product.price * product.quantity,
  }));

  const totals = {
    tax_rate: rowData.tax_rate ?? 0,
    currency: rowData.currency || null,
    total: rowData.total.toFixed(2),
  };

  const date = {
    issue_date: rowData.issue_date || null,
    due_date: rowData.due_date || "-",
  };
  const status = rowData?.status || undefined;

  console.log("rowData", rowData);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="rounded-none lg:min-w-[700px]">
        <div className="mx-auto w-full max-w-4xl">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-7">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 min-h-[48px] w-12 min-w-[48px] items-center justify-center rounded-lg bg-primary">
                <span className="text-2xl font-bold text-primary-foreground">
                  {companyInfo.logo}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold">{companyInfo.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Invoice N°
                  <div>{companyInfo.invoiceNumber}</div>
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-1 text-sm">
              <div className="font-semibold">Issue Date</div>
              <div className="text-muted-foreground">{date.issue_date}</div>
              <div className="font-semibold">Due Date</div>
              <div className="text-muted-foreground">{date.due_date}</div>
            </div>
            <div className="relative w-auto max-w-32 md:max-w-36">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <span
                  className={`h-2 w-2 rounded-full ${
                    status === "pending"
                      ? "bg-[#0a85d1]"
                      : status === "confirmed"
                        ? "bg-[#56663e]"
                        : status === "rejected"
                          ? "bg-[#e14133]"
                          : ""
                  }`}
                />
              </div>
              <Input
                value={status}
                className="select-none pl-8 font-semibold uppercase"
                readOnly
                tabIndex={-1}
              />
            </div>
          </CardHeader>
          <CardContent className="grid gap-28">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold">From</h3>
                <div className="text-sm text-muted-foreground">
                  <p>{companyInfo.name}</p>
                  <p>{companyInfo.city}</p>
                  <p>{companyInfo.email}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold">To</h3>
                <div className="text-sm text-muted-foreground">
                  <p>{clientInfo.name}</p>
                  <p>{clientInfo.address}</p>
                  <p>{clientInfo.email}</p>
                  <p>{clientInfo.phone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="grid grid-cols-4 text-sm font-semibold">
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
                <div className="col-span-3 text-right font-semibold">TAX</div>
                <div className="text-right">{totals.tax_rate}%</div>
              </div>
              <div className="grid grid-cols-4 items-center text-sm">
                <div className="col-span-3 text-right font-semibold">Total</div>
                <div className="text-right text-lg font-semibold">
                  {totals.currency} ${totals.total}
                </div>
              </div>
            </div>
            {/*<div className="space-y-1.5">
              <h3 className="text-sm font-semibold">Payment Details</h3>
              <div className="text-sm text-muted-foreground">
                 <p>{paymentDetails.bank}</p>
                <p>IBAN: {paymentDetails.iban}</p>
                <p className="mt-1.5">{paymentDetails.note}</p> 
              </div>
            </div>*/}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground font-semibold">
              Powered by Deelfy
            </p>
          </CardFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
