import { Deck } from "../../main/generated/prisma/index.js";
import { DeckWithCards } from "../../utils/types/DeckWithCards.js";


export interface DeckRepositoryInterface {
    create(deckData:any): Promise<boolean>;
    findAll(): Promise<Deck[]>;
    findById(deckId: number): Promise<DeckWithCards | null>;
    deleteById(deckId: number): Promise<void>;
    updateById(deckId: number, deckData: any): Promise<Deck | null>;
}