import { Card } from "../main/generated/prisma/index";
import { CardDTO } from "./dto/CardDTO";

export function mapCardDTOToInternal(dto: CardDTO, deckId: number): Card {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    image: dto.imageUrl,
    deckId: deckId,
  };
}