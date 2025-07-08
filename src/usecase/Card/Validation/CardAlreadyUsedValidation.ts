import { CardRepositoryInterface } from "../../../repository/interface/CardRepositoryInterface";
import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface";
import { CardValidationContext } from "../../../utils/dto/CardValidationContext";
import { GetDeckByIdUseCase } from "../../Deck/GetDeckbyIdUsecase";
import { ValidationStrategy } from "./interface/ValidationStrategy";

export class CardAlreadyUsedValidation
  implements ValidationStrategy<CardValidationContext>
{
  constructor(
    private cardRepository: CardRepositoryInterface,
    private deckRepository: DeckRepositoryInterface
  ) {}

  async validate({ card, deckId }: CardValidationContext): Promise<void> {
    const existingCard = await this.cardRepository.findById(card.id);

    if (!existingCard) {
      return;
    }
    if (existingCard.deckId === deckId) return;

    const originalDeck = await new GetDeckByIdUseCase(
      this.deckRepository
    ).execute(existingCard.deckId);
    throw new Error(
      `Card is already in use in the Deck "${originalDeck?.name}"`
    );
  }
}