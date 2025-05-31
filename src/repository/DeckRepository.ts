import { Deck } from "../../prisma/client/index.js";
import { Card } from "../entity/Card.js";
import { prisma } from "../main/config/prisma.js";
import { DeckRepositoryInterface } from "./interface/DeckRepositoryInterface.js";

export class DeckRepository implements DeckRepositoryInterface {
    async create(deckData:any): Promise<boolean> {
        try {
            await prisma.posts.create({
                data: deckData
            })
            return true;
        } catch (error) {
            throw new Error(`Error creating deck: ${error}`);
        }
    }
    async findAll(): Promise<Deck[]> {
        return await prisma.deck.findMany();
    }

    async findById(deckId: number): Promise<Deck | null> {
        return await prisma.deck.findUnique({
            where: {
                id: deckId
            }
        });
    }
    
    addCardToDeck(deckId: number, card: Card): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    removeCardFromDeck(deckId: number, cardId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}