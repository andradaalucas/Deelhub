import { z } from "zod";

export const FormSchemaCustomers = z.object({
  id: z.string(),
  description: z.string(),
  name: z.string(),
  email: z.string().email().optional()
});
