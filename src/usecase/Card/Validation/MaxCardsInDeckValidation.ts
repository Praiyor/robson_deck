import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface.js";
import { CardValidationContext } from "../../../utils/dto/CardValidationContext.js";
import { GetDeckByIdUseCase } from "../../Deck/GetDeckbyIdUsecase.js";
import { ValidationStrategy } from "./interface/ValidationStrategy.js";

export class MaxCardsInDeckValidation implements ValidationStrategy<CardValidationContext>{
    constructor(private deckRepository: DeckRepositoryInterface){}

    async validate({ deckId }: CardValidationContext): Promise<void> {
        const deck = await new GetDeckByIdUseCase(this.deckRepository).execute(deckId);
        if(deck?.exactCards !== null && deck.cards.length >= deck.exactCards){
            throw new Error(`Deck already has the exact number of cards required (${deck.exactCards}).`);
        }
    }
}