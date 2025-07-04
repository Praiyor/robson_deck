import { CardAlreadyUsedValidation } from "../../../../usecase/Card/Validation/CardAlreadyUsedValidation";
import { CardRepositoryInterface } from "../../../../repository/interface/CardRepositoryInterface";
import { DeckRepositoryInterface } from "../../../../repository/interface/DeckRepositoryInterface";

describe("CardAlreadyUsedValidation", () => {
  let mockCardRepository: jest.Mocked<CardRepositoryInterface>;
  let mockDeckRepository: jest.Mocked<DeckRepositoryInterface>;
  let validation: CardAlreadyUsedValidation;

  beforeEach(() => {
    mockCardRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    } as any;

    mockDeckRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
    } as any;

    validation = new CardAlreadyUsedValidation(
      mockCardRepository,
      mockDeckRepository
    );
  });

  it("deve lançar erro se a carta já estiver em uso em outro deck", async () => {
    // Carta já existe
    mockCardRepository.findById.mockResolvedValue({ id: 1, deckId: 2 });
    // Deck original da carta
    mockDeckRepository.findById.mockResolvedValue({
      id: 2,
      name: "Deck Original",
    });

    const cardValidationContext = { card: { id: 1 } };

    await expect(validation.validate(cardValidationContext)).rejects.toThrow(
      'Card is already in use in the Deck "Deck Original"'
    );

    expect(mockCardRepository.findById).toHaveBeenCalledWith(1);
    expect(mockDeckRepository.findById).toHaveBeenCalledWith(2);
  });

  it("não deve lançar erro se a carta não estiver em uso", async () => {
    mockCardRepository.findById.mockResolvedValue(null);

    const cardValidationContext = { card: { id: 1 } };

    await expect(
      validation.validate(cardValidationContext)
    ).resolves.toBeUndefined();

    expect(mockCardRepository.findById).toHaveBeenCalledWith(1);
    expect(mockDeckRepository.findById).not.toHaveBeenCalled();
  });
});
