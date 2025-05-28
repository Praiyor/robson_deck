import { z } from "zod";

export const deckSchema = z.object({
    title: z.string().min(1, "title is required"),
    description: z.string().optional(),
})