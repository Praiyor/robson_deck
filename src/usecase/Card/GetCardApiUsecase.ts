import axios, { AxiosResponse } from "axios";
import { z } from "zod";
import { CardRepositoryInterface } from "../../repository/interface/CardRepositoryInterface.js";
import { CreateCardUsecase } from "./CreateCardUsecase.js";
import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface.js";
import { GetDeckByIdUseCase } from "../Deck/GetDeckbyIdUsecase.js";
import { Card } from "../../main/generated/prisma/index.js";
import { mapCardDTOToInternal } from "../../utils/cardMapper.js";
import { CardSchema, CardDTO } from "../../utils/dto/CardDTO.js";


export class GetCardApiUsecase {
    constructor(private CardRepository: CardRepositoryInterface, private DeckRepository: DeckRepositoryInterface) {}

    async execute(cardId: number, deckId: number):Promise<Card>{
        const { data: cardDTO }: AxiosResponse<CardDTO> = await axios.get(`http://localhost:3000/card/${cardId}`);

        if(!cardDTO){
            throw new Error(`Card with id ${cardId} not found in card service.`);
        }

        const parsed = CardSchema.parse(cardDTO);

        await this.validate(parsed, deckId);

        const cardToSave = mapCardDTOToInternal(parsed, deckId);

        const createCardUseCase = new CreateCardUsecase(this.CardRepository);
        const cardCreated = await createCardUseCase.execute(
            cardToSave.id,
            cardToSave.name,
            cardToSave.description,
            cardToSave.image,
            cardToSave.deckId
        );
        return cardCreated;
    }

    async validate(card: CardDTO, deckId: number): Promise<void> {
        const getDeckUseCase = new GetDeckByIdUseCase(this.DeckRepository);
        const targetDeck = await getDeckUseCase.execute(deckId)
        const existingCard = await this.CardRepository.findById(card.id);

        if(!targetDeck){
            throw new Error(`Deck with id ${deckId} not found.`);
        }

        if (existingCard) {
            const originalDeck = await getDeckUseCase.execute(existingCard.deckId);
            const deckName = originalDeck?.name;
            
            throw new Error(`Card is already in use in the Deck "${deckName}".`);
        }
    }
}