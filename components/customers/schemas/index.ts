import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.number(),
  description: z.string().optional(),
  email: z.string().email(),
});
export const formSchemaEdit = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  phone: z.number(),
  email: z.string().email()
});