import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface";
import { DeckWithCards } from "../../utils/types/DeckWithCards";

export class GetDeckByIdUseCase {
    constructor(private DeckRepository: DeckRepositoryInterface){}

    async execute(deckId: number): Promise<DeckWithCards | null> {
        return await this.DeckRepository.findById(deckId)
    }
}