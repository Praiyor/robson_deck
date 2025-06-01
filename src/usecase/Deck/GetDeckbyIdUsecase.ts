import { Deck } from "../../main/generated/prisma/index.js";
import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface.js";

export class GetDeckByIdUseCase {
    constructor(private DeckRepository: DeckRepositoryInterface){}

    async execute(deckId: number): Promise<Deck | null> {
        return await this.DeckRepository.findById(deckId)
    }
}