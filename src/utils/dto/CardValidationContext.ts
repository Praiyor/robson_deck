import { CardDTO } from "./CardDTO.js";

export interface CardValidationContext {
    card: CardDTO;
    deckId: number;
}