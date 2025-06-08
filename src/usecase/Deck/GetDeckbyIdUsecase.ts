import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface.js";
import { DeckWithCards } from "../../utils/types/DeckWithCards.js";

export class GetDeckByIdUseCase {
    constructor(private DeckRepository: DeckRepositoryInterface){}

    async execute(deckId: number): Promise<DeckWithCards | null> {
        return await this.DeckRepository.findById(deckId)
    }
}