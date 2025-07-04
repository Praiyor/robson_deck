import { CardRepositoryInterface } from "../../repository/interface/CardRepositoryInterface";
import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface";
import { GetDeckByIdUseCase } from "../Deck/GetDeckbyIdUsecase";

export class DeleteCardUsecase {
    constructor(private CardRepository: CardRepositoryInterface, private DeckRepository: DeckRepositoryInterface) {}

    async execute(cardId: number, deckId: number){
        await this.validate(cardId, deckId);
        await this.CardRepository.deleteById(cardId);
    }

    async validate(cardId: number, deckId: number): Promise<void> {
        const card = await this.CardRepository.findById(cardId);
        const getDeckUseCase = new GetDeckByIdUseCase(this.DeckRepository);
        const deck = await getDeckUseCase.execute(deckId);

        if(!card){
            throw new Error(`Card with id ${cardId} not found.`);
        }

        if(!deck){
            throw new Error(`Deck with id ${deckId} not found.`);
        }
    }

 
}