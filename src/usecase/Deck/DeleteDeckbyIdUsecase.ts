import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface.js";
import { GetDeckByIdUseCase } from "./GetDeckbyIdUsecase.js";

export class DeleteDeckbyIdUsecase {
    constructor(private DeckRepository: DeckRepositoryInterface){}

    async execute(deckId: number): Promise<void> {
        await this.validate(deckId);
        await this.DeckRepository.deleteById(deckId)
    }

    async validate(deckId: number): Promise<void> {
            const getDeckUseCase = new GetDeckByIdUseCase(this.DeckRepository);
            const deck = await getDeckUseCase.execute(deckId);
    
            if(!deck){
                throw new Error(`Deck with id ${deckId} not found.`);
            }
        }
}