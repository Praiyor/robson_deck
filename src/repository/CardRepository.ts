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
    async findAll(): Promise<Card[]> {
        return await prisma.card.findMany()
    }
    async findById(cardId: number): Promise<Card | null> {
        return await prisma.card.findUnique({
            where: {
                id: cardId
            }
        });
    }
    async deleteById(cardId: number): Promise<void> {
        await prisma.card.delete({
            where: {
                id: cardId
            }
        })
    }

}