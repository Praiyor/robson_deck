import { Card } from "../../main/generated/prisma/index.js";

export interface CardRepositoryInterface {
    create(cardDeck: any): Promise<Card>;
    findAll(): Promise<Card[]>;
    findById(cardId: number): Promise<Card | null>;
    deleteById(cardId: number): Promise<void>;
}