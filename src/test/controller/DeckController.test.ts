import request from "supertest";
import express, { json } from "express";
import { Deckcontroller } from "../../controller/Deckcontroller";

const app = express();
app.use(json());
app.get("/decks/:deckId", Deckcontroller.getDeckById);

jest.mock("../../usecase/Deck/GetDeckbyIdUsecase", () => ({
  GetDeckByIdUseCase: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue({ id: 1, name: "Deck A" }),
  })),
}));

describe("Deckcontroller.getDeckById", () => {
  it("deve retornar 200 se o deck for encontrado", async () => {
    const res = await request(app).get("/decks/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("deve retornar 500 se o deck não for encontrado", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const {
      GetDeckByIdUseCase,
    } = require("../../usecase/Deck/GetDeckbyIdUsecase");
    GetDeckByIdUseCase.mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(null),
    }));

    const res = await request(app).get("/decks/999");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });
});

app.get("/decks", Deckcontroller.getAllDecks);

jest.mock("../../usecase/Deck/GetAllDecksUseCase", () => ({
  GetAllDecksUseCase: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue([{ id: 1, name: "Deck Test" }]),
  })),
}));

describe("Deckcontroller.getAllDecks", () => {
  it("deve retornar todos os decks com status 200", async () => {
    const res = await request(app).get("/decks");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: "Deck Test" }]);
  });
});

app.delete("/decks/:deckId", Deckcontroller.deletedeckById);

jest.mock("../../usecase/Deck/DeleteDeckbyIdUsecase", () => ({
  DeleteDeckbyIdUsecase: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue(undefined),
  })),
}));

describe("Deckcontroller.deletedeckById", () => {
  it("deve retornar 201 se o deck for deletado", async () => {
    const res = await request(app).delete("/decks/1");
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/deleted/i);
  });
});

app.put("/decks/:deckId", Deckcontroller.updateDeckById);

jest.mock("../../usecase/Deck/UpdateDeckbyIdUsecase", () => ({
  UpdateDeckbyidUsecase: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue(true),
  })),
}));

describe("Deckcontroller.updateDeckById", () => {
  it("deve atualizar e retornar 201", async () => {
    const res = await request(app).put("/decks/1").send({
      name: "Atualizado",
      format: "commander",
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/updated/i);
  });
});

app.post("/decks/:deckId/cards", Deckcontroller.addCardToDeck);

jest.mock("../../usecase/Card/GetCardApiUsecase", () => ({
  GetCardApiUsecase: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue({ id: 1, name: "Card X" }),
  })),
}));

describe("Deckcontroller.addCardToDeck", () => {
  it("deve adicionar o card e retornar 201", async () => {
    const res = await request(app).post("/decks/1/cards").send({ id: 1 });
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/added/i);
  });
});

app.delete("/decks/:deckId/cards/:cardId", Deckcontroller.removeCardFromDeck);

jest.mock("../../usecase/Card/DeleteCardUsecase", () => ({
  DeleteCardUsecase: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue(true),
  })),
}));

describe("Deckcontroller.removeCardFromDeck", () => {
  it("deve remover o card e retornar 201", async () => {
    const res = await request(app).delete("/decks/1/cards/1");
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/removed/i);
  });
});
