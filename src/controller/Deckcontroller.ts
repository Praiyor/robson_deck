import { Request, Response } from "express";
import { CreateDeckUsecase } from "../usecase/CreateDeckUsecase.js";
import { DeckRepository } from "../repository/DeckRepository.js";
import { DeckRepositoryInterface } from "../repository/interface/DeckRepositoryInterface.js";
import { Deck } from "../entity/Deck.js";
import { deckIdSchema, deckSchema } from "./schema/deckSchema.js";
import { GetAllDecksUseCase } from "../usecase/GetAllDecksUseCase.js";
import { GetDeckByIdUseCase } from "../usecase/GetDeckbyIdUsecase.js";


export class Deckcontroller{
    constructor(){}
    static async createDeck(req: Request, res: Response) {
        try {
            const parseResult = deckSchema.safeParse(req.body);
            if(!parseResult.success){
                res.status(400).json({error: parseResult.error.errors[0].message});
                return
            }
            const { name, description} = parseResult.data;

            const createDeckUsecase = new CreateDeckUsecase(this.getDeckRepository());

            const createdDeck:boolean = await createDeckUsecase.execute(name, description);

            if(!createdDeck){
                res.status(500).json({ error: "Failed to create deck" });
            }

            res.status(201).json({ message: "Deck created successfully" });

        } catch (error: any) {
            res.status(400).json({error: error.message})
        }
        
    }

    static async getAllDecks(req: Request, res: Response) {
        try {
            const deckRepository = this.getDeckRepository();
            const getAllDecksUsecase = new GetAllDecksUseCase(deckRepository);
            const decks = await getAllDecksUsecase.execute();

            res.status(200).json(decks);
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    static async getDeckById(req: Request, res: Response) {
        try {
            const rawParams = { deckId: Number(req.params.deckId) };
            const parseResult = deckIdSchema.safeParse(rawParams);

            if (!parseResult.success) {
                res.status(400).json({ error: parseResult.error.errors[0].message });
                return;
            }

            const { deckId } = parseResult.data;
            const useCase = new GetDeckByIdUseCase(this.getDeckRepository());
            const deck = await useCase.execute(deckId);

            if(!deck){
                throw new Error("Deck not found");
            }

            res.status(200).json(deck);
            
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async addCardToDeck(req: Request, res: Response) {

    }

    static async removeCardFromDeck(req: Request, res: Response) {

    }

    static getDeckRepository(): DeckRepositoryInterface{
        return new DeckRepository();
    }
}