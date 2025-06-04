import { Card } from "../main/generated/prisma/index.js";
import { CardDTO } from "./dto/CardDTO.js";

export function mapCardDTOToInternal(dto: CardDTO, deckId: number): Card {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    image: dto.imageUrl,
    deckId: deckId,
  };
}