import { MaxCardCopiesValidation } from "../../../../usecase/Card/Validation/MaxCardCopiesValidation";
import { DeckFormat } from "../../../../utils/DeckFormatRules";
import { CardValidationContext } from "../../../../utils/dto/CardValidationContext";
import { DeckRepositoryInterface } from "../../../../repository/interface/DeckRepositoryInterface";

describe("MaxCardCopiesValidation", () => {
  let mockDeckRepository: jest.Mocked<DeckRepositoryInterface>;
  let validation: MaxCardCopiesValidation;

  const mockCard = {
    id: 1,
    name: "Lightning Bolt",
    type: "Instant",
    description: "Deal 3 damage",
    image: "bolt.jpg",
    deckId: 1,
  };

  const baseDeck = {
    id: 1,
    name: "Test Deck",
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

    validation = new MaxCardCopiesValidation(mockDeckRepository);
  });

  it("deve lançar erro se houver 4 ou mais cópias do card e o formato permitir", async () => {
    const deck = {
      ...baseDeck,
      format: "standard",
      cards: Array(4).fill({ ...mockCard }),
    };

    mockDeckRepository.findById.mockResolvedValue(deck);

    const context: CardValidationContext = {
      card: mockCard,
      deckId: 1,
    };

    await expect(validation.validate(context)).rejects.toThrow(
      "Maximum of 4 copies of a card allowed in this deck"
    );
  });

  it("não deve lançar erro se houver menos de 4 cópias do card", async () => {
    const deck = {
      ...baseDeck,
      format: "standard",
      cards: Array(3).fill({ ...mockCard }),
    };

    mockDeckRepository.findById.mockResolvedValue(deck);

    const context: CardValidationContext = {
      card: mockCard,
      deckId: 1,
    };

    await expect(validation.validate(context)).resolves.toBeUndefined();
  });

  it("não deve lançar erro se o card for do tipo Basic Land", async () => {
    const deck = {
      ...baseDeck,
      format: "standard",
      cards: Array(10).fill({ ...mockCard, type: "Basic Land" }),
    };

    mockDeckRepository.findById.mockResolvedValue(deck);

    const context: CardValidationContext = {
      card: { ...mockCard, type: "Basic Land" },
      deckId: 1,
    };

    await expect(validation.validate(context)).resolves.toBeUndefined();
  });

  it("não deve lançar erro se o formato não permitir cópias (ex: Commander)", async () => {
    const deck = {
      ...baseDeck,
      format: DeckFormat.COMMANDER,
      cards: Array(5).fill({ ...mockCard }),
    };

    mockDeckRepository.findById.mockResolvedValue(deck);

    const context: CardValidationContext = {
      card: mockCard,
      deckId: 1,
    };

    await expect(validation.validate(context)).resolves.toBeUndefined();
  });
});
