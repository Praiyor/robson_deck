import { CreateCardUsecase } from "../../../usecase/Card/CreateCardUsecase";
import { CardRepositoryInterface } from "../../../repository/interface/CardRepositoryInterface";
import { Card } from "../../../main/generated/prisma/index";

describe("CreateCardUsecase", () => {
  let mockCardRepository: jest.Mocked<CardRepositoryInterface>;
  let useCase: CreateCardUsecase;

  const cardMock: Card = {
    id: 1,
    name: "Test Card",
    description: "Description of test card",
    image: "http://image.url",
    deckId: 1,
  };

  beforeEach(() => {
    mockCardRepository = {
      create: jest.fn().mockResolvedValue(cardMock),
      findAll: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
    } as jest.Mocked<CardRepositoryInterface>;
      
    useCase = new CreateCardUsecase(mockCardRepository);
  });
  

  it("deve criar um card corretamente", async () => {
    const result = await useCase.execute(
      cardMock.id,
      cardMock.name,
      cardMock.description,
      cardMock.image,
      cardMock.deckId
    );

    expect(mockCardRepository.create).toHaveBeenCalledWith({
      id: cardMock.id,
      name: cardMock.name,
      description: cardMock.description,
      image: cardMock.image,
      deckId: cardMock.deckId,
    });

    expect(result).toEqual(cardMock);
  });

  it("deve lançar erro se dados estiverem faltando (se você adicionar validação)", async () => {
    // Se você não tem validação no usecase, pode ignorar este teste
    // Só inclua se implementar validação, como no exemplo que te mandei
  });
});
