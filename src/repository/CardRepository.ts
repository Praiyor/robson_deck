import { prisma } from "../main/config/prisma.js";
import { CardRepositoryInterface } from "./interface/CardRepositoryInterface.js";
import { Card } from '../../prisma/client/index.js';

export class CardRepository implements CardRepositoryInterface{
    async create(cardData: {
      name: string;
      description: string;
      image: string;
      deckId: number;
    }): Promise<Card> {
        const card = await prisma.card.create({
            data: cardData
        })

        return card;
    }
    findAll(): Promise<Card[]> {
        throw new Error("Method not implemented.");
    }
    findById(cardId: number): Promise<Card | null> {
        throw new Error("Method not implemented.");
    }
    deleteById(cardId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}