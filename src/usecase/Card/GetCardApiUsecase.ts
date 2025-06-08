import axios, { AxiosResponse } from "axios";
import { CardRepositoryInterface } from "../../repository/interface/CardRepositoryInterface.js";
import { CreateCardUsecase } from "./CreateCardUsecase.js";
import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface.js";
import { GetDeckByIdUseCase } from "../Deck/GetDeckbyIdUsecase.js";
import { Card } from "../../main/generated/prisma/index.js";
import { mapCardDTOToInternal } from "../../utils/cardMapper.js";
import { CardSchema, CardDTO } from "../../utils/dto/CardDTO.js";
import { DeckFormat } from "../../utils/DeckFormatRules.js";


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

        const totalCards = targetDeck.cards.length;

        if (targetDeck.exactCards !== null && totalCards >= targetDeck.exactCards) {
            throw new Error(`Deck already has the exact number of cards required (${targetDeck.exactCards}).`);
        }

        const isBasicLand = card.type && card.type.includes("Basic Land");
        const doesFormatAllowDuplicates = ![DeckFormat.COMMANDER, DeckFormat.SINGLETON].includes(targetDeck.format as DeckFormat);

        if(!doesFormatAllowDuplicates && !isBasicLand){
            const cardAlreadyExists = targetDeck.cards.some(c => c.name === card.name);
            if (cardAlreadyExists) {
                throw new Error(`Card with name "${card.name}" already exists in the deck.`);
            }
        }

        if (doesFormatAllowDuplicates && !isBasicLand) {
            const cardCount = targetDeck.cards.filter(c => c.name === card.name).length;
            if (cardCount >= 4) {
              throw new Error("Maximum of 4 copies of a card allowed in this deck.");
            }
        }
    }
}