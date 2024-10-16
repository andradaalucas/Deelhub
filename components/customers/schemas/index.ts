import { z } from "zod";

export const formSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  email: z.string().email().optional(),
});