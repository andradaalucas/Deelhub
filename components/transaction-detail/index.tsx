import { CalendarIcon } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./data-table/columns";

export function TransactionDetails() {
  const products = [
    {
      description: "Macbook Pro",
      amount: 1200,
    },
    {
      description: "iPhone 13",
      amount: 1600,
    },
    {
      description: "Apple Watch",
      amount: 400,
    },
    {
      description: "AirPods Pro",
      amount: 750,
    },
  ];

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
      <div className="mb-8 flex items-start justify-between">
        <h1 className="text-2xl font-semibold">Invoice</h1>
        <div className="text-right">
          <h2 className="text-2xl font-semibold">Deelfy</h2>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm text-gray-600">
          Invoice number 072a213d-2718-45ef-bb85-9508d735ce6b
        </p>
        <div>
          <div className="flex items-center justify-between">
            <div className="mt-1 flex items-center text-sm text-gray-600">
              <CalendarIcon className="mr-1 h-4 w-4" />
              <p>Date of issue March 1, 2024</p>
            </div>
            <div>
              <div className="text-sm">Status Pending</div>
            </div>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-600">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <p>Date due March 1, 2024</p>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-8">
        <div>
          <h3 className="mb-2 font-semibold">Deelfy Inc. 440</h3>
          <p className="text-sm text-gray-600">N Barranca Ave #4133</p>
          <p className="text-sm text-gray-600">
            Covina, California 91723 United States
          </p>
          <p className="text-sm text-gray-600">ar@vercel.com</p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Bill to</h3>
          <p className="text-sm text-gray-600">lucas</p>
          <p className="text-sm text-gray-600">andraadalucaswork@gmail.com</p>
        </div>
      </div>

      <div className="mb-8">
        <DataTable columns={columns} data={products} />
      </div>

      <div className="rounded-lg bg-secondary px-4 py-2">
        <h3 className="mb-2 text-lg font-semibold">Resume</h3>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$ 6000</span>
          </div>
          <div className="mt-2 flex justify-between border-t pt-2 text-lg font-semibold">
            <span>Total Cost</span>
            <span>$ 6000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
