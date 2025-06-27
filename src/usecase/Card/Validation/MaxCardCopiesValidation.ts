import { CardValidationContext } from "../../../utils/dto/CardValidationContext.js";
import { ValidationStrategy } from "./interface/ValidationStrategy.js";
import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface.js";
import { GetDeckByIdUseCase } from "../../Deck/GetDeckbyIdUsecase.js";
import { DeckFormat } from "../../../utils/DeckFormatRules.js";

export class MaxCardCopiesValidation implements ValidationStrategy<CardValidationContext> {
    constructor(private deckRepository: DeckRepositoryInterface){}

    async validate({ card, deckId }: CardValidationContext): Promise<void> {
        const deck = await new GetDeckByIdUseCase(this.deckRepository).execute(deckId);

        const isBasicLanc = card.type?.includes("Basic Land");
        const allowsCopies = ![DeckFormat.COMMANDER, DeckFormat.SINGLETON].includes(deck.format as DeckFormat);

        if(allowsCopies && !isBasicLanc){
            const count = deck.cards.filter(c => c.name === card.name).length;
            if(count >= 4){
                throw new Error("Maximum of 4 copies of a card allowed in this deck");
            }
        }
    }
}