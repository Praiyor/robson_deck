import axios, { AxiosResponse } from "axios";
import { z } from "zod";
import { CardRepositoryInterface } from "../../repository/interface/CardRepositoryInterface.js";
import { CreateCardUsecase } from "./CreateCardUsecase.js";
import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface.js";
import { GetDeckByIdUseCase } from "../Deck/GetDeckbyIdUsecase.js";
import { Card } from "../../main/generated/prisma/index.js";

type cardReponse = {
    id: number;
    name: string;
    description: string;
    image: string;
    date: Date;
}

const CardSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    image: z.string().url(),
    date: z.coerce.date()
});

export class GetCardApiUsecase {
    constructor(private CardRepository: CardRepositoryInterface, private DeckRepository: DeckRepositoryInterface) {}

    async execute(cardName: string, deckId: number):Promise<Card>{
        const response: AxiosResponse<cardReponse> = await axios.get(`http://localhost:3000/cards/${cardName}`);

        if(!response.data){
            throw new Error(`Card with name ${cardName} not found in card service.`);
        }

        await this.validate(response.data, deckId);

        const createCardUseCase = new CreateCardUsecase(this.CardRepository);
        
        const cardCreated = await createCardUseCase.execute(
                                            response.data.id,
                                            response.data.name,
                                            response.data.description,
                                            response.data.image,
                                            deckId);
        return cardCreated;
    }

    async validate(responseData: cardReponse, deckId: number): Promise<void> {
        const parsed = CardSchema.parse(responseData);
        const getDeckUseCase = new GetDeckByIdUseCase(this.DeckRepository);
        const deck = await getDeckUseCase.execute(deckId)

        if(!deck){
            throw new Error(`Deck with id ${deckId} not found.`);
        }
    }

 
}