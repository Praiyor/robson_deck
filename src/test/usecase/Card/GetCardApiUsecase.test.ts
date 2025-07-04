import axios from "axios";
import { GetCardApiUsecase } from "../../../usecase/Card/GetCardApiUsecase";
import { CardRepositoryInterface } from "../../../repository/interface/CardRepositoryInterface";
import { DeckRepositoryInterface } from "../../../repository/interface/DeckRepositoryInterface";
import { CardDTO } from "../../../utils/dto/CardDTO";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("GetCardApiUsecase", () => {
  let mockCardRepository: jest.Mocked<CardRepositoryInterface>;
  let mockDeckRepository: jest.Mocked<DeckRepositoryInterface>;
  let useCase: GetCardApiUsecase;

  const cardDTO: CardDTO = {
    id: 1,
    name: "Card Teste",
    description: "Descrição do card",
    imageUrl: "http://image.url",
    color: "Red",
    type: "Spell",
    category: "Magic",
    price: 100,
    createdAt: new Date(), // ou new Date("2024-01-01T00:00:00Z")
    power: "Strong",
  };

  beforeEach(() => {
    mockCardRepository = {
      create: jest.fn(),
      findById: jest.fn(),
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

    useCase = new GetCardApiUsecase(mockCardRepository, mockDeckRepository);
  });

  it("deve buscar card pela API, validar, salvar e retornar o card criado", async () => {
    mockedAxios.get.mockResolvedValue({ data: cardDTO });
    mockCardRepository.create.mockResolvedValue({
      id: 1,
      name: "Card Teste",
      description: "Descrição do card",
      image: "http://image.url",
      deckId: 1,
    });

    jest.spyOn(useCase, "validate").mockResolvedValue();

    const result = await useCase.execute(1, 1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://api-gateway:8080/card/1"
    );
    expect(useCase.validate).toHaveBeenCalledWith(cardDTO, 1);
    expect(mockCardRepository.create).toHaveBeenCalled();
    expect(result).toHaveProperty("id", 1);
  });

  it("deve lançar erro se o card não for encontrado na API", async () => {
    mockedAxios.get.mockResolvedValue({ data: null });

    await expect(useCase.execute(1, 1)).rejects.toThrow(
      "Card with id 1 not found in card service."
    );
  });

  it("deve repassar erro da validação", async () => {
    mockedAxios.get.mockResolvedValue({ data: cardDTO });
    jest
      .spyOn(useCase, "validate")
      .mockRejectedValue(new Error("Validation failed"));

    await expect(useCase.execute(1, 1)).rejects.toThrow("Validation failed");
  });
});
