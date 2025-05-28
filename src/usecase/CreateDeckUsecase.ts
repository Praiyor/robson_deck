import { Deck } from "../entity/Deck.js";
import { DeckRepositoryInterface } from "../repository/interface/DeckRepositoryInterface.js";

export class CreateDeckUsecase{
    constructor(private DeckRepository: DeckRepositoryInterface, private deckData: Deck){}

    async execute(): Promise<boolean> {
        return await this.DeckRepository.create(this.deckData)
    }
}