import { z } from "zod";

export const deckSchema = z.object({
    name: z.string().min(1, "name is required"),
    description: z.string().optional(),
})

export const deckIdSchema = z.object({
    deckId: z.number({
        required_error: "Deck ID is required",
        invalid_type_error: "Deck ID must be a number",
    }).int().positive("Deck ID must be above 0")
})