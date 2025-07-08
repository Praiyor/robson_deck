import { DeckRepository } from "../../repository/DeckRepository";
import { prisma } from "../../main/config/prisma";

// Mock do Prisma
jest.mock("../../main/config/prisma", () => ({
  prisma: {
    deck: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe("DeckRepository", () => {
  const deckRepository = new DeckRepository();

  const mockDeck = {
    id: 1,
    name: "Test Deck",
    description: "A test deck",
    format: "standard",
    minCards: 60,
    exactCards: 60,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("create - deve criar um deck com sucesso", async () => {
    (prisma.deck.create as jest.Mock).mockResolvedValue(mockDeck);

    const result = await deckRepository.create(mockDeck);

    expect(prisma.deck.create).toHaveBeenCalledWith({ data: mockDeck });
    expect(result).toBe(true);
  });

  it("create - deve lançar erro ao falhar", async () => {
    (prisma.deck.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(deckRepository.create(mockDeck)).rejects.toThrow(
      "Error creating deck: Error: DB error"
    );
  });

  it("findAll - deve retornar todos os decks", async () => {
    (prisma.deck.findMany as jest.Mock).mockResolvedValue([mockDeck]);

    const result = await deckRepository.findAll();

    expect(prisma.deck.findMany).toHaveBeenCalled();
    expect(result).toEqual([mockDeck]);
  });

  it("findById - deve retornar o deck com as cartas", async () => {
    const deckWithCards = { ...mockDeck, cards: [] };
    (prisma.deck.findUnique as jest.Mock).mockResolvedValue(deckWithCards);

    const result = await deckRepository.findById(1);

    expect(prisma.deck.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { cards: true },
    });
    expect(result).toEqual(deckWithCards);
  });

  it("deleteById - deve deletar o deck com sucesso", async () => {
    (prisma.deck.delete as jest.Mock).mockResolvedValue(undefined);

    await expect(deckRepository.deleteById(1)).resolves.toBeUndefined();

    expect(prisma.deck.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("deleteById - deve lançar erro ao falhar", async () => {
    (prisma.deck.delete as jest.Mock).mockRejectedValue(
      new Error("Delete error")
    );

    await expect(deckRepository.deleteById(1)).rejects.toThrow(
      "Error deleting deck with id 1: Delete error"
    );
  });

  it("updateById - deve atualizar o deck com sucesso", async () => {
    const updatedDeck = { ...mockDeck, name: "Updated" };
    (prisma.deck.update as jest.Mock).mockResolvedValue(updatedDeck);

    const result = await deckRepository.updateById(1, { name: "Updated" });

    expect(prisma.deck.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: "Updated" },
    });
    expect(result).toEqual(updatedDeck);
  });

  it("updateById - deve lançar erro ao falhar", async () => {
    (prisma.deck.update as jest.Mock).mockRejectedValue(
      new Error("Update error")
    );

    await expect(deckRepository.updateById(1, {})).rejects.toThrow(
      "Error updating deck with id 1: Update error"
    );
  });
});
