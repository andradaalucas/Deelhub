import { z } from "zod";

export const formSchemaTransactions = z.object({
  customers: z.string().optional(),
  description: z.string().optional(),
  startDate: z.date(),
  expirationDate: z.date().optional() || null,
  currency: z.enum(["USD", "EUR", "GBP"]),
  taxRate: z.number().min(0).max(100, "Tax rate must be between 0 and 100"),
});

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
