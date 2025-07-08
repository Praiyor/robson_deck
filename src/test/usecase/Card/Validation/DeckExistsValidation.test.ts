import { DeckExistsValidation } from "../../../../usecase/Card/Validation/DeckExistsValidation";
import { DeckRepositoryInterface } from "../../../../repository/interface/DeckRepositoryInterface";
import { CardValidationContext } from "../../../../utils/dto/CardValidationContext";

describe("DeckExistsValidation", () => {
  let mockDeckRepository: jest.Mocked<DeckRepositoryInterface>;
  let validation: DeckExistsValidation;

  beforeEach(() => {
    mockDeckRepository = {
      findById: jest.fn(),
    } as any;

    validation = new DeckExistsValidation(mockDeckRepository);
  });

  it("deve lançar erro se o deck não existir", async () => {
    mockDeckRepository.findById.mockResolvedValue(null);

    const context: CardValidationContext = {
      card: { id: 1 } as any,
      deckId: 42,
    };

    await expect(validation.validate(context)).rejects.toThrow(
      "Deck with id 42 not found."
    );
  });

  it("não deve lançar erro se o deck existir", async () => {
    mockDeckRepository.findById.mockResolvedValue({
      id: 42,
      name: "Deck Teste",
      description: "Descrição",
      format: "padrão",
      minCards: 1,
      exactCards: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      cards: [],
    });

    const context: CardValidationContext = {
      card: { id: 1 } as any,
      deckId: 42,
    };

    await expect(validation.validate(context)).resolves.toBeUndefined();
  });
});
