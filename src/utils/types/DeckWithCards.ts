
import { Prisma } from "../../main/generated/prisma/index";

export type DeckWithCards = Prisma.DeckGetPayload<{
  include: { cards: true };
}>;