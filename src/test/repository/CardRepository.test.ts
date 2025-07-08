import { CardRepository } from "../../repository/CardRepository";
import { prisma } from "../../main/config/prisma";

jest.mock("../../main/config/prisma", () => ({
  prisma: {
    card: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("CardRepository", () => {
  const cardRepository = new CardRepository();

  const mockCard = {
    id: 1,
    name: "Test Card",
    description: "This is a test card",
    image: "http://example.com/image.jpg",
    deckId: 1,
  };

  it("create - deve criar um card com sucesso", async () => {
    (prisma.card.create as jest.Mock).mockResolvedValue(mockCard);

    const result = await cardRepository.create(mockCard);

    expect(prisma.card.create).toHaveBeenCalledWith({
      data: {
        id: mockCard.id,
        name: mockCard.name,
        description: mockCard.description,
        image: mockCard.image,
        deck: {
          connect: { id: mockCard.deckId },
        },
      },
    });

    expect(result).toEqual(mockCard);
  });

  it("findAll - deve retornar todos os cards", async () => {
    (prisma.card.findMany as jest.Mock).mockResolvedValue([mockCard]);

    const result = await cardRepository.findAll();

    expect(prisma.card.findMany).toHaveBeenCalled();
    expect(result).toEqual([mockCard]);
  });

  it("findById - deve retornar o card correspondente ao ID", async () => {
    (prisma.card.findUnique as jest.Mock).mockResolvedValue(mockCard);

    const result = await cardRepository.findById(1);

    expect(prisma.card.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockCard);
  });

  it("deleteById - deve deletar o card com sucesso", async () => {
    (prisma.card.delete as jest.Mock).mockResolvedValue(undefined);

    await expect(cardRepository.deleteById(1)).resolves.toBeUndefined();

    expect(prisma.card.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
