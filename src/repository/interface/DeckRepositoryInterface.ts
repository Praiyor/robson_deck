import { Deck } from "../../main/generated/prisma/index.js";


export interface DeckRepositoryInterface {
    create(deckData:any): Promise<boolean>;
    findAll(): Promise<Deck[]>;
    findById(deckId: number): Promise<Deck | null>;
    deleteById(deckId: number): Promise<void>;
}