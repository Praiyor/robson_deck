import { Deck } from "../../entity/Deck.js";
import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface.js";

export class CreateDeckUsecase{
    constructor(private DeckRepository: DeckRepositoryInterface){}

    async execute(name: string, description?: string): Promise<boolean> {

        return await this.DeckRepository.create({name, description})
    }
}