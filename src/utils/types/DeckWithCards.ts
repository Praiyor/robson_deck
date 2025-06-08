
import { Prisma } from "../../main/generated/prisma/index.js";

export type DeckWithCards = Prisma.DeckGetPayload<{
  include: { cards: true };
}>;