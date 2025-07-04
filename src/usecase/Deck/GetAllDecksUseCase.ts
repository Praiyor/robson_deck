
import { Deck } from "../../main/generated/prisma/index";
import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface";

export class GetAllDecksUseCase {
    constructor(private DeckRepository: DeckRepositoryInterface){}

    async execute(): Promise<Deck[]> {
        return await this.DeckRepository.findAll()
    }
}