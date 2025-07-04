import { GetDeckByIdUseCase } from "../../../usecase/Deck/GetDeckbyIdUsecase";
import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface";
import { DeckWithCards } from "../../../utils/types/DeckWithCards";

describe("GetDeckByIdUseCase", () => {
  const mockRepository: DeckRepositoryInterface = {
    findById: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar um deck com o ID fornecido", async () => {
    const deckMock: DeckWithCards = {
      id: 1,
      name: "Meu Deck",
      description: "Descrição do deck",
      format: "PADRÃO",
      minCards: 40,
      exactCards: 60,
      createdAt: new Date(),
      updatedAt: new Date(),
      cards: [],
    };
      

    (mockRepository.findById as jest.Mock).mockResolvedValue(deckMock);

    const usecase = new GetDeckByIdUseCase(mockRepository);
    const result = await usecase.execute(1);

    expect(result).toEqual(deckMock);
    expect(mockRepository.findById).toHaveBeenCalledWith(1);
  });

  it("deve retornar null se o deck não for encontrado", async () => {
    (mockRepository.findById as jest.Mock).mockResolvedValue(null);

    const usecase = new GetDeckByIdUseCase(mockRepository);
    const result = await usecase.execute(999);

    expect(result).toBeNull();
    expect(mockRepository.findById).toHaveBeenCalledWith(999);
  });
});
