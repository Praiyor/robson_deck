import { MaxCardsInDeckValidation } from "../../../../usecase/Card/Validation/MaxCardsInDeckValidation";
import { CardValidationContext } from "../../../../utils/dto/CardValidationContext";
import { DeckRepositoryInterface } from "../../../../repository/interface/DeckRepositoryInterface";

describe("MaxCardsInDeckValidation", () => {
  let mockDeckRepository: jest.Mocked<DeckRepositoryInterface>;
  let validation: MaxCardsInDeckValidation;

  const mockCard = {
    id: 1,
    name: "Island",
    type: "Basic Land",
    description: "Blue mana",
    image: "island.jpg",
    deckId: 1,
  };

  const baseDeck = {
    id: 1,
    name: "Control Deck",
    description: "",
    format: "standard",
    minCards: 1,
    exactCards: 60,
    createdAt: new Date(),
    updatedAt: new Date(),
    cards: [],
  };

  beforeEach(() => {
    mockDeckRepository = {
      findById: jest.fn(),
    } as any;

    validation = new MaxCardsInDeckValidation(mockDeckRepository);
  });

  it("deve lançar erro se o deck já tiver o número exato de cards", async () => {
    const deck = {
      ...baseDeck,
      cards: new Array(60).fill(mockCard),
    };

    mockDeckRepository.findById.mockResolvedValue(deck);

    const context: CardValidationContext = {
      card: mockCard,
      deckId: 1,
    };

    await expect(validation.validate(context)).rejects.toThrow(
      "Deck already has the exact number of cards required (60)."
    );
  });

  it("não deve lançar erro se o número de cards for menor que o necessário", async () => {
    const deck = {
      ...baseDeck,
      cards: new Array(59).fill(mockCard),
    };

    mockDeckRepository.findById.mockResolvedValue(deck);

    const context: CardValidationContext = {
      card: mockCard,
      deckId: 1,
    };

    await expect(validation.validate(context)).resolves.toBeUndefined();
  });

  it("não deve lançar erro se exactCards for null", async () => {
    const deck = {
      ...baseDeck,
      exactCards: null,
      cards: new Array(100).fill(mockCard),
    };

    mockDeckRepository.findById.mockResolvedValue(deck);

    const context: CardValidationContext = {
      card: mockCard,
      deckId: 1,
    };

    await expect(validation.validate(context)).resolves.toBeUndefined();
  });
});
