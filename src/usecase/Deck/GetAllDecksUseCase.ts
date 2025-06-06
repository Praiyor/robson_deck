
import { Deck } from "../../main/generated/prisma/index.js";
import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface.js";

export class GetAllDecksUseCase {
    constructor(private DeckRepository: DeckRepositoryInterface){}

    async execute(): Promise<Deck[]> {
        return await this.DeckRepository.findAll()
    }
}