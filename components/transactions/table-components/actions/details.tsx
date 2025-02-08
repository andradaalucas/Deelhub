import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RowData } from "../../types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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
    name: rowData?.customers?.name || null,
    address: rowData?.customers?.address || null,
    email: rowData?.customers?.email || null,
    phone: rowData?.customers?.phone || null,
  };

  const companyInfo = {
    name: "Deelhub",
    logo: "D",
    invoiceNumber: "INV-0001",
    city: "Córdoba, Argentina",
    email: "hi@deelhub.com",
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
    issue_date: rowData.issue_date
      ? format(new Date(rowData.issue_date), "MM/dd/yyyy")
      : null,

    due_date: rowData.due_date
      ? format(new Date(rowData.due_date), "MM/dd/yyyy")
      : null,
  };
  const status = rowData?.status || undefined;

  console.log("rowData", rowData);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="rounded-none lg:min-w-[700px]">
        <div>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 p-0 pb-7 pt-6">
            <div className="flex items-center space-x-4 p-2">
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                height="48"
                width="48"
              />
              <div>
                <h2 className="text-base font-semibold lg:text-lg">
                  {companyInfo.name}
                </h2>
                <p className="text-xs text-muted-foreground md:text-sm lg:text-sm">
                  Invoice N°
                  <div>{companyInfo.invoiceNumber}</div>
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-1 p-2 text-xs md:text-sm lg:text-sm">
              {date.issue_date && (
                <>
                  <div className="font-semibold">Issue Date</div>
                  <div className="text-muted-foreground">{date.issue_date}</div>
                </>
              )}
              {date.due_date && (
                <>
                  <div className="font-semibold">Due Date</div>
                  <div className="text-muted-foreground">{date.due_date}</div>
                </>
              )}
            </div>
            <div className="flex items-center">
              <Badge
                className="pointer-events-none flex items-center gap-2 px-2 py-1"
                variant="secondary"
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    status === "pending"
                      ? "bg-[#0a85d1]"
                      : status === "paid"
                        ? "bg-[#56663e]"
                        : status === "canceled"
                          ? "bg-[#e14133]"
                          : ""
                  }`}
                />
                <div className="uppercase">{status}</div>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-24 p-0">
            <div className="grid gap-4 p-2 md:grid-cols-2">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold">From</h3>
                <div className="text-sm text-muted-foreground md:text-sm lg:text-sm">
                  <p>{companyInfo.name}</p>
                  <p>{companyInfo.city}</p>
                  <p>{companyInfo.email}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold">To</h3>
                <div className="text-sm text-muted-foreground md:text-sm lg:text-sm">
                  <p>{clientInfo.name}</p>
                  <p>{clientInfo.address}</p>
                  <p>{clientInfo.email}</p>
                  <p>{clientInfo.phone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-1.5 p-2 pb-6">
              <div className="grid grid-cols-4 text-xs font-semibold md:text-sm">
                <div>Description</div>
                <div className="text-right">Quantity</div>
                <div className="text-right">Price</div>
                <div className="text-right">Total</div>
              </div>
              <Separator />
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 text-xs md:text-sm"
                >
                  <div>{item.description}</div>
                  <div className="text-right">{item.quantity}</div>
                  <div className="text-right">${item.price.toFixed(2)}</div>
                  <div className="text-right">${item.total.toFixed(2)}</div>
                </div>
              ))}
              <Separator />
              <div className="grid grid-cols-4 text-xs md:text-sm">
                <div className="col-span-1 text-left font-semibold">TAX</div>
                <div className="col-span-3 text-right">{totals.tax_rate}%</div>
              </div>
              <div className="grid grid-cols-4 items-center text-xs md:text-sm">
                <div className="col-span-1 text-left font-semibold">Total</div>
                <div className="col-span-3 whitespace-nowrap text-right text-xs font-semibold md:text-sm lg:text-lg">
                  {totals.currency} ${totals.total}
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </DialogContent>
    </Dialog>
  );
}
