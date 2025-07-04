import { DeleteDeckbyIdUsecase } from "../../../usecase/Deck/DeleteDeckbyIdUsecase";
import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface";

describe("DeleteDeckbyIdUsecase", () => {
  const mockRepository: DeckRepositoryInterface = {
    findById: jest.fn(),
    deleteById: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve deletar um deck existente com sucesso", async () => {
    (mockRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Deck 1",
    });
    (mockRepository.deleteById as jest.Mock).mockResolvedValue(undefined);

    const usecase = new DeleteDeckbyIdUsecase(mockRepository);
    await usecase.execute(1);

    expect(mockRepository.findById).toHaveBeenCalledWith(1);
    expect(mockRepository.deleteById).toHaveBeenCalledWith(1);
  });

  it("deve lançar erro se o deck não existir", async () => {
    (mockRepository.findById as jest.Mock).mockResolvedValue(null);

    const usecase = new DeleteDeckbyIdUsecase(mockRepository);

    await expect(usecase.execute(999)).rejects.toThrow(
      "Deck with id 999 not found."
    );
    expect(mockRepository.deleteById).not.toHaveBeenCalled();
  });
});
