import { Card } from "../../../prisma/client/index.js";


export interface CardRepositoryInterface {
    create(cardDeck: any): Promise<Card>;
    findAll(): Promise<Card[]>;
    findById(cardId: number): Promise<Card | null>;
    deleteById(cardId: number): Promise<boolean>;
}