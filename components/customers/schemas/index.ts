import { z } from "zod";

export const FormSchemaCustomers = z.object({
  description: z.string(),
  name: z.string(),
  email: z.string().email().optional()
});
