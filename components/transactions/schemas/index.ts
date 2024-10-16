import { z } from "zod";

export const formSchemaTransactions = z.object({
  customers: z.string(),
  description: z.string().optional(),
  termsAndConditions: z.string().optional(),
  notifyByEmail: z.boolean().optional(),
  status: z.string().optional(),
  date: z.date({
    required_error: "Required",
    invalid_type_error: "date must be a date format",
  }),
});

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
