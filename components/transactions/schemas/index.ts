import { z } from "zod";

export const formSchemaTransactions = z
  .object({
    customers: z.array(z.string()).min(1, "At least one customer is required"),
    issueDate: z.date(),
    dueDate: z.date().optional(),
    currency: z.string(),
    taxRate: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z
        .number()
        .max(100, { message: "Tax rate must be between 0 and 100" })
        .min(0, { message: "Tax rate must be between 0 and 100" }),
    ),

    products: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().nonempty("Name is required"),
          price: z.number().min(0, "Price must be 0 or higher"),
          quantity: z.number().min(1, "Quantity must be at least 1"),
        }),
      )
      .default([]),
    services: z
      .array(
        z.object({
          name: z.string().nonempty("Name is required"),
          price: z.number().min(0, "Price must be 0 or higher"),
          hours: z.number().min(1, "Hours must be at least 1"),
        }),
      )
      .default([]),
  })
  .refine(
    (data) => {
      const hasProducts = data.products && data.products.length > 0;
      const hasServices = data.services && data.services.length > 0;
      return hasProducts || hasServices;
    },
    {
      message: "At least one product or service is required",
    },
  );

export type FormSchemaTransactions = z.infer<typeof formSchemaTransactions>;

export const formSchemaProducts = z.object({
  name: z.string().min(2).max(50),
  price: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().min(0),
  ),
  quantity: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().min(0),
  ),
});
