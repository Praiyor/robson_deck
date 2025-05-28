import { Card } from "../../entity/Card.js";

export interface DeckRepositoryInterface {
    create(cardDeck: any): Promise<boolean>;
    findAll(): Promise<Card[]>;
    findById(cardId: number): Promise<Card | null>;
    deleteById(cardId: number): Promise<boolean>;
}