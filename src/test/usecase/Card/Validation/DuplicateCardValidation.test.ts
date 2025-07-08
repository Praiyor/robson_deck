import { DuplicateCardValidation } from "../../../../usecase/Card/Validation/DuplicateCardsValidation";
import { DeckRepositoryInterface } from "../../../../repository/interface/DeckRepositoryInterface";
import { CardValidationContext } from "../../../../utils/dto/CardValidationContext";
import { DeckFormat } from "../../../../utils/DeckFormatRules";

describe("DuplicateCardValidation", () => {
  let mockDeckRepository: jest.Mocked<DeckRepositoryInterface>;
  let validation: DuplicateCardValidation;

  beforeEach(() => {
    mockDeckRepository = {
      findById: jest.fn(),
    } as any;

    validation = new DuplicateCardValidation(mockDeckRepository);
  });

  const mockCard = {
    id: 99,
    name: "Fireball",
    type: "Sorcery",
    description: "A powerful fire spell",
    image: "fireball.jpg",
    deckId: 1,
  };

  const baseDeck = {
    id: 1,
    name: "Test Deck",
    description: "A deck for testing",
    format: DeckFormat.COMMANDER,
    minCards: 1,
    exactCards: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    cards: [],
  };

  it("deve lançar erro se o card já existir no deck e o formato não permitir duplicatas", async () => {
    const deck = {
      ...baseDeck,
      cards: [
        {
          name: "Fireball",
          id: 1,
          description: "A powerful fire spell",
          image: "fireball.jpg",
          deckId: 1,
        },
      ],
    };

    mockDeckRepository.findById.mockResolvedValue(deck);

    const context: CardValidationContext = {
      card: mockCard,
      deckId: 1,
    };

    await expect(validation.validate(context)).rejects.toThrow(
      'Card with name "Fireball" already exists in the deck.'
    );
  });

  it("não deve lançar erro se o card for 'Basic Land' mesmo com formato restrito", async () => {
    const deck = {
      ...baseDeck,
      cards: [],
    };

    mockDeckRepository.findById.mockResolvedValue(deck);

    const context: CardValidationContext = {
      card: { ...mockCard, type: "Basic Land" },
      deckId: 1,
    };

    await expect(validation.validate(context)).resolves.toBeUndefined();
  });

  it("não deve lançar erro se o formato permitir duplicatas", async () => {
    const deck = {
      ...baseDeck,
      format: "standard",
      cards: [
        {
          name: "Fireball",
          id: 1,
          description: "A powerful fire spell",
          image: "fireball.jpg",
          deckId: 1,
        },
      ],
    };

    mockDeckRepository.findById.mockResolvedValue(deck);

    const context: CardValidationContext = {
      card: mockCard,
      deckId: 1,
    };

    await expect(validation.validate(context)).resolves.toBeUndefined();
  });

  it("não deve lançar erro se o card não existir no deck", async () => {
    const deck = {
      ...baseDeck,
      cards: [
        {
          name: "Lightning Bolt",
          id: 2,
          description: "Another spell",
          image: "bolt.jpg",
          deckId: 1,
        },
      ],
    };

    mockDeckRepository.findById.mockResolvedValue(deck);

    const context: CardValidationContext = {
      card: mockCard,
      deckId: 1,
    };

    await expect(validation.validate(context)).resolves.toBeUndefined();
  });
});
