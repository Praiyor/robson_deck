import { prisma } from "../main/config/prisma";
import { Deck } from "../main/generated/prisma/index";
import { DeckWithCards } from "../utils/types/DeckWithCards";
import { DeckRepositoryInterface } from "./interface/DeckRepositoryInterface";


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

    async findById(deckId: number): Promise<DeckWithCards | null> {
        return await prisma.deck.findUnique({
            where: {
                id: deckId
            },
            include: {
                cards: true 
            }
        });
    }

    async deleteById(deckId: number): Promise<void> {
        try {
            await prisma.deck.delete({
                where: {
                    id: deckId
                }
            });
        } catch (error) {
            throw new Error(`Error deleting deck with id ${deckId}: ${error.message || error}`);
        }
    }

    async updateById(deckId: number, deckData: any): Promise<Deck | null> {
        try {
            return await prisma.deck.update({
                where: {
                    id: deckId
                },
                data: deckData
            });
        } catch (error) {
            throw new Error(`Error updating deck with id ${deckId}: ${error.message || error}`);
        }
    }

}