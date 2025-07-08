import { CardAlreadyUsedValidation } from "../../../../usecase/Card/Validation/CardAlreadyUsedValidation";
import { CardRepositoryInterface } from "../../../../repository/interface/CardRepositoryInterface";
import { DeckRepositoryInterface } from "../../../../repository/interface/DeckRepositoryInterface";
import { CardValidationContext } from "../../../../utils/dto/CardValidationContext";

describe("CardAlreadyUsedValidation", () => {
  let mockCardRepository: jest.Mocked<CardRepositoryInterface>;
  let mockDeckRepository: jest.Mocked<DeckRepositoryInterface>;
  let validation: CardAlreadyUsedValidation;

  beforeEach(() => {
    mockCardRepository = {
      findById: jest.fn(),
    } as any;

    mockDeckRepository = {
      findById: jest.fn(),
    } as any;

    validation = new CardAlreadyUsedValidation(
      mockCardRepository,
      mockDeckRepository
    );
  });

  it("deve lançar erro se o card já estiver no deck", async () => {
    const mockCard = {
      id: 1,
      name: "Carta Teste",
      description: "Carta de teste",
      image: "img.png",
      color: "vermelho",
      type: "mágica",
      category: "comum",
      price: 10,
      createdAt: new Date(),
      power: "5",
      deckId: 2,
    };

    const mockDeck = {
      id: 1,
      name: "Deck Teste",
      description: "descrição do deck",
      format: "padrão",
      minCards: 1,
      exactCards: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      cards: [mockCard],
    };

    mockCardRepository.findById.mockResolvedValue(mockCard);
    mockDeckRepository.findById.mockResolvedValue(mockDeck);

    const cardValidationContext: CardValidationContext = {
      card: mockCard,
      deckId: 1,
    };

    await expect(validation.validate(cardValidationContext)).rejects.toThrow(
      'Card is already in use in the Deck "Deck Teste"'
    );
  });

  it("não deve lançar erro se o card não estiver no deck", async () => {
    const mockCardNotInDeck = {
      id: 2, 
      name: "Outra Carta",
      description: "Outra carta de teste",
      image: "img2.png",
      color: "azul",
      type: "armadilha",
      category: "rara",
      price: 15,
      createdAt: new Date(),
      power: "3",
      deckId: 1,
    };

    const mockDeck = {
      id: 1,
      name: "Deck Teste",
      description: "descrição do deck",
      format: "padrão",
      minCards: 1,
      exactCards: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      cards: [], 
    };

    mockCardRepository.findById.mockResolvedValue(mockCardNotInDeck);
    mockDeckRepository.findById.mockResolvedValue(mockDeck);

    const cardValidationContext: CardValidationContext = {
      card: mockCardNotInDeck,
      deckId: 1,
    };

    await expect(
      validation.validate(cardValidationContext)
    ).resolves.toBeUndefined();
  });
});
