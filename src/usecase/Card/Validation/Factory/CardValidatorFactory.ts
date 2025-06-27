import { CardRepositoryInterface } from "../../../../repository/interface/CardRepositoryInterface.js";
import { DeckRepositoryInterface } from "../../../../repository/interface/DeckRepositoryInterface.js";
import { CardValidationContext } from "../../../../utils/dto/CardValidationContext.js";
import { CardAlreadyUsedValidation } from "../CardAlreadyUsedValidation.js";
import { CompositeValidator } from "../CompositeValidator.js";
import { DeckExistsValidation } from "../DeckExistsValidation.js";
import { DuplicateCardValidation } from "../DuplicateCardsValidation.js";
import { ValidationStrategy } from "../interface/ValidationStrategy.js";
import { MaxCardCopiesValidation } from "../MaxCardCopiesValidation.js";
import { MaxCardsInDeckValidation } from "../MaxCardsInDeckValidation.js";

export class CardValidatorFactory {
    static create(cardRepository: CardRepositoryInterface, deckRepository: DeckRepositoryInterface): CompositeValidator<CardValidationContext>{
        const strategies: ValidationStrategy<CardValidationContext>[] = [
            new DeckExistsValidation(deckRepository),
            new CardAlreadyUsedValidation(cardRepository, deckRepository),
            new MaxCardsInDeckValidation(deckRepository),
            new DuplicateCardValidation(deckRepository),
            new MaxCardCopiesValidation(deckRepository)
        ]
        return new CompositeValidator<CardValidationContext>(strategies);
    }
}