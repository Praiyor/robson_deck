import axios, { AxiosResponse } from "axios";
import { CardRepositoryInterface } from "../../repository/interface/CardRepositoryInterface";
import { CreateCardUsecase } from "./CreateCardUsecase";
import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface";
import { Card } from "../../main/generated/prisma/index";
import { mapCardDTOToInternal } from "../../utils/cardMapper";
import { CardSchema, CardDTO } from "../../utils/dto/CardDTO";
import { CardValidationContext } from "../../utils/dto/CardValidationContext";
import { CardValidatorFactory } from "./Validation/Factory/CardValidatorFactory";


export class GetCardApiUsecase {
    constructor(private CardRepository: CardRepositoryInterface, private DeckRepository: DeckRepositoryInterface) {}

    async execute(cardId: number, deckId: number):Promise<Card>{
        const { data: cardDTO }: AxiosResponse<CardDTO> = await axios.get(`http://api-gateway:8080/card/${cardId}`);

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
        const context: CardValidationContext = { card, deckId };

        const validator = CardValidatorFactory.create(this.CardRepository, this.DeckRepository);
        await validator.executeAll(context);
    }
}