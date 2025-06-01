import { Deck } from "../../../prisma/client/index.js";
import { Card } from "../../entity/Card.js";

export interface DeckRepositoryInterface {
    create(deckData:any): Promise<boolean>;
    findAll(): Promise<Deck[]>;
    findById(deckId: number): Promise<Deck | null>;
    deleteById(deckId: number): Promise<void>;
}