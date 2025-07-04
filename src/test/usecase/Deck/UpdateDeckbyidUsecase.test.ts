import { UpdateDeckbyidUsecase } from "../../../usecase/Deck/UpdateDeckbyIdUsecase";
import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface";
import { DeckWithCards } from "../../../utils/types/DeckWithCards";
import { DeckFormat } from "../../../utils/DeckFormatRules";

describe("UpdateDeckbyidUsecase", () => {
  let mockDeckRepository: jest.Mocked<DeckRepositoryInterface>;
  let useCase: UpdateDeckbyidUsecase;

  const deckMock: DeckWithCards = {
    id: 1,
    name: "Old Name",
    description: "Old Description",
    format: DeckFormat.STANDARD,
    minCards: 40,
    exactCards: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    cards: [],
  };

  beforeEach(() => {
    mockDeckRepository = {
      updateById: jest.fn(),
      findById: jest.fn().mockResolvedValue(deckMock),
      create: jest.fn(),
      deleteById: jest.fn(),
      findAll: jest.fn(),
    };
    useCase = new UpdateDeckbyidUsecase(mockDeckRepository);
  });

  it("deve atualizar um deck com nome e descrição novos", async () => {
    await useCase.execute(
      1,
      "Novo Nome",
      DeckFormat.STANDARD,
      undefined,
      "Nova Descrição"
    );

    expect(mockDeckRepository.updateById).toHaveBeenCalledWith(1, {
      name: "Novo Nome",
      format: DeckFormat.STANDARD,
      description: "Nova Descrição",
    });
  });

  it("deve lançar erro se minCards e exactCards forem passados juntos", async () => {
    await expect(
      useCase.execute(1, "Novo", DeckFormat.STANDARD, {
        minCards: 10,
        exactCards: 20,
      })
    ).rejects.toThrow(
      "Cannot set both minCards and exactCards at the same time."
    );
  });

  it("deve lançar erro se o deck não for encontrado", async () => {
    mockDeckRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute(999, "Nome", DeckFormat.STANDARD, { minCards: 10 })
    ).rejects.toThrow("Deck with id 999 not found.");
  });
});
