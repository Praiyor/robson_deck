import { DeleteCardUsecase } from "../../../usecase/Card/DeleteCardUsecase";
import { CardRepositoryInterface } from "../../../repository/interface/CardRepositoryInterface";
import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface";

describe("DeleteCardUsecase", () => {
  let mockCardRepository: jest.Mocked<CardRepositoryInterface>;
  let mockDeckRepository: jest.Mocked<DeckRepositoryInterface>;
  let useCase: DeleteCardUsecase;

  beforeEach(() => {
    mockCardRepository = {
      findById: jest.fn(),
      deleteById: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
    } as any; // Cast para satisfazer o Mocked sem erros

    mockDeckRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
    } as any;

    useCase = new DeleteCardUsecase(mockCardRepository, mockDeckRepository);
  });

  it("deve deletar o card quando card e deck existirem", async () => {
    mockCardRepository.findById.mockResolvedValue({
      id: 1,
      name: "Card1",
      description: "desc",
      image: "img",
      deckId: 1,
    });
    mockDeckRepository.findById.mockResolvedValue({
      id: 1,
      name: "Deck1",
      description: "desc",
      format: "Standard",
      minCards: 60,
      exactCards: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      cards: [],
    });

    await useCase.execute(1, 1);

    expect(mockCardRepository.deleteById).toHaveBeenCalledWith(1);
  });

  it("deve lançar erro se o card não existir", async () => {
    mockCardRepository.findById.mockResolvedValue(null);
    mockDeckRepository.findById.mockResolvedValue({
      id: 1,
      name: "Deck1",
      description: "desc",
      format: "Standard",
      minCards: 60,
      exactCards: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      cards: [],
    });

    await expect(useCase.execute(1, 1)).rejects.toThrow(
      "Card with id 1 not found."
    );
  });

  it("deve lançar erro se o deck não existir", async () => {
    mockCardRepository.findById.mockResolvedValue({
      id: 1,
      name: "Card1",
      description: "desc",
      image: "img",
      deckId: 1,
    });
    mockDeckRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(1, 1)).rejects.toThrow(
      "Deck with id 1 not found."
    );
  });
});
