import { CardDTO } from "./CardDTO";

export interface CardValidationContext {
    card: CardDTO;
    deckId: number;
}