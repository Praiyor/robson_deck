import { Deck } from "../../../prisma/client/index.js";
import { Card } from "../../entity/Card.js";

export interface DeckRepositoryInterface {
    create(deckData:any): Promise<boolean>;
    findAll(): Promise<Deck[]>;
    findById(deckId: number): Promise<Deck | null>;
    addCardToDeck(deckId: number, card: Card): Promise<boolean>;
    removeCardFromDeck(deckId: number, cardId: number): Promise<boolean>;
}