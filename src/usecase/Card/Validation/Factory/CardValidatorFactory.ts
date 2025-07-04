import { CardRepositoryInterface } from "../../../../repository/interface/CardRepositoryInterface";
import { DeckRepositoryInterface } from "../../../../repository/interface/DeckRepositoryInterface";
import { CardValidationContext } from "../../../../utils/dto/CardValidationContext";
import { CardAlreadyUsedValidation } from "../CardAlreadyUsedValidation";
import { CompositeValidator } from "../CompositeValidator";
import { DeckExistsValidation } from "../DeckExistsValidation";
import { DuplicateCardValidation } from "../DuplicateCardsValidation";
import { ValidationStrategy } from "../interface/ValidationStrategy";
import { MaxCardCopiesValidation } from "../MaxCardCopiesValidation";
import { MaxCardsInDeckValidation } from "../MaxCardsInDeckValidation";

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