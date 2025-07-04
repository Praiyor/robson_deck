import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface";
import { CardValidationContext } from "../../../utils/dto/CardValidationContext";
import { GetDeckByIdUseCase } from "../../Deck/GetDeckbyIdUsecase";
import { ValidationStrategy } from "./interface/ValidationStrategy";

export class DeckExistsValidation implements ValidationStrategy<CardValidationContext> {
    constructor(private deckRepository: DeckRepositoryInterface){}

    async validate({ deckId }: CardValidationContext): Promise<void> {
        const deck = await new GetDeckByIdUseCase(this.deckRepository).execute(deckId);
        if(!deck){
            throw new Error(`Deck with id ${deckId} not found.`);
        }
    }
}