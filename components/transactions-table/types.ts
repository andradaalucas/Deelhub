import { z } from "zod";

export interface InputFormProps {
  handleOpenDialog: () => void;
}
export const FormSchema = z.object({
  amount: z.preprocess((val) => {
    if (typeof val === "string") {
      const parsedValue = parseFloat(val);
      return isNaN(parsedValue) ? undefined : parsedValue;
    }
    return val;
  }, z.number()),
  date: z.date({
    required_error: "Required",
    invalid_type_error: "date must be a date format",
  }),
  description: z.string(),
  type: z.string(),
  status: z.string(),
  currency: z.string(),
  user_id: z.string(),
});

export type Payment = {
  id: string;
  amount: number;
  description: string;
  status: "confirmed" | "pending" | "canceled" | "rejected";
  date: string;
  category: string;
  type: "income" | "expense";
};
