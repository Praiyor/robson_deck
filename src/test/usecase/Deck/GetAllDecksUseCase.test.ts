import { GetAllDecksUseCase } from "../../../usecase/Deck/GetAllDecksUseCase";
import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface";

describe("GetAllDecksUseCase", () => {
  const mockRepository: DeckRepositoryInterface = {
    findAll: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar todos os decks", async () => {
    const decksMock = [
      { id: 1, name: "Deck 1" },
      { id: 2, name: "Deck 2" },
    ];

    (mockRepository.findAll as jest.Mock).mockResolvedValue(decksMock);

    const usecase = new GetAllDecksUseCase(mockRepository);
    const result = await usecase.execute();

    expect(result).toEqual(decksMock);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
