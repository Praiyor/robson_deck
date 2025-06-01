import { Card } from "../../main/generated/prisma/index.js";
import { CardRepositoryInterface } from "../../repository/interface/CardRepositoryInterface.js";


export class CreateCardUsecase {
    constructor(private CardRepository: CardRepositoryInterface) {}

    async execute(id: number, name: string, description: string, image: string, deckId: number): Promise<Card> {

        return await this.CardRepository.create({
            id,
            name,
            description,
            image,
            deckId
        });
    }

 
}