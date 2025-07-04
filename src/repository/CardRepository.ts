import { prisma } from "../main/config/prisma";
import { Card } from "../main/generated/prisma/index";
import { CardRepositoryInterface } from "./interface/CardRepositoryInterface";

export class CardRepository implements CardRepositoryInterface{
    async create({id, name, description, image, deckId }: {
        id: number;
        name: string;
        description: string;
        image: string;
        deckId: number;
    }): Promise<Card> {
        const card = await prisma.card.create({
            data: {
                id,
                name,
                description,
                image,
                deck: {
                  connect: { id: deckId }
                }
            }
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