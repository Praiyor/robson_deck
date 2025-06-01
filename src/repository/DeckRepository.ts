import { prisma } from "../main/config/prisma.js";
import { Deck } from "../main/generated/prisma/index.js";
import { DeckRepositoryInterface } from "./interface/DeckRepositoryInterface.js";

export class DeckRepository implements DeckRepositoryInterface {
    constructor() {}
    async create(deckData:any): Promise<boolean> {
        try {
            await prisma.deck.create({
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
            },
            include: {
                cards: true 
            }
        });
    }

    deleteById(deckId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}