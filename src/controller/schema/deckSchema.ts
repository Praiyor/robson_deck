import { z } from "zod";
import { DeckFormat } from "../../utils/DeckFormatRules.js";

export const deckIdSchema = z.object({
    deckId: z.number({
        required_error: "Deck ID is required",
        invalid_type_error: "Deck ID must be a number",
    }).int().positive("Deck ID must be above 0")
})

export const deckIdParamSchema = z.object({
  deckId: z.string()
    .transform(Number)
    .refine(val => Number.isInteger(val) && val > 0, {
      message: "Deck ID must be a positive integer",
    }),
});

const formatTransformer = z
  .string()
  .transform((val, ctx) => {
    const normalized = val.trim().toLowerCase();

    switch (normalized) {
      case "commander":
        return DeckFormat.COMMANDER;
      case "standard":
        return DeckFormat.STANDARD;
      case "modern":
        return DeckFormat.MODERN;
      case "pauper":
        return DeckFormat.PAUPER;
      case "singleton":
        return DeckFormat.SINGLETON;
      default:
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid format",
        });
        return z.NEVER;
    }
  });
  
export const deckSchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),
  format: formatTransformer,
});