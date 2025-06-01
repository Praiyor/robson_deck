import axios, { AxiosResponse } from "axios";
import { CardRepositoryInterface } from "../../repository/interface/CardRepositoryInterface.js";
import { Card } from "../../../prisma/client/index.js";


export class CreateCardUsecase {
    constructor(private CardRepository: CardRepositoryInterface) {}

    async execute(name: string, description: string, image: string, deckId: number): Promise<Card> {

        return await this.CardRepository.create({
            name,
            description,
            image,
            deckId
        });
    }

 
}