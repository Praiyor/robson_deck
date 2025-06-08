import { Request, Response } from "express";
import { CreateDeckUsecase } from "../usecase/Deck/CreateDeckUsecase.js";
import { DeckRepository } from "../repository/DeckRepository.js";
import { DeckRepositoryInterface } from "../repository/interface/DeckRepositoryInterface.js";
import { deckIdParamSchema, deckIdSchema, deckSchema } from "./schema/deckSchema.js";
import { GetAllDecksUseCase } from "../usecase/Deck/GetAllDecksUseCase.js";
import { GetDeckByIdUseCase } from "../usecase/Deck/GetDeckbyIdUsecase.js";
import { GetCardApiUsecase } from "../usecase/Card/GetCardApiUsecase.js";
import { CardRepositoryInterface } from "../repository/interface/CardRepositoryInterface.js";
import { CardRepository } from "../repository/CardRepository.js";
import { DeleteCardUsecase } from "../usecase/Card/DeleteCardUsecase.js";
import { getFormatRule } from "../utils/DeckFormatRules.js";
import { DeleteDeckbyIdUsecase } from "../usecase/Deck/DeleteDeckbyIdUsecase.js";
import { UpdateDeckbyidUsecase } from "../usecase/Deck/UpdateDeckbyIdUsecase.js";


export class Deckcontroller{
    constructor(){}
    static async createDeck(req: Request, res: Response) {
        try {
            const parseResult = deckSchema.safeParse(req.body);

            if(!parseResult.success){
                throw new Error(parseResult.error.errors[0].message);
            }
            const { name, description, format } = parseResult.data;

            const rules = getFormatRule(format);

            const createDeckUsecase = new CreateDeckUsecase(Deckcontroller.getDeckRepository());

            const createdDeck:boolean = await createDeckUsecase.execute(name, format, rules, description);

            if(!createdDeck){
                throw new Error("Failed to create deck");
            }

            res.status(201).json({ message: "Deck created successfully" });

        } catch (error: any) {
            res.status(400).json({error: error.message})
        }
        
    }

    static async getAllDecks(req: Request, res: Response) {
        try {
            const deckRepository = Deckcontroller.getDeckRepository();
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
                throw new Error(parseResult.error.errors[0].message);
            }

            const { deckId } = parseResult.data;
            const useCase = new GetDeckByIdUseCase(Deckcontroller.getDeckRepository());
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
        try {
            const deckId = Number(req.params.deckId)
            const cardId:number = req.body.id

            if(!cardId || !deckId || typeof deckId !== 'number' || typeof cardId !== 'number') {
                throw new Error("Invalid parameters");
            }

            const getCardApiUsecase = new GetCardApiUsecase(Deckcontroller.getCardRepository(), Deckcontroller.getDeckRepository());
            const card = await getCardApiUsecase.execute(cardId, deckId);

            res.status(201).json({
                message: "Card added to deck successfully",
                card: card
            });

        } catch (error: any) {
            res.status(500).json({error: error.message})
        }

    }

    static async removeCardFromDeck(req: Request, res: Response) {
        try {
            const deckId = Number(req.params.deckId)
            const cardId = Number(req.params.cardId)
            if(!deckId || !cardId || typeof deckId !== 'number' || typeof cardId !== 'number') {
                throw new Error("Invalid parameters");
            }
            const deleteCardUsecase = new DeleteCardUsecase(Deckcontroller.getCardRepository(), Deckcontroller.getDeckRepository());
            await deleteCardUsecase.execute(cardId, deckId);

            res.status(201).json({
                message: "Card removed from the deck successfully",
            });
        } catch (error: any) {
            res.status(500).json({error: error.message})
        }
    }

    static async deletedeckById(req: Request, res: Response) {
        try {
            const {deckId} = deckIdParamSchema.parse(req.params);

            const deleteDeckUsecase = new DeleteDeckbyIdUsecase(Deckcontroller.getDeckRepository());
            await deleteDeckUsecase.execute(deckId);
            
            res.status(201).json({
                message: "Deck deleted successfully",
            });
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    static async updateDeckById(req: Request, res: Response){
        try {
            const {deckId} = deckIdParamSchema.parse(req.params);
            const parseResult = deckSchema.partial().safeParse(req.body);
            if (!parseResult.success) {
                res.status(400).json({ errors: parseResult.error.errors });
            }
            const deckData = parseResult.data;

            let rules = null;
            if(deckData.format){
                rules = getFormatRule(deckData.format);
            }

            const updateDeckUsecase = new UpdateDeckbyidUsecase(Deckcontroller.getDeckRepository());
            await updateDeckUsecase.execute(deckId, deckData.name, deckData.format, rules, deckData.description);

            res.status(201).json({
                message: "Deck updated successfully",
            });
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    static getDeckRepository(): DeckRepositoryInterface{
        return new DeckRepository();
    }

    static getCardRepository(): CardRepositoryInterface{
        return new CardRepository();
    }
}