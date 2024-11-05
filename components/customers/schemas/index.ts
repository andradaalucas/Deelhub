import { z } from "zod";

// export const formSchema = z.object({
//   name: z.string().min(1, { message: "Name is required" }),
//   phone: z.number(),
//   address: z.string().optional(),
//   email: z.string().email(),
// });
export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string(),
  phone: z.coerce.number(),
  email: z.string().email(),
});