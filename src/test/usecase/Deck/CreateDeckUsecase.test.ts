import { CreateDeckUsecase } from "../../../usecase/Deck/CreateDeckUsecase";
import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface";
import { DeckFormat } from "../../../utils/DeckFormatRules";

describe("CreateDeckUsecase", () => {
  it("deve criar um deck com sucesso", async () => {
    const mockRepository: DeckRepositoryInterface = {
      create: jest.fn().mockResolvedValue(true),
      // outros métodos não são necessários aqui
    } as any;

    const usecase = new CreateDeckUsecase(mockRepository);

    const result = await usecase.execute(
      "Meu Deck",
      DeckFormat.MODERN,
      { minCards: 60 },
      "Descrição opcional"
    );

    expect(mockRepository.create).toHaveBeenCalledWith({
      name: "Meu Deck",
      format: DeckFormat.MODERN,
      description: "Descrição opcional",
      minCards: 60,
      exactCards: null,
    });

    expect(result).toBe(true);
  });
});
