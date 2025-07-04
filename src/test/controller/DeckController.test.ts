import request from "supertest";
import express, { json } from "express";
import { Deckcontroller } from "../../controller/Deckcontroller";

// simular a app Express
const app = express();
app.use(json());
app.post("/decks", Deckcontroller.createDeck);

// mock do usecase (evita acesso ao banco real)
jest.mock("../../usecase/Deck/CreateDeckUsecase.ts", () => {
  return {
    CreateDeckUsecase: jest.fn().mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(true),
    })),
  };
});

// mock da função getFormatRule
jest.mock("../../utils/DeckFormatRules", () => {
  return {
    getFormatRule: jest.fn().mockReturnValue(["some-rule"]),
    DeckFormat: {
      COMMANDER: "commander",
      STANDARD: "standard",
      MODERN: "modern",
      PAUPER: "pauper",
      SINGLETON: "singleton",
    },
  };
});

describe("Deckcontroller.createDeck", () => {
  it("deve retornar 201 se o deck for criado com sucesso", async () => {
    const response = await request(app).post("/decks").send({
      name: "Meu Deck",
      description: "Deck de teste",
      format: "commander",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Deck created successfully" });
  });

  it("deve retornar 400 se o formato for inválido", async () => {
    const response = await request(app).post("/decks").send({
      name: "Deck Inválido",
      description: "Teste",
      format: "formato_invalido",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("deve retornar 400 se o nome estiver vazio", async () => {
    const response = await request(app).post("/decks").send({
      name: "",
      description: "Deck sem nome",
      format: "modern",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
