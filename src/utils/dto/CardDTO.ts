import { z } from "zod";

export const CardSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  color: z.string(),
  type: z.string(),
  category: z.string().optional(),
  price: z.number(),
  createdAt: z.coerce.date(),
  power: z.string().optional(),
});

export type CardDTO = z.infer<typeof CardSchema>;