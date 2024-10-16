import { z } from "zod";

export const formSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  email: z.string().email().optional(),
});
export const formSchemaEdit = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  email: z.string().email()
});