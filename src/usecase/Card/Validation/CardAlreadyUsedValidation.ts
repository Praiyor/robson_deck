import { CardRepositoryInterface } from "../../../repository/interface/CardRepositoryInterface.js";
import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface.js";
import { CardValidationContext } from "../../../utils/dto/CardValidationContext.js";
import { GetDeckByIdUseCase } from "../../Deck/GetDeckbyIdUsecase.js";
import { ValidationStrategy } from "./interface/ValidationStrategy.js";

export class CardAlreadyUsedValidation implements ValidationStrategy<CardValidationContext> {
    constructor(private cardRepository: CardRepositoryInterface, private deckRepository: DeckRepositoryInterface){}

    async validate({card}: CardValidationContext): Promise<void> {
        const existingCard = await this.cardRepository.findById(card.id);
        if(existingCard){
            const originalDeck = await new GetDeckByIdUseCase(this.deckRepository).execute(existingCard.deckId);
            throw new Error(`Card is already in use in the Deck "${originalDeck?.name}"`);
        }
    }
    
}