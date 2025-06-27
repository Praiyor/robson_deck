import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface.js";
import { DeckFormat } from "../../../utils/DeckFormatRules.js";
import { CardValidationContext } from "../../../utils/dto/CardValidationContext.js";
import { GetDeckByIdUseCase } from "../../Deck/GetDeckbyIdUsecase.js";
import { ValidationStrategy } from "./interface/ValidationStrategy.js";

export class DuplicateCardValidation implements ValidationStrategy<CardValidationContext> {
    constructor(private deckRepository: DeckRepositoryInterface){}

    async validate({ card, deckId }: CardValidationContext): Promise<void> {
        const deck = await new GetDeckByIdUseCase(this.deckRepository).execute(deckId);

        const isBasicLanc = card.type?.includes("Basic Land");
        const doesNotAllowDuplicates = [DeckFormat.COMMANDER, DeckFormat.SINGLETON].includes(deck.format as DeckFormat);

        if(doesNotAllowDuplicates && !isBasicLanc){
            const alreadyExist = deck.cards.some(c => c.name === card.name);
            if(alreadyExist){
                throw new Error(`Card with name "${card.name}" already exists in the deck.`);
            }
        }
    }
}