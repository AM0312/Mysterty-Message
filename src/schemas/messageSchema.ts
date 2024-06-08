import { Content } from "next/font/google";
import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "Content must be atleast 10 characters long")
    .max(300, "Content must be a maximum of 300 characters long"),
});